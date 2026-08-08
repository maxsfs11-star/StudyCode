import { colors } from '../theme/tokens';

const typescriptFundamentalsLessons = [
  {
    id: 'typescript-primeiros-tipos',
    title: 'Por que TypeScript?',
    subtitle: 'Adicione clareza e seguranca ao JavaScript.',
    duration: '9 min',
    eyebrow: 'TYPESCRIPT · FUNDAMENTOS · AULA 1',
    pages: [
      {
        id: 'typescript-primeiros-tipos-conceito',
        label: 'Conceito',
        title: 'JavaScript com um contrato explicito',
        body: 'TypeScript adiciona tipos ao JavaScript e verifica muitos erros antes da aplicacao rodar. Ele ajuda o editor a sugerir propriedades e transforma o codigo em JavaScript para execucao.',
        analogy: { icon: '🧭', title: 'JavaScript', value: 'Liberdade para experimentar' },
        tip: 'TypeScript nao elimina bugs. Ele torna varias suposicoes visiveis enquanto voce escreve.',
      },
      {
        id: 'typescript-primeiros-tipos-codigo',
        label: 'Codigo explicado',
        title: 'Declarando tipos primitivos',
        body: 'Anote o tipo depois do nome usando dois-pontos. O valor precisa respeitar o contrato declarado.',
        code: "const name: string = 'StudyCode';\nlet lessonsDone: number = 0;\nconst isReady: boolean = true;",
        notes: [
          { token: 'string', text: 'representa texto' },
          { token: 'number', text: 'representa numeros inteiros ou decimais' },
          { token: 'boolean', text: 'representa true ou false' },
        ],
      },
    ],
    questions: [
      { id: 'typescript-primeiros-q1', prompt: 'O que o TypeScript acrescenta ao JavaScript?', options: ['Verificacao e anotacoes de tipos', 'Um novo navegador', 'Um banco de dados embutido'], answer: 0, explanation: 'TypeScript ajuda a detectar incompatibilidades antes da execucao.' },
      { id: 'typescript-primeiros-q2', prompt: 'Qual tipo representa texto?', options: ['string', 'number', 'boolean'], answer: 0, explanation: 'string descreve valores textuais.' },
      { id: 'typescript-primeiros-q3', prompt: 'O que boolean aceita?', options: ['true ou false', 'Apenas numeros', 'Qualquer objeto sem verificacao'], answer: 0, explanation: 'boolean representa uma decisao binaria.' },
    ],
  },
  {
    id: 'typescript-inferencia',
    title: 'Inferencia e unioes',
    subtitle: 'Deixe o compilador ajudar sem anotar tudo.',
    duration: '10 min',
    eyebrow: 'TYPESCRIPT · FUNDAMENTOS · AULA 2',
    pages: [
      {
        id: 'typescript-inferencia-conceito',
        label: 'Inferencia',
        title: 'O valor inicial ja comunica o tipo',
        body: 'Quando TypeScript consegue descobrir o tipo pelo valor, voce nao precisa repetir a anotacao. Isso reduz ruido e preserva a seguranca.',
        code: "const course = 'JavaScript'; // string\nlet score = 10;                 // number",
        tip: 'Anote explicitamente quando isso melhorar a leitura ou quando o valor ainda nao existir.',
      },
      {
        id: 'typescript-inferencia-uniao',
        label: 'Uniao',
        title: 'Um valor pode ter mais de uma forma',
        body: 'O operador | cria um tipo uniao. Ele e util quando uma informacao pode chegar como texto ou numero, mas ainda precisa ser tratada com cuidado.',
        code: "let courseId: string | number = 'javascript';\ncourseId = 7;",
        notes: [
          { token: '|', text: 'le-se ou: string ou number' },
          { token: 'courseId', text: 'continua limitado as formas declaradas' },
        ],
      },
    ],
    questions: [
      { id: 'typescript-inferencia-q1', prompt: 'O que e inferencia?', options: ['O compilador deduz o tipo pelo valor', 'O app escolhe uma cor', 'O servidor apaga o tipo'], answer: 0, explanation: 'TypeScript consegue deduzir muitos tipos automaticamente.' },
      { id: 'typescript-inferencia-q2', prompt: 'O que string | number significa?', options: ['Texto ou numero', 'Texto e numero ao mesmo tempo', 'Apenas boolean'], answer: 0, explanation: 'O operador | cria uma uniao de possibilidades.' },
      { id: 'typescript-inferencia-q3', prompt: 'Por que unioes exigem cuidado?', options: ['Cada forma pode precisar de um tratamento diferente', 'Porque elas removem todos os tipos', 'Porque so funcionam no CSS'], answer: 0, explanation: 'O codigo precisa considerar qual forma chegou.' },
    ],
  },
];

const typescriptModelingLessons = [
  {
    id: 'typescript-interfaces',
    title: 'Interfaces e objetos',
    subtitle: 'Modele os dados que circulam pela aplicacao.',
    duration: '12 min',
    eyebrow: 'TYPESCRIPT · MODELAGEM · AULA 1',
    pages: [
      {
        id: 'typescript-interfaces-codigo',
        label: 'Codigo explicado',
        title: 'Descreva um curso com interface',
        body: 'Uma interface registra quais propriedades um objeto deve ter e quais tipos cada propriedade aceita.',
        code: "interface Course {\n  id: string;\n  title: string;\n  lessons: number;\n  published?: boolean;\n}\n\nconst course: Course = {\n  id: 'javascript',\n  title: 'JavaScript',\n  lessons: 26,\n};",
        notes: [
          { token: 'interface Course', text: 'cria um contrato reutilizavel para objetos' },
          { token: 'published?', text: 'o ponto de interrogacao torna a propriedade opcional' },
          { token: ': Course', text: 'exige que o objeto respeite o contrato' },
        ],
      },
      {
        id: 'typescript-interfaces-readonly',
        label: 'Regra',
        title: 'Modele o que pode mudar',
        body: 'Use propriedades opcionais quando o dado realmente puder faltar. Para valores que nao devem ser alterados depois da criacao, readonly comunica a intencao.',
        code: "interface Profile {\n  readonly id: string;\n  displayName: string;\n}",
        tip: 'Tipos sao parte do design: eles explicam como o dado deve ser usado.',
      },
    ],
    questions: [
      { id: 'typescript-interfaces-q1', prompt: 'Para que serve uma interface?', options: ['Descrever o formato de um objeto', 'Executar uma requisicao HTTP', 'Estilizar um botao'], answer: 0, explanation: 'Interfaces criam contratos para estruturas de dados.' },
      { id: 'typescript-interfaces-q2', prompt: 'O que published? indica?', options: ['Propriedade opcional', 'Propriedade obrigatoria', 'Uma funcao assincrona'], answer: 0, explanation: 'O ponto de interrogacao indica que a propriedade pode faltar.' },
      { id: 'typescript-interfaces-q3', prompt: 'Quando readonly e util?', options: ['Quando o valor nao deve ser reatribuido', 'Quando tudo pode mudar', 'Quando precisamos de CSS'], answer: 0, explanation: 'readonly comunica uma regra de imutabilidade.' },
    ],
  },
  {
    id: 'typescript-funcoes',
    title: 'Funcoes tipadas',
    subtitle: 'Defina entradas e saidas previsiveis.',
    duration: '11 min',
    eyebrow: 'TYPESCRIPT · MODELAGEM · AULA 2',
    pages: [
      {
        id: 'typescript-funcoes-codigo',
        label: 'Codigo explicado',
        title: 'Tipando parametros e retorno',
        body: 'Anote os parametros e o tipo que a funcao devolve. Quem chamar a funcao recebe feedback se passar um valor incorreto.',
        code: "function addXp(current: number, bonus: number): number {\n  return current + bonus;\n}\n\nconst total = addXp(120, 20);",
        notes: [
          { token: 'current: number', text: 'exige que current seja um numero' },
          { token: '): number', text: 'informa que o retorno sera um numero' },
          { token: 'addXp(120, 20)', text: 'chama a funcao com dois argumentos validos' },
        ],
      },
      {
        id: 'typescript-funcoes-void',
        label: 'Retornos',
        title: 'Nem toda funcao devolve um valor',
        body: 'Funcoes que apenas executam uma acao podem retornar void. O tipo torna explicito que nao existe um resultado para continuar usando.',
        code: "function logLesson(title: string): void {\n  console.log(`Aula: ${title}`);\n}",
        tip: 'Retornos claros ajudam a evitar que uma funcao seja usada de um jeito inesperado.',
      },
    ],
    questions: [
      { id: 'typescript-funcoes-q1', prompt: 'Onde fica o tipo de retorno?', options: ['Depois dos parametros, apos dois-pontos', 'Antes do nome do arquivo', 'Dentro do CSS'], answer: 0, explanation: 'A anotacao de retorno aparece depois de ).' },
      { id: 'typescript-funcoes-q2', prompt: 'O que void comunica?', options: ['A funcao nao devolve um valor util', 'A funcao sempre devolve texto', 'A funcao e uma interface'], answer: 0, explanation: 'void descreve funcoes sem retorno significativo.' },
      { id: 'typescript-funcoes-q3', prompt: 'Qual chamada e valida para addXp?', options: ['addXp(120, 20)', 'addXp("120", true)', 'addXp()'], answer: 0, explanation: 'Os dois parametros esperam numeros obrigatorios.' },
    ],
  },
];

const typescriptAdvancedLessons = [
  {
    id: 'typescript-generics',
    title: 'Generics',
    subtitle: 'Reutilize logica preservando o tipo recebido.',
    duration: '12 min',
    eyebrow: 'TYPESCRIPT · AVANCADO · AULA 1',
    pages: [
      {
        id: 'typescript-generics-conceito',
        label: 'Conceito',
        title: 'Uma funcao pode trabalhar com varios tipos',
        body: 'Generics permitem criar uma regra reutilizavel sem trocar a seguranca dos tipos. O tipo e escolhido quando a funcao e usada.',
        code: "function first<T>(items: T[]): T {\n  return items[0];\n}\n\nconst firstCourse = first(['JavaScript', 'React']);\nconst firstScore = first([10, 20]);",
        notes: [
          { token: '<T>', text: 'representa um tipo generico ainda desconhecido' },
          { token: 'T[]', text: 'e uma lista de valores do mesmo tipo T' },
          { token: '): T', text: 'devolve um valor do mesmo tipo recebido' },
        ],
      },
      {
        id: 'typescript-generics-pratica',
        label: 'Aplicacao',
        title: 'Crie respostas tipadas para a API',
        body: 'Um tipo generico para resposta pode carregar dados de cursos, perfil ou progresso e manter uma estrutura comum.',
        code: "interface ApiResponse<T> {\n  data: T;\n  success: boolean;\n}\n\ntype CoursesResponse = ApiResponse<Course[]>;",
        tip: 'Generics ficam mais faceis quando voce primeiro domina interfaces e funcoes.',
      },
    ],
    questions: [
      { id: 'typescript-generics-q1', prompt: 'Qual e a vantagem de um generic?', options: ['Reutilizar logica mantendo os tipos', 'Remover toda verificacao', 'Criar apenas estilos'], answer: 0, explanation: 'Generics combinam flexibilidade com seguranca.' },
      { id: 'typescript-generics-q2', prompt: 'O que T representa?', options: ['Um tipo escolhido no uso', 'Uma cor fixa', 'Uma rota HTTP'], answer: 0, explanation: 'T e um parametro de tipo.' },
      { id: 'typescript-generics-q3', prompt: 'O que ApiResponse<Course[]> modela?', options: ['Uma resposta com uma lista de cursos', 'Um unico numero', 'Uma imagem'], answer: 0, explanation: 'O generic recebe Course[] como dados da resposta.' },
    ],
  },
];

const typescriptProjectLessons = [
  {
    id: 'typescript-projeto-api',
    title: 'Projeto: tipando a StudyCode API',
    subtitle: 'Aplique os tipos em um fluxo real de dados.',
    duration: '14 min',
    eyebrow: 'TYPESCRIPT · PROJETO FINAL · AULA 1',
    pages: [
      {
        id: 'typescript-projeto-modelos',
        label: 'Desafio',
        title: 'Comece pelos modelos compartilhados',
        body: 'Modele Course, Lesson, Profile e Progress. Depois use esses tipos nos handlers do Node.js e nos componentes que consomem a API.',
        code: "interface Progress {\n  courseId: string;\n  completedLessonIds: string[];\n  xp: number;\n}\n\nfunction completeLesson(progress: Progress, lessonId: string): Progress {\n  return { ...progress, completedLessonIds: [...progress.completedLessonIds, lessonId] };\n}",
        notes: [
          { token: 'Progress', text: 'descreve o formato do progresso salvo' },
          { token: 'string[]', text: 'representa uma lista de ids' },
          { token: 'Progress', text: 'garante que a funcao devolva o mesmo contrato' },
        ],
      },
      {
        id: 'typescript-projeto-checklist',
        label: 'Checklist',
        title: 'Use o compilador como parceiro',
        body: 'Rode o verificador de tipos, corrija propriedades ausentes e trate valores opcionais. O objetivo nao e lutar contra o TypeScript, e tornar as decisoes explicitas.',
        code: 'npx tsc --noEmit\n\n// verifica os tipos sem gerar arquivos .js',
        tip: 'Quando o erro parecer confuso, leia primeiro o tipo esperado e depois o valor que voce passou.',
      },
    ],
    questions: [
      { id: 'typescript-projeto-q1', prompt: 'Onde os tipos compartilhados ajudam?', options: ['No servidor e no cliente', 'Somente no logo', 'Apenas no terminal'], answer: 0, explanation: 'Os mesmos contratos reduzem desencontro entre API e interface.' },
      { id: 'typescript-projeto-q2', prompt: 'O que tsc --noEmit faz?', options: ['Verifica tipos sem gerar JavaScript', 'Publica o app automaticamente', 'Apaga o projeto'], answer: 0, explanation: 'E uma forma segura de conferir tipos no projeto.' },
      { id: 'typescript-projeto-q3', prompt: 'Qual e a melhor atitude diante de um erro de tipo?', options: ['Entender o esperado e ajustar o valor ou contrato', 'Usar any em tudo', 'Ignorar sempre'], answer: 0, explanation: 'O erro aponta uma decisao que precisa ficar clara.' },
    ],
  },
];

export const allTypescriptLessons = [
  ...typescriptFundamentalsLessons,
  ...typescriptModelingLessons,
  ...typescriptAdvancedLessons,
  ...typescriptProjectLessons,
];

export const typescriptModules = [
  { id: 'typescript-fundamentos', number: 1, title: 'Fundamentos do TypeScript', description: 'Tipos, inferencia e unioes', color: colors.primaryLight, lessons: typescriptFundamentalsLessons },
  { id: 'typescript-modelagem', number: 2, title: 'Modelagem e funcoes', description: 'Interfaces, objetos e retornos', color: colors.secondaryLight, lessons: typescriptModelingLessons, requiresModule: 'typescript-fundamentos' },
  { id: 'typescript-avancado', number: 3, title: 'Tipos avancados', description: 'Generics e respostas reutilizaveis', color: colors.success, lessons: typescriptAdvancedLessons, requiresModule: 'typescript-modelagem' },
  { id: 'typescript-projeto-final', number: 4, title: 'Projeto final: API tipada', description: 'Aplique tipos no StudyCode', color: colors.flame, lessons: typescriptProjectLessons, requiresModule: 'typescript-avancado' },
];
