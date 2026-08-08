const HARD_XP = 12;
const STANDARD_XP = 5;
const MIN_QUESTIONS = 8;

const curatedQuestions = {
  'js-variaveis': [
    {
      id: 'js-variaveis-input-const',
      type: 'input',
      label: 'COMPLETE O CÓDIGO',
      prompt: 'O nome do usuário não será reatribuído. Digite a palavra que completa o código.',
      code: "____ nomeUsuario = 'Max';",
      acceptedAnswers: ['const'],
      answerDisplay: 'const',
      explanation: 'const protege a referência contra uma nova atribuição e deve ser a escolha inicial quando o valor não precisa ser substituído.',
    },
    {
      id: 'js-variaveis-input-let',
      type: 'input',
      label: 'COMPLETE O CÓDIGO',
      prompt: 'O contador mudará durante a execução. Digite a declaração correta.',
      code: '____ pontos = 0;\npontos = pontos + 1;',
      acceptedAnswers: ['let'],
      answerDisplay: 'let',
      explanation: 'let permite reatribuir o valor. O contador começa em zero e depois recebe um novo resultado.',
    },
    {
      id: 'js-variaveis-semicolon',
      type: 'input',
      label: 'DETALHE DE SINTAXE',
      prompt: 'Qual símbolo encerra explicitamente esta instrução?',
      code: "const linguagem = 'JavaScript'____",
      acceptedAnswers: [';'],
      answerDisplay: ';',
      explanation: 'O ponto e vírgula encerra a instrução. Em vários casos o JavaScript consegue inseri-lo, mas escrevê-lo torna o limite mais explícito.',
    },
    {
      id: 'js-variaveis-find-error',
      type: 'choice',
      label: 'PROCURE O ERRO',
      prompt: 'Por que este código falha?',
      code: "const nivel = 1;\nnivel = 2;",
      options: ['const não permite reatribuir nivel', 'O número 2 precisa de aspas', 'Falta uma vírgula após nivel'],
      answer: 0,
      explanation: 'A segunda linha tenta reatribuir uma variável criada com const. Se o valor precisa mudar, use let.',
    },
    {
      id: 'js-variaveis-order',
      type: 'order',
      label: 'MONTE O CÓDIGO',
      prompt: 'Toque nos trechos na ordem correta para declarar e depois atualizar um contador.',
      items: ['pontos += 1;', 'let pontos = 0;', 'console.log(pontos);'],
      correctOrder: [1, 0, 2],
      explanation: 'Primeiro a variável precisa existir. Depois ela pode ser atualizada e, por fim, lida no console.',
    },
    {
      id: 'js-variaveis-quotes',
      type: 'input',
      label: 'ASPAS IMPORTAM',
      prompt: 'Digite apenas o valor que transforma JavaScript em uma string.',
      code: 'const curso = ____;',
      acceptedAnswers: ["'JavaScript'", '"JavaScript"', '`JavaScript`'],
      answerDisplay: "'JavaScript'",
      explanation: 'Textos precisam ser delimitados por aspas simples, duplas ou crases. Sem elas, JavaScript procuraria uma variável chamada JavaScript.',
    },
    {
      id: 'js-variaveis-hard',
      type: 'input',
      difficulty: 'hard',
      xp: HARD_XP,
      label: 'NÍVEL HARD',
      prompt: 'Digite exatamente o valor exibido no console depois das duas atualizações.',
      code: 'let pontos = 4;\npontos += 3;\npontos *= 2;\nconsole.log(pontos);',
      acceptedAnswers: ['14'],
      answerDisplay: '14',
      explanation: 'Primeiro 4 + 3 resulta em 7. Depois 7 × 2 resulta em 14. A ordem das linhas altera o resultado final.',
    },
  ],
  'js-operadores': [
    {
      id: 'js-operadores-plus-equals', type: 'input', label: 'COMPLETE O OPERADOR',
      prompt: 'Digite o operador que soma 5 ao valor já armazenado.', code: 'let total = 10;\ntotal ____ 5;',
      acceptedAnswers: ['+='], answerDisplay: '+=',
      explanation: '+= soma o valor da direita ao valor atual e salva o novo resultado na mesma variável.',
    },
    {
      id: 'js-operadores-strict', type: 'input', label: 'COMPARAÇÃO SEGURA',
      prompt: 'Digite o operador que compara valor e tipo.', code: "18 ____ '18'",
      acceptedAnswers: ['==='], answerDisplay: '===',
      explanation: '=== exige o mesmo valor e o mesmo tipo. number e string são diferentes.',
    },
    {
      id: 'js-operadores-precedence', type: 'choice', difficulty: 'hard', xp: HARD_XP, label: 'NÍVEL HARD',
      prompt: 'Sem executar: qual é o resultado?', code: 'const resultado = 2 + 3 * 4;',
      options: ['20', '14', '24'], answer: 1,
      explanation: 'A multiplicação acontece antes da soma: 3 × 4 = 12; depois 2 + 12 = 14.',
    },
    {
      id: 'js-operadores-order', type: 'order', label: 'ORGANIZE A LÓGICA',
      prompt: 'Monte a sequência que calcula o desconto antes de mostrar o preço final.',
      items: ['console.log(total);', 'const desconto = 10;', 'const total = 50 - desconto;'],
      correctOrder: [1, 2, 0],
      explanation: 'O desconto precisa existir antes do cálculo, e o total precisa ser calculado antes de ser exibido.',
    },
  ],
  'js-switch-ternario': [
    {
      id: 'js-ternario-question', type: 'input', label: 'MONTE O TERNÁRIO',
      prompt: 'Qual símbolo separa a condição do valor verdadeiro?', code: "const acesso = idade >= 18 ____ 'permitido' : 'negado';",
      acceptedAnswers: ['?'], answerDisplay: '?',
      explanation: 'No ternário, ? vem depois da condição e introduz o resultado usado quando ela é verdadeira.',
    },
    {
      id: 'js-ternario-colon', type: 'input', label: 'DETALHE DE SINTAXE',
      prompt: 'Qual símbolo separa o resultado verdadeiro do resultado falso?', code: "const acesso = ativo ? 'entrar' ____ 'bloquear';",
      acceptedAnswers: [':'], answerDisplay: ':',
      explanation: ': introduz a alternativa executada quando a condição é falsa.',
    },
    {
      id: 'js-ternario-hard', type: 'choice', difficulty: 'hard', xp: HARD_XP, label: 'NÍVEL HARD',
      prompt: 'Qual texto será armazenado em mensagem?', code: "const pontos = 80;\nconst mensagem = pontos >= 90 ? 'ouro' : pontos >= 70 ? 'prata' : 'bronze';",
      options: ['ouro', 'prata', 'bronze'], answer: 1,
      explanation: '80 não alcança 90, então o segundo teste é avaliado. Como 80 é maior ou igual a 70, o resultado é prata.',
    },
  ],
};

function normalizeQuestion(question, index, lessonId) {
  return {
    type: 'choice',
    difficulty: 'standard',
    xp: STANDARD_XP,
    label: 'DESAFIO',
    ...question,
    id: question.id ?? `${lessonId}-question-${index + 1}`,
  };
}

function createInputQuestions(lesson) {
  const questions = [];
  for (const page of lesson.pages ?? []) {
    if (!page.code || !page.notes?.length) continue;
    for (const note of page.notes) {
      if (!note.token || note.token.length > 24 || !page.code.includes(note.token)) continue;
      questions.push({
        id: `${lesson.id}-fill-${questions.length + 1}`,
        type: 'input',
        label: 'COMPLETE A LACUNA',
        prompt: `Digite o trecho que ${note.text}.`,
        code: page.code.replace(note.token, '____'),
        acceptedAnswers: [note.token],
        answerDisplay: note.token,
        explanation: `${note.token} ${note.text}. Observe também os símbolos ao redor para entender onde esse trecho pertence.`,
      });
      if (questions.length >= 3) return questions;
    }
  }
  return questions;
}

function createConceptQuestions(lesson) {
  return (lesson.pages ?? []).slice(0, 4).map((page, index, pages) => {
    const distractors = pages
      .filter((candidate) => candidate.id !== page.id)
      .map((candidate) => candidate.title)
      .slice(0, 2);
    while (distractors.length < 2) distractors.push(index ? 'Ignorar o contexto do código' : 'Decorar sem testar');
    return {
      id: `${lesson.id}-concept-${index + 1}`,
      type: 'choice',
      label: index === 3 ? 'PROCURE A IDEIA' : 'APLIQUE O CONCEITO',
      prompt: page.body ? `Qual opção melhor representa: ${page.body}` : `Qual ideia pertence à aula ${lesson.title}?`,
      options: [page.title, ...distractors],
      answer: 0,
      explanation: page.body || page.title,
    };
  });
}

export function buildInteractiveQuiz(lesson) {
  const original = (lesson.questions ?? []).map((question, index) =>
    normalizeQuestion(question, index, lesson.id),
  );
  const curated = (curatedQuestions[lesson.id] ?? []).map((question, index) =>
    normalizeQuestion(question, index, lesson.id),
  );
  const inputs = createInputQuestions(lesson).map((question, index) =>
    normalizeQuestion(question, index, lesson.id),
  );
  const concepts = createConceptQuestions(lesson).map((question, index) =>
    normalizeQuestion(question, index, lesson.id),
  );
  const combined = [...curated, ...original, ...inputs, ...concepts].filter(
    (question, index, list) => list.findIndex((candidate) => candidate.id === question.id) === index,
  );

  const pages = lesson.pages ?? [];
  while (combined.length < MIN_QUESTIONS && pages.length) {
    const index = combined.length;
    const page = pages[index % pages.length];
    combined.push(
      normalizeQuestion(
        {
          id: `${lesson.id}-reasoning-${index + 1}`,
          label: 'RACIOCÍNIO',
          prompt: `Em qual situação a ideia “${page.title}” ajuda no projeto?`,
          options: [
            page.body || page.title,
            'Quando queremos ignorar os dados e apenas copiar a sintaxe',
            'Somente quando o código já está pronto e não precisa ser entendido',
          ],
          answer: 0,
          explanation: page.body || page.title,
        },
        index,
        lesson.id,
      ),
    );
  }

  const finalQuestions = combined.slice(0, Math.min(10, combined.length));
  if (!finalQuestions.some((question) => question.difficulty === 'hard') && finalQuestions.length) {
    finalQuestions[finalQuestions.length - 1] = {
      ...finalQuestions[finalQuestions.length - 1],
      difficulty: 'hard',
      xp: HARD_XP,
      label: 'NÍVEL HARD',
    };
  }

  return finalQuestions;
}
