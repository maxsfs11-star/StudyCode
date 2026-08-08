const guidedPracticeByLesson = {
  'js-variaveis': [
    {
      id: 'variables-practice-const',
      label: 'Escolha certa',
      title: 'Qual declaração protege o nome do curso?',
      code: "___ curso = 'JavaScript';",
      options: ['let', 'const', 'value'],
      answer: 1,
      explanation: 'const é ideal porque o nome do curso não precisa receber outro valor durante esse exemplo.',
    },
    {
      id: 'variables-practice-let',
      label: 'Valor que muda',
      title: 'Qual palavra usamos para um contador?',
      code: '___ aulasConcluidas = 0;\naulasConcluidas = 1;',
      options: ['const', 'let', 'string'],
      answer: 1,
      explanation: 'aulasConcluidas muda de 0 para 1, então let é a escolha correta.',
    },
    {
      id: 'variables-practice-output',
      label: 'Leia o código',
      title: 'O que aparece no console?',
      code: 'let nivel = 1;\nnivel = 2;\nconsole.log(nivel);',
      options: ['1', '2', 'nivel'],
      answer: 1,
      explanation: 'A segunda atribuição substitui 1 por 2 antes de console.log ser executado.',
    },
  ],
  'js-tipos': [
    {
      id: 'types-practice-string',
      label: 'Tipo do valor',
      title: 'Qual valor é um número de verdade?',
      code: "const idade = ___;",
      options: ["'25'", '25', "'vinte e cinco'"],
      answer: 1,
      explanation: '25 sem aspas é number. Com aspas, ele seria uma string, ou seja, texto.',
    },
    {
      id: 'types-practice-boolean',
      label: 'Sim ou não',
      title: 'Qual valor representa uma tarefa concluída?',
      code: 'const tarefaConcluida = ___;',
      options: ["'true'", 'true', '1'],
      answer: 1,
      explanation: 'true sem aspas é um booleano. Ele representa um estado verdadeiro.',
    },
    {
      id: 'types-practice-typeof',
      label: 'Investigue',
      title: 'Qual será o resultado?',
      code: "const preco = '29.90';\nconsole.log(typeof preco);",
      options: ['number', 'string', 'boolean'],
      answer: 1,
      explanation: 'Como 29.90 está entre aspas, JavaScript trata o valor como texto: string.',
    },
  ],
};

function createNotePractice(lesson) {
  const pagesWithNotes = lesson.pages.filter(
    (page) => page.code && page.notes?.length,
  );
  const availableTokens = pagesWithNotes.flatMap((page) =>
    page.notes.map((note) => note.token),
  );

  return pagesWithNotes.slice(0, 2).map((page, index) => {
    const note = page.notes[index % page.notes.length];
    const distractors = availableTokens
      .filter((token) => token !== note.token)
      .slice(index, index + 2);
    while (distractors.length < 2) {
      distractors.push(distractors.length ? 'todo o bloco' : 'nenhuma opção');
    }
    const answer = index % 3;
    const options = [...distractors];
    options.splice(answer, 0, note.token);

    return {
      id: `${lesson.id}-note-${index}`,
      label: page.label || 'Leia o código',
      title: `Qual trecho ${note.text}?`,
      code: page.code,
      options,
      answer,
      explanation: `${note.token} ${note.text}. Volte ao exemplo e localize esse trecho antes de avançar.`,
    };
  });
}

function createQuestionPractice(lesson, amount, offset = 0) {
  return (lesson.questions ?? []).slice(offset, offset + amount).map((question, index) => ({
    id: `${lesson.id}-review-${offset + index}`,
    label: 'Revisão assistida',
    title: question.prompt,
    code: question.prompt.includes('\n')
      ? question.prompt.split('\n').slice(1).join('\n').trim()
      : `// Pense no conceito principal de: ${lesson.title}`,
    options: question.options,
    answer: question.answer,
    explanation: question.explanation,
  }));
}

function createAutomaticPractice(lesson) {
  const notePractice = createNotePractice(lesson);
  const missing = Math.max(0, 5 - notePractice.length);
  return [
    ...notePractice,
    ...createQuestionPractice(lesson, missing, notePractice.length),
  ].slice(0, 5);
}

export function getGuidedPractice(lesson) {
  if (!lesson) return [];
  const curatedPractice = guidedPracticeByLesson[lesson.id] ?? [];
  const automaticPractice = createAutomaticPractice(lesson);
  const combined = [...curatedPractice, ...automaticPractice].filter(
    (practice, index, practices) =>
      practices.findIndex((candidate) => candidate.id === practice.id) === index,
  );

  return combined.slice(0, 5);
}
