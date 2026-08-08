const MENTOR_API_URL =
  typeof process !== 'undefined' ? process.env?.EXPO_PUBLIC_MENTOR_API_URL : undefined;

// A integração remota fica preparada, mas desligada até a publicação do produto.
const MENTOR_ONLINE_ENABLED = false;

function normalize(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function contextIntroduction(context) {
  if (!context?.lessonTitle) return '';
  const section = context.sectionTitle ? `, na parte “${context.sectionTitle}”` : '';
  return `Você está estudando “${context.lessonTitle}”${section}. `;
}

function investigationQuestion(context) {
  if (context?.code) {
    return 'Sem executar o código ainda: qual valor você acredita que entra, qual linha o transforma e qual resultado deveria sair?';
  }
  return 'Com suas palavras, qual problema esse conceito tenta resolver antes de pensarmos na sintaxe?';
}

function localReply(message, profile, progress, context = {}) {
  const normalized = normalize(message);
  const name = profile?.displayName || 'estudante';
  const xp = progress?.xp ?? 0;
  const introduction = contextIntroduction(context);
  const diagnostic = investigationQuestion(context);
  const asksForSolution = /resposta pronta|solucao pronta|codigo pronto|faz pra mim|qual a resposta|me da a resposta/.test(normalized);

  if (asksForSolution) {
    return `${introduction}Eu não vou entregar a resposta pronta agora, ${name}, porque esta tentativa faz parte do aprendizado. Primeira pista: separe o problema em entrada, transformação e saída. ${diagnostic} Escreva sua hipótese e eu avalio o raciocínio com você.`;
  }

  if (/undefined|null|nao funciona|erro|bug|quebrou/.test(normalized)) {
    return `${introduction}Vamos investigar, não adivinhar. Primeiro diga o que você esperava e o que aconteceu de verdade. Depois localize a primeira linha em que o valor deixa de ser o esperado. ${diagnostic} Pista inicial: confira declaração, nome, tipo e momento em que o valor é usado. Envie sua hipótese e eu indico o próximo teste — uma mudança por vez.`;
  }

  if (/por que|porque|como funciona|explica|o que e/.test(normalized)) {
    const lessonExplanation = context?.sectionBody
      ? `A ideia central desta parte é: ${context.sectionBody} `
      : '';
    return `${introduction}${lessonExplanation}Agora conecte a explicação ao fluxo real: entrada → transformação → saída. ${diagnostic} Se sua previsão estiver diferente do resultado, eu explico exatamente em qual etapa o raciocínio mudou.`;
  }

  if (/const|\blet\b|variavel/.test(normalized)) {
    return `${introduction}Uma variável associa um nome a um valor. Antes de escolher a palavra de declaração, pergunte: esse nome precisará receber outro valor depois? Se não, qual opção comunica melhor essa intenção: const ou let? Diga qual você escolheria no exemplo e por quê.`;
  }

  if (/funcao|function|return/.test(normalized)) {
    return `${introduction}Leia a função como uma pequena máquina: parâmetros são entradas, o corpo realiza a transformação e return entrega a saída. Qual desses três pontos ainda não está claro no exemplo atual? Escolha um e acompanho linha por linha com você.`;
  }

  if (/array|lista|map|filter|reduce/.test(normalized)) {
    return `${introduction}Comece identificando a coleção original e o resultado desejado. Você quer transformar cada item, selecionar alguns itens ou produzir um único resultado? Essa resposta aponta para map, filter ou reduce. Qual dessas três ações descreve seu problema?`;
  }

  if (/async|await|promise|fetch|api/.test(normalized)) {
    return `${introduction}Em código assíncrono, separe o valor futuro da etapa que depende dele. Qual operação demora para terminar e qual linha precisa esperar seu resultado? Marque essas duas linhas primeiro; depois verificamos juntos onde await faz sentido.`;
  }

  if (/react/.test(normalized)) {
    return `${introduction}No React, investigue três coisas: qual componente é responsável, quais dados ele recebe e qual estado muda com a interação. Em qual desses pontos está a sua dúvida?`;
  }

  if (/next/.test(normalized)) {
    return `${introduction}No Next.js, primeiro classifique o problema: rota, renderização, dados ou código de servidor. Qual dessas responsabilidades o trecho atual precisa cumprir?`;
  }

  if (/node/.test(normalized)) {
    return `${introduction}Acompanhe o fluxo request → validação → regra de negócio → response. Em qual etapa o valor recebido deixa de ser o esperado? Essa localização vem antes da correção.`;
  }

  if (/typescript|tipo/.test(normalized)) {
    return `${introduction}O tipo deve descrever o formato real do dado. Liste as propriedades que sempre existem, as opcionais e o resultado esperado. Qual parte do valor atual não corresponde a esse contrato?`;
  }

  if (/estudar|proximo|revisar/.test(normalized)) {
    return `Com ${xp} XP acumulado, seu melhor próximo passo é concluir uma explicação, tentar o exercício sem consultar a resposta e registrar onde seu raciocínio travou. Qual conceito você consegue explicar hoje sem olhar o exemplo?`;
  }

  return `${introduction}Vamos transformar sua dúvida em uma investigação. ${diagnostic} Não precisa acertar de primeira: escreva o que você acha que acontece e o motivo. A partir da sua tentativa, eu ofereço uma pista específica sem resolver por você.`;
}

export async function askMentor({ message, profile, progress, context }) {
  if (MENTOR_ONLINE_ENABLED && MENTOR_API_URL) {
    try {
      const safeProfile = {
        displayName: profile?.displayName,
        experienceLevel: profile?.experienceLevel,
        learningGoal: profile?.learningGoal,
        preferredCourseId: profile?.preferredCourseId,
      };
      const safeProgress = {
        xp: progress?.xp,
        streak: progress?.streak,
        completedLessons: progress?.completedLessons?.length || 0,
      };
      const safeContext = context
        ? {
            lessonTitle: context.lessonTitle,
            sectionTitle: context.sectionTitle,
            sectionBody: context.sectionBody,
            code: context.code,
            courseId: context.courseId,
          }
        : undefined;
      const response = await fetch(MENTOR_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          profile: safeProfile,
          progress: safeProgress,
          context: safeContext,
          teachingMode: 'socratic-tutor',
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.reply) return data.reply;
      }
    } catch {
      // A experiência continua funcionando com o tutor local.
    }
  }

  return localReply(message, profile, progress, context);
}
