export const TEACHING_METHODOLOGY_VERSION = 2;

export const REQUIRED_LESSON_SECTIONS = [
  'introducao',
  'o-que-e',
  'para-que-serve',
  'por-que-existe',
  'problema-resolvido',
  'historia',
  'sintaxe',
  'simbolo-por-simbolo',
  'linha-por-linha',
  'exemplo-simples',
  'exemplo-intermediario',
  'exemplo-profissional',
  'casos-reais',
  'quando-usar',
  'quando-nao-usar',
  'erros-comuns',
  'curiosidade',
  'resumo',
  'exercicio',
  'desafio',
  'mini-projeto',
  'proximo-assunto',
];

const courseProfiles = [
  {
    test: /^html-/,
    name: 'HTML',
    history: 'O HTML nasceu para estruturar e conectar documentos na web. Com o tempo, ganhou elementos semânticos que descrevem melhor o papel de cada conteúdo para navegadores, buscadores e tecnologias assistivas.',
    simpleCode: '<h1>Meu primeiro conteúdo</h1>',
    realContext: 'páginas institucionais, formulários, lojas, blogs e interfaces acessíveis',
  },
  {
    test: /^css-/,
    name: 'CSS',
    history: 'O CSS surgiu para separar a estrutura do documento de sua apresentação. Essa separação tornou possível manter layouts maiores sem repetir estilos em cada elemento HTML.',
    simpleCode: '.card {\n  color: #082A43;\n}',
    realContext: 'design systems, layouts responsivos, animações e identidade visual de produtos',
  },
  {
    test: /^react-/,
    name: 'React',
    history: 'O React foi criado para tornar interfaces complexas mais previsíveis por meio de componentes e atualizações declarativas. A interface passa a refletir o estado atual dos dados.',
    simpleCode: 'function Saudacao() {\n  return <Text>Olá!</Text>;\n}',
    realContext: 'aplicativos, dashboards, formulários, lojas e produtos com muitas interações',
  },
  {
    test: /^next-/,
    name: 'Next.js',
    history: 'O Next.js organizou convenções comuns de aplicações React, como rotas, renderização, carregamento de dados e código de servidor, reduzindo decisões repetitivas de configuração.',
    simpleCode: 'export default function Page() {\n  return <main>StudyCode</main>;\n}',
    realContext: 'sites de conteúdo, produtos SaaS, lojas, painéis e aplicações React completas',
  },
  {
    test: /^node-/,
    name: 'Node.js',
    history: 'O Node.js levou o motor JavaScript para fora do navegador. Isso permitiu usar a mesma linguagem em servidores, automações, ferramentas de terminal e APIs.',
    simpleCode: "console.log('Servidor iniciado');",
    realContext: 'APIs, autenticação, filas, automações, integrações e serviços de backend',
  },
  {
    test: /^typescript-/,
    name: 'TypeScript',
    history: 'O TypeScript foi criado para adicionar verificação estática ao JavaScript e tornar bases de código grandes mais seguras de compreender, alterar e refatorar.',
    simpleCode: "const curso: string = 'JavaScript';",
    realContext: 'aplicações mantidas por equipes, bibliotecas, APIs e projetos JavaScript de longa duração',
  },
  {
    test: /^js-/,
    name: 'JavaScript',
    history: 'O JavaScript surgiu para adicionar comportamento às páginas. Evoluiu de pequenos scripts no navegador para uma linguagem usada em interfaces, servidores, ferramentas e aplicativos.',
    simpleCode: "const mensagem = 'Olá, StudyCode';\nconsole.log(mensagem);",
    realContext: 'interfaces, validações, jogos, APIs, automações e aplicativos completos',
  },
];

const conceptGuides = [
  {
    test: /vari[aá]ve|const|\blet\b/i,
    definition: 'Uma variável é um nome associado a um valor que o programa precisa guardar, consultar ou atualizar.',
    purpose: 'Dar significado aos dados e permitir que o programa reutilize informações sem repetir valores soltos.',
    problem: 'Sem variáveis, cada valor ficaria espalhado pelo código, dificultando leitura, alteração e acompanhamento do estado do programa.',
    useWhen: 'Use const como primeira escolha e let somente quando a mesma variável realmente precisar receber outro valor.',
    avoidWhen: 'Não use nomes genéricos nem let por hábito. Evite var em código moderno quando const e let comunicarem melhor a intenção.',
    errors: 'Confundir alteração do conteúdo de um objeto com reatribuição; declarar novamente uma variável; trocar a grafia do identificador; usar antes da inicialização.',
  },
  {
    test: /fun[cç][aã]o|function|return|arrow/i,
    definition: 'Uma função é uma unidade reutilizável de comportamento: recebe dados, executa uma responsabilidade e pode devolver um resultado.',
    purpose: 'Evitar repetição, nomear regras do programa e dividir problemas grandes em partes testáveis.',
    problem: 'Sem funções, regras se repetem e pequenas mudanças precisam ser feitas em muitos lugares.',
    useWhen: 'Use quando uma tarefa possui uma responsabilidade clara, precisa ser repetida ou merece um nome que explique sua intenção.',
    avoidWhen: 'Não crie funções enormes com várias responsabilidades nem abstraia uma linha apenas para parecer sofisticado.',
    errors: 'Esquecer return; confundir parâmetro com argumento; executar a função antes de possuir os dados; depender de variáveis externas sem necessidade.',
  },
  {
    test: /array|lista|map|filter|reduce/i,
    definition: 'Um array organiza uma sequência ordenada de valores. Métodos como map, filter e reduce permitem transformar, selecionar e combinar esses valores.',
    purpose: 'Representar colecoes e processar varios itens de forma consistente.',
    problem: 'Tratar cada item em uma variável separada torna o código repetitivo e impossível de escalar.',
    useWhen: 'Use arrays quando a ordem e a colecao importam. Escolha map para transformar, filter para selecionar e reduce para acumular.',
    avoidWhen: 'Não use map apenas para efeitos colaterais e não escolha reduce quando uma operação mais direta comunicar melhor a intenção.',
    errors: 'Confundir índice com valor; alterar a coleção sem perceber; esquecer o return em callbacks; acessar uma posição inexistente.',
  },
  {
    test: /async|await|promise|fetch|api/i,
    definition: 'Programação assíncrona coordena tarefas cujo resultado chega depois, como rede, arquivos e temporizadores.',
    purpose: 'Permitir que o aplicativo continue responsivo enquanto espera uma operação externa terminar.',
    problem: 'Uma espera bloqueante congelaria o fluxo principal e impediria outras tarefas de continuar.',
    useWhen: 'Use em operações de entrada e saída e trate explicitamente carregamento, sucesso, ausência de dados e erro.',
    avoidWhen: 'Não use await sem compreender a Promise recebida e não ignore falhas de rede ou respostas HTTP inválidas.',
    errors: 'Esquecer await; não tratar rejeições; assumir que fetch rejeita qualquer status de erro; misturar sequências dependentes e paralelas.',
  },
  {
    test: /condi[cç]|if|else|switch|operador|compara/i,
    definition: 'Uma decisão permite que o programa escolha um caminho a partir de uma expressão que resulta em verdadeiro ou falso.',
    purpose: 'Representar regras reais, permissões, validações e diferentes estados da aplicação.',
    problem: 'Sem decisoes, o programa executaria sempre o mesmo caminho, independentemente dos dados recebidos.',
    useWhen: 'Use a estrutura mais simples que expresse a regra e prefira comparações explícitas e nomes booleanos claros.',
    avoidWhen: 'Evite condicionais profundamente aninhadas e comparações coercivas quando a conversão de tipo não for intencional.',
    errors: 'Confundir atribuição com comparação; inverter a condição; usar valores de tipos diferentes; esquecer casos de fronteira.',
  },
];

const lessonCache = new WeakMap();

function getCourseProfile(lesson) {
  return courseProfiles.find((profile) => profile.test.test(lesson.id)) ?? courseProfiles.at(-1);
}

function getConceptGuide(lesson) {
  const searchable = `${lesson.title} ${lesson.subtitle ?? ''}`;
  return conceptGuides.find((guide) => guide.test.test(searchable)) ?? {
    definition: `${lesson.title} é um conceito de ${getCourseProfile(lesson).name} que organiza uma responsabilidade específica dentro do programa.`,
    purpose: `Permitir que o desenvolvedor resolva o problema apresentado nesta aula com uma intenção clara e um código que outras pessoas consigam manter.`,
    problem: `Sem esse recurso, a solução tende a ficar mais repetitiva, ambígua ou difícil de evoluir em projetos reais.`,
    useWhen: `Use quando o problema do projeto corresponder ao objetivo estudado e a escolha deixar o código mais claro.`,
    avoidWhen: `Não utilize apenas porque a sintaxe existe. Primeiro confirme se ela simplifica o problema e se a equipe compreenderá a decisão.`,
    errors: `Copiar a sintaxe sem acompanhar os dados; ignorar casos de erro; escolher nomes pouco claros; testar apenas o caminho de sucesso.`,
  };
}

function findCodePages(lesson) {
  return lesson.pages.filter((page) => page.code || page.practicalExample?.code);
}

function codeFrom(page, fallback) {
  return page?.code ?? page?.practicalExample?.code ?? fallback;
}

function explainLine(line) {
  const value = line.trim();
  if (!value) return 'Separa etapas do codigo para facilitar a leitura.';
  if (/^(const|let|var)\b/.test(value)) return 'Declara um nome e associa a ele o valor produzido do lado direito.';
  if (/^(async\s+)?function\b/.test(value)) return 'Inicia a declaracao de uma funcao e define a tarefa que ela representa.';
  if (/^return\b/.test(value)) return 'Encerra a funcao e devolve um resultado para quem fez a chamada.';
  if (/^if\b/.test(value)) return 'Avalia uma condicao e executa o bloco somente quando o resultado for verdadeiro.';
  if (/^else\b/.test(value)) return 'Define o caminho alternativo quando a condicao anterior nao for atendida.';
  if (/await\b/.test(value)) return 'Espera a Promise desta etapa terminar antes de continuar dentro da funcao assincrona.';
  if (/console\.log/.test(value)) return 'Exibe o valor atual para que possamos observar e investigar o comportamento.';
  if (/^<\/?[a-z]/i.test(value)) return 'Declara um elemento da estrutura e delimita o conteudo relacionado a ele.';
  if (/[{}]$/.test(value)) return 'Abre ou fecha um bloco que agrupa instrucoes pertencentes ao mesmo contexto.';
  return 'Executa uma etapa da solucao. Leia da direita para a esquerda para acompanhar o valor produzido e onde ele sera usado.';
}

function symbolNotes(code, existingNotes = []) {
  if (existingNotes.length) return existingNotes;
  const symbols = [
    [';', 'encerra uma instrucao; em muitos contextos e opcional, mas ajuda a tornar o limite explicito'],
    ['=', 'atribui o valor da direita ao nome da esquerda'],
    ['()', 'agrupam parametros, argumentos ou uma expressao que precisa ser avaliada'],
    ['{}', 'delimitam um bloco de codigo ou a estrutura de um objeto'],
    ['[]', 'representam uma lista ou o acesso a uma posicao'],
    ['.', 'acessa uma propriedade ou metodo de um valor'],
    [',', 'separa itens, argumentos ou propriedades'],
    ['=>', 'separa os parametros do corpo de uma arrow function'],
  ];
  const matches = symbols.filter(([symbol]) => {
    if (symbol === '()') return code.includes('(') || code.includes(')');
    if (symbol === '{}') return code.includes('{') || code.includes('}');
    if (symbol === '[]') return code.includes('[') || code.includes(']');
    return code.includes(symbol);
  });
  return (matches.length ? matches : symbols.slice(0, 4)).map(([token, text]) => ({ token, text }));
}

function buildQuestions(lesson, guide) {
  const original = (lesson.questions ?? []).map((question, index) => ({
    ...question,
    id: question.id ?? `${lesson.id}-concept-${index + 1}`,
    prompt: `Analise antes de responder: ${question.prompt}`,
    explanation: `${question.explanation} Agora justifique a escolha relacionando entrada, transformação e resultado.`,
    skill: 'interpretacao-e-raciocinio',
  }));
  const additions = [
    {
      id: `${lesson.id}-reasoning-use`,
      prompt: `Em qual situacao faz mais sentido aplicar ${lesson.title}?`,
      options: ['Sempre, mesmo sem necessidade', guide.useWhen, 'Somente para deixar o codigo maior'],
      answer: 1,
      explanation: `A decisao deve partir do problema. ${guide.useWhen}`,
    },
    {
      id: `${lesson.id}-reasoning-debug`,
      prompt: 'Ao encontrar um erro neste conceito, qual deve ser o primeiro passo?',
      options: ['Copiar outra solucao sem ler', 'Apagar todo o projeto', 'Identificar entrada, transformacao e resultado esperado'],
      answer: 2,
      explanation: 'Investigar o fluxo dos dados revela em qual etapa o comportamento deixou de ser o esperado.',
    },
  ];
  return [...original, ...additions];
}

function buildPages(lesson) {
  const profile = getCourseProfile(lesson);
  const guide = getConceptGuide(lesson);
  const original = lesson.pages ?? [];
  const codePages = findCodePages(lesson);
  const firstPage = original[0] ?? {};
  const simplePage = codePages[0] ?? firstPage;
  const intermediatePage = codePages[1] ?? simplePage;
  const professionalPage = [...codePages].reverse()[0] ?? simplePage;
  const simpleCode = codeFrom(simplePage, profile.simpleCode);
  const intermediateCode = codeFrom(intermediatePage, simpleCode);
  const professionalCode = codeFrom(professionalPage, intermediateCode);
  const notes = symbolNotes(simpleCode, simplePage.notes);
  const lineNotes = simpleCode
    .split('\n')
    .filter((line) => line.trim())
    .slice(0, 8)
    .map((line, index) => ({ token: `Linha ${index + 1}`, text: explainLine(line) }));
  const practical = professionalPage.practicalExample ?? simplePage.practicalExample;
  const originalDeepDives = original.map((page, index) => ({
    ...page,
    id: `${lesson.id}-metodo-aprofundamento-${index + 1}`,
    section: 'aprofundamento',
    covers: ['aprofundamento'],
    label: `Aprofundamento ${index + 1}`,
    title: page.title ?? `Observe a etapa ${index + 1}`,
    body: page.body ?? 'Analise esta etapa e relacione cada escolha ao problema que ela resolve.',
  }));

  return [
    {
      id: `${lesson.id}-metodo-introducao`,
      section: 'introducao',
      covers: ['introducao'],
      label: 'Introducao e objetivo',
      title: lesson.title,
      body: `${lesson.subtitle ?? ''} Você vai entender a ideia, acompanhar o fluxo dos dados e aplicá-la em uma pequena construção.`,
      analogy: firstPage.analogy,
      tip: 'Ao ler um codigo, pergunte sempre: o que entra, o que acontece e o que sai?',
    },
    {
      id: `${lesson.id}-metodo-conceito`,
      section: 'o-que-e',
      covers: ['o-que-e'],
      label: 'O que é?',
      title: 'Construa primeiro o modelo mental',
      body: `${guide.definition} ${firstPage.body ?? ''}`,
      analogy: firstPage.analogy,
    },
    {
      id: `${lesson.id}-metodo-finalidade`,
      section: 'para-que-serve',
      covers: ['para-que-serve', 'problema-resolvido'],
      label: 'Finalidade',
      title: 'Para que serve e qual problema resolve?',
      body: `${guide.purpose} ${guide.problem}`,
      practicalExample: practical,
    },
    {
      id: `${lesson.id}-metodo-historia`,
      section: 'historia',
      covers: ['por-que-existe', 'historia'],
      label: 'Por que existe?',
      title: 'O problema veio antes da ferramenta',
      body: `${profile.history} Nesta aula, o ponto importante não é decorar uma palavra, mas reconhecer a necessidade que levou desenvolvedores a utilizar ${lesson.title.toLowerCase()}.`,
      tip: `Contexto histórico ajuda a entender por que ${profile.name} funciona desta maneira hoje.`,
    },
    {
      id: `${lesson.id}-metodo-sintaxe`,
      section: 'sintaxe',
      covers: ['sintaxe', 'simbolo-por-simbolo'],
      label: 'Sintaxe',
      title: 'Leia a estrutura antes de executar',
      body: 'Sintaxe é a forma de escrever uma instrução para que a linguagem consiga interpretá-la. Observe os nomes, os delimitadores e a ordem das partes antes de tentar memorizar.',
      code: simpleCode,
      notes,
    },
    ...originalDeepDives,
    {
      id: `${lesson.id}-metodo-linhas`,
      section: 'linha-por-linha',
      covers: ['linha-por-linha'],
      label: 'Linha por linha',
      title: 'Acompanhe o caminho dos dados',
      body: 'Agora percorra o exemplo na ordem em que o ambiente o interpreta. Cada linha prepara um valor, toma uma decisão ou produz um efeito observável.',
      code: simpleCode,
      notes: lineNotes,
      tip: 'Use valores pequenos e previsiveis enquanto aprende. Isso facilita conferir mentalmente o resultado.',
    },
    {
      id: `${lesson.id}-metodo-exemplo-simples`,
      section: 'exemplo-simples',
      covers: ['exemplo-simples'],
      label: 'Exemplo simples',
      title: 'Isole apenas o conceito principal',
      body: simplePage.body ?? guide.definition,
      code: simpleCode,
      practicalExample: simplePage.practicalExample,
    },
    {
      id: `${lesson.id}-metodo-exemplo-intermediario`,
      section: 'exemplo-intermediario',
      covers: ['exemplo-intermediario'],
      label: 'Exemplo intermediario',
      title: 'Combine a ideia com dados que mudam',
      body: intermediatePage.body ?? `O segundo exemplo adiciona contexto e mostra como ${lesson.title.toLowerCase()} participa de mais de uma etapa da solução.`,
      code: intermediateCode,
      notes: intermediatePage.notes,
      practicalExample: intermediatePage.practicalExample,
    },
    {
      id: `${lesson.id}-metodo-exemplo-profissional`,
      section: 'exemplo-profissional',
      covers: ['exemplo-profissional', 'casos-reais'],
      label: 'Em um projeto real',
      title: 'Da sintaxe para uma responsabilidade do produto',
      body: `Em projetos profissionais, este conceito aparece em ${profile.realContext}. O código precisa comunicar a regra, tratar entradas inesperadas e continuar compreensível para a próxima pessoa que fizer manutenção.`,
      code: professionalCode,
      practicalExample: practical,
    },
    {
      id: `${lesson.id}-metodo-decisoes`,
      section: 'quando-usar',
      covers: ['quando-usar', 'quando-nao-usar'],
      label: 'Decisoes tecnicas',
      title: 'Quando usar e quando nao usar',
      body: `${guide.useWhen} ${guide.avoidWhen}`,
      notes: [
        { token: 'Use', text: guide.useWhen },
        { token: 'Evite', text: guide.avoidWhen },
      ],
    },
    {
      id: `${lesson.id}-metodo-erros`,
      section: 'erros-comuns',
      covers: ['erros-comuns'],
      label: 'Erros comuns',
      title: 'Erros sao pistas sobre o modelo mental',
      body: guide.errors,
      tip: simplePage.tip ?? 'Mude uma coisa por vez, execute novamente e compare o resultado esperado com o resultado real.',
    },
    {
      id: `${lesson.id}-metodo-resumo`,
      section: 'resumo',
      covers: ['curiosidade', 'resumo'],
      label: 'Curiosidade e resumo',
      title: 'O que voce precisa levar desta aula',
      body: `${profile.history.split('.')[0]}. Em resumo: ${guide.definition} ${guide.purpose}`,
      analogy: { icon: '✓', title: 'Checklist mental', value: 'Problema → escolha → sintaxe → resultado → revisao' },
      tip: `Explique ${lesson.title.toLowerCase()} com suas proprias palavras. Se conseguir justificar quando usar e quando evitar, voce compreendeu o conceito.`,
    },
    {
      id: `${lesson.id}-metodo-mini-projeto`,
      section: 'mini-projeto',
      covers: ['exercicio', 'desafio', 'mini-projeto'],
      label: 'Mini projeto',
      title: `Construa: ${lesson.title}`,
      body: `Crie uma pequena funcionalidade relacionada a ${profile.realContext}. Primeiro escreva o resultado esperado em uma frase. Depois defina os dados de entrada, implemente a menor versão funcional, teste um caso normal e um caso de erro. Por fim, explique por que escolheu cada parte da solução.`,
      code: `// 1. Defina a entrada\n// 2. Aplique ${lesson.title}\n// 3. Mostre o resultado\n// 4. Teste um caso inesperado`,
      notes: [
        { token: 'Planejar', text: 'descreva o problema antes de escrever código' },
        { token: 'Construir', text: 'implemente uma etapa pequena por vez' },
        { token: 'Testar', text: 'compare o resultado real com o esperado' },
        { token: 'Explicar', text: 'registre o motivo das principais decisões' },
      ],
      tip: 'O objetivo não é copiar o exemplo da aula. Mude os nomes, os dados e o contexto para provar que entendeu.',
    },
    {
      id: `${lesson.id}-metodo-proximo`,
      section: 'proximo-assunto',
      covers: ['proximo-assunto'],
      label: 'Conexao',
      title: 'Leve este conhecimento para a proxima aula',
      body: `O próximo conceito será mais fácil se você lembrar do fluxo estudado aqui. Antes de avançar, responda: qual problema ${lesson.title.toLowerCase()} resolve, qual dado entra e qual resultado deve sair?`,
      analogy: { icon: '→', title: 'Conhecimento conectado', value: 'A nova aula reutiliza o que voce acabou de compreender' },
    },
  ];
}

export function enrichLesson(lesson) {
  if (!lesson) return lesson;
  if (lesson.methodologyVersion === TEACHING_METHODOLOGY_VERSION) return lesson;
  const cached = lessonCache.get(lesson);
  if (cached) return cached;
  const guide = getConceptGuide(lesson);
  const enriched = {
    ...lesson,
    methodologyVersion: TEACHING_METHODOLOGY_VERSION,
    originalPages: lesson.pages,
    pages: buildPages(lesson),
    questions: buildQuestions(lesson, guide),
    learningObjectives: [
      `Explicar o que e ${lesson.title} sem depender da sintaxe.`,
      'Justificar quando usar e quando evitar o recurso.',
      'Ler o exemplo linha por linha e prever o resultado.',
      'Aplicar o conceito em um problema diferente do exemplo.',
    ],
    quality: {
      requiredSections: REQUIRED_LESSON_SECTIONS,
      originalContentPreserved: true,
      emphasizesReasoning: true,
      includesMiniProject: true,
    },
  };
  lessonCache.set(lesson, enriched);
  return enriched;
}

export function auditLessonQuality(lesson) {
  const enriched = enrichLesson(lesson);
  const represented = new Set(
    enriched.pages.flatMap((page) => [page.section, ...(page.covers ?? [])]),
  );
  return {
    lessonId: lesson.id,
    methodologyVersion: enriched.methodologyVersion,
    missingSections: REQUIRED_LESSON_SECTIONS.filter((section) => !represented.has(section)),
    questionCount: enriched.questions.length,
    pageCount: enriched.pages.length,
    passes:
      enriched.questions.length >= 5 &&
      enriched.pages.length >= 12 &&
      REQUIRED_LESSON_SECTIONS.every((section) => represented.has(section)),
  };
}
