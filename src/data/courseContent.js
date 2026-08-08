import { colors } from '../theme/tokens';
import { allNextLessons, nextModules } from './nextContent';
import { allNodeLessons, nodeModules } from './nodeContent';
import { allTypescriptLessons, typescriptModules } from './typescriptContent';
import { allHtmlLessons, htmlModules } from './htmlContent';
import { allCssLessons, cssModules } from './cssContent';
import { enrichLesson } from './teachingMethodology';

export { allNextLessons, nextModules } from './nextContent';
export { allNodeLessons, nodeModules } from './nodeContent';
export { allTypescriptLessons, typescriptModules } from './typescriptContent';
export { allHtmlLessons, htmlModules } from './htmlContent';
export { allCssLessons, cssModules } from './cssContent';

export const scoringRules = {
  correct: 5,
  wrong: -2,
  completion: 10,
  perfect: 10,
};

export const courses = [
  {
    id: 'html',
    shortName: 'HTML',
    title: 'HTML',
    description: 'Comece pela estrutura e semantica da web.',
    color: colors.flame,
    textColor: colors.white,
    status: 'available',
    modules: 5,
    track: 'base-web',
  },
  {
    id: 'css',
    shortName: 'CSS',
    title: 'CSS',
    description: 'Transforme estrutura em interfaces responsivas.',
    color: colors.info,
    textColor: colors.ink,
    status: 'available',
    modules: 6,
    track: 'base-web',
  },
  {
    id: 'javascript',
    shortName: 'JS',
    title: 'JavaScript',
    description: 'Aprenda a linguagem que dá vida à web.',
    color: colors.gold,
    textColor: colors.ink,
    status: 'available',
    modules: 8,
    track: 'web',
  },
  {
    id: 'react',
    shortName: '⚛',
    title: 'React',
    description: 'Crie interfaces modernas com componentes.',
    color: colors.primaryLight,
    textColor: colors.ink,
    status: 'available',
    modules: 1,
    track: 'web',
  },
  {
    id: 'nextjs',
    shortName: 'N',
    title: 'Next.js',
    description: 'Construa aplicações React completas.',
    color: colors.text,
    textColor: colors.ink,
    status: 'available',
    modules: 4,
    track: 'web',
  },
  {
    id: 'nodejs',
    shortName: '⬡',
    title: 'Node.js',
    description: 'Leve o JavaScript para o servidor.',
    color: colors.success,
    textColor: colors.ink,
    status: 'available',
    modules: 4,
    track: 'backend',
  },
  {
    id: 'typescript',
    shortName: 'TS',
    title: 'TypeScript',
    description: 'Escreva JavaScript com mais segurança.',
    color: colors.primary,
    textColor: colors.white,
    status: 'available',
    modules: 4,
    track: 'web',
  },
  {
    id: 'python',
    shortName: 'PY',
    title: 'Python',
    description: 'Uma linguagem versatil para aprender logica.',
    color: colors.gold,
    textColor: colors.ink,
    status: 'coming',
    track: 'general',
  },
  {
    id: 'java',
    shortName: 'JV',
    title: 'Java',
    description: 'Programacao orientada a objetos e backend.',
    color: colors.error,
    textColor: colors.white,
    status: 'coming',
    track: 'general',
  },
  {
    id: 'csharp',
    shortName: 'C#',
    title: 'C#',
    description: 'Aplicacoes, jogos e ecossistema .NET.',
    color: colors.secondaryLight,
    textColor: colors.white,
    status: 'coming',
    track: 'general',
  },
  {
    id: 'cpp',
    shortName: 'C++',
    title: 'C++',
    description: 'Performance, memoria e sistemas.',
    color: colors.primary,
    textColor: colors.white,
    status: 'coming',
    track: 'general',
  },
  {
    id: 'c',
    shortName: 'C',
    title: 'C',
    description: 'A base para entender como computadores funcionam.',
    color: colors.textSecondary,
    textColor: colors.ink,
    status: 'coming',
    track: 'general',
  },
  {
    id: 'sql',
    shortName: 'SQL',
    title: 'SQL',
    description: 'Consulte e organize dados de aplicacoes.',
    color: colors.success,
    textColor: colors.ink,
    status: 'coming',
    track: 'data',
  },
  {
    id: 'vscode',
    shortName: 'VS',
    title: 'VS Code',
    description: 'Configure seu ambiente e trabalhe com produtividade.',
    color: colors.info,
    textColor: colors.ink,
    status: 'coming',
    track: 'tools',
  },
  {
    id: 'sublime',
    shortName: 'ST',
    title: 'Sublime Text',
    description: 'Domine um editor leve, rápido e personalizável.',
    color: colors.flame,
    textColor: colors.white,
    status: 'coming',
    track: 'tools',
  },
  {
    id: 'git',
    shortName: 'GIT',
    title: 'Git',
    description: 'Controle versões e trabalhe sem medo de evoluir o código.',
    color: colors.error,
    textColor: colors.white,
    status: 'coming',
    track: 'tools',
  },
  {
    id: 'github',
    shortName: 'GH',
    title: 'GitHub',
    description: 'Compartilhe projetos e colabore de forma profissional.',
    color: colors.text,
    textColor: colors.white,
    status: 'coming',
    track: 'tools',
  },
  {
    id: 'terminal',
    shortName: '>_',
    title: 'Terminal',
    description: 'Compreenda comandos, caminhos, processos e automações.',
    color: colors.primary,
    textColor: colors.white,
    status: 'coming',
    track: 'tools',
  },
  {
    id: 'npm',
    shortName: 'npm',
    title: 'npm',
    description: 'Gerencie pacotes, scripts e dependências do projeto.',
    color: colors.error,
    textColor: colors.white,
    status: 'coming',
    track: 'tools',
  },
  {
    id: 'docker',
    shortName: 'DK',
    title: 'Docker',
    description: 'Crie ambientes reproduzíveis para aplicações reais.',
    color: colors.primaryLight,
    textColor: colors.ink,
    status: 'coming',
    track: 'tools',
  },
  {
    id: 'databases',
    shortName: 'DB',
    title: 'Banco de Dados',
    description: 'Modele, consulte e proteja os dados de aplicações.',
    color: colors.success,
    textColor: colors.ink,
    status: 'coming',
    track: 'data',
  },
  {
    id: 'best-practices',
    shortName: 'BP',
    title: 'Boas Práticas',
    description: 'Escreva código claro, seguro e fácil de manter.',
    color: colors.gold,
    textColor: colors.ink,
    status: 'coming',
    track: 'career',
  },
  {
    id: 'clean-code',
    shortName: 'CC',
    title: 'Clean Code',
    description: 'Aprenda a comunicar intenção por meio do código.',
    color: colors.success,
    textColor: colors.ink,
    status: 'coming',
    track: 'career',
  },
  {
    id: 'deploy',
    shortName: 'UP',
    title: 'Deploy',
    description: 'Leve projetos do computador para usuários reais.',
    color: colors.secondaryLight,
    textColor: colors.white,
    status: 'coming',
    track: 'career',
  },
];

export const javascriptLessons = [
  {
    id: 'js-variaveis',
    title: 'Variáveis: const e let',
    subtitle: 'Aprenda a guardar e atualizar informações.',
    duration: '8 min',
    eyebrow: 'JAVASCRIPT · FUNDAMENTOS · AULA 1',
    pages: [
      {
        id: 'variables-concept',
        practicalExample: {
          context: 'Saudação personalizada em uma página',
          code: "const nomeUsuario = 'Max';\nconsole.log(`Olá, ${nomeUsuario}!`);",
          output: 'Olá, Max!',
          explanation: 'O valor guardado em nomeUsuario é lido dentro do texto. Assim, o mesmo código funciona para qualquer pessoa.',
        },
        label: 'Conceito',
        title: 'Uma variável dá um nome a um valor',
        body: 'Programas precisam lembrar informações. Uma variável associa um nome fácil de entender a um valor guardado na memória, como o nome do usuário, o preço de um produto ou a pontuação de um jogo.',
        analogy: { icon: '📦', title: 'Caixa: nome', value: 'Valor guardado: “Max”' },
        tip: 'Um bom nome revela o significado do valor: precoTotal é melhor que apenas x.',
      },
      {
        id: 'variables-const',
        practicalExample: {
          context: 'Um valor que não deve mudar durante a compra',
          code: 'const taxaEntrega = 10;\nconst total = 59 + taxaEntrega;\nconsole.log(total);',
          output: '69',
          explanation: 'A taxa é definida uma vez com const. Depois ela pode participar de cálculos sem ser trocada por acidente.',
        },
        label: 'Código explicado',
        title: 'Criando uma variável com const',
        body: 'Use const quando você não pretende atribuir outro valor à variável. Essa deve ser sua escolha inicial na maioria dos casos.',
        code: "const nome = 'Max';",
        notes: [
          { token: 'const', text: 'declara uma variável que não será reatribuída' },
          { token: 'nome', text: 'é o identificador usado para acessar o valor' },
          { token: '=', text: 'atribui o valor que está à direita' },
          { token: "'Max'", text: 'é o texto armazenado na variável' },
          { token: ';', text: 'marca o fim da instrução' },
        ],
      },
      {
        id: 'variables-let',
        practicalExample: {
          context: 'Contador de vidas de um jogo',
          code: 'let vidas = 3;\nvidas = vidas - 1;\nconsole.log(vidas);',
          output: '2',
          explanation: 'vidas começou em 3 e foi atualizada. Usamos let porque o valor muda enquanto a partida acontece.',
        },
        label: 'Comparação',
        title: 'Use let quando o valor precisar mudar',
        body: 'let também cria uma variável, mas permite reatribuição. Isso é útil para contadores, placares, estados e valores que evoluem durante o programa.',
        code: 'let pontos = 10;\npontos = 20;',
        notes: [
          { token: 'let pontos', text: 'cria a variável pontos' },
          { token: '= 10', text: 'define o valor inicial' },
          { token: 'pontos = 20', text: 'substitui 10 pelo novo valor 20' },
        ],
        tip: 'Na segunda linha não usamos let novamente, pois a variável já existe.',
      },
      {
        id: 'variables-const-warning',
        practicalExample: {
          context: 'Uma configuração fixa do aplicativo',
          code: "const idioma = 'pt-BR';\nidioma = 'en-US';",
          output: 'TypeError: Assignment to constant variable.',
          explanation: 'O erro é intencional: const protege a variável contra uma nova atribuição. Se ela precisar mudar, declare com let.',
        },
        label: 'Atenção',
        title: 'const impede a reatribuição',
        body: 'Depois de declarar uma variável com const, tentar colocar outro valor nela causa um erro. Isso protege valores que não deveriam ser substituídos acidentalmente.',
        code: "const linguagem = 'JavaScript';\nlinguagem = 'Python'; // erro",
        tip: 'const não significa que objetos e arrays sejam totalmente imutáveis; esse assunto será explicado nos módulos próprios.',
      },
      {
        id: 'variables-project',
        practicalExample: {
          context: 'Atualizando o total de tarefas concluídas',
          code: "const tarefa = 'Ler sobre funções';\nlet concluidas = 0;\nconcluidas += 1;\nconsole.log(concluidas);",
          output: '1',
          explanation: 'A descrição da tarefa não muda, mas o contador cresce. Essa combinação aparece o tempo todo em telas e jogos.',
        },
        label: 'Em um projeto',
        title: 'Variáveis em uma lista de tarefas',
        body: 'O texto da tarefa pode permanecer constante, enquanto o número de tarefas concluídas muda conforme o usuário interage com o aplicativo.',
        code: "const tarefa = 'Estudar JavaScript';\nlet concluidas = 0;\nconcluidas = concluidas + 1;",
        notes: [
          { token: 'tarefa', text: 'guarda a descrição da atividade' },
          { token: 'concluidas', text: 'começa em zero e funciona como contador' },
          { token: '+ 1', text: 'aumenta o contador quando uma tarefa termina' },
        ],
      },
    ],
    questions: [
      {
        id: 'variables-q1',
        prompt: 'Para que serve uma variável?',
        options: ['Guardar um valor com um nome', 'Repetir o código automaticamente', 'Criar uma página HTML'],
        answer: 0,
        explanation: 'Uma variável associa um nome a um valor para que o programa possa utilizá-lo depois.',
      },
      {
        id: 'variables-q2',
        prompt: 'Qual declaração permite alterar o valor mais tarde?',
        options: ['const pontos = 10', 'let pontos = 10', 'value pontos = 10'],
        answer: 1,
        explanation: 'let permite reatribuição. const deve ser usado quando a variável não receberá outro valor.',
      },
      {
        id: 'variables-q3',
        prompt: 'O que será exibido?\n\nlet nivel = 1;\nnivel = 2;\nconsole.log(nivel);',
        options: ['1', '2', 'nivel'],
        answer: 1,
        explanation: 'O valor 1 foi substituído por 2 antes da chamada de console.log.',
      },
    ],
  },
  {
    id: 'js-tipos',
    title: 'Tipos de dados',
    subtitle: 'Descubra os diferentes valores do JavaScript.',
    duration: '10 min',
    eyebrow: 'JAVASCRIPT · FUNDAMENTOS · AULA 2',
    pages: [
      {
        id: 'types-concept',
        practicalExample: {
          context: 'Dados diferentes de um perfil de usuário',
          code: "const nome = 'Ana';\nconst idade = 25;\nconst premium = true;",
          output: 'texto, número e booleano',
          explanation: 'Cada informação representa uma coisa diferente. O JavaScript usa o tipo correto para saber como trabalhar com ela.',
        },
        label: 'Conceito',
        title: 'O tipo diz o que um valor representa',
        body: 'JavaScript trabalha com diferentes categorias de valores. O tipo determina quais operações fazem sentido: podemos somar números, juntar textos e tomar decisões com valores booleanos.',
        analogy: { icon: '🧩', title: 'Cada valor tem uma categoria', value: 'Texto, número, verdadeiro/falso e mais' },
      },
      {
        id: 'types-string-number',
        practicalExample: {
          context: 'O cuidado com números que chegam como texto',
          code: "const idadeDigitada = '25';\nconsole.log(idadeDigitada + 1);",
          output: '251',
          explanation: 'Como 25 está entre aspas, ele é texto. Em vez de somar, o JavaScript junta os caracteres.',
        },
        label: 'Código explicado',
        title: 'String e number',
        body: 'String representa texto e fica entre aspas. number representa números inteiros ou decimais e é escrito sem aspas.',
        code: "const nome = 'Ana';\nconst idade = 25;\nconst altura = 1.68;",
        notes: [
          { token: "'Ana'", text: 'é uma string porque está entre aspas' },
          { token: '25', text: 'é um number inteiro' },
          { token: '1.68', text: 'também é number, mesmo contendo casas decimais' },
        ],
        tip: "'25' é texto; 25 é número. As aspas mudam o tipo do valor.",
      },
      {
        id: 'types-boolean',
        practicalExample: {
          context: 'Liberando conteúdo somente para quem está logado',
          code: 'const estaLogado = true;\nconsole.log(estaLogado);',
          output: 'true',
          explanation: 'Um booleano responde a perguntas de sim ou não. Mais à frente, ele será usado para tomar decisões com if.',
        },
        label: 'Código explicado',
        title: 'Boolean representa sim ou não',
        body: 'Um boolean possui apenas dois valores possíveis: true ou false. Ele aparece muito em verificações, permissões, estados de botões e tarefas concluídas.',
        code: 'const estaLogado = true;\nconst tarefaConcluida = false;',
        notes: [
          { token: 'true', text: 'representa verdadeiro' },
          { token: 'false', text: 'representa falso' },
          { token: 'sem aspas', text: 'true e false são palavras da linguagem, não textos' },
        ],
      },
      {
        id: 'types-empty',
        practicalExample: {
          context: 'Aguardando o usuário escolher uma foto',
          code: 'let fotoPerfil;\nconst fotoSelecionada = null;',
          output: 'undefined e null',
          explanation: 'fotoPerfil ainda não recebeu nada. fotoSelecionada recebeu null de propósito para dizer que não há escolha.',
        },
        label: 'Diferença importante',
        title: 'undefined e null não são iguais',
        body: 'undefined normalmente indica que um valor ainda não foi definido. null é usado pelo programador para representar intencionalmente a ausência de um valor.',
        code: 'let resultado;\nconst usuarioSelecionado = null;',
        notes: [
          { token: 'resultado', text: 'vale undefined porque não recebeu valor' },
          { token: 'null', text: 'indica que nenhum usuário foi selecionado de propósito' },
        ],
      },
      {
        id: 'types-typeof',
        practicalExample: {
          context: 'Conferindo um dado antes de fazer um cálculo',
          code: "const preco = '29.90';\nconsole.log(typeof preco);",
          output: 'string',
          explanation: 'typeof mostra que o preço é texto. Antes de calcular, seria necessário convertê-lo para número.',
        },
        label: 'Ferramenta',
        title: 'Descobrindo um tipo com typeof',
        body: 'O operador typeof devolve uma string informando o tipo de um valor. Ele ajuda a investigar dados e encontrar erros durante o desenvolvimento.',
        code: "const preco = 29.9;\nconsole.log(typeof preco); // 'number'",
        notes: [
          { token: 'typeof preco', text: 'consulta o tipo armazenado em preco' },
          { token: 'console.log', text: 'exibe o resultado no console' },
          { token: "'number'", text: 'é a resposta produzida pelo typeof' },
        ],
      },
    ],
    questions: [
      {
        id: 'types-q1',
        prompt: 'Qual destes valores é do tipo number?',
        options: ["'42'", '42', "'number'"],
        answer: 1,
        explanation: '42 sem aspas é number. Quando usamos aspas, o valor se torna uma string.',
      },
      {
        id: 'types-q2',
        prompt: 'Qual tipo representa verdadeiro ou falso?',
        options: ['string', 'boolean', 'undefined'],
        answer: 1,
        explanation: 'O tipo boolean possui os valores true e false.',
      },
      {
        id: 'types-q3',
        prompt: "O que typeof 'Olá' retorna?",
        options: ['text', 'string', 'word'],
        answer: 1,
        explanation: 'Textos entre aspas são valores do tipo string.',
      },
    ],
  },
  {
    id: 'js-operadores',
    title: 'Operadores',
    subtitle: 'Calcule, compare e combine valores.',
    duration: '11 min',
    eyebrow: 'JAVASCRIPT · FUNDAMENTOS · AULA 3',
    pages: [
      {
        id: 'operators-concept',
        label: 'Conceito',
        title: 'Operadores realizam ações com valores',
        body: 'Operadores são símbolos ou palavras que calculam, atribuem, comparam ou combinam valores. Os valores usados por um operador são chamados de operandos.',
        code: 'const total = 10 + 5;',
        notes: [
          { token: '10 e 5', text: 'são os operandos' },
          { token: '+', text: 'é o operador de adição' },
          { token: '=', text: 'atribui o resultado 15 à variável total' },
        ],
      },
      {
        id: 'operators-arithmetic',
        label: 'Aritmética',
        title: 'Os cálculos mais comuns',
        body: 'JavaScript possui operadores para adição, subtração, multiplicação, divisão e resto da divisão.',
        code: 'const soma = 8 + 2;       // 10\nconst diferenca = 8 - 2;  // 6\nconst produto = 8 * 2;    // 16\nconst divisao = 8 / 2;    // 4\nconst resto = 8 % 3;      // 2',
        tip: 'O operador % é útil para descobrir se um número é par: numero % 2 === 0.',
      },
      {
        id: 'operators-assignment',
        label: 'Atalhos',
        title: 'Atualizando valores de forma curta',
        body: 'Operadores de atribuição composta realizam uma operação usando o valor atual e guardam o novo resultado na mesma variável.',
        code: 'let pontos = 10;\npontos += 5; // igual a: pontos = pontos + 5\npontos -= 2; // agora vale 13',
        notes: [
          { token: '+=', text: 'soma e atribui o novo resultado' },
          { token: '-=', text: 'subtrai e atribui o novo resultado' },
        ],
      },
      {
        id: 'operators-comparison',
        label: 'Comparação',
        title: 'Comparações produzem booleanos',
        body: 'Ao comparar valores, o resultado sempre será true ou false. Prefira === e !==, pois eles comparam valor e tipo sem conversões inesperadas.',
        code: 'const idade = 18;\nidade >= 18;  // true\nidade === 18; // true\nidade !== 21; // true',
        notes: [
          { token: '>=', text: 'maior ou igual' },
          { token: '===', text: 'estritamente igual: mesmo valor e mesmo tipo' },
          { token: '!==', text: 'estritamente diferente' },
        ],
        tip: "18 === '18' resulta em false porque number e string são tipos diferentes.",
      },
      {
        id: 'operators-logical',
        label: 'Lógica',
        title: 'Combinando condições',
        body: 'Operadores lógicos permitem verificar mais de uma condição ou inverter um valor booleano.',
        code: 'const temIngresso = true;\nconst maiorDeIdade = true;\n\nconst podeEntrar = temIngresso && maiorDeIdade;',
        notes: [
          { token: '&&', text: 'exige que as duas condições sejam verdadeiras' },
          { token: '||', text: 'exige que pelo menos uma condição seja verdadeira' },
          { token: '!', text: 'inverte true para false e false para true' },
        ],
      },
    ],
    questions: [
      {
        id: 'operators-q1',
        prompt: 'Qual é o resultado de 10 % 3?',
        options: ['3', '1', '0'],
        answer: 1,
        explanation: '10 dividido por 3 deixa resto 1, que é o valor devolvido por %.',
      },
      {
        id: 'operators-q2',
        prompt: "Qual comparação resulta em false?",
        options: ['5 === 5', "5 === '5'", '5 !== 4'],
        answer: 1,
        explanation: "=== compara valor e tipo; 5 é number e '5' é string.",
      },
      {
        id: 'operators-q3',
        prompt: 'O que pontos += 2 faz?',
        options: ['Apaga pontos', 'Soma 2 e guarda o resultado', 'Compara pontos com 2'],
        answer: 1,
        explanation: '+= é um operador de atribuição composta: soma e salva o novo valor.',
      },
    ],
  },
  {
    id: 'js-strings',
    title: 'Strings e template strings',
    subtitle: 'Crie e combine textos dinâmicos.',
    duration: '10 min',
    eyebrow: 'JAVASCRIPT · FUNDAMENTOS · AULA 4',
    pages: [
      {
        id: 'strings-concept',
        label: 'Conceito',
        title: 'Strings representam textos',
        body: 'Uma string é uma sequência de caracteres. Ela pode conter letras, números, espaços e símbolos, desde que esteja delimitada por aspas simples, duplas ou crases.',
        code: "const curso = 'JavaScript';\nconst mensagem = \"Olá!\";",
        tip: 'Escolha um estilo de aspas e mantenha consistência no projeto.',
      },
      {
        id: 'strings-concatenation',
        label: 'Combinação',
        title: 'Concatenação junta strings',
        body: 'Quando o operador + recebe textos, ele cria uma nova string juntando os valores. Espaços precisam ser adicionados explicitamente.',
        code: "const nome = 'Max';\nconst saudacao = 'Olá, ' + nome + '!';",
        notes: [
          { token: "'Olá, '", text: 'contém um espaço depois da vírgula' },
          { token: '+ nome', text: 'adiciona o valor guardado em nome' },
          { token: "+ '!'", text: 'finaliza a frase com exclamação' },
        ],
      },
      {
        id: 'strings-template',
        label: 'Forma moderna',
        title: 'Template strings facilitam textos dinâmicos',
        body: 'Com crases, podemos inserir expressões usando ${ }. Isso costuma ser mais legível do que várias concatenações.',
        code: "const nome = 'Max';\nconst pontos = 40;\nconst texto = `Olá, ${nome}! Você tem ${pontos} XP.`;",
        notes: [
          { token: '` `', text: 'as crases delimitam a template string' },
          { token: '${nome}', text: 'insere o valor da variável nome' },
          { token: '${pontos}', text: 'insere o número dentro do texto' },
        ],
      },
      {
        id: 'strings-properties',
        label: 'Ferramentas',
        title: 'Consultando e transformando textos',
        body: 'Strings oferecem propriedades e métodos. length informa a quantidade de caracteres; toUpperCase cria uma versão em letras maiúsculas.',
        code: "const linguagem = 'JavaScript';\nlinguagem.length;        // 10\nlinguagem.toUpperCase(); // 'JAVASCRIPT'",
        tip: 'Esses métodos não alteram a string original; eles devolvem uma nova string.',
      },
      {
        id: 'strings-project',
        label: 'Em um projeto',
        title: 'Mensagem de progresso personalizada',
        body: 'Aplicativos usam template strings para montar mensagens a partir de dados do usuário.',
        code: "const aluno = 'Max';\nconst aulas = 3;\nconst resumo = `${aluno}, você concluiu ${aulas} aulas hoje!`;",
        notes: [
          { token: 'aluno', text: 'personaliza a mensagem' },
          { token: 'aulas', text: 'insere um valor que pode mudar' },
          { token: 'resumo', text: 'guarda a frase pronta para a interface' },
        ],
      },
    ],
    questions: [
      {
        id: 'strings-q1',
        prompt: 'Qual símbolo delimita uma template string?',
        options: ['Crases: ` `', 'Parênteses: ( )', 'Colchetes: [ ]'],
        answer: 0,
        explanation: 'Template strings usam crases e permitem inserir expressões com ${ }.',
      },
      {
        id: 'strings-q2',
        prompt: "Qual será o resultado?\n\nconst nome = 'Lia';\n`Olá, ${nome}!`;",
        options: ['Olá, nome!', 'Olá, Lia!', 'Olá, ${nome}!'],
        answer: 1,
        explanation: '${nome} é substituído pelo valor Lia dentro da template string.',
      },
      {
        id: 'strings-q3',
        prompt: "O que 'JavaScript'.length retorna?",
        options: ['9', '10', 'JavaScript'],
        answer: 1,
        explanation: 'length conta os dez caracteres da palavra JavaScript.',
      },
    ],
  },
  {
    id: 'js-fluxo-dados',
    title: 'Entrada, processamento e saída',
    subtitle: 'Entenda o caminho percorrido pelos dados.',
    duration: '9 min',
    eyebrow: 'JAVASCRIPT · FUNDAMENTOS · AULA 5',
    pages: [
      {
        id: 'flow-concept',
        label: 'Modelo mental',
        title: 'Todo programa transforma uma entrada em uma saída',
        body: 'Entrada é o dado recebido. Processamento é o trabalho realizado com esse dado. Saída é o resultado apresentado ou armazenado. Esse modelo ajuda a planejar qualquer funcionalidade.',
        analogy: { icon: '⚙️', title: 'Entrada → processamento → saída', value: 'Dados entram, são transformados e produzem um resultado' },
      },
      {
        id: 'flow-example',
        label: 'Código explicado',
        title: 'Calculando o total de uma compra',
        body: 'Neste exemplo, preço e quantidade são entradas, a multiplicação é o processamento e console.log produz a saída.',
        code: 'const preco = 12.5;\nconst quantidade = 4;\nconst total = preco * quantidade;\nconsole.log(total);',
        notes: [
          { token: 'preco, quantidade', text: 'são os dados de entrada' },
          { token: 'preco * quantidade', text: 'é o processamento' },
          { token: 'console.log(total)', text: 'exibe a saída 50 no console' },
        ],
      },
      {
        id: 'flow-console',
        label: 'Ferramenta',
        title: 'console.log ajuda a observar o programa',
        body: 'console.log mostra valores no console do ambiente de desenvolvimento. Ele é útil para aprender, testar hipóteses e investigar por que uma parte do código não funciona.',
        code: "const status = 'carregando';\nconsole.log('Status atual:', status);",
        tip: 'O console é uma ferramenta de desenvolvimento; em uma interface pronta, a saída costuma aparecer em elementos visuais.',
      },
      {
        id: 'flow-project',
        label: 'Em um projeto',
        title: 'Planejando um conversor de temperatura',
        body: 'Primeiro identificamos a entrada, depois escrevemos a fórmula e por último apresentamos o resultado. Separar essas etapas torna o código mais fácil de entender.',
        code: 'const celsius = 25;\nconst fahrenheit = celsius * 1.8 + 32;\nconst mensagem = `${celsius}°C equivalem a ${fahrenheit}°F`;\nconsole.log(mensagem);',
        notes: [
          { token: 'celsius', text: 'é a entrada recebida' },
          { token: '* 1.8 + 32', text: 'é a fórmula de conversão' },
          { token: 'mensagem', text: 'prepara uma saída compreensível' },
        ],
      },
    ],
    questions: [
      {
        id: 'flow-q1',
        prompt: 'Em um cálculo de compra, o que é preço * quantidade?',
        options: ['Entrada', 'Processamento', 'Comentário'],
        answer: 1,
        explanation: 'A multiplicação transforma os dados de entrada e produz o total.',
      },
      {
        id: 'flow-q2',
        prompt: 'Para que console.log é usado durante o estudo?',
        options: ['Exibir valores no console', 'Criar variáveis', 'Instalar o JavaScript'],
        answer: 0,
        explanation: 'console.log permite observar valores e acompanhar o comportamento do programa.',
      },
      {
        id: 'flow-q3',
        prompt: 'Qual é a ordem básica do fluxo de dados?',
        options: ['Saída → entrada → erro', 'Entrada → processamento → saída', 'Processamento → variável → entrada'],
        answer: 1,
        explanation: 'O programa recebe dados, transforma esses dados e produz um resultado.',
      },
    ],
  },
  {
    id: 'js-desafio-fundamentos',
    title: 'Desafio dos fundamentos',
    subtitle: 'Combine tudo o que aprendeu no módulo.',
    duration: '12 min',
    eyebrow: 'JAVASCRIPT · FUNDAMENTOS · DESAFIO FINAL',
    pages: [
      {
        id: 'challenge-mission',
        label: 'Missão',
        title: 'Crie o resumo de um pedido',
        body: 'Você usará variáveis, tipos, operadores e template strings para calcular um pedido e gerar uma mensagem. Antes do desafio, acompanhe cada etapa da solução.',
        analogy: { icon: '🚀', title: 'Projeto: resumo do pedido', value: 'Entrada → cálculo → mensagem final' },
      },
      {
        id: 'challenge-input',
        label: 'Etapa 1',
        title: 'Declare os dados de entrada',
        body: 'Os valores que descrevem o pedido não serão reatribuídos, então usamos const. Cada nome deixa claro o que o valor representa.',
        code: "const produto = 'Caderno';\nconst preco = 18.5;\nconst quantidade = 2;\nconst clientePremium = true;",
        notes: [
          { token: 'produto', text: 'string com o nome do item' },
          { token: 'preco, quantidade', text: 'numbers usados no cálculo' },
          { token: 'clientePremium', text: 'boolean que descreve uma condição' },
        ],
      },
      {
        id: 'challenge-processing',
        label: 'Etapa 2',
        title: 'Processe os valores',
        body: 'Multiplicamos preço por quantidade para descobrir o total. Em módulos futuros, o boolean clientePremium poderá controlar um desconto usando uma condição.',
        code: 'const total = preco * quantidade;',
        notes: [
          { token: 'preco * quantidade', text: 'multiplica 18.5 por 2' },
          { token: 'total', text: 'recebe o resultado numérico 37' },
        ],
      },
      {
        id: 'challenge-output',
        label: 'Etapa 3',
        title: 'Monte a saída do programa',
        body: 'A template string combina textos e valores sem várias concatenações. A mensagem final poderá ser exibida na tela ou enviada para outro sistema.',
        code: 'const resumo = `${quantidade}x ${produto} — Total: R$ ${total}`;\nconsole.log(resumo);',
        notes: [
          { token: '${quantidade}', text: 'insere o número de unidades' },
          { token: '${produto}', text: 'insere o nome do item' },
          { token: '${total}', text: 'insere o resultado do cálculo' },
        ],
        tip: 'Saída esperada: 2x Caderno — Total: R$ 37',
      },
    ],
    questions: [
      {
        id: 'challenge-q1',
        prompt: 'Qual tipo é mais adequado para guardar o nome de um produto?',
        options: ['string', 'boolean', 'undefined'],
        answer: 0,
        explanation: 'Nomes e descrições são textos, portanto usamos string.',
      },
      {
        id: 'challenge-q2',
        prompt: 'Qual expressão calcula o total do pedido?',
        options: ['preco + produto', 'preco * quantidade', 'quantidade === produto'],
        answer: 1,
        explanation: 'O total é encontrado multiplicando o preço unitário pela quantidade.',
      },
      {
        id: 'challenge-q3',
        prompt: "Qual declaração permite atualizar um contador?",
        options: ['const contador = 0', 'let contador = 0', 'string contador = 0'],
        answer: 1,
        explanation: 'let permite reatribuir o valor quando o contador aumentar.',
      },
      {
        id: 'challenge-q4',
        prompt: "O que 20 === '20' retorna?",
        options: ['true', 'false', '20'],
        answer: 1,
        explanation: '=== compara valor e tipo; number e string são diferentes.',
      },
      {
        id: 'challenge-q5',
        prompt: 'Qual recurso insere variáveis diretamente em um texto?',
        options: ['Template string com ${ }', 'Operador %', 'typeof'],
        answer: 0,
        explanation: 'Template strings usam crases e ${ } para criar textos dinâmicos.',
      },
    ],
  },
];

export const decisionLessons = [
  {
    id: 'js-comparacoes',
    title: 'Comparações e booleanos',
    subtitle: 'Faça perguntas que o código consegue responder.',
    duration: '10 min',
    eyebrow: 'JAVASCRIPT · DECISÕES · AULA 1',
    pages: [
      {
        id: 'compare-concept',
        label: 'Conceito',
        title: 'Uma comparação gera true ou false',
        body: 'Antes de tomar uma decisão, o programa precisa responder uma pergunta. Operadores de comparação testam valores e devolvem um boolean: true para verdadeiro e false para falso.',
        analogy: { icon: '❓', title: 'Pergunta: a idade é suficiente?', value: 'Resposta: true ou false' },
      },
      {
        id: 'compare-equality',
        label: 'Código explicado',
        title: 'Prefira === para testar igualdade',
        body: 'O operador === compara valor e tipo. Ele evita conversões automáticas que podem esconder erros, por isso é a escolha mais segura para comparações comuns.',
        code: "const idade = 18;\nidade === 18;   // true\nidade === '18'; // false",
        notes: [
          { token: '===', text: 'testa se valor e tipo são iguais' },
          { token: '18', text: 'é um number' },
          { token: "'18'", text: 'é uma string, apesar de parecer número' },
        ],
        tip: 'Use !== quando quiser testar se valor e tipo são diferentes.',
      },
      {
        id: 'compare-order',
        label: 'Comparações numéricas',
        title: 'Maior, menor e limites',
        body: 'Os operadores >, <, >= e <= comparam a posição de números. Eles são úteis para idade mínima, estoque, notas e limites de pontuação.',
        code: 'const pontos = 80;\npontos > 50;   // true\npontos >= 80;  // true\npontos < 100;  // true',
        notes: [
          { token: '>', text: 'maior que' },
          { token: '>=', text: 'maior ou igual a' },
          { token: '<=', text: 'menor ou igual a' },
        ],
      },
      {
        id: 'compare-project',
        label: 'Em um projeto',
        title: 'Verificando se uma tarefa foi concluída',
        body: 'Um aplicativo de tarefas pode verificar o boolean concluida para decidir qual mensagem mostrar ou qual estilo aplicar.',
        code: "const concluida = true;\nconst status = concluida === true;\nconsole.log(status); // true",
        tip: 'Quando a variável já é boolean, geralmente basta usar concluida diretamente. Veremos isso no próximo tema.',
      },
    ],
    questions: [
      { id: 'compare-q1', prompt: "Qual resultado de 10 === '10'?", options: ['true', 'false', '10'], answer: 1, explanation: "10 é number e '10' é string; === exige valor e tipo iguais." },
      { id: 'compare-q2', prompt: 'Qual operador significa maior ou igual?', options: ['=>', '>=', '=='], answer: 1, explanation: '>= retorna true quando o valor da esquerda é maior ou igual ao da direita.' },
      { id: 'compare-q3', prompt: 'O que uma comparação sempre devolve?', options: ['Uma string', 'Um boolean', 'Um array'], answer: 1, explanation: 'Comparações produzem true ou false.' },
    ],
  },
  {
    id: 'js-if-else',
    title: 'if e else',
    subtitle: 'Execute código apenas quando fizer sentido.',
    duration: '11 min',
    eyebrow: 'JAVASCRIPT · DECISÕES · AULA 2',
    pages: [
      {
        id: 'if-concept',
        label: 'Conceito',
        title: 'if executa um bloco quando a condição é verdadeira',
        body: 'if avalia uma expressão. Se o resultado for true, o código entre chaves é executado. Se for false, esse bloco é ignorado.',
        code: 'const temAcesso = true;\n\nif (temAcesso) {\n  console.log("Bem-vindo!");\n}',
        notes: [
          { token: 'if', text: 'inicia uma decisão' },
          { token: '(temAcesso)', text: 'é a condição avaliada' },
          { token: '{ }', text: 'delimitam o bloco que será executado' },
        ],
      },
      {
        id: 'else-concept',
        label: 'Alternativa',
        title: 'else cuida do caminho contrário',
        body: 'Quando a condição do if é false, else oferece outro bloco para executar. Assim, o programa responde aos dois resultados possíveis.',
        code: 'const temAcesso = false;\n\nif (temAcesso) {\n  console.log("Bem-vindo!");\n} else {\n  console.log("Acesso negado.");\n}',
        notes: [
          { token: 'if', text: 'trata o caso verdadeiro' },
          { token: 'else', text: 'trata todos os outros casos' },
          { token: 'false', text: 'faz o programa executar o bloco else' },
        ],
      },
      {
        id: 'if-condition',
        label: 'Com comparação',
        title: 'if pode receber qualquer expressão booleana',
        body: 'A condição não precisa ser uma variável pronta. Você pode colocar uma comparação diretamente entre parênteses.',
        code: 'const idade = 17;\n\nif (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}',
        notes: [
          { token: 'idade >= 18', text: 'produz true ou false' },
          { token: '17 >= 18', text: 'é false' },
          { token: 'else', text: 'será executado neste exemplo' },
        ],
      },
      {
        id: 'if-project',
        label: 'Em um projeto',
        title: 'Mensagem para uma resposta vazia',
        body: 'Formulários precisam informar quando o usuário não preencheu um campo. Uma string vazia é avaliada como falsy e pode ser tratada com if.',
        code: "const nome = '';\n\nif (nome) {\n  console.log(`Olá, ${nome}!`);\n} else {\n  console.log('Digite seu nome para continuar.');\n}",
        tip: 'Mais tarde estudaremos valores truthy e falsy em detalhes.',
      },
    ],
    questions: [
      { id: 'if-q1', prompt: 'Quando o bloco de if é executado?', options: ['Quando a condição é true', 'Sempre', 'Quando a condição é false'], answer: 0, explanation: 'if executa seu bloco apenas quando a condição avaliada é verdadeira.' },
      { id: 'if-q2', prompt: 'Qual palavra cria o caminho alternativo?', options: ['then', 'else', 'return'], answer: 1, explanation: 'else define o que acontece quando a condição do if é falsa.' },
      { id: 'if-q3', prompt: 'Com idade igual a 20, idade >= 18 é:', options: ['true', 'false', 'undefined'], answer: 0, explanation: '20 é maior que 18, então a comparação retorna true.' },
    ],
  },
  {
    id: 'js-else-if-logica',
    title: 'else if e lógica',
    subtitle: 'Crie decisões com várias possibilidades.',
    duration: '12 min',
    eyebrow: 'JAVASCRIPT · DECISÕES · AULA 3',
    pages: [
      {
        id: 'elseif-concept',
        label: 'Mais de dois caminhos',
        title: 'else if testa uma nova condição',
        body: 'Use else if quando houver várias faixas ou possibilidades. O programa testa as condições de cima para baixo e executa o primeiro bloco verdadeiro.',
        code: 'const nota = 7;\n\nif (nota >= 9) {\n  console.log("Excelente");\n} else if (nota >= 6) {\n  console.log("Aprovado");\n} else {\n  console.log("Recuperação");\n}',
        notes: [
          { token: 'if', text: 'testa a primeira condição' },
          { token: 'else if', text: 'testa outra condição se a primeira falhar' },
          { token: 'else', text: 'captura o caso restante' },
        ],
      },
      {
        id: 'elseif-order',
        label: 'Ordem importa',
        title: 'Coloque as condições mais específicas primeiro',
        body: 'Se uma condição ampla aparecer antes, ela pode impedir as seguintes de serem testadas. O programa para na primeira condição verdadeira.',
        code: 'const nota = 9;\n\nif (nota >= 6) {\n  console.log("Aprovado");\n} else if (nota >= 9) {\n  console.log("Excelente");\n}',
        tip: 'Neste código, “Excelente” nunca aparece para a nota 9. A condição nota >= 6 já é verdadeira antes.',
      },
      {
        id: 'logic-and-or',
        label: 'Operadores lógicos',
        title: '&& exige tudo; || aceita uma opção',
        body: '&& retorna true quando as duas condições são verdadeiras. || retorna true quando pelo menos uma condição é verdadeira.',
        code: 'const temIngresso = true;\nconst maiorDeIdade = true;\nconst acompanhante = false;\n\nconst podeEntrar = temIngresso && (maiorDeIdade || acompanhante);',
        notes: [
          { token: '&&', text: 'exige ter ingresso e cumprir a outra regra' },
          { token: '||', text: 'aceita maioridade ou acompanhante' },
          { token: '( )', text: 'agrupam a parte avaliada primeiro' },
        ],
      },
      {
        id: 'logic-not',
        label: 'Inversão',
        title: '! inverte um boolean',
        body: 'O operador ! transforma true em false e false em true. É útil para verificar que algo não aconteceu ou alternar um estado.',
        code: 'const carregando = false;\n\nif (!carregando) {\n  console.log("Mostrar conteúdo");\n}',
        notes: [
          { token: '!carregando', text: 'significa “não está carregando”' },
          { token: 'false → true', text: 'permite executar o bloco if' },
        ],
      },
    ],
    questions: [
      { id: 'logic-q1', prompt: 'O que acontece depois que um else if é verdadeiro?', options: ['Os próximos são ignorados', 'Todos são executados', 'O programa reinicia'], answer: 0, explanation: 'A cadeia if/else if/else executa somente o primeiro bloco cuja condição seja verdadeira.' },
      { id: 'logic-q2', prompt: 'Quando A && B é true?', options: ['Quando A e B são true', 'Quando apenas A é true', 'Quando apenas B é true'], answer: 0, explanation: '&& exige que todas as condições ligadas sejam verdadeiras.' },
      { id: 'logic-q3', prompt: 'Se ativo vale false, qual o valor de !ativo?', options: ['false', 'true', 'null'], answer: 1, explanation: '! inverte o boolean, então !false resulta em true.' },
    ],
  },
  {
    id: 'js-switch-ternario',
    title: 'switch e ternário',
    subtitle: 'Escolha a estrutura adequada para cada decisão.',
    duration: '10 min',
    eyebrow: 'JAVASCRIPT · DECISÕES · AULA 4',
    pages: [
      {
        id: 'switch-concept',
        label: 'Vários valores exatos',
        title: 'switch compara um valor com vários cases',
        body: 'switch é útil quando uma mesma variável possui opções conhecidas, como o dia da semana, o plano escolhido ou o status de um pedido.',
        code: "const plano = 'pro';\n\nswitch (plano) {\n  case 'basico':\n    console.log('Recursos essenciais');\n    break;\n  case 'pro':\n    console.log('Recursos avançados');\n    break;\n  default:\n    console.log('Plano não encontrado');\n}",
        notes: [
          { token: 'switch (plano)', text: 'é o valor que será comparado' },
          { token: "case 'pro'", text: 'trata um valor específico' },
          { token: 'break', text: 'encerra o switch após encontrar o caso' },
          { token: 'default', text: 'trata valores sem case correspondente' },
        ],
      },
      {
        id: 'switch-break',
        label: 'Atenção',
        title: 'break evita continuar para o próximo case',
        body: 'Sem break, JavaScript continua executando os cases abaixo mesmo quando encontrou uma correspondência. Em alguns casos isso é desejado, mas geralmente causa resultados inesperados.',
        code: "const cor = 'azul';\n\nswitch (cor) {\n  case 'azul':\n    console.log('Azul');\n    break;\n  default:\n    console.log('Outra cor');\n}",
        tip: 'Ao aprender switch, adicione break por padrão e só remova quando entender o efeito de fall-through.',
      },
      {
        id: 'ternary-concept',
        label: 'Forma curta',
        title: 'Ternário resolve uma decisão simples',
        body: 'O operador ternário escolhe entre dois valores. Ele é útil para atribuições ou textos curtos, mas não deve substituir um if complexo.',
        code: "const estaLogado = true;\nconst mensagem = estaLogado ? 'Olá!' : 'Faça login';",
        notes: [
          { token: 'condição ?', text: 'vem antes do ponto de interrogação' },
          { token: "'Olá!'", text: 'é escolhido se a condição for true' },
          { token: ':', text: 'separa a alternativa para false' },
          { token: "'Faça login'", text: 'é escolhido se a condição for false' },
        ],
      },
      {
        id: 'choice-structure',
        label: 'Escolha certa',
        title: 'Quando usar cada estrutura?',
        body: 'Use if/else para condições e intervalos. Use switch para muitos valores exatos da mesma variável. Use ternário para uma decisão curta que devolve um valor.',
        analogy: { icon: '🧭', title: 'if: condições · switch: opções · ternário: atalho', value: 'Clareza é mais importante do que escrever menos linhas' },
      },
    ],
    questions: [
      { id: 'switch-q1', prompt: 'Para que serve break em um switch?', options: ['Encerrar o switch após o case', 'Criar uma variável', 'Comparar tipos'], answer: 0, explanation: 'break interrompe o switch e evita a execução dos cases seguintes.' },
      { id: 'switch-q2', prompt: 'Qual estrutura é melhor para vários valores exatos de uma variável?', options: ['switch', 'while', 'array'], answer: 0, explanation: 'switch organiza vários cases que dependem do mesmo valor.' },
      { id: 'switch-q3', prompt: 'No ternário condicao ? A : B, quando B é escolhido?', options: ['Quando condição é false', 'Quando condição é true', 'Sempre'], answer: 0, explanation: 'A parte depois dos dois-pontos é usada para a condição falsa.' },
    ],
  },
  {
    id: 'js-desafio-decisoes',
    title: 'Desafio das decisões',
    subtitle: 'Crie regras de acesso para um evento.',
    duration: '13 min',
    eyebrow: 'JAVASCRIPT · DECISÕES · DESAFIO FINAL',
    pages: [
      {
        id: 'decision-challenge-mission',
        label: 'Missão',
        title: 'Decida quem pode entrar no evento',
        body: 'Você combinará comparações, if/else e operadores lógicos para produzir uma mensagem clara de acesso. Leia o código como uma sequência de perguntas.',
        analogy: { icon: '🎟️', title: 'Evento: validar acesso', value: 'Idade, ingresso e acompanhante definem a saída' },
      },
      {
        id: 'decision-challenge-data',
        label: 'Dados e condição',
        title: 'Monte uma regra com && e ||',
        body: 'A pessoa precisa ter ingresso e ser maior de idade ou possuir acompanhante. Os parênteses deixam a regra explícita para quem for ler o código depois.',
        code: 'const idade = 16;\nconst temIngresso = true;\nconst temAcompanhante = true;\n\nconst podeEntrar = temIngresso && (idade >= 18 || temAcompanhante);',
        notes: [
          { token: 'temIngresso &&', text: 'ingresso é obrigatório' },
          { token: 'idade >= 18', text: 'verifica a maioridade' },
          { token: '|| temAcompanhante', text: 'aceita acompanhante como alternativa' },
          { token: 'podeEntrar', text: 'recebe o resultado booleano final' },
        ],
      },
      {
        id: 'decision-challenge-output',
        label: 'Resposta ao usuário',
        title: 'Use if/else para gerar a mensagem',
        body: 'Depois de calcular a regra, if escolhe a mensagem adequada. Separar a condição da mensagem deixa o código mais fácil de testar e alterar.',
        code: 'if (podeEntrar) {\n  console.log("Entrada liberada!");\n} else {\n  console.log("Entrada não permitida.");\n}',
        notes: [
          { token: 'if (podeEntrar)', text: 'lê o boolean calculado antes' },
          { token: 'Entrada liberada', text: 'é a saída para true' },
          { token: 'else', text: 'trata o resultado false' },
        ],
      },
    ],
    questions: [
      { id: 'decision-challenge-q1', prompt: 'Qual operador testa igualdade de valor e tipo?', options: ['===', '=', '&&'], answer: 0, explanation: '=== faz comparação estrita de valor e tipo.' },
      { id: 'decision-challenge-q2', prompt: 'Quando A || B retorna true?', options: ['Quando pelo menos uma é true', 'Somente quando ambas são true', 'Somente quando ambas são false'], answer: 0, explanation: '|| aceita que ao menos uma das condições seja verdadeira.' },
      { id: 'decision-challenge-q3', prompt: 'Qual bloco executa quando podeEntrar é false?', options: ['if', 'else', 'case'], answer: 1, explanation: 'else é o caminho alternativo para a condição falsa.' },
      { id: 'decision-challenge-q4', prompt: 'Qual estrutura é mais indicada para escolher mensagens por dia da semana?', options: ['switch', 'for', 'const'], answer: 0, explanation: 'switch organiza vários valores exatos da mesma variável.' },
      { id: 'decision-challenge-q5', prompt: 'Por que usamos parênteses em A && (B || C)?', options: ['Para agrupar B || C primeiro', 'Para criar uma string', 'Para declarar uma variável'], answer: 0, explanation: 'Os parênteses deixam a ordem da regra explícita: primeiro B ou C, depois o resultado com A.' },
    ],
  },
];

export const repetitionLessons = [
  {
    id: 'js-loops-intro-for',
    title: 'Repetindo com for',
    subtitle: 'Execute uma ação uma quantidade conhecida de vezes.',
    duration: '11 min',
    eyebrow: 'JAVASCRIPT · REPETIÇÕES · AULA 1',
    pages: [
      {
        id: 'for-concept',
        label: 'Conceito',
        title: 'Loops evitam repetir o mesmo código',
        body: 'Um loop executa um bloco de código várias vezes. Ele é útil quando uma tarefa se repete: mostrar dias de uma semana, somar pontos ou criar itens de uma lista.',
        analogy: { icon: '🔁', title: 'Uma instrução, várias execuções', value: 'O loop repete até atingir a condição de parada' },
      },
      {
        id: 'for-structure',
        label: 'Código explicado',
        title: 'for reúne contador, condição e atualização',
        body: 'A estrutura for é ótima quando sabemos quantas repetições desejamos. Dentro dos parênteses ficam as três partes que controlam o loop.',
        code: 'for (let volta = 1; volta <= 3; volta++) {\n  console.log(`Volta ${volta}`);\n}',
        notes: [
          { token: 'let volta = 1', text: 'cria o contador começando em 1' },
          { token: 'volta <= 3', text: 'mantém o loop enquanto for verdadeiro' },
          { token: 'volta++', text: 'aumenta o contador em 1 após cada volta' },
          { token: '{ }', text: 'é o bloco repetido' },
        ],
      },
      {
        id: 'for-flow',
        label: 'Passo a passo',
        title: 'Entenda a ordem de execução',
        body: 'Primeiro o contador é criado. Depois a condição é testada. Se ela for verdadeira, o bloco roda e, no fim, o contador é atualizado antes de testar novamente.',
        code: 'for (let numero = 0; numero < 3; numero++) {\n  console.log(numero);\n}\n// saída: 0, 1, 2',
        tip: 'O loop para antes do 3 porque a condição é numero < 3, e não numero <= 3.',
      },
      {
        id: 'for-project',
        label: 'Em um projeto',
        title: 'Criando uma sequência de níveis',
        body: 'Um jogo pode usar for para preparar os níveis disponíveis ou distribuir uma recompensa para cada dia de estudo concluído.',
        code: 'for (let nivel = 1; nivel <= 5; nivel++) {\n  console.log(`Nível ${nivel} liberado`);\n}',
        notes: [
          { token: 'nivel = 1', text: 'começa pelo primeiro nível' },
          { token: 'nivel <= 5', text: 'limita a criação a cinco níveis' },
          { token: 'Nível ${nivel}', text: 'personaliza o texto a cada repetição' },
        ],
      },
    ],
    questions: [
      { id: 'for-q1', prompt: 'Qual parte do for verifica se o loop continua?', options: ['A condição do meio', 'A declaração let', 'O console.log'], answer: 0, explanation: 'A expressão central é testada antes de cada repetição.' },
      { id: 'for-q2', prompt: 'O que contador++ faz?', options: ['Aumenta contador em 1', 'Zera o contador', 'Compara contador'], answer: 0, explanation: '++ é um atalho para adicionar 1 ao valor atual.' },
      { id: 'for-q3', prompt: 'Quantas vezes for (let i = 0; i < 2; i++) executa?', options: ['1', '2', '3'], answer: 1, explanation: 'i assume os valores 0 e 1; quando chega a 2, a condição falha.' },
    ],
  },
  {
    id: 'js-while',
    title: 'Repetindo com while',
    subtitle: 'Repita enquanto uma condição for verdadeira.',
    duration: '10 min',
    eyebrow: 'JAVASCRIPT · REPETIÇÕES · AULA 2',
    pages: [
      {
        id: 'while-concept',
        label: 'Conceito',
        title: 'while testa a condição antes de cada volta',
        body: 'while repete um bloco enquanto sua condição retornar true. Use-o quando não souber exatamente quantas repetições ocorrerão, mas conhecer a regra de parada.',
        code: 'let energia = 3;\n\nwhile (energia > 0) {\n  console.log(`Energia: ${energia}`);\n  energia--;\n}',
        notes: [
          { token: 'energia > 0', text: 'é a condição que mantém o loop ativo' },
          { token: 'energia--', text: 'reduz a energia a cada volta' },
          { token: 'energia = 0', text: 'faz a condição ficar false e encerra o loop' },
        ],
      },
      {
        id: 'while-infinite',
        label: 'Atenção',
        title: 'Todo while precisa avançar para a parada',
        body: 'Se a condição nunca mudar para false, o loop será infinito e pode travar o programa. Por isso, confira sempre se algo dentro do bloco altera a condição.',
        code: 'let tentativas = 0;\n\nwhile (tentativas < 3) {\n  tentativas++;\n}',
        tip: 'Aqui tentativas cresce até 3. Sem tentativas++, o loop nunca terminaria.',
      },
      {
        id: 'while-versus-for',
        label: 'Escolha',
        title: 'for ou while?',
        body: 'Use for quando o contador e a quantidade de voltas estiverem claros. Use while quando a repetição depender de um estado que pode variar durante a execução.',
        analogy: { icon: '🧭', title: 'for: quantidade conhecida', value: 'while: condição conhecida, quantidade variável' },
      },
      {
        id: 'while-project',
        label: 'Em um projeto',
        title: 'Consumindo tentativas de um jogo',
        body: 'Um jogo pode repetir uma rodada enquanto o jogador ainda tiver tentativas disponíveis. A condição descreve diretamente a regra do jogo.',
        code: 'let tentativas = 3;\n\nwhile (tentativas > 0) {\n  console.log("Tente novamente!");\n  tentativas--;\n}\n\nconsole.log("Fim de jogo");',
        notes: [
          { token: 'tentativas > 0', text: 'mantém as rodadas enquanto houver tentativas' },
          { token: 'tentativas--', text: 'consome uma tentativa por rodada' },
          { token: 'Fim de jogo', text: 'só aparece depois que o loop termina' },
        ],
      },
    ],
    questions: [
      { id: 'while-q1', prompt: 'Quando while para?', options: ['Quando a condição fica false', 'Depois de uma vez', 'Quando usa console.log'], answer: 0, explanation: 'while testa a condição antes de cada volta e encerra quando ela é falsa.' },
      { id: 'while-q2', prompt: 'Qual risco existe se a condição nunca muda?', options: ['Loop infinito', 'String vazia', 'Erro de sintaxe automático'], answer: 0, explanation: 'Sem avanço para a condição falsa, o bloco continua executando indefinidamente.' },
      { id: 'while-q3', prompt: 'Qual situação combina melhor com while?', options: ['Repetir exatamente 10 vezes', 'Repetir enquanto houver tentativas', 'Criar uma constante'], answer: 1, explanation: 'A quantidade de tentativas pode variar; a regra de parada é mais importante que uma contagem fixa.' },
    ],
  },
  {
    id: 'js-for-of',
    title: 'Percorrendo listas com for...of',
    subtitle: 'Leia cada item de uma coleção com clareza.',
    duration: '10 min',
    eyebrow: 'JAVASCRIPT · REPETIÇÕES · AULA 3',
    pages: [
      {
        id: 'forof-concept',
        label: 'Conceito',
        title: 'for...of entrega cada valor da lista',
        body: 'for...of é uma forma simples de percorrer valores de uma coleção, como os itens de um array. Ele evita lidar manualmente com índices quando você precisa apenas do item atual.',
        code: "const tarefas = ['Estudar', 'Praticar', 'Descansar'];\n\nfor (const tarefa of tarefas) {\n  console.log(tarefa);\n}",
        notes: [
          { token: 'tarefas', text: 'é a lista que será percorrida' },
          { token: 'tarefa', text: 'recebe um item por vez' },
          { token: 'of', text: 'indica que os valores vêm da coleção' },
        ],
      },
      {
        id: 'forof-flow',
        label: 'Passo a passo',
        title: 'O item muda a cada repetição',
        body: 'Na primeira volta, tarefa vale Estudar; depois vale Praticar; por fim, Descansar. Quando não há mais itens, o loop termina sozinho.',
        code: "const cores = ['azul', 'verde', 'roxo'];\n\nfor (const cor of cores) {\n  console.log(`Cor: ${cor}`);\n}",
        tip: 'O nome cor existe apenas durante cada volta do loop e representa o item atual.',
      },
      {
        id: 'forof-index',
        label: 'Comparação',
        title: 'for...of e for resolvem necessidades diferentes',
        body: 'for é melhor quando você precisa do número da posição ou de um contador. for...of é mais legível quando precisa somente de cada valor.',
        code: "const modulos = ['Fundamentos', 'Decisões'];\n\nfor (const modulo of modulos) {\n  console.log(modulo);\n}",
        tip: 'Se precisar da posição e do valor, veremos outras técnicas junto com Arrays.',
      },
      {
        id: 'forof-project',
        label: 'Em um projeto',
        title: 'Mostrando aulas concluídas',
        body: 'Um aplicativo pode percorrer uma lista de aulas para criar um resumo para o usuário. Cada item recebe o mesmo tratamento.',
        code: "const aulasConcluidas = ['Variáveis', 'Tipos', 'Operadores'];\n\nfor (const aula of aulasConcluidas) {\n  console.log(`✓ ${aula}`);\n}",
        notes: [
          { token: 'aulasConcluidas', text: 'guarda os valores a exibir' },
          { token: 'const aula', text: 'representa cada aula da lista' },
          { token: '✓ ${aula}', text: 'gera uma linha para o resumo' },
        ],
      },
    ],
    questions: [
      { id: 'forof-q1', prompt: 'O que a variável após const recebe em for (const item of lista)?', options: ['Cada valor da lista', 'O tamanho da lista', 'A palavra lista'], answer: 0, explanation: 'item representa um elemento da coleção em cada repetição.' },
      { id: 'forof-q2', prompt: 'Qual loop é mais direto para ler apenas valores de uma lista?', options: ['for...of', 'switch', 'if'], answer: 0, explanation: 'for...of percorre os valores sem exigir controle manual de índices.' },
      { id: 'forof-q3', prompt: 'Quando for...of termina?', options: ['Quando não há mais itens', 'Quando o primeiro item aparece', 'Sempre após 10 voltas'], answer: 0, explanation: 'Ele termina automaticamente depois de entregar todos os valores da coleção.' },
    ],
  },
  {
    id: 'js-break-continue',
    title: 'break e continue',
    subtitle: 'Controle o caminho dentro de um loop.',
    duration: '9 min',
    eyebrow: 'JAVASCRIPT · REPETIÇÕES · AULA 4',
    pages: [
      {
        id: 'break-concept',
        label: 'Parada antecipada',
        title: 'break encerra o loop imediatamente',
        body: 'Use break quando encontrar o que procurava ou quando uma condição exigir a interrupção da repetição. O código após o loop continua normalmente.',
        code: 'for (let numero = 1; numero <= 10; numero++) {\n  if (numero === 4) {\n    break;\n  }\n  console.log(numero);\n}\n// saída: 1, 2, 3',
        notes: [
          { token: 'numero === 4', text: 'verifica o momento de parar' },
          { token: 'break', text: 'encerra todo o loop' },
          { token: 'console.log', text: 'não é executado para o número 4' },
        ],
      },
      {
        id: 'continue-concept',
        label: 'Pular uma volta',
        title: 'continue ignora apenas a repetição atual',
        body: 'continue não encerra o loop. Ele pula o restante do bloco naquela volta e segue para a próxima repetição.',
        code: 'for (let numero = 1; numero <= 5; numero++) {\n  if (numero === 3) {\n    continue;\n  }\n  console.log(numero);\n}\n// saída: 1, 2, 4, 5',
        notes: [
          { token: 'numero === 3', text: 'identifica o valor que será ignorado' },
          { token: 'continue', text: 'pula console.log somente nesta volta' },
          { token: 'loop', text: 'continua normalmente com o número 4' },
        ],
      },
      {
        id: 'break-versus-continue',
        label: 'Diferença',
        title: 'break para; continue pula',
        body: 'A escolha depende da sua intenção. break interrompe o processo inteiro. continue mantém o processo, mas ignora um item específico.',
        analogy: { icon: '🚦', title: 'break: sinal vermelho', value: 'continue: desvie deste item e siga' },
      },
      {
        id: 'break-project',
        label: 'Em um projeto',
        title: 'Ignorando tarefas arquivadas',
        body: 'Ao percorrer tarefas, podemos pular uma tarefa arquivada e continuar mostrando as demais. Em uma lista maior, esse padrão evita código duplicado.',
        code: "const tarefas = ['Estudar', 'Arquivada', 'Praticar'];\n\nfor (const tarefa of tarefas) {\n  if (tarefa === 'Arquivada') {\n    continue;\n  }\n  console.log(tarefa);\n}",
        tip: 'continue só deve ser usado quando deixar a leitura mais clara do que um if envolvendo o restante do bloco.',
      },
    ],
    questions: [
      { id: 'break-q1', prompt: 'O que break faz dentro de um loop?', options: ['Encerra o loop', 'Pula só uma volta', 'Aumenta o contador'], answer: 0, explanation: 'break interrompe o loop por completo naquele momento.' },
      { id: 'break-q2', prompt: 'O que continue faz?', options: ['Pula o restante da volta atual', 'Encerra o programa', 'Cria uma lista'], answer: 0, explanation: 'continue segue para a próxima repetição sem executar as linhas restantes daquela volta.' },
      { id: 'break-q3', prompt: 'Para ignorar somente uma tarefa arquivada, use:', options: ['continue', 'break', 'switch'], answer: 0, explanation: 'continue permite ignorar o item e continuar percorrendo os seguintes.' },
    ],
  },
  {
    id: 'js-desafio-loops',
    title: 'Desafio das repetições',
    subtitle: 'Monte um resumo de estudo sem repetir código.',
    duration: '12 min',
    eyebrow: 'JAVASCRIPT · REPETIÇÕES · DESAFIO FINAL',
    pages: [
      {
        id: 'loops-challenge-mission',
        label: 'Missão',
        title: 'Liste os módulos estudados',
        body: 'Você criará um resumo usando for...of e também verá quando um contador for é mais adequado. O objetivo é evitar escrever uma linha manual para cada módulo.',
        analogy: { icon: '📚', title: 'Projeto: resumo de estudos', value: 'Uma lista entra; várias linhas de saída são criadas' },
      },
      {
        id: 'loops-challenge-forof',
        label: 'Etapa 1',
        title: 'Percorra os módulos com for...of',
        body: 'Cada módulo da lista passa pela variável modulo. O mesmo console.log gera uma saída personalizada para cada item.',
        code: "const modulos = ['Fundamentos', 'Decisões', 'Repetições'];\n\nfor (const modulo of modulos) {\n  console.log(`✓ ${modulo} estudado`);\n}",
        notes: [
          { token: 'modulos', text: 'é a coleção de entrada' },
          { token: 'modulo of modulos', text: 'entrega um nome por repetição' },
          { token: 'console.log', text: 'produz uma saída para cada módulo' },
        ],
      },
      {
        id: 'loops-challenge-counter',
        label: 'Etapa 2',
        title: 'Some XP com um contador',
        body: 'for é adequado quando você sabe quantas aulas serão consideradas. A cada volta, xpTotal cresce cinco pontos.',
        code: 'let xpTotal = 0;\n\nfor (let aula = 1; aula <= 3; aula++) {\n  xpTotal += 5;\n}\n\nconsole.log(xpTotal); // 15',
        notes: [
          { token: 'aula <= 3', text: 'repete exatamente três vezes' },
          { token: 'xpTotal += 5', text: 'soma cinco XP em cada volta' },
          { token: '15', text: 'é o resultado depois de três repetições' },
        ],
      },
    ],
    questions: [
      { id: 'loops-challenge-q1', prompt: 'Qual loop percorre diretamente cada valor de uma lista?', options: ['for...of', 'while', 'switch'], answer: 0, explanation: 'for...of recebe um item da coleção em cada volta.' },
      { id: 'loops-challenge-q2', prompt: 'Qual valor final de xpTotal após 3 voltas somando 5?', options: ['5', '10', '15'], answer: 2, explanation: '3 repetições × 5 XP resultam em 15 XP.' },
      { id: 'loops-challenge-q3', prompt: 'Qual condição impede um while de continuar?', options: ['A condição se tornar false', 'Usar let', 'Escrever console.log'], answer: 0, explanation: 'while termina quando sua condição é falsa.' },
      { id: 'loops-challenge-q4', prompt: 'Qual comando encerra totalmente uma busca ao encontrar o item?', options: ['break', 'continue', 'typeof'], answer: 0, explanation: 'break encerra o loop imediatamente.' },
      { id: 'loops-challenge-q5', prompt: 'Em for (let i = 1; i <= 3; i++), qual parte atualiza i?', options: ['let i = 1', 'i <= 3', 'i++'], answer: 2, explanation: 'i++ é executado ao fim de cada volta para avançar o contador.' },
    ],
  },
];

export const functionLessons = [
  {
    id: 'js-funcoes-intro',
    title: 'Criando funções',
    subtitle: 'Dê um nome a uma tarefa reutilizável.',
    duration: '11 min',
    eyebrow: 'JAVASCRIPT · FUNÇÕES · AULA 1',
    pages: [
      {
        id: 'function-concept',
        label: 'Conceito',
        title: 'Uma função reúne uma tarefa',
        body: 'Funções agrupam instruções que realizam uma ação. Em vez de copiar o mesmo código, você cria a função uma vez e a chama sempre que precisar.',
        analogy: { icon: '🧰', title: 'Função: uma ferramenta nomeada', value: 'Você cria a ferramenta e usa quando precisar' },
      },
      {
        id: 'function-declaration',
        label: 'Código explicado',
        title: 'Declarando e chamando uma função',
        body: 'A declaração define o que a função fará. Ela só executa quando encontramos seu nome seguido de parênteses, o que chamamos de chamada da função.',
        code: 'function mostrarBoasVindas() {\n  console.log("Bem-vindo ao StudyCode!");\n}\n\nmostrarBoasVindas();',
        notes: [
          { token: 'function', text: 'inicia uma declaração de função' },
          { token: 'mostrarBoasVindas', text: 'é o nome da tarefa' },
          { token: '( )', text: 'receberão dados depois, se necessário' },
          { token: 'mostrarBoasVindas()', text: 'chama a função e executa o bloco' },
        ],
      },
      {
        id: 'function-reuse',
        label: 'Reutilização',
        title: 'Uma função pode ser chamada várias vezes',
        body: 'Cada chamada executa o mesmo conjunto de instruções. Isso reduz repetição e torna mudanças futuras mais simples: altere a função em um lugar só.',
        code: 'function somarXp() {\n  console.log("+5 XP");\n}\n\nsomarXp();\nsomarXp();\nsomarXp();',
        tip: 'Criar funções pequenas e com nomes claros ajuda você a ler o projeto como uma história.',
      },
      {
        id: 'function-project',
        label: 'Em um projeto',
        title: 'Separando responsabilidades',
        body: 'Em um aplicativo, uma função pode cuidar de salvar dados, outra de atualizar a tela e outra de validar um formulário. Cada uma tem uma responsabilidade clara.',
        code: 'function salvarProgresso() {\n  console.log("Progresso salvo");\n}\n\nfunction mostrarResultado() {\n  console.log("Aula concluída");\n}',
        notes: [
          { token: 'salvarProgresso', text: 'representa a tarefa de persistir dados' },
          { token: 'mostrarResultado', text: 'representa a tarefa de atualizar a interface' },
        ],
      },
    ],
    questions: [
      { id: 'functions-intro-q1', prompt: 'Quando uma função declarada é executada?', options: ['Quando é chamada com ()', 'No momento em que é escrita', 'Somente ao usar let'], answer: 0, explanation: 'A declaração prepara a função; a chamada com parênteses executa seu código.' },
      { id: 'functions-intro-q2', prompt: 'Qual é a principal vantagem de uma função?', options: ['Reutilizar uma tarefa', 'Criar loops infinitos', 'Apagar variáveis'], answer: 0, explanation: 'Funções evitam copiar o mesmo bloco de código em vários lugares.' },
      { id: 'functions-intro-q3', prompt: 'Qual é uma chamada de função válida?', options: ['mostrarMensagem()', 'function mostrarMensagem', 'const mostrarMensagem'], answer: 0, explanation: 'O nome seguido de parênteses chama a função.' },
    ],
  },
  {
    id: 'js-parametros',
    title: 'Parâmetros e argumentos',
    subtitle: 'Faça uma função trabalhar com dados diferentes.',
    duration: '12 min',
    eyebrow: 'JAVASCRIPT · FUNÇÕES · AULA 2',
    pages: [
      {
        id: 'parameter-concept',
        label: 'Conceito',
        title: 'Parâmetros são entradas da função',
        body: 'Parâmetros são nomes escritos na declaração da função. Eles recebem valores no momento da chamada, permitindo que a mesma função atenda situações diferentes.',
        code: 'function cumprimentar(nome) {\n  console.log(`Olá, ${nome}!`);\n}\n\ncumprimentar("Lia");\ncumprimentar("Max");',
        notes: [
          { token: 'nome', text: 'é o parâmetro, uma variável local da função' },
          { token: '"Lia"', text: 'é o argumento enviado na primeira chamada' },
          { token: '"Max"', text: 'é o argumento enviado na segunda chamada' },
        ],
      },
      {
        id: 'parameter-multiple',
        label: 'Vários dados',
        title: 'Uma função pode receber mais de um parâmetro',
        body: 'Separe parâmetros por vírgula. Na chamada, envie os argumentos na mesma ordem para que cada valor chegue ao parâmetro correto.',
        code: 'function mostrarPontuacao(nome, pontos) {\n  console.log(`${nome} tem ${pontos} XP`);\n}\n\nmostrarPontuacao("Max", 45);',
        notes: [
          { token: 'nome, pontos', text: 'são os dois parâmetros esperados' },
          { token: '"Max", 45', text: 'são os argumentos enviados na ordem certa' },
          { token: '${pontos}', text: 'insere o valor recebido no texto' },
        ],
      },
      {
        id: 'parameter-default',
        label: 'Valor padrão',
        title: 'Parâmetros podem ter um valor padrão',
        body: 'Um valor padrão é usado quando nenhum argumento é enviado para aquele parâmetro. Isso torna a função mais segura e prática de chamar.',
        code: 'function ganharXp(quantidade = 5) {\n  console.log(`+${quantidade} XP`);\n}\n\nganharXp();\nganharXp(10);',
        notes: [
          { token: 'quantidade = 5', text: 'usa 5 quando não houver argumento' },
          { token: 'ganharXp()', text: 'mostra +5 XP' },
          { token: 'ganharXp(10)', text: 'substitui o padrão por 10' },
        ],
      },
      {
        id: 'parameter-project',
        label: 'Em um projeto',
        title: 'Validando uma resposta do quiz',
        body: 'Uma mesma função pode validar qualquer pergunta e resposta. Os parâmetros tornam a lógica reaproveitável em todas as aulas.',
        code: 'function verificarResposta(resposta, correta) {\n  return resposta === correta;\n}\n\nverificarResposta(2, 2); // true',
        tip: 'A palavra return será aprofundada na próxima aula.',
      },
    ],
    questions: [
      { id: 'parameters-q1', prompt: 'O que é um parâmetro?', options: ['Nome que recebe um valor na função', 'Resultado do console', 'Tipo de loop'], answer: 0, explanation: 'Parâmetros são variáveis declaradas entre os parênteses da função.' },
      { id: 'parameters-q2', prompt: 'O que é "Ana" em cumprimentar("Ana")?', options: ['Argumento', 'Parâmetro', 'Retorno'], answer: 0, explanation: 'O valor enviado na chamada é chamado de argumento.' },
      { id: 'parameters-q3', prompt: 'Quando o valor padrão é usado?', options: ['Quando não há argumento', 'Sempre', 'Quando existe return'], answer: 0, explanation: 'O padrão cobre chamadas que não enviam aquele argumento.' },
    ],
  },
  {
    id: 'js-return',
    title: 'Retornando resultados',
    subtitle: 'Faça a função entregar um valor para fora.',
    duration: '11 min',
    eyebrow: 'JAVASCRIPT · FUNÇÕES · AULA 3',
    pages: [
      {
        id: 'return-concept',
        label: 'Conceito',
        title: 'return devolve o resultado da função',
        body: 'console.log apenas mostra algo no console. return entrega um valor para o ponto onde a função foi chamada, permitindo guardar, calcular ou usar o resultado depois.',
        code: 'function somar(a, b) {\n  return a + b;\n}\n\nconst total = somar(4, 6);\nconsole.log(total); // 10',
        notes: [
          { token: 'return a + b', text: 'devolve o resultado da soma' },
          { token: 'somar(4, 6)', text: 'produz o valor 10' },
          { token: 'const total', text: 'guarda o valor retornado' },
        ],
      },
      {
        id: 'return-stop',
        label: 'Atenção',
        title: 'return também encerra a função',
        body: 'Depois de executar return, a função termina imediatamente. Linhas escritas depois dele não serão executadas.',
        code: 'function exemplo() {\n  return "pronto";\n  console.log("esta linha não roda");\n}',
        tip: 'Coloque o return no momento em que a função já possui o resultado que precisa entregar.',
      },
      {
        id: 'return-condition',
        label: 'Com decisões',
        title: 'return combina muito bem com if',
        body: 'Uma função pode retornar valores diferentes conforme uma condição. Isso ajuda a separar uma regra de negócio do restante da interface.',
        code: 'function podeEstudar(minutos) {\n  if (minutos >= 10) {\n    return true;\n  }\n\n  return false;\n}',
        notes: [
          { token: 'minutos >= 10', text: 'é a regra avaliada' },
          { token: 'return true', text: 'encerra cedo quando a regra é atendida' },
          { token: 'return false', text: 'é a alternativa para os demais casos' },
        ],
      },
      {
        id: 'return-project',
        label: 'Em um projeto',
        title: 'Calculando a recompensa de uma aula',
        body: 'Uma função de cálculo pode receber os acertos e devolver o XP. O restante do app apenas usa esse resultado para atualizar o perfil.',
        code: 'function calcularXp(acertos) {\n  return acertos * 5;\n}\n\nconst xpGanho = calcularXp(3); // 15',
        notes: [
          { token: 'acertos * 5', text: 'transforma a entrada em uma recompensa' },
          { token: 'xpGanho', text: 'guarda o valor devolvido pela função' },
        ],
      },
    ],
    questions: [
      { id: 'return-q1', prompt: 'Qual a diferença principal entre return e console.log?', options: ['return devolve um valor; console.log exibe', 'Não existe diferença', 'console.log encerra a função'], answer: 0, explanation: 'return produz um valor utilizável pela chamada; console.log serve para exibir no console.' },
      { id: 'return-q2', prompt: 'O que ocorre depois de return?', options: ['A função termina', 'O loop começa', 'Os parâmetros mudam'], answer: 0, explanation: 'return encerra a execução daquela função.' },
      { id: 'return-q3', prompt: 'Qual valor somar(2, 3) devolve se retorna a + b?', options: ['5', '23', 'undefined'], answer: 0, explanation: 'A função soma os dois numbers e retorna 5.' },
    ],
  },
  {
    id: 'js-escopo-arrow',
    title: 'Escopo e arrow functions',
    subtitle: 'Entenda onde variáveis existem e conheça a sintaxe curta.',
    duration: '12 min',
    eyebrow: 'JAVASCRIPT · FUNÇÕES · AULA 4',
    pages: [
      {
        id: 'scope-concept',
        label: 'Escopo',
        title: 'Variáveis locais vivem dentro da função',
        body: 'Parâmetros e variáveis criadas dentro de uma função são locais: só podem ser acessados naquele bloco. Isso evita que partes do programa interfiram umas nas outras.',
        code: 'function mostrarNivel() {\n  const nivel = 3;\n  console.log(nivel);\n}\n\nmostrarNivel();\n// nivel não existe aqui fora',
        notes: [
          { token: 'const nivel', text: 'é criada no escopo da função' },
          { token: 'console.log(nivel)', text: 'funciona dentro da função' },
          { token: 'fora', text: 'a variável não pode ser acessada' },
        ],
      },
      {
        id: 'arrow-basic',
        label: 'Sintaxe moderna',
        title: 'Arrow function é uma forma curta de escrever função',
        body: 'Arrow functions usam =>. Elas são muito comuns em React e em métodos de arrays. Para tarefas simples, a sintaxe pode ficar mais enxuta.',
        code: 'const dobrar = (numero) => {\n  return numero * 2;\n};\n\nconsole.log(dobrar(4)); // 8',
        notes: [
          { token: 'const dobrar', text: 'guarda a função em uma constante' },
          { token: '(numero)', text: 'declara o parâmetro' },
          { token: '=>', text: 'indica que é uma arrow function' },
        ],
      },
      {
        id: 'arrow-short',
        label: 'Forma curta',
        title: 'Um retorno simples pode ficar em uma linha',
        body: 'Quando a função possui apenas uma expressão para retornar, podemos remover chaves e a palavra return. O valor da expressão é devolvido automaticamente.',
        code: 'const dobrar = numero => numero * 2;\n\nconst resultado = dobrar(5); // 10',
        notes: [
          { token: 'numero =>', text: 'pode omitir parênteses com um único parâmetro' },
          { token: 'numero * 2', text: 'é retornado implicitamente' },
        ],
        tip: 'Para lógicas maiores, prefira chaves e return explícito para manter a leitura clara.',
      },
      {
        id: 'arrow-project',
        label: 'Preparação para React',
        title: 'Funções de resposta a eventos',
        body: 'Em interfaces, uma função pode ser chamada quando o usuário toca em um botão. No React e React Native, arrow functions aparecem bastante nesses eventos.',
        code: 'const iniciarAula = () => {\n  console.log("Aula iniciada");\n};\n\niniciarAula();',
        tip: 'No próximo curso, React, você verá funções conectadas diretamente a botões e componentes.',
      },
    ],
    questions: [
      { id: 'scope-q1', prompt: 'Onde uma variável criada dentro de uma função pode ser usada?', options: ['Dentro daquela função', 'Em qualquer arquivo automaticamente', 'Somente em loops'], answer: 0, explanation: 'Ela pertence ao escopo local da função.' },
      { id: 'scope-q2', prompt: 'Qual símbolo identifica uma arrow function?', options: ['=>', '===', '++'], answer: 0, explanation: '=> é a seta usada na sintaxe de arrow functions.' },
      { id: 'scope-q3', prompt: 'Na forma numero => numero * 2, o que é retornado?', options: ['numero * 2', 'undefined', 'numero =>'], answer: 0, explanation: 'Uma expressão sem chaves em arrow function é retornada automaticamente.' },
    ],
  },
  {
    id: 'js-desafio-funcoes',
    title: 'Desafio das funções',
    subtitle: 'Crie ferramentas para calcular e mostrar um resultado.',
    duration: '13 min',
    eyebrow: 'JAVASCRIPT · FUNÇÕES · DESAFIO FINAL',
    pages: [
      {
        id: 'functions-challenge-mission',
        label: 'Missão',
        title: 'Monte um sistema simples de XP',
        body: 'Você criará uma função que calcula XP e outra que prepara uma mensagem. Assim, cada tarefa do programa possui uma responsabilidade bem definida.',
        analogy: { icon: '⚙️', title: 'Entrada → função → resultado', value: 'A função recebe dados e devolve uma resposta útil' },
      },
      {
        id: 'functions-challenge-calc',
        label: 'Etapa 1',
        title: 'Retorne o XP calculado',
        body: 'A função recebe o número de acertos pelo parâmetro e devolve o resultado. Ela não precisa conhecer a tela ou o jogador, somente executar seu cálculo.',
        code: 'function calcularXp(acertos) {\n  return acertos * 5;\n}\n\nconst xp = calcularXp(4);',
        notes: [
          { token: 'acertos', text: 'é a entrada recebida' },
          { token: 'return acertos * 5', text: 'devolve o XP calculado' },
          { token: 'const xp', text: 'guarda o resultado retornado: 20' },
        ],
      },
      {
        id: 'functions-challenge-message',
        label: 'Etapa 2',
        title: 'Use uma arrow function para a mensagem',
        body: 'A segunda função recebe o nome e o XP, depois retorna uma mensagem pronta para mostrar ao jogador.',
        code: 'const criarMensagem = (nome, xp) => {\n  return `${nome}, você ganhou ${xp} XP!`;\n};\n\nconsole.log(criarMensagem("Max", xp));',
        notes: [
          { token: 'nome, xp', text: 'são os parâmetros da mensagem' },
          { token: 'return', text: 'entrega o texto final' },
          { token: 'criarMensagem', text: 'reaproveita a mesma lógica para qualquer jogador' },
        ],
      },
    ],
    questions: [
      { id: 'functions-challenge-q1', prompt: 'Para que serve um parâmetro?', options: ['Receber dados na função', 'Encerrar um loop', 'Criar uma string'], answer: 0, explanation: 'Parâmetros permitem que a função trabalhe com valores enviados na chamada.' },
      { id: 'functions-challenge-q2', prompt: 'Qual palavra devolve um valor para quem chamou a função?', options: ['return', 'break', 'const'], answer: 0, explanation: 'return entrega o resultado e encerra a função.' },
      { id: 'functions-challenge-q3', prompt: 'Qual é uma arrow function válida?', options: ['const soma = (a, b) => a + b', 'function => soma()', 'const soma = return'], answer: 0, explanation: 'A arrow function combina uma variável, parâmetros e =>.' },
      { id: 'functions-challenge-q4', prompt: 'O que calcularXp(3) retorna se a função usa acertos * 5?', options: ['8', '15', '35'], answer: 1, explanation: '3 multiplicado por 5 é 15.' },
      { id: 'functions-challenge-q5', prompt: 'Por que separar calcularXp e criarMensagem?', options: ['Cada função cuida de uma tarefa', 'Para criar mais loops', 'Para impedir return'], answer: 0, explanation: 'Separar responsabilidades deixa o código mais organizado, testável e reutilizável.' },
    ],
  },
];

export const arrayLessons = [
  {
    id: 'js-arrays-intro',
    title: 'Criando listas com arrays',
    subtitle: 'Guarde vários valores em uma mesma variável.',
    duration: '11 min',
    eyebrow: 'JAVASCRIPT · ARRAYS · AULA 1',
    pages: [
      { id: 'array-concept', label: 'Conceito', title: 'Um array organiza uma coleção de valores', body: 'Arrays são listas ordenadas. Em vez de criar uma variável para cada tarefa, você pode reunir todas dentro de uma única lista.', analogy: { icon: '📋', title: 'Array: uma lista ordenada', value: 'Cada item ocupa uma posição começando em zero' } },
      {
        id: 'array-create', label: 'Código explicado', title: 'Criando e lendo um array', body: 'Colchetes criam o array e vírgulas separam os itens. Para acessar um valor, escrevemos a posição entre colchetes depois do nome.',
        code: "const tarefas = ['Estudar', 'Praticar', 'Descansar'];\n\nconsole.log(tarefas[0]); // Estudar",
        notes: [{ token: '[ ]', text: 'delimitam a lista' }, { token: 'tarefas', text: 'é a variável que guarda a coleção' }, { token: '[0]', text: 'acessa a primeira posição' }, { token: 'índice 0', text: 'arrays começam a contar do zero' }],
      },
      {
        id: 'array-index', label: 'Posições', title: 'O último índice é sempre um a menos', body: 'Uma lista com três itens possui índices 0, 1 e 2. Pedir uma posição que não existe devolve undefined.',
        code: "const cores = ['roxo', 'azul', 'verde'];\ncores[0]; // roxo\ncores[2]; // verde\ncores[3]; // undefined",
        tip: 'Confundir quantidade com índice é um dos erros mais comuns ao começar com arrays.',
      },
      {
        id: 'array-length', label: 'Ferramenta', title: 'length informa a quantidade de itens', body: 'A propriedade length devolve o total de elementos do array. Ela é útil em resumos, validações e loops.',
        code: "const modulos = ['Fundamentos', 'Decisões', 'Loops'];\nconst total = modulos.length;\nconsole.log(total); // 3",
        notes: [{ token: 'modulos.length', text: 'consulta quantos itens existem' }, { token: 'total', text: 'guarda o número 3' }],
      },
    ],
    questions: [
      { id: 'arrays-intro-q1', prompt: 'Em qual índice está o primeiro item de um array?', options: ['0', '1', '-1'], answer: 0, explanation: 'Arrays JavaScript começam no índice 0.' },
      { id: 'arrays-intro-q2', prompt: 'O que lista.length retorna?', options: ['A quantidade de itens', 'O primeiro item', 'O último índice'], answer: 0, explanation: 'length informa o total de elementos armazenados.' },
      { id: 'arrays-intro-q3', prompt: 'Qual sintaxe cria um array?', options: ['["A", "B"]', '("A", "B")', '{"A", "B"}'], answer: 0, explanation: 'Colchetes delimitam um array literal.' },
    ],
  },
  {
    id: 'js-arrays-metodos', title: 'Alterando listas', subtitle: 'Adicione e remova itens conscientemente.', duration: '12 min', eyebrow: 'JAVASCRIPT · ARRAYS · AULA 2',
    pages: [
      {
        id: 'array-push-pop', label: 'Fim da lista', title: 'push adiciona; pop remove o último', body: 'push inclui um valor no final e pop remove o último valor. Ambos alteram o array original.',
        code: "const tarefas = ['Estudar'];\ntarefas.push('Praticar');\ntarefas.pop();\nconsole.log(tarefas); // ['Estudar']",
        notes: [{ token: 'push', text: 'adiciona Praticar no final' }, { token: 'pop', text: 'remove o último item da lista' }, { token: 'tarefas', text: 'é alterado pelas duas operações' }],
      },
      {
        id: 'array-unshift-shift', label: 'Início da lista', title: 'unshift adiciona; shift remove o primeiro', body: 'unshift e shift trabalham no início do array. Use com cuidado em listas grandes, mas são ótimos para entender como manipular as extremidades.',
        code: "const fila = ['Lia', 'Max'];\nfila.unshift('Ana');\nfila.shift();\nconsole.log(fila); // ['Lia', 'Max']",
        notes: [{ token: 'unshift', text: 'coloca Ana na primeira posição' }, { token: 'shift', text: 'remove o primeiro item atual' }],
      },
      {
        id: 'array-splice', label: 'Posição específica', title: 'splice remove ou adiciona em uma posição', body: 'splice recebe a posição inicial e a quantidade de itens a remover. Também pode receber novos itens para inserir naquele lugar.',
        code: "const aulas = ['Variáveis', 'Tipos', 'Operadores'];\naulas.splice(1, 1);\nconsole.log(aulas); // ['Variáveis', 'Operadores']",
        notes: [{ token: '1', text: 'é o índice inicial: Tipos' }, { token: '1', text: 'é a quantidade de itens removidos' }, { token: 'splice', text: 'altera o array original' }],
        tip: 'Quando precisar preservar o array original, prefira métodos que retornam uma nova lista, como filter e map.',
      },
      {
        id: 'array-mutation-project', label: 'Em um projeto', title: 'Adicionando uma nova tarefa', body: 'Uma lista de tarefas recebe o texto digitado e adiciona esse valor à coleção. Em React, faremos isso criando uma nova lista em vez de alterar a existente diretamente.',
        code: "const tarefas = ['Estudar JS'];\ntarefas.push('Criar um projeto');\nconsole.log(tarefas.length); // 2",
        tip: 'Por enquanto, observe o efeito dos métodos. Mais à frente veremos padrões imutáveis usados no React.',
      },
    ],
    questions: [
      { id: 'arrays-methods-q1', prompt: 'Qual método adiciona um item ao fim?', options: ['push', 'pop', 'shift'], answer: 0, explanation: 'push coloca um novo elemento no final do array.' },
      { id: 'arrays-methods-q2', prompt: 'Qual método remove o primeiro item?', options: ['shift', 'unshift', 'find'], answer: 0, explanation: 'shift remove e retorna o primeiro elemento.' },
      { id: 'arrays-methods-q3', prompt: 'splice altera o array original?', options: ['Sim', 'Não', 'Somente com strings'], answer: 0, explanation: 'splice é um método mutável: ele modifica a lista em que foi chamado.' },
    ],
  },
  {
    id: 'js-arrays-map-filter-find', title: 'map, filter e find', subtitle: 'Transforme, selecione e encontre valores.', duration: '14 min', eyebrow: 'JAVASCRIPT · ARRAYS · AULA 3',
    pages: [
      {
        id: 'array-map', label: 'Transformação', title: 'map cria uma nova lista transformada', body: 'map chama uma função para cada item e monta um novo array com os resultados. O array original continua intacto.',
        code: 'const pontos = [5, 10, 15];\nconst dobrados = pontos.map(ponto => ponto * 2);\n\nconsole.log(dobrados); // [10, 20, 30]',
        notes: [{ token: 'map', text: 'percorre todos os itens' }, { token: 'ponto => ponto * 2', text: 'transforma cada valor' }, { token: 'dobrados', text: 'é o novo array retornado' }],
      },
      {
        id: 'array-filter', label: 'Seleção', title: 'filter cria uma lista com itens aprovados', body: 'filter também percorre o array, mas mantém apenas os itens cuja condição retorna true. É excelente para buscas e listas por status.',
        code: 'const notas = [4, 7, 9, 5];\nconst aprovadas = notas.filter(nota => nota >= 6);\n\nconsole.log(aprovadas); // [7, 9]',
        notes: [{ token: 'filter', text: 'testa cada item' }, { token: 'nota >= 6', text: 'é a regra para manter o item' }, { token: 'aprovadas', text: 'recebe somente os valores que passaram' }],
      },
      {
        id: 'array-find', label: 'Busca', title: 'find devolve o primeiro item encontrado', body: 'find procura o primeiro valor que atende à condição. Diferente de filter, ele devolve um único item, ou undefined quando não encontra nenhum.',
        code: "const linguagens = ['HTML', 'CSS', 'JavaScript'];\nconst encontrada = linguagens.find(item => item === 'JavaScript');\n\nconsole.log(encontrada); // JavaScript",
        notes: [{ token: 'find', text: 'para na primeira correspondência' }, { token: 'item === JavaScript', text: 'é a condição de busca' }, { token: 'encontrada', text: 'recebe o item ou undefined' }],
      },
      {
        id: 'array-choice', label: 'Escolha', title: 'Transformar, filtrar ou encontrar?', body: 'Use map para criar uma versão transformada de todos os itens. Use filter para manter vários itens. Use find quando precisa apenas do primeiro item compatível.',
        analogy: { icon: '🧪', title: 'map transforma · filter seleciona · find encontra', value: 'Cada método devolve um resultado diferente' },
      },
    ],
    questions: [
      { id: 'arrays-hof-q1', prompt: 'Qual método transforma todos os itens e retorna uma nova lista?', options: ['map', 'find', 'pop'], answer: 0, explanation: 'map aplica uma transformação a cada item.' },
      { id: 'arrays-hof-q2', prompt: 'Qual método mantém todos os itens que passam em uma condição?', options: ['filter', 'find', 'shift'], answer: 0, explanation: 'filter cria uma lista somente com os elementos aprovados.' },
      { id: 'arrays-hof-q3', prompt: 'Se find não encontra um item, ele retorna:', options: ['undefined', '[]', 'false sempre'], answer: 0, explanation: 'find devolve undefined quando nenhum elemento satisfaz a condição.' },
    ],
  },
  {
    id: 'js-arrays-loops', title: 'Arrays e loops', subtitle: 'Percorra listas com controle e clareza.', duration: '10 min', eyebrow: 'JAVASCRIPT · ARRAYS · AULA 4',
    pages: [
      {
        id: 'array-forof', label: 'Revisão aplicada', title: 'for...of lê cada item do array', body: 'A combinação de arrays com for...of é ideal quando você quer executar uma ação para todos os valores, como mostrar uma lista de módulos.',
        code: "const modulos = ['Fundamentos', 'Decisões', 'Loops'];\n\nfor (const modulo of modulos) {\n  console.log(`Estudar: ${modulo}`);\n}",
        notes: [{ token: 'modulo of modulos', text: 'entrega um item por vez' }, { token: 'console.log', text: 'é executado para todos os módulos' }],
      },
      {
        id: 'array-index-loop', label: 'Com índice', title: 'for permite acessar posição e item', body: 'Quando a posição é importante, use um contador e length como limite. O contador começa em zero e segue enquanto for menor que o tamanho da lista.',
        code: "const aulas = ['Variáveis', 'Tipos'];\n\nfor (let indice = 0; indice < aulas.length; indice++) {\n  console.log(`${indice + 1}. ${aulas[indice]}`);\n}",
        notes: [{ token: 'indice < aulas.length', text: 'impede acessar uma posição inexistente' }, { token: 'aulas[indice]', text: 'lê o item na posição atual' }, { token: 'indice + 1', text: 'mostra posições amigáveis a partir de 1' }],
      },
      {
        id: 'array-project', label: 'Em um projeto', title: 'Contando tarefas concluídas', body: 'filter pode selecionar apenas tarefas concluídas e length revela a quantidade. Esse padrão aparece em painéis, contadores e metas.',
        code: 'const concluidas = [true, false, true, true];\nconst feitas = concluidas.filter(status => status === true);\nconsole.log(feitas.length); // 3',
        tip: 'Quando chegarmos a Objetos, cada tarefa terá texto, status e outros dados juntos.',
      },
    ],
    questions: [
      { id: 'arrays-loops-q1', prompt: 'Qual condição é segura para percorrer todos os índices?', options: ['i < lista.length', 'i <= lista.length', 'i === lista.length'], answer: 0, explanation: 'O último índice válido é length - 1, então i deve ser menor que length.' },
      { id: 'arrays-loops-q2', prompt: 'O que lista[indice] acessa?', options: ['O item na posição atual', 'O tamanho da lista', 'Uma nova lista'], answer: 0, explanation: 'Colchetes com o índice selecionam o elemento daquela posição.' },
      { id: 'arrays-loops-q3', prompt: 'Como contar itens aprovados por filter?', options: ['resultado.length', 'resultado.push()', 'resultado.find()'], answer: 0, explanation: 'filter devolve uma nova lista; length informa quantos itens ela contém.' },
    ],
  },
  {
    id: 'js-desafio-arrays', title: 'Desafio dos arrays', subtitle: 'Organize aulas e encontre o próximo estudo.', duration: '13 min', eyebrow: 'JAVASCRIPT · ARRAYS · DESAFIO FINAL',
    pages: [
      { id: 'arrays-challenge-mission', label: 'Missão', title: 'Monte um painel de estudos', body: 'Você usará uma lista de aulas, filter para selecionar as pendentes e find para localizar a primeira aula disponível.', analogy: { icon: '🗂️', title: 'Projeto: fila de estudos', value: 'Lista completa → pendentes → próxima aula' } },
      {
        id: 'arrays-challenge-filter', label: 'Etapa 1', title: 'Selecione as aulas pendentes', body: 'Cada item contém um status booleano. filter mantém somente as aulas cuja condição concluida === false é verdadeira.',
        code: 'const aulas = [\n  { titulo: "Variáveis", concluida: true },\n  { titulo: "Arrays", concluida: false },\n  { titulo: "Objetos", concluida: false },\n];\n\nconst pendentes = aulas.filter(aula => aula.concluida === false);',
        notes: [{ token: 'aulas', text: 'é uma lista de objetos de estudo' }, { token: 'filter', text: 'cria uma nova lista somente com pendentes' }, { token: 'aula.concluida', text: 'acessa o status de cada item' }],
      },
      {
        id: 'arrays-challenge-find', label: 'Etapa 2', title: 'Encontre a próxima aula', body: 'find devolve apenas o primeiro item pendente. Com ele, o aplicativo pode destacar automaticamente o próximo conteúdo para estudar.',
        code: 'const proximaAula = aulas.find(aula => aula.concluida === false);\n\nconsole.log(proximaAula.titulo); // Arrays',
        notes: [{ token: 'find', text: 'para na primeira aula pendente' }, { token: 'proximaAula', text: 'recebe o objeto encontrado' }, { token: '.titulo', text: 'lê o título desse objeto' }],
      },
    ],
    questions: [
      { id: 'arrays-challenge-q1', prompt: 'Qual estrutura guarda vários itens ordenados?', options: ['Array', 'Boolean', 'Return'], answer: 0, explanation: 'Arrays organizam coleções ordenadas de valores.' },
      { id: 'arrays-challenge-q2', prompt: 'Qual método encontra apenas a primeira aula pendente?', options: ['find', 'filter', 'map'], answer: 0, explanation: 'find devolve o primeiro item que satisfaz a condição.' },
      { id: 'arrays-challenge-q3', prompt: 'Qual método geraria uma lista somente com aulas pendentes?', options: ['filter', 'pop', 'length'], answer: 0, explanation: 'filter mantém todos os itens que passam pela condição.' },
      { id: 'arrays-challenge-q4', prompt: 'Qual índice acessa o segundo item?', options: ['0', '1', '2'], answer: 1, explanation: 'O primeiro item está em 0, então o segundo está em 1.' },
      { id: 'arrays-challenge-q5', prompt: 'Qual método adiciona uma aula ao fim da lista?', options: ['push', 'shift', 'find'], answer: 0, explanation: 'push insere um novo item no final do array.' },
    ],
  },
];

export const objectLessons = [
  {
    id: 'js-objetos-intro', title: 'Criando objetos', subtitle: 'Agrupe informações relacionadas em um único valor.', duration: '11 min', eyebrow: 'JAVASCRIPT · OBJETOS · AULA 1',
    pages: [
      { id: 'object-concept', label: 'Conceito', title: 'Um objeto descreve uma coisa', body: 'Arrays organizam uma lista de itens. Objetos organizam detalhes sobre um único item por meio de pares propriedade e valor.', analogy: { icon: '🪪', title: 'Objeto: ficha completa', value: 'Uma tarefa pode ter título, status e pontos' } },
      {
        id: 'object-create', label: 'Código explicado', title: 'Propriedades guardam detalhes', body: 'Chaves delimitam o objeto. Cada propriedade possui um nome, dois-pontos e um valor. Vírgulas separam as propriedades.',
        code: 'const aluno = {\n  nome: "Max",\n  pontos: 40,\n  ativo: true,\n};',
        notes: [{ token: '{ }', text: 'delimitam o objeto' }, { token: 'nome', text: 'é uma propriedade' }, { token: ': "Max"', text: 'é o valor da propriedade' }, { token: 'ativo: true', text: 'guarda um boolean relacionado ao aluno' }],
      },
      {
        id: 'object-access', label: 'Acesso', title: 'Use ponto para ler uma propriedade', body: 'A notação de ponto é a forma mais comum de acessar um valor quando você conhece o nome da propriedade.',
        code: 'const tarefa = {\n  titulo: "Estudar arrays",\n  concluida: false,\n};\n\nconsole.log(tarefa.titulo); // Estudar arrays',
        notes: [{ token: 'tarefa.titulo', text: 'lê o valor da propriedade titulo' }, { token: 'tarefa.concluida', text: 'leria o boolean false' }],
      },
      {
        id: 'object-update', label: 'Atualização', title: 'Propriedades podem ser atualizadas', body: 'Mesmo quando o objeto está em uma const, suas propriedades podem mudar. const impede reatribuir o objeto inteiro, não alterar seus detalhes.',
        code: 'const tarefa = { titulo: "Estudar", concluida: false };\ntarefa.concluida = true;\n\nconsole.log(tarefa.concluida); // true',
        tip: 'Em React, aprenderemos a criar uma cópia atualizada do objeto em vez de alterá-lo diretamente.',
      },
    ],
    questions: [
      { id: 'objects-intro-q1', prompt: 'Qual estrutura descreve detalhes de uma única tarefa?', options: ['Objeto', 'Loop', 'Return'], answer: 0, explanation: 'Objetos reúnem propriedades que descrevem uma entidade.' },
      { id: 'objects-intro-q2', prompt: 'Como acessar a propriedade nome do objeto aluno?', options: ['aluno.nome', 'aluno[nome sem aspas]', 'nome.aluno'], answer: 0, explanation: 'A notação de ponto acessa propriedades pelo nome conhecido.' },
      { id: 'objects-intro-q3', prompt: 'Um objeto em const pode ter uma propriedade alterada?', options: ['Sim', 'Não', 'Somente se for array'], answer: 0, explanation: 'const bloqueia a reatribuição da variável, não a alteração das propriedades internas.' },
    ],
  },
  {
    id: 'js-objetos-metodos', title: 'Métodos de objetos', subtitle: 'Dê comportamentos aos seus dados.', duration: '11 min', eyebrow: 'JAVASCRIPT · OBJETOS · AULA 2',
    pages: [
      {
        id: 'method-concept', label: 'Conceito', title: 'Método é uma função dentro do objeto', body: 'Além de dados, um objeto pode conter comportamentos. Uma propriedade cujo valor é uma função recebe o nome de método.',
        code: 'const jogador = {\n  nome: "Max",\n  cumprimentar() {\n    console.log("Olá!");\n  },\n};\n\njogador.cumprimentar();',
        notes: [{ token: 'cumprimentar()', text: 'é um método do objeto' }, { token: 'jogador.cumprimentar()', text: 'chama esse método' }, { token: 'console.log', text: 'é a ação realizada' }],
      },
      {
        id: 'method-this', label: 'Acesso interno', title: 'this representa o objeto atual', body: 'Dentro de um método, this permite acessar as propriedades do mesmo objeto. Assim, o método funciona com os dados que pertencem àquele item.',
        code: 'const aluno = {\n  nome: "Max",\n  apresentar() {\n    return `Olá, eu sou ${this.nome}`;\n  },\n};',
        notes: [{ token: 'this', text: 'representa o objeto aluno durante a chamada' }, { token: 'this.nome', text: 'lê a propriedade nome do próprio objeto' }, { token: 'return', text: 'devolve a mensagem pronta' }],
        tip: 'Arrow functions tratam this de outra forma; para métodos comuns, a sintaxe de método é mais simples neste momento.',
      },
      {
        id: 'method-project', label: 'Em um projeto', title: 'Uma tarefa pode alterar o próprio status', body: 'Um método pode encapsular uma ação ligada ao objeto. Aqui a tarefa sabe como marcar a si mesma como concluída.',
        code: 'const tarefa = {\n  titulo: "Estudar objetos",\n  concluida: false,\n  concluir() {\n    this.concluida = true;\n  },\n};\n\ntarefa.concluir();',
        notes: [{ token: 'concluir()', text: 'é a ação associada à tarefa' }, { token: 'this.concluida', text: 'altera o status da própria tarefa' }],
      },
    ],
    questions: [
      { id: 'objects-methods-q1', prompt: 'O que é um método?', options: ['Função dentro de um objeto', 'Índice de um array', 'Tipo de string'], answer: 0, explanation: 'Métodos são propriedades que guardam funções.' },
      { id: 'objects-methods-q2', prompt: 'Em um método, this.nome acessa:', options: ['A propriedade nome do objeto atual', 'Uma variável global sempre', 'O último array'], answer: 0, explanation: 'this referencia o objeto usado na chamada do método.' },
      { id: 'objects-methods-q3', prompt: 'Como chamar o método salvar do objeto progresso?', options: ['progresso.salvar()', 'salvar.progresso()', 'progresso[salvar]'], answer: 0, explanation: 'Use a notação de ponto seguida de parênteses para chamar um método.' },
    ],
  },
  {
    id: 'js-objetos-desestruturacao', title: 'Desestruturação e cópias', subtitle: 'Extraia dados e atualize objetos com clareza.', duration: '12 min', eyebrow: 'JAVASCRIPT · OBJETOS · AULA 3',
    pages: [
      {
        id: 'destructure-concept', label: 'Desestruturação', title: 'Extraia propriedades em variáveis', body: 'A desestruturação permite criar variáveis usando os nomes das propriedades de um objeto. Isso deixa o código mais direto quando você precisa de vários valores.',
        code: 'const aluno = { nome: "Max", pontos: 40 };\nconst { nome, pontos } = aluno;\n\nconsole.log(nome); // Max',
        notes: [{ token: '{ nome, pontos }', text: 'cria duas variáveis com esses nomes' }, { token: '= aluno', text: 'informa o objeto de origem' }, { token: 'nome', text: 'recebe aluno.nome' }],
      },
      {
        id: 'destructure-alias', label: 'Outro nome', title: 'Você pode renomear uma propriedade extraída', body: 'Quando o nome da propriedade não combina com a variável desejada, use dois-pontos para criar um apelido durante a desestruturação.',
        code: 'const perfil = { nome: "Max" };\nconst { nome: nomeDoAluno } = perfil;\n\nconsole.log(nomeDoAluno);',
        notes: [{ token: 'nome:', text: 'é a propriedade lida no objeto' }, { token: 'nomeDoAluno', text: 'é a nova variável criada' }],
      },
      {
        id: 'spread-copy', label: 'Cópia', title: 'Spread cria uma cópia com alterações', body: 'O operador ... copia propriedades para um novo objeto. Ele é muito usado em React porque preserva os dados anteriores e cria uma versão atualizada.',
        code: 'const tarefa = { titulo: "Estudar", concluida: false };\nconst atualizada = { ...tarefa, concluida: true };\n\nconsole.log(atualizada);',
        notes: [{ token: '...tarefa', text: 'copia as propriedades existentes' }, { token: 'concluida: true', text: 'substitui somente essa propriedade na cópia' }, { token: 'atualizada', text: 'é um novo objeto' }],
      },
      { id: 'spread-project', label: 'Preparação para React', title: 'Atualizando dados sem alterar o original', body: 'Criar cópias torna a mudança mais previsível e permite que bibliotecas de interface detectem a atualização corretamente.', analogy: { icon: '✨', title: 'Original preservado · cópia atualizada', value: 'Padrão essencial para estados no React' } },
    ],
    questions: [
      { id: 'objects-destructure-q1', prompt: 'O que const { nome } = aluno cria?', options: ['Variável nome com aluno.nome', 'Novo array', 'Método nome'], answer: 0, explanation: 'A desestruturação extrai a propriedade para uma variável.' },
      { id: 'objects-destructure-q2', prompt: 'Para que serve ...objeto em uma cópia?', options: ['Copiar propriedades', 'Encerrar função', 'Comparar números'], answer: 0, explanation: 'O spread expande as propriedades do objeto em outro objeto.' },
      { id: 'objects-destructure-q3', prompt: 'Qual objeto é alterado por { ...tarefa, concluida: true }?', options: ['O novo objeto', 'tarefa original obrigatoriamente', 'Nenhum'], answer: 0, explanation: 'A expressão cria um novo objeto com a propriedade atualizada.' },
    ],
  },
  {
    id: 'js-json', title: 'JSON e dados', subtitle: 'Converta objetos para salvar e trocar informações.', duration: '10 min', eyebrow: 'JAVASCRIPT · OBJETOS · AULA 4',
    pages: [
      {
        id: 'json-concept', label: 'Conceito', title: 'JSON é texto que representa dados', body: 'JSON é um formato de texto usado para guardar ou enviar informações. Ele se parece com um objeto, mas possui regras próprias e não contém funções.',
        code: 'const aluno = { nome: "Max", pontos: 40 };\nconst textoJson = JSON.stringify(aluno);\n\nconsole.log(textoJson);',
        notes: [{ token: 'JSON.stringify', text: 'converte objeto JavaScript em texto JSON' }, { token: 'textoJson', text: 'pode ser salvo ou enviado para uma API' }],
      },
      {
        id: 'json-parse', label: 'Conversão inversa', title: 'JSON.parse transforma texto em objeto', body: 'Quando recebemos um texto JSON, JSON.parse interpreta esse texto e devolve um valor JavaScript que podemos acessar normalmente.',
        code: 'const texto = \'{"nome":"Max","pontos":40}\';\nconst aluno = JSON.parse(texto);\n\nconsole.log(aluno.pontos); // 40',
        notes: [{ token: 'texto', text: 'é uma string em formato JSON' }, { token: 'JSON.parse', text: 'converte texto em objeto JavaScript' }, { token: 'aluno.pontos', text: 'acessa a propriedade depois da conversão' }],
      },
      {
        id: 'json-project', label: 'Em um projeto', title: 'Salvando progresso no celular', body: 'O StudyCode usa esse conceito para registrar XP e aulas concluídas no armazenamento local. Antes de salvar, os dados são convertidos em texto; ao abrir, voltam a ser objeto.',
        code: 'const progresso = { xp: 50, aulas: 3 };\nconst paraSalvar = JSON.stringify(progresso);\nconst recuperado = JSON.parse(paraSalvar);',
        tip: 'JSON.parse só funciona quando o texto possui formato JSON válido.',
      },
    ],
    questions: [
      { id: 'json-q1', prompt: 'Qual método converte objeto em texto JSON?', options: ['JSON.stringify', 'JSON.parse', 'Object.keys'], answer: 0, explanation: 'JSON.stringify prepara o objeto como texto JSON.' },
      { id: 'json-q2', prompt: 'Qual método converte texto JSON em objeto?', options: ['JSON.parse', 'JSON.stringify', 'filter'], answer: 0, explanation: 'JSON.parse interpreta uma string JSON válida.' },
      { id: 'json-q3', prompt: 'Por que JSON é útil?', options: ['Salvar e trocar dados', 'Criar loops', 'Substituir funções'], answer: 0, explanation: 'JSON é um formato comum para armazenamento e comunicação entre sistemas.' },
    ],
  },
  {
    id: 'js-desafio-objetos', title: 'Desafio dos objetos', subtitle: 'Modele e atualize uma tarefa de estudo.', duration: '13 min', eyebrow: 'JAVASCRIPT · OBJETOS · DESAFIO FINAL',
    pages: [
      { id: 'objects-challenge-mission', label: 'Missão', title: 'Crie uma tarefa completa', body: 'Você combinará propriedades, método, cópia com spread e JSON para representar uma tarefa real de estudo.', analogy: { icon: '🧠', title: 'Projeto: tarefa de estudo', value: 'Dados, comportamento, atualização e armazenamento' } },
      {
        id: 'objects-challenge-model', label: 'Etapa 1', title: 'Modele os dados e o comportamento', body: 'O objeto reúne informações e oferece um método para mostrar um resumo. this acessa os dados da própria tarefa.',
        code: 'const tarefa = {\n  titulo: "Estudar objetos",\n  concluida: false,\n  pontos: 20,\n  resumo() {\n    return `${this.titulo}: ${this.concluida}`;\n  },\n};',
        notes: [{ token: 'titulo, concluida, pontos', text: 'são propriedades da tarefa' }, { token: 'resumo()', text: 'é um método associado ao objeto' }, { token: 'this.titulo', text: 'lê o dado da tarefa atual' }],
      },
      {
        id: 'objects-challenge-update', label: 'Etapa 2', title: 'Crie uma versão concluída', body: 'Em vez de modificar o objeto original, o spread cria uma cópia e altera somente o status. Esse padrão será importante ao estudar React.',
        code: 'const concluida = { ...tarefa, concluida: true };\nconst textoParaSalvar = JSON.stringify(concluida);\n\nconsole.log(textoParaSalvar);',
        notes: [{ token: '...tarefa', text: 'copia os dados originais' }, { token: 'concluida: true', text: 'atualiza o status somente na cópia' }, { token: 'JSON.stringify', text: 'prepara o resultado para armazenamento' }],
      },
    ],
    questions: [
      { id: 'objects-challenge-q1', prompt: 'Qual estrutura agrupa titulo, status e pontos?', options: ['Objeto', 'Loop', 'String'], answer: 0, explanation: 'Um objeto reúne várias propriedades relacionadas.' },
      { id: 'objects-challenge-q2', prompt: 'Qual sintaxe acessa titulo da tarefa?', options: ['tarefa.titulo', 'titulo.tarefa', 'tarefa[titulo] sem aspas'], answer: 0, explanation: 'A notação de ponto lê uma propriedade conhecida.' },
      { id: 'objects-challenge-q3', prompt: 'Qual recurso cria uma cópia atualizada?', options: ['{ ...tarefa, concluida: true }', 'tarefa.break()', 'tarefa.length'], answer: 0, explanation: 'O spread copia as propriedades e permite sobrescrever uma delas.' },
      { id: 'objects-challenge-q4', prompt: 'O que JSON.stringify produz?', options: ['Texto JSON', 'Uma função', 'Um loop'], answer: 0, explanation: 'Ele converte um objeto JavaScript em string JSON.' },
      { id: 'objects-challenge-q5', prompt: 'Para que this é usado em tarefa.resumo()?', options: ['Acessar a própria tarefa', 'Criar um array', 'Encerrar o app'], answer: 0, explanation: 'this representa o objeto usado na chamada do método.' },
    ],
  },
];

export const browserLessons = [
  {
    id: 'js-dom-intro', title: 'Entendendo o DOM', subtitle: 'Use JavaScript para ler e alterar uma página web.', duration: '11 min', eyebrow: 'JAVASCRIPT · NAVEGADOR · AULA 1',
    pages: [
      { id: 'dom-concept', label: 'Conceito', title: 'O DOM é a representação da página', body: 'No navegador, o HTML é transformado em uma estrutura de objetos chamada DOM. JavaScript pode encontrar elementos dessa estrutura e modificar texto, estilos e atributos.', analogy: { icon: '🌳', title: 'HTML vira uma árvore de objetos', value: 'document representa a página inteira' }, tip: 'DOM é específico da web. No React Native, a interface usa componentes nativos, não document.querySelector.' },
      {
        id: 'dom-query', label: 'Código explicado', title: 'querySelector encontra um elemento', body: 'document.querySelector recebe um seletor CSS e devolve o primeiro elemento correspondente. Você pode buscar por id, classe ou nome de tag.',
        code: 'const titulo = document.querySelector("#titulo");\n\nconsole.log(titulo);',
        notes: [{ token: 'document', text: 'representa a página carregada no navegador' }, { token: 'querySelector', text: 'busca o primeiro elemento compatível' }, { token: '"#titulo"', text: 'seleciona o elemento com id titulo' }, { token: 'titulo', text: 'guarda o elemento encontrado' }],
      },
      {
        id: 'dom-selector-types', label: 'Seletores', title: 'O seletor segue a lógica do CSS', body: 'Use # antes de um id, . antes de uma classe e o nome puro para uma tag. O mesmo conhecimento de seletores CSS vale aqui.',
        code: 'document.querySelector("#menu");    // id="menu"\ndocument.querySelector(".card");   // class="card"\ndocument.querySelector("button");  // primeiro botão',
        notes: [{ token: '#', text: 'indica id' }, { token: '.', text: 'indica classe' }, { token: 'button', text: 'busca pela tag HTML' }],
      },
      {
        id: 'dom-query-all', label: 'Vários elementos', title: 'querySelectorAll encontra uma coleção', body: 'Quando vários elementos usam a mesma classe, querySelectorAll devolve uma coleção que pode ser percorrida com for...of.',
        code: 'const botoes = document.querySelectorAll(".botao-aula");\n\nfor (const botao of botoes) {\n  console.log(botao.textContent);\n}',
        notes: [{ token: 'querySelectorAll', text: 'encontra todos os elementos compatíveis' }, { token: 'for...of', text: 'percorre cada botão da coleção' }, { token: 'textContent', text: 'lê o texto de cada elemento' }],
      },
    ],
    questions: [
      { id: 'dom-intro-q1', prompt: 'O que document representa no navegador?', options: ['A página web', 'Uma variável qualquer', 'O servidor'], answer: 0, explanation: 'document oferece acesso à página e ao DOM carregado.' },
      { id: 'dom-intro-q2', prompt: 'Qual seletor busca id="menu"?', options: ['#menu', '.menu', 'menu()'], answer: 0, explanation: '# antes do nome seleciona um id.' },
      { id: 'dom-intro-q3', prompt: 'Qual função busca todos os elementos de uma classe?', options: ['querySelectorAll', 'querySelector', 'JSON.parse'], answer: 0, explanation: 'querySelectorAll devolve uma coleção com todos os elementos compatíveis.' },
    ],
  },
  {
    id: 'js-dom-alterar', title: 'Alterando a interface', subtitle: 'Mude texto, classes e atributos da página.', duration: '12 min', eyebrow: 'JAVASCRIPT · NAVEGADOR · AULA 2',
    pages: [
      {
        id: 'dom-text', label: 'Texto', title: 'textContent muda o texto de um elemento', body: 'Depois de selecionar um elemento, textContent permite ler ou substituir seu conteúdo textual. É uma forma segura e direta de atualizar mensagens na página.',
        code: 'const mensagem = document.querySelector("#mensagem");\nmensagem.textContent = "Aula concluída!";',
        notes: [{ token: 'mensagem', text: 'é o elemento selecionado' }, { token: 'textContent', text: 'representa o conteúdo em texto' }, { token: '=', text: 'substitui a mensagem atual' }],
      },
      {
        id: 'dom-class', label: 'Classes', title: 'classList controla classes CSS', body: 'classList permite adicionar, remover e alternar classes. Assim, JavaScript controla o estado e CSS define a aparência.',
        code: 'const card = document.querySelector(".card");\ncard.classList.add("concluida");\ncard.classList.remove("bloqueada");\ncard.classList.toggle("destaque");',
        notes: [{ token: 'add', text: 'inclui uma classe' }, { token: 'remove', text: 'retira uma classe' }, { token: 'toggle', text: 'adiciona se não existir ou remove se existir' }],
      },
      {
        id: 'dom-attributes', label: 'Atributos', title: 'setAttribute atualiza atributos HTML', body: 'Atributos guardam informações no elemento, como src de uma imagem, href de um link ou aria-label para acessibilidade.',
        code: 'const imagem = document.querySelector("#avatar");\nimagem.setAttribute("alt", "Avatar do aluno");\nimagem.setAttribute("src", "perfil.png");',
        notes: [{ token: 'setAttribute', text: 'define ou substitui um atributo' }, { token: 'alt', text: 'descreve imagens para acessibilidade' }, { token: 'src', text: 'informa o endereço da imagem' }],
      },
      { id: 'dom-css-javascript', label: 'Boa prática', title: 'JavaScript decide; CSS desenha', body: 'Prefira alternar classes em vez de escrever muitos estilos diretamente com JavaScript. Isso separa a lógica da aparência e facilita a manutenção.', analogy: { icon: '🎨', title: 'JavaScript: estado · CSS: visual', value: 'Uma classe pode representar “concluída”, “erro” ou “destaque”' } },
    ],
    questions: [
      { id: 'dom-change-q1', prompt: 'Qual propriedade altera o texto de um elemento?', options: ['textContent', 'length', 'return'], answer: 0, explanation: 'textContent lê ou atualiza o conteúdo textual.' },
      { id: 'dom-change-q2', prompt: 'Qual método alterna uma classe?', options: ['classList.toggle', 'classList.find', 'classList.return'], answer: 0, explanation: 'toggle adiciona ou remove uma classe conforme seu estado atual.' },
      { id: 'dom-change-q3', prompt: 'Para que serve alt em uma imagem?', options: ['Descrição acessível', 'Cor de fundo', 'Contador'], answer: 0, explanation: 'alt fornece uma alternativa textual para a imagem.' },
    ],
  },
  {
    id: 'js-eventos', title: 'Eventos e cliques', subtitle: 'Responda às ações do usuário.', duration: '13 min', eyebrow: 'JAVASCRIPT · NAVEGADOR · AULA 3',
    pages: [
      {
        id: 'event-concept', label: 'Conceito', title: 'Eventos avisam quando algo acontece', body: 'Clique, digitação, envio de formulário e movimento do mouse são eventos. addEventListener conecta uma função para responder quando o evento ocorrer.',
        code: 'const botao = document.querySelector("#iniciar");\n\nbotao.addEventListener("click", () => {\n  console.log("Aula iniciada");\n});',
        notes: [{ token: 'addEventListener', text: 'registra uma função de resposta' }, { token: '"click"', text: 'é o tipo de evento observado' }, { token: '() => { }', text: 'é a função executada após o clique' }],
      },
      {
        id: 'event-object', label: 'Informações do evento', title: 'A função pode receber o evento', body: 'O objeto event traz detalhes sobre a interação. Ele informa, por exemplo, qual elemento disparou a ação e permite controlar comportamentos do navegador.',
        code: 'botao.addEventListener("click", (event) => {\n  console.log(event.target);\n});',
        notes: [{ token: 'event', text: 'é o objeto recebido automaticamente' }, { token: 'event.target', text: 'aponta para o elemento que disparou o evento' }],
      },
      {
        id: 'event-function', label: 'Função nomeada', title: 'Funções nomeadas facilitam reutilização', body: 'Quando a lógica cresce, declarar a função separadamente deixa o código mais legível e permite remover o listener depois, se necessário.',
        code: 'function iniciarAula() {\n  console.log("Aula iniciada");\n}\n\nbotao.addEventListener("click", iniciarAula);',
        notes: [{ token: 'iniciarAula', text: 'é passada como referência, sem parênteses' }, { token: 'addEventListener', text: 'chamará a função no clique' }],
        tip: 'Escrever iniciarAula() aqui executaria a função imediatamente, em vez de esperar pelo clique.',
      },
      { id: 'event-react-native', label: 'Ligação com mobile', title: 'O conceito continua no React Native', body: 'React Native não usa addEventListener para botões, mas a ideia é idêntica: um toque chama uma função. Você verá isso com propriedades como onPress.', analogy: { icon: '📱', title: 'Web: click · React Native: onPress', value: 'O usuário age; uma função responde' } },
    ],
    questions: [
      { id: 'events-q1', prompt: 'Qual método registra uma resposta a clique?', options: ['addEventListener', 'querySelectorAll', 'JSON.stringify'], answer: 0, explanation: 'addEventListener conecta um evento a uma função.' },
      { id: 'events-q2', prompt: 'O que "click" representa?', options: ['Tipo de evento', 'Nome de variável', 'Método de array'], answer: 0, explanation: 'click é o nome do evento disparado ao clicar.' },
      { id: 'events-q3', prompt: 'Por que passar iniciarAula sem () ao listener?', options: ['Para executar só no evento', 'Para executá-la imediatamente', 'Para criar JSON'], answer: 0, explanation: 'Sem parênteses, a função é registrada para ser chamada depois.' },
    ],
  },
  {
    id: 'js-formularios-storage', title: 'Formulários e localStorage', subtitle: 'Leia dados do usuário e preserve o progresso.', duration: '14 min', eyebrow: 'JAVASCRIPT · NAVEGADOR · AULA 4',
    pages: [
      {
        id: 'form-submit', label: 'Formulário', title: 'submit representa o envio do formulário', body: 'Quando o usuário envia um formulário, o navegador tenta recarregar a página por padrão. preventDefault impede esse recarregamento para que JavaScript controle o fluxo.',
        code: 'const formulario = document.querySelector("#nova-tarefa");\n\nformulario.addEventListener("submit", (event) => {\n  event.preventDefault();\n  console.log("Formulário processado");\n});',
        notes: [{ token: 'submit', text: 'é o evento de envio' }, { token: 'preventDefault()', text: 'cancela o comportamento padrão do navegador' }, { token: 'event', text: 'fornece acesso ao evento atual' }],
      },
      {
        id: 'form-value', label: 'Entrada', title: 'value lê o texto digitado', body: 'Inputs possuem a propriedade value. trim remove espaços vazios no início e no fim antes de validar ou salvar a informação.',
        code: 'const campo = document.querySelector("#titulo");\nconst titulo = campo.value.trim();\n\nif (titulo) {\n  console.log(titulo);\n}',
        notes: [{ token: 'campo.value', text: 'lê o conteúdo digitado' }, { token: 'trim()', text: 'remove espaços extras nas extremidades' }, { token: 'if (titulo)', text: 'evita salvar uma entrada vazia' }],
      },
      {
        id: 'storage-save', label: 'Armazenamento', title: 'localStorage salva texto no navegador', body: 'localStorage guarda dados mesmo depois de fechar a página. Como ele armazena strings, objetos e arrays precisam passar por JSON.stringify antes de serem salvos.',
        code: 'const progresso = { xp: 50, aulas: 3 };\nlocalStorage.setItem("progresso", JSON.stringify(progresso));',
        notes: [{ token: 'setItem', text: 'salva um valor sob uma chave' }, { token: '"progresso"', text: 'é a chave usada para encontrar o dado depois' }, { token: 'JSON.stringify', text: 'converte o objeto para texto' }],
      },
      {
        id: 'storage-read', label: 'Recuperação', title: 'getItem recupera o texto salvo', body: 'Depois de ler o texto, JSON.parse reconstrói o objeto. Sempre verifique se existe um valor antes de tentar interpretá-lo.',
        code: 'const salvo = localStorage.getItem("progresso");\n\nif (salvo) {\n  const progresso = JSON.parse(salvo);\n  console.log(progresso.xp);\n}',
        notes: [{ token: 'getItem', text: 'lê o texto associado à chave' }, { token: 'if (salvo)', text: 'evita interpretar um valor ausente' }, { token: 'JSON.parse', text: 'transforma o texto em objeto novamente' }],
      },
    ],
    questions: [
      { id: 'forms-q1', prompt: 'Para que event.preventDefault() é usado em submit?', options: ['Impedir recarregamento padrão', 'Salvar automaticamente', 'Criar um array'], answer: 0, explanation: 'Ele evita que o navegador recarregue a página no envio.' },
      { id: 'forms-q2', prompt: 'O que input.value contém?', options: ['Texto digitado', 'A cor do input', 'A lista de eventos'], answer: 0, explanation: 'value representa o valor atual do campo.' },
      { id: 'forms-q3', prompt: 'Qual método salva um valor no localStorage?', options: ['setItem', 'getItem', 'remove'], answer: 0, explanation: 'setItem recebe a chave e o texto que será armazenado.' },
    ],
  },
  {
    id: 'js-desafio-dom', title: 'Desafio do navegador', subtitle: 'Crie uma lista de tarefas que reage ao usuário.', duration: '14 min', eyebrow: 'JAVASCRIPT · NAVEGADOR · DESAFIO FINAL',
    pages: [
      { id: 'dom-challenge-mission', label: 'Missão', title: 'Conecte HTML, evento e dados', body: 'Você unirá seleção de elementos, formulário, array e localStorage para compreender a base de uma pequena lista de tarefas web.', analogy: { icon: '🖥️', title: 'Interface web interativa', value: 'Usuário digita → JavaScript processa → DOM atualiza' } },
      {
        id: 'dom-challenge-event', label: 'Etapa 1', title: 'Capture o envio do formulário', body: 'O listener espera o envio, impede o recarregamento e lê o título digitado. Uma condição impede tarefas sem texto.',
        code: 'formulario.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const titulo = campo.value.trim();\n\n  if (!titulo) return;\n});',
        notes: [{ token: 'preventDefault', text: 'mantém a página aberta' }, { token: 'trim', text: 'limpa espaços extras' }, { token: 'if (!titulo) return', text: 'encerra a função para entradas vazias' }],
      },
      {
        id: 'dom-challenge-save', label: 'Etapa 2', title: 'Atualize e salve a lista', body: 'Depois de adicionar a tarefa à lista, JSON.stringify prepara os dados para localStorage. Ao recarregar a página, a lista pode ser recuperada.',
        code: 'tarefas.push({ titulo, concluida: false });\nlocalStorage.setItem("tarefas", JSON.stringify(tarefas));\n\nlista.textContent = `${tarefas.length} tarefas salvas`;',
        notes: [{ token: 'push', text: 'adiciona a nova tarefa ao array' }, { token: 'setItem', text: 'persiste a lista no navegador' }, { token: 'textContent', text: 'atualiza a mensagem na interface' }],
      },
    ],
    questions: [
      { id: 'dom-challenge-q1', prompt: 'Qual objeto permite selecionar elementos da página?', options: ['document', 'localStorage', 'JSON'], answer: 0, explanation: 'document representa a página e oferece querySelector.' },
      { id: 'dom-challenge-q2', prompt: 'Qual evento costuma enviar um formulário?', options: ['submit', 'click', 'load'], answer: 0, explanation: 'submit é disparado pelo envio do formulário.' },
      { id: 'dom-challenge-q3', prompt: 'Por que usamos JSON.stringify antes de localStorage.setItem?', options: ['localStorage salva texto', 'DOM exige arrays', 'querySelector precisa de JSON'], answer: 0, explanation: 'localStorage armazena strings; stringify converte dados estruturados em texto.' },
      { id: 'dom-challenge-q4', prompt: 'Qual propriedade atualiza o texto visível de um elemento?', options: ['textContent', 'event.target', 'length'], answer: 0, explanation: 'textContent lê ou substitui o conteúdo textual.' },
      { id: 'dom-challenge-q5', prompt: 'No React Native, qual conceito corresponde ao click web?', options: ['onPress', 'querySelector', 'localStorage'], answer: 0, explanation: 'Em React Native, toques normalmente chamam funções por onPress.' },
    ],
  },
];

export const asyncLessons = [
  {
    id: 'js-async-conceito', title: 'Código assíncrono', subtitle: 'Espere resultados sem travar o aplicativo.', duration: '11 min', eyebrow: 'JAVASCRIPT · APIS · AULA 1',
    pages: [
      { id: 'async-concept', label: 'Conceito', title: 'Nem toda tarefa termina imediatamente', body: 'Uma requisição à internet, a leitura de um arquivo ou um temporizador podem levar tempo. JavaScript inicia essas tarefas e continua disponível para outras ações.', analogy: { icon: '⏳', title: 'Pedido feito · resposta chega depois', value: 'O app não precisa congelar enquanto espera' } },
      {
        id: 'promise-concept', label: 'Promise', title: 'Promise representa um resultado futuro', body: 'Uma Promise é como uma promessa de resultado: ela pode estar pendente, ser concluída com sucesso ou falhar. fetch devolve uma Promise porque a rede demora.',
        code: 'const pedido = fetch("https://api.exemplo.com/aulas");\n\npedido.then(resposta => {\n  console.log("Resposta recebida");\n});',
        notes: [{ token: 'fetch', text: 'inicia uma requisição de rede' }, { token: 'Promise', text: 'representa a resposta que chegará depois' }, { token: '.then', text: 'recebe uma função para o sucesso futuro' }],
      },
      {
        id: 'async-ui', label: 'Em um app', title: 'Mostre estado enquanto espera', body: 'Uma boa interface informa que os dados estão carregando e também explica quando algo falha. Assim o usuário entende o que está acontecendo.',
        code: 'console.log("Carregando aulas...");\n// aguarda a rede\nconsole.log("Aulas prontas!");',
        tip: 'Em React Native, esse estado costuma controlar um indicador de carregamento na tela.',
      },
    ],
    questions: [
      { id: 'async-intro-q1', prompt: 'Por que uma chamada de API é assíncrona?', options: ['A resposta pode demorar', 'Ela sempre falha', 'Ela não usa JavaScript'], answer: 0, explanation: 'A rede leva tempo e a resposta não está disponível imediatamente.' },
      { id: 'async-intro-q2', prompt: 'O que fetch retorna?', options: ['Uma Promise', 'Um array sempre', 'Um boolean'], answer: 0, explanation: 'fetch inicia a requisição e retorna uma Promise para a resposta futura.' },
      { id: 'async-intro-q3', prompt: 'Qual estado deve aparecer enquanto dados chegam?', options: ['Carregando', 'Encerrado sempre', 'Sem interface'], answer: 0, explanation: 'Informar carregamento melhora a experiência e explica a espera.' },
    ],
  },
  {
    id: 'js-fetch-json', title: 'Buscando dados com fetch', subtitle: 'Conecte seu código a uma API.', duration: '12 min', eyebrow: 'JAVASCRIPT · APIS · AULA 2',
    pages: [
      {
        id: 'fetch-request', label: 'Requisição', title: 'fetch pede um recurso pela URL', body: 'A URL identifica o recurso da API. Quando a resposta chega, precisamos convertê-la para o formato de dados que a API enviou.',
        code: 'fetch("https://api.exemplo.com/curso")\n  .then(resposta => resposta.json())\n  .then(dados => console.log(dados));',
        notes: [{ token: 'fetch(URL)', text: 'inicia o pedido ao servidor' }, { token: 'resposta.json()', text: 'lê o corpo como JSON e também retorna Promise' }, { token: 'dados', text: 'recebe o objeto ou array convertido' }],
      },
      {
        id: 'fetch-response', label: 'Resposta', title: 'A resposta HTTP não é automaticamente o JSON', body: 'O primeiro then recebe um objeto Response. Chamamos json() para ler seu corpo e obter os dados JavaScript.',
        code: 'fetch(url)\n  .then(resposta => {\n    return resposta.json();\n  })\n  .then(dados => {\n    console.log(dados);\n  });',
        tip: 'Cada etapa assíncrona retorna uma Promise; por isso podemos encadear then.',
      },
      {
        id: 'fetch-project', label: 'Em um projeto', title: 'Dados externos viram conteúdo da tela', body: 'Uma API pode fornecer lista de produtos, previsão do tempo ou conteúdo de estudo. Depois de receber o JSON, usamos arrays e objetos para renderizar esses dados.',
        code: 'const titulos = dados.map(aula => aula.titulo);\nconsole.log(titulos);',
        notes: [{ token: 'dados', text: 'é o array recebido pela API' }, { token: 'map', text: 'extrai um título de cada item' }, { token: 'titulos', text: 'é uma lista pronta para mostrar' }],
      },
    ],
    questions: [
      { id: 'fetch-q1', prompt: 'O que resposta.json() faz?', options: ['Converte o corpo JSON em dados', 'Salva no celular', 'Cria um botão'], answer: 0, explanation: 'json() lê a resposta e entrega os dados convertidos.' },
      { id: 'fetch-q2', prompt: 'O que a URL identifica em fetch?', options: ['O recurso da API', 'Uma variável local', 'Uma classe CSS'], answer: 0, explanation: 'A URL aponta para o endereço do recurso desejado.' },
      { id: 'fetch-q3', prompt: 'Qual método transforma dados recebidos em outra lista?', options: ['map', 'break', 'return'], answer: 0, explanation: 'map cria uma nova lista transformando cada item.' },
    ],
  },
  {
    id: 'js-async-await', title: 'async e await', subtitle: 'Escreva código assíncrono de forma mais legível.', duration: '12 min', eyebrow: 'JAVASCRIPT · APIS · AULA 3',
    pages: [
      {
        id: 'async-await-basic', label: 'Código explicado', title: 'async permite usar await', body: 'Uma função marcada com async sempre trabalha com Promise. Dentro dela, await pausa apenas aquela função até a Promise terminar, sem congelar o restante do aplicativo.',
        code: 'async function carregarAulas() {\n  const resposta = await fetch(url);\n  const dados = await resposta.json();\n  console.log(dados);\n}',
        notes: [{ token: 'async function', text: 'declara uma função assíncrona' }, { token: 'await fetch', text: 'espera a resposta dentro da função' }, { token: 'await resposta.json()', text: 'espera a conversão do corpo' }],
      },
      {
        id: 'async-flow', label: 'Leitura', title: 'await deixa a sequência explícita', body: 'O código parece síncrono: primeiro buscamos a resposta, depois extraímos os dados e por fim usamos o resultado. Cada await espera sua própria Promise.',
        code: 'const resposta = await fetch(url);\nconst dados = await resposta.json();\nconst primeiraAula = dados[0];',
        tip: 'await só pode ser usado dentro de uma função async, exceto em contextos especiais de módulos.',
      },
      {
        id: 'async-react', label: 'Em React Native', title: 'Carregue dados ao abrir uma tela', body: 'Em aplicações React, uma função async geralmente busca dados quando a tela abre e atualiza o estado depois. Você aprenderá esse padrão em profundidade no curso de React.',
        analogy: { icon: '📲', title: 'Tela abre → busca dados → atualiza interface', value: 'Mesmo fluxo que o StudyCode usa para carregar progresso' } },
    ],
    questions: [
      { id: 'await-q1', prompt: 'Onde await pode ser usado normalmente?', options: ['Dentro de função async', 'Em qualquer if', 'Somente em array'], answer: 0, explanation: 'await depende de um contexto assíncrono, normalmente uma função async.' },
      { id: 'await-q2', prompt: 'O que await faz?', options: ['Espera uma Promise naquela função', 'Para todo o aplicativo', 'Remove dados'], answer: 0, explanation: 'Ele aguarda o resultado sem bloquear o restante do ambiente.' },
      { id: 'await-q3', prompt: 'Qual linha converte a resposta em dados JSON?', options: ['await resposta.json()', 'await resposta.length', 'await return'], answer: 0, explanation: 'json() lê e converte o corpo da resposta.' },
    ],
  },
  {
    id: 'js-erros-api', title: 'Tratando erros', subtitle: 'Prepare seu app para falhas de rede e respostas inválidas.', duration: '11 min', eyebrow: 'JAVASCRIPT · APIS · AULA 4',
    pages: [
      {
        id: 'try-catch', label: 'Proteção', title: 'try/catch captura falhas', body: 'Coloque no bloco try o código que pode falhar. Se ocorrer um erro, o catch recebe esse erro e permite mostrar uma mensagem apropriada.',
        code: 'try {\n  const resposta = await fetch(url);\n  const dados = await resposta.json();\n  console.log(dados);\n} catch (erro) {\n  console.log("Não foi possível carregar as aulas");\n}',
        notes: [{ token: 'try', text: 'contém a operação arriscada' }, { token: 'catch (erro)', text: 'executa se uma exceção acontecer' }, { token: 'erro', text: 'guarda detalhes úteis para depuração' }],
      },
      {
        id: 'http-status', label: 'Resposta HTTP', title: 'Verifique se a resposta foi bem-sucedida', body: 'fetch só rejeita automaticamente em erros de rede. Para respostas HTTP como 404 ou 500, verifique resposta.ok e gere um erro quando necessário.',
        code: 'const resposta = await fetch(url);\n\nif (!resposta.ok) {\n  throw new Error("Resposta inválida");\n}\n\nconst dados = await resposta.json();',
        notes: [{ token: 'resposta.ok', text: 'indica sucesso HTTP na faixa 200–299' }, { token: '!', text: 'inverte para tratar a falha' }, { token: 'throw new Error', text: 'envia o problema para o catch' }],
      },
      {
        id: 'finally', label: 'Finalização', title: 'finally sempre é executado', body: 'finally é útil para encerrar o estado de carregamento, independentemente de a requisição ter dado certo ou errado.',
        code: 'try {\n  // buscar dados\n} catch (erro) {\n  // mostrar erro\n} finally {\n  console.log("Encerrar carregamento");\n}',
        tip: 'Uma interface completa costuma ter estados de carregando, sucesso e erro.' },
    ],
    questions: [
      { id: 'errors-q1', prompt: 'Qual bloco recebe uma falha de try?', options: ['catch', 'finally', 'switch'], answer: 0, explanation: 'catch trata as exceções lançadas durante o try.' },
      { id: 'errors-q2', prompt: 'Por que verificar resposta.ok?', options: ['fetch não rejeita todo erro HTTP', 'Para criar JSON', 'Para aumentar XP'], answer: 0, explanation: 'Status HTTP de erro ainda podem chegar como uma Response normal.' },
      { id: 'errors-q3', prompt: 'Quando finally executa?', options: ['Sempre', 'Só no sucesso', 'Só no erro'], answer: 0, explanation: 'finally roda após try/catch, independentemente do resultado.' },
    ],
  },
  {
    id: 'js-projeto-final', title: 'Projeto final: Explorador de cursos', subtitle: 'Una APIs, dados, erros e interface.', duration: '15 min', eyebrow: 'JAVASCRIPT · APIS · PROJETO FINAL',
    pages: [
      { id: 'final-mission', label: 'Missão', title: 'Busque cursos e mostre o resultado', body: 'Seu projeto final simula uma tela que carrega cursos de uma API. Ele contém estados de carregamento, sucesso e erro — a base de muitas aplicações reais.', analogy: { icon: '🚀', title: 'Projeto final JavaScript', value: 'Requisição → JSON → lista na tela → tratamento de erro' } },
      {
        id: 'final-function', label: 'Etapa 1', title: 'Crie uma função assíncrona segura', body: 'A função busca os dados, valida a resposta e devolve o array. O catch trata falhas; finally encerra o carregamento.',
        code: 'async function carregarCursos() {\n  try {\n    const resposta = await fetch(url);\n    if (!resposta.ok) throw new Error("Erro na API");\n    return await resposta.json();\n  } catch (erro) {\n    console.log("Tente novamente mais tarde");\n    return [];\n  }\n}',
        notes: [{ token: 'async', text: 'permite usar await' }, { token: 'resposta.ok', text: 'valida o status HTTP' }, { token: 'return await resposta.json()', text: 'devolve os cursos convertidos' }, { token: 'return []', text: 'oferece uma lista segura na falha' }],
      },
      {
        id: 'final-render', label: 'Etapa 2', title: 'Transforme dados em uma lista', body: 'Depois de receber os cursos, map prepara uma versão visual de cada item. Na web você criaria elementos DOM; em React você renderizará componentes com a mesma ideia.',
        code: 'const cursos = await carregarCursos();\n\nconst titulos = cursos.map(curso => curso.titulo);\nconsole.log(titulos);',
        notes: [{ token: 'await carregarCursos()', text: 'espera a lista final' }, { token: 'map', text: 'transforma cada objeto curso' }, { token: 'curso.titulo', text: 'extrai o dado para exibir' }],
      },
    ],
    questions: [
      { id: 'final-q1', prompt: 'Qual função inicia uma requisição de API?', options: ['fetch', 'filter', 'localStorage'], answer: 0, explanation: 'fetch inicia o pedido ao endereço da API.' },
      { id: 'final-q2', prompt: 'Qual estrutura trata falhas assíncronas?', options: ['try/catch', 'for/of', 'switch apenas'], answer: 0, explanation: 'try/catch permite capturar erros durante await e outras operações.' },
      { id: 'final-q3', prompt: 'Por que retornar [] em caso de erro?', options: ['Manter um resultado seguro para usar', 'Aumentar o erro', 'Transformar em string'], answer: 0, explanation: 'Um array vazio ainda pode ser percorrido sem quebrar a interface.' },
      { id: 'final-q4', prompt: 'Qual método cria títulos a partir de cursos?', options: ['map', 'pop', 'break'], answer: 0, explanation: 'map transforma cada curso em seu título.' },
      { id: 'final-q5', prompt: 'O que você concluiu com este módulo?', options: ['Trilha principal de JavaScript', 'Curso de React completo', 'Banco de dados remoto'], answer: 0, explanation: 'Você concluiu a trilha principal de JavaScript e está pronto para avançar para React.' },
    ],
  },
];

export const allJavascriptLessons = [
  ...javascriptLessons,
  ...decisionLessons,
  ...repetitionLessons,
  ...functionLessons,
  ...arrayLessons,
  ...objectLessons,
  ...browserLessons,
  ...asyncLessons,
];

export const javascriptModules = [
  {
    id: 'fundamentos',
    number: 1,
    title: 'Fundamentos',
    description: 'Variáveis, tipos, operadores e fluxo de dados',
    color: colors.secondary,
    lessons: javascriptLessons,
  },
  {
    id: 'decisoes',
    number: 2,
    title: 'Decisões no código',
    description: 'Comparações, if, else, switch e ternário',
    color: colors.flame,
    lessons: decisionLessons,
    requiresModule: 'fundamentos',
  },
  {
    id: 'repeticoes',
    number: 3,
    title: 'Repetições',
    description: 'for, while, for...of e controle de loops',
    color: colors.success,
    lessons: repetitionLessons,
    requiresModule: 'decisoes',
  },
  {
    id: 'funcoes',
    number: 4,
    title: 'Funções',
    description: 'Parâmetros, retorno, escopo e arrow functions',
    color: colors.primaryLight,
    lessons: functionLessons,
    requiresModule: 'repeticoes',
  },
  {
    id: 'arrays',
    number: 5,
    title: 'Arrays',
    description: 'Listas, métodos, map, filter e find',
    color: colors.pink,
    lessons: arrayLessons,
    requiresModule: 'funcoes',
  },
  {
    id: 'objetos',
    number: 6,
    title: 'Objetos',
    description: 'Propriedades, métodos, desestruturação e JSON',
    color: colors.gold,
    lessons: objectLessons,
    requiresModule: 'arrays',
  },
  {
    id: 'dom',
    number: 7,
    title: 'JavaScript no navegador',
    description: 'DOM, eventos, formulários e localStorage',
    color: colors.info,
    lessons: browserLessons,
    requiresModule: 'objetos',
  },
  {
    id: 'assincrono',
    number: 8,
    title: 'APIs e projetos',
    description: 'Promises, fetch, async/await e projeto final',
    color: colors.secondaryLight,
    lessons: asyncLessons,
    requiresModule: 'dom',
  },
];

export function getLessonById(lessonId) {
  return allJavascriptLessons.find((lesson) => lesson.id === lessonId) ?? allJavascriptLessons[0];
}

export function getNextLesson(completedLessons) {
  return allJavascriptLessons.find((lesson) => !completedLessons.includes(lesson.id)) ?? allJavascriptLessons[0];
}

export function getMaximumLessonXp(lesson) {
  return scoringRules.completion
    + lesson.questions.length * scoringRules.correct
    + scoringRules.perfect;
}

export const reactLessons = [
  {
    id: 'react-componentes', title: 'Componentes', subtitle: 'Divida a interface em partes reutilizáveis.', duration: '10 min', eyebrow: 'REACT · FUNDAMENTOS · AULA 1',
    pages: [
      { id: 'react-component-concept', label: 'Conceito', title: 'Componentes são blocos de interface', body: 'No React, uma função pode descrever uma parte da tela. Você combina vários componentes pequenos para formar uma aplicação inteira.', analogy: { icon: '🧩', title: 'Componente: peça reutilizável', value: 'Cabeçalho, cartão e botão podem ser componentes separados' } },
      { id: 'react-component-code', label: 'Código explicado', title: 'Uma função retorna JSX', body: 'O nome do componente começa com letra maiúscula. Ele retorna o que deverá aparecer na interface.', code: 'function BoasVindas() {\n  return <h1>Olá, StudyCode!</h1>;\n}', notes: [{ token: 'function BoasVindas', text: 'declara um componente' }, { token: 'letra maiúscula', text: 'diferencia componente de tag HTML' }, { token: 'return', text: 'devolve a interface do componente' }] },
      { id: 'react-component-use', label: 'Uso', title: 'Renderize o componente como uma tag', body: 'Depois de criar o componente, use seu nome entre tags. Assim o React executa a função e mostra o resultado.', code: 'function App() {\n  return <BoasVindas />;\n}', tip: 'Componentes podem ser reutilizados em várias partes da aplicação.' },
    ],
    questions: [
      { id: 'react-components-q1', prompt: 'O que um componente React normalmente retorna?', options: ['Interface em JSX', 'Uma requisição obrigatória', 'Um arquivo CSS'], answer: 0, explanation: 'Um componente descreve uma parte da interface usando JSX.' },
      { id: 'react-components-q2', prompt: 'Como deve começar o nome de um componente?', options: ['Com letra maiúscula', 'Com número', 'Com ponto'], answer: 0, explanation: 'React reconhece componentes pelo nome iniciado em letra maiúscula.' },
      { id: 'react-components-q3', prompt: 'Como renderizar BoasVindas?', options: ['<BoasVindas />', 'boasVindas()', '<boasvindas>'], answer: 0, explanation: 'Use o componente como uma tag JSX com inicial maiúscula.' },
    ],
  },
  {
    id: 'react-jsx', title: 'JSX', subtitle: 'Escreva a estrutura visual junto do JavaScript.', duration: '10 min', eyebrow: 'REACT · FUNDAMENTOS · AULA 2',
    pages: [
      { id: 'jsx-concept', label: 'Conceito', title: 'JSX parece HTML, mas é JavaScript', body: 'JSX permite descrever a interface de forma visual dentro do componente. Depois, o React transforma esse código em elementos da tela.', code: 'const titulo = <h1>Estudar React</h1>;', tip: 'No React Native você usará componentes como View e Text, mas a ideia de JSX é a mesma.' },
      { id: 'jsx-expression', label: 'Expressões', title: 'Chaves inserem JavaScript no JSX', body: 'Entre chaves, você pode usar variáveis e expressões JavaScript para deixar a interface dinâmica.', code: 'const nome = "Max";\nconst elemento = <h1>Olá, {nome}!</h1>;', notes: [{ token: '{nome}', text: 'insere o valor da variável no JSX' }, { token: 'JSX', text: 'mistura marcação visual e expressões JavaScript' }] },
      { id: 'jsx-rule', label: 'Regra', title: 'Um componente retorna um elemento raiz', body: 'Quando precisar devolver vários elementos, agrupe-os em uma div na web ou em um Fragment. Isso mantém o JSX válido.', code: 'function App() {\n  return (\n    <>\n      <h1>StudyCode</h1>\n      <p>Aprender todos os dias</p>\n    </>\n  );\n}' },
    ],
    questions: [
      { id: 'react-jsx-q1', prompt: 'Como inserir uma variável no JSX?', options: ['Com { }', 'Com [ ]', 'Com //'], answer: 0, explanation: 'Chaves permitem usar expressões JavaScript dentro do JSX.' },
      { id: 'react-jsx-q2', prompt: 'JSX é usado para:', options: ['Descrever a interface', 'Criar banco de dados', 'Substituir JavaScript'], answer: 0, explanation: 'JSX descreve visualmente o que o componente renderiza.' },
      { id: 'react-jsx-q3', prompt: 'O que um Fragment <> </> resolve?', options: ['Agrupa elementos sem div extra', 'Cria um loop', 'Salva dados'], answer: 0, explanation: 'Fragments agrupam vários elementos retornados.' },
    ],
  },
  {
    id: 'react-props', title: 'Props', subtitle: 'Envie dados de um componente para outro.', duration: '11 min', eyebrow: 'REACT · FUNDAMENTOS · AULA 3',
    pages: [
      { id: 'props-concept', label: 'Conceito', title: 'Props são entradas de um componente', body: 'Props permitem reutilizar o mesmo componente com informações diferentes. O componente pai envia dados; o filho recebe esses dados.', code: 'function Saudacao(props) {\n  return <h1>Olá, {props.nome}!</h1>;\n}\n\n<Saudacao nome="Max" />;', notes: [{ token: 'nome="Max"', text: 'é a prop enviada pelo pai' }, { token: 'props.nome', text: 'lê a prop dentro do componente' }] },
      { id: 'props-destructure', label: 'Forma curta', title: 'Desestruture props no parâmetro', body: 'Podemos extrair as props diretamente no parâmetro da função, deixando o código mais limpo.', code: 'function CartaoAula({ titulo, xp }) {\n  return <p>{titulo} · {xp} XP</p>;\n}' },
      { id: 'props-rule', label: 'Regra', title: 'Props são somente leitura', body: 'Um componente não deve alterar as props que recebe. Se um valor precisar mudar, o componente pai controla esse dado com estado.', analogy: { icon: '📩', title: 'Pai envia · filho usa', value: 'Props fluem em uma direção' } },
    ],
    questions: [
      { id: 'react-props-q1', prompt: 'Para que servem props?', options: ['Enviar dados ao componente', 'Criar loops', 'Instalar React'], answer: 0, explanation: 'Props permitem configurar um componente com dados externos.' },
      { id: 'react-props-q2', prompt: 'Props devem ser alteradas pelo componente filho?', options: ['Não', 'Sim, sempre', 'Somente em JSX'], answer: 0, explanation: 'Props são valores somente leitura; mudanças são controladas pelo pai.' },
      { id: 'react-props-q3', prompt: 'Qual sintaxe extrai titulo e xp?', options: ['function Card({ titulo, xp })', 'function Card[titulo, xp]', 'const Card = titulo, xp'], answer: 0, explanation: 'A desestruturação extrai props diretamente no parâmetro.' },
    ],
  },
  {
    id: 'react-usestate', title: 'Estado com useState', subtitle: 'Faça a interface lembrar e reagir a mudanças.', duration: '13 min', eyebrow: 'REACT · FUNDAMENTOS · AULA 4',
    pages: [
      { id: 'state-concept', label: 'Conceito', title: 'Estado é a memória do componente', body: 'Quando um dado muda na tela, como pontos, texto digitado ou tarefa concluída, use state. Ao atualizar o state, React renderiza a interface novamente.', code: 'import { useState } from "react";\n\nfunction Contador() {\n  const [pontos, setPontos] = useState(0);\n}', notes: [{ token: 'pontos', text: 'é o valor atual do estado' }, { token: 'setPontos', text: 'é a função que atualiza o estado' }, { token: 'useState(0)', text: 'define o valor inicial' }] },
      { id: 'state-update', label: 'Atualização', title: 'Use a função setter para alterar state', body: 'Não altere a variável de estado diretamente. Chame a função setter para avisar o React que a interface precisa ser atualizada.', code: 'function ganharXp() {\n  setPontos(pontos + 5);\n}\n\n<button onClick={ganharXp}>Ganhar XP</button>;', notes: [{ token: 'setPontos', text: 'agenda o novo valor do estado' }, { token: 'pontos + 5', text: 'calcula o próximo valor' }, { token: 'onClick', text: 'chama a função após o clique na web' }] },
      { id: 'state-project', label: 'Ligação com StudyCode', title: 'XP e progresso são estados', body: 'O StudyCode usa esse princípio: quando uma aula é concluída, o XP muda e a interface mostra o novo valor. No React Native, o evento equivalente será onPress.', analogy: { icon: '⚡', title: 'Ação → state muda → tela atualiza', value: 'Esse é o ciclo central do React' } },
    ],
    questions: [
      { id: 'react-state-q1', prompt: 'Qual hook cria estado em um componente?', options: ['useState', 'useLoop', 'useHTML'], answer: 0, explanation: 'useState cria uma memória local para o componente.' },
      { id: 'react-state-q2', prompt: 'Qual função atualiza pontos?', options: ['setPontos', 'pontos', 'useState'], answer: 0, explanation: 'A segunda posição retornada por useState é a função setter.' },
      { id: 'react-state-q3', prompt: 'O que acontece após atualizar state?', options: ['React atualiza a interface', 'O app fecha', 'Props mudam sozinhas'], answer: 0, explanation: 'React renderiza novamente o componente com o novo estado.' },
    ],
  },
];

export const reactInteractionLessons = [
  {
    id: 'react-eventos', title: 'Eventos', subtitle: 'Responda aos cliques do usuário.', duration: '10 min', eyebrow: 'REACT · INTERAÇÃO · AULA 1',
    pages: [
      { id: 'react-event-concept', label: 'Conceito', title: 'Eventos chamam funções', body: 'No React, uma interação como clique chama uma função. Em vez de manipular o DOM manualmente, você declara a função que deve responder ao evento.', code: 'function BotaoXp() {\n  function ganharXp() {\n    console.log("+5 XP");\n  }\n\n  return <button onClick={ganharXp}>Ganhar XP</button>;\n}', notes: [{ token: 'onClick', text: 'é a prop que escuta o clique' }, { token: 'ganharXp', text: 'é a função chamada no evento' }, { token: 'sem ()', text: 'passa a função sem executá-la agora' }] },
      { id: 'react-event-native', label: 'No celular', title: 'React Native usa onPress', body: 'No React Native, o princípio é o mesmo. Um componente de toque recebe onPress em vez de onClick.', code: '<Pressable onPress={ganharXp}>\n  <Text>Ganhar XP</Text>\n</Pressable>', analogy: { icon: '👆', title: 'Web: onClick · Mobile: onPress', value: 'Ação do usuário chama uma função' } },
    ],
    questions: [
      { id: 'react-events-q1', prompt: 'Qual prop responde ao clique na web?', options: ['onClick', 'onPress', 'onChange'], answer: 0, explanation: 'onClick registra uma função para cliques em elementos web.' },
      { id: 'react-events-q2', prompt: 'Por que usar onClick={ganharXp} sem parênteses?', options: ['Para esperar o clique', 'Para executar ao renderizar', 'Para criar uma prop'], answer: 0, explanation: 'A função é passada como referência e só será chamada pelo evento.' },
      { id: 'react-events-q3', prompt: 'Qual prop corresponde ao toque no React Native?', options: ['onPress', 'onDOM', 'onList'], answer: 0, explanation: 'onPress é usado em componentes de toque no React Native.' },
    ],
  },
  {
    id: 'react-formularios', title: 'Formulários controlados', subtitle: 'Conecte o texto digitado ao estado.', duration: '12 min', eyebrow: 'REACT · INTERAÇÃO · AULA 2',
    pages: [
      { id: 'react-input-state', label: 'Código explicado', title: 'O estado controla o campo', body: 'Um input controlado recebe seu valor do state e atualiza esse state a cada digitação. Assim, React sempre sabe o que está no campo.', code: 'const [titulo, setTitulo] = useState("");\n\n<input\n  value={titulo}\n  onChange={event => setTitulo(event.target.value)}\n/>', notes: [{ token: 'value={titulo}', text: 'mostra o valor atual do state' }, { token: 'onChange', text: 'responde a cada alteração' }, { token: 'setTitulo', text: 'atualiza a memória do componente' }] },
      { id: 'react-submit', label: 'Envio', title: 'Use uma função para processar o formulário', body: 'No envio, preventDefault impede o recarregamento da página. Depois, você valida e usa o estado do campo.', code: 'function adicionarTarefa(event) {\n  event.preventDefault();\n  if (!titulo.trim()) return;\n  console.log(titulo);\n}', tip: 'Em React Native, TextInput usa value e onChangeText; não há submit padrão de formulário HTML.' },
    ],
    questions: [
      { id: 'react-forms-q1', prompt: 'O que value={titulo} faz?', options: ['Mostra o valor do state', 'Cria um array', 'Envia o formulário'], answer: 0, explanation: 'value conecta o input ao estado atual.' },
      { id: 'react-forms-q2', prompt: 'Qual função altera o state titulo?', options: ['setTitulo', 'titulo', 'useState'], answer: 0, explanation: 'O setter retornado por useState atualiza o estado.' },
      { id: 'react-forms-q3', prompt: 'Para que serve preventDefault no submit?', options: ['Evitar recarregamento', 'Apagar state', 'Renderizar lista'], answer: 0, explanation: 'Ele impede o comportamento padrão do formulário no navegador.' },
    ],
  },
  {
    id: 'react-listas-condicoes', title: 'Listas e condições', subtitle: 'Renderize dados dinamicamente.', duration: '13 min', eyebrow: 'REACT · INTERAÇÃO · AULA 3',
    pages: [
      { id: 'react-map', label: 'Listas', title: 'map cria um componente para cada item', body: 'Arrays combinam naturalmente com React. Use map para transformar cada dado em um elemento visual.', code: 'const aulas = ["JS", "React"];\n\n<ul>\n  {aulas.map(aula => (\n    <li key={aula}>{aula}</li>\n  ))}\n</ul>', notes: [{ token: 'map', text: 'percorre os dados e cria elementos' }, { token: 'key', text: 'identifica cada item de forma estável' }, { token: '{aula}', text: 'mostra o texto atual' }] },
      { id: 'react-condition', label: 'Condições', title: 'Mostre algo somente quando necessário', body: 'Renderização condicional permite alterar a tela conforme o state. O operador && é útil para mostrar um elemento quando uma condição é verdadeira.', code: '{concluida && <Text>Aula concluída!</Text>}', analogy: { icon: '🚦', title: 'Estado muda · interface responde', value: 'Sem condição verdadeira, o elemento não aparece' } },
      { id: 'react-empty', label: 'Boa experiência', title: 'Sempre pense no estado vazio', body: 'Quando uma lista não possui itens, mostre uma mensagem útil em vez de uma tela sem explicação.', code: '{aulas.length === 0 ? (\n  <p>Nenhuma aula encontrada.</p>\n) : (\n  aulas.map(aula => <p key={aula}>{aula}</p>)\n)}' },
    ],
    questions: [
      { id: 'react-lists-q1', prompt: 'Qual método transforma dados em elementos JSX?', options: ['map', 'pop', 'JSON.parse'], answer: 0, explanation: 'map percorre a lista e retorna uma nova coleção de elementos.' },
      { id: 'react-lists-q2', prompt: 'Para que serve key em uma lista?', options: ['Identificar cada item', 'Mudar cor', 'Criar state'], answer: 0, explanation: 'keys ajudam React a identificar itens entre renderizações.' },
      { id: 'react-lists-q3', prompt: 'O que {concluida && <Text>OK</Text>} faz quando concluida é false?', options: ['Não mostra o texto', 'Mostra OK', 'Gera erro'], answer: 0, explanation: '&& só devolve o elemento quando a condição é verdadeira.' },
    ],
  },
  {
    id: 'react-desafio-interacao', title: 'Desafio: lista de estudo', subtitle: 'Una estado, eventos e renderização.', duration: '14 min', eyebrow: 'REACT · INTERAÇÃO · DESAFIO',
    pages: [
      { id: 'react-challenge-mission', label: 'Missão', title: 'Crie uma lista de aulas', body: 'Você criará um state com aulas e uma função que adiciona uma nova aula. A interface renderiza tudo com map.', analogy: { icon: '🚀', title: 'Mini projeto React', value: 'Input → evento → state → lista atualizada' } },
      { id: 'react-challenge-code', label: 'Solução guiada', title: 'Atualize arrays sem alterar o original', body: 'Ao adicionar um item ao state, crie um novo array usando spread. Isso permite que React detecte a mudança.', code: 'const [aulas, setAulas] = useState([]);\n\nfunction adicionarAula(titulo) {\n  setAulas([...aulas, titulo]);\n}\n\n{aulas.map(aula => <p key={aula}>{aula}</p>)}', notes: [{ token: '...aulas', text: 'copia as aulas já existentes' }, { token: 'titulo', text: 'adiciona o novo item no final' }, { token: 'setAulas', text: 'atualiza o state com a nova lista' }] },
    ],
    questions: [
      { id: 'react-challenge-q1', prompt: 'Como adicionar item sem alterar array original?', options: ['[...aulas, titulo]', 'aulas = titulo', 'aulas.pop()'], answer: 0, explanation: 'Spread cria uma nova lista com os itens anteriores e o novo valor.' },
      { id: 'react-challenge-q2', prompt: 'O que faz setAulas?', options: ['Atualiza o state', 'Lê uma prop', 'Busca uma API'], answer: 0, explanation: 'setAulas atualiza a memória do componente e dispara nova renderização.' },
      { id: 'react-challenge-q3', prompt: 'Qual sequência representa o fluxo React?', options: ['Evento → state → interface', 'CSS → API → loop', 'return → JSON → DOM'], answer: 0, explanation: 'Uma interação chama uma função, atualiza state e React atualiza a tela.' },
    ],
  },
];

export const reactEffectLessons = [
  {
    id: 'react-useeffect', title: 'useEffect', subtitle: 'Sincronize o componente com algo externo.', duration: '12 min', eyebrow: 'REACT · EFEITOS · AULA 1',
    pages: [
      { id: 'effect-concept', label: 'Conceito', title: 'Efeitos conectam React ao mundo externo', body: 'Renderizar deve apenas descrever a interface. useEffect serve para sincronizar o componente com algo externo, como rede, armazenamento, temporizador ou título da página.', analogy: { icon: '🔄', title: 'Renderização → efeito externo', value: 'O efeito acontece depois que React atualiza a tela' } },
      { id: 'effect-code', label: 'Código explicado', title: 'useEffect executa depois da renderização', body: 'O primeiro argumento é a função do efeito. O array vazio indica que o efeito deve rodar quando o componente aparecer pela primeira vez.', code: 'import { useEffect } from "react";\n\nuseEffect(() => {\n  console.log("Tela aberta");\n}, []);', notes: [{ token: 'useEffect', text: 'registra o efeito' }, { token: '() => { }', text: 'contém a ação externa' }, { token: '[]', text: 'não possui dependências reativas' }] },
      { id: 'effect-rule', label: 'Boa prática', title: 'Nem todo cálculo precisa de efeito', body: 'Se um valor pode ser calculado diretamente durante a renderização, não use useEffect. Reserve efeitos para sincronização externa.', code: 'const total = aulas.length;\n// cálculo direto: não precisa de useEffect', tip: 'Isso mantém o código mais simples e evita renderizações extras.' },
    ],
    questions: [
      { id: 'effects-q1', prompt: 'Para que useEffect é indicado?', options: ['Sincronizar com algo externo', 'Criar JSX', 'Substituir props'], answer: 0, explanation: 'Efeitos tratam rede, timers, armazenamento e outras sincronizações externas.' },
      { id: 'effects-q2', prompt: 'O que [] indica em useEffect?', options: ['Sem dependências', 'Lista vazia na tela', 'Erro de API'], answer: 0, explanation: 'O array vazio informa que o efeito não depende de valores reativos.' },
      { id: 'effects-q3', prompt: 'aulas.length precisa de useEffect?', options: ['Não', 'Sempre', 'Somente no mobile'], answer: 0, explanation: 'É um cálculo direto dos dados atuais.' },
    ],
  },
  {
    id: 'react-api-state', title: 'APIs e estados da tela', subtitle: 'Carregue dados e comunique cada etapa ao usuário.', duration: '14 min', eyebrow: 'REACT · EFEITOS · AULA 2',
    pages: [
      { id: 'api-states', label: 'Estados', title: 'Uma tela de dados possui três momentos', body: 'Antes da resposta, mostramos carregando. Depois, mostramos os dados. Se algo falhar, mostramos uma mensagem de erro. Esses estados deixam a interface confiável.', code: 'const [aulas, setAulas] = useState([]);\nconst [carregando, setCarregando] = useState(true);\nconst [erro, setErro] = useState(null);', notes: [{ token: 'aulas', text: 'guarda os dados recebidos' }, { token: 'carregando', text: 'controla o indicador de espera' }, { token: 'erro', text: 'guarda uma mensagem de falha' }] },
      { id: 'api-fetch-effect', label: 'Busca', title: 'Busque dados dentro do efeito', body: 'Criamos uma função assíncrona dentro do efeito e a chamamos. Ao terminar, atualizamos os estados apropriados.', code: 'useEffect(() => {\n  async function carregar() {\n    const resposta = await fetch(url);\n    const dados = await resposta.json();\n    setAulas(dados);\n    setCarregando(false);\n  }\n\n  carregar();\n}, []);', notes: [{ token: 'async function carregar', text: 'permite usar await' }, { token: 'fetch', text: 'inicia a requisição' }, { token: 'setAulas', text: 'salva os dados no state' }, { token: 'setCarregando(false)', text: 'encerra a espera' }] },
      { id: 'api-render', label: 'Interface', title: 'Renderize conforme o estado', body: 'Antes de mostrar a lista, verifique carregando e erro. Isso evita tentar usar dados que ainda não chegaram.', code: 'if (carregando) return <p>Carregando...</p>;\nif (erro) return <p>{erro}</p>;\n\nreturn aulas.map(aula => <p key={aula.id}>{aula.titulo}</p>);' },
    ],
    questions: [
      { id: 'api-react-q1', prompt: 'Qual state guarda a espera da requisição?', options: ['carregando', 'aulas', 'titulo'], answer: 0, explanation: 'carregando controla quando a interface deve mostrar espera.' },
      { id: 'api-react-q2', prompt: 'Onde uma busca inicial costuma ser chamada?', options: ['Dentro de useEffect', 'Dentro de map', 'Em uma prop'], answer: 0, explanation: 'O efeito sincroniza o componente com a API ao abrir a tela.' },
      { id: 'api-react-q3', prompt: 'O que fazer antes de renderizar aulas carregadas?', options: ['Tratar carregando e erro', 'Apagar state', 'Criar novo curso'], answer: 0, explanation: 'Cada estado precisa de uma interface adequada.' },
    ],
  },
  {
    id: 'react-cleanup', title: 'Dependências e limpeza', subtitle: 'Evite efeitos desnecessários e recursos esquecidos.', duration: '11 min', eyebrow: 'REACT · EFEITOS · AULA 3',
    pages: [
      { id: 'dependencies', label: 'Dependências', title: 'Dependências dizem quando o efeito precisa sincronizar', body: 'Se um efeito usa uma prop ou state, esse valor deve aparecer no array de dependências. Assim, React executa novamente o efeito quando o valor mudar.', code: 'useEffect(() => {\n  console.log(`Curso atual: ${cursoId}`);\n}, [cursoId]);', notes: [{ token: 'cursoId', text: 'é usado pelo efeito' }, { token: '[cursoId]', text: 'faz o efeito acompanhar mudanças nesse valor' }] },
      { id: 'cleanup', label: 'Limpeza', title: 'Retorne uma função para limpar recursos', body: 'Timers, conexões e listeners precisam ser removidos quando o componente deixa a tela. A função retornada pelo efeito realiza essa limpeza.', code: 'useEffect(() => {\n  const timer = setInterval(atualizar, 1000);\n\n  return () => clearInterval(timer);\n}, []);', notes: [{ token: 'setInterval', text: 'cria um recurso repetitivo' }, { token: 'return () =>', text: 'define a limpeza' }, { token: 'clearInterval', text: 'encerra o timer' }] },
      { id: 'effect-summary', label: 'Resumo', title: 'Efeito deve ter propósito claro', body: 'Pergunte: estou sincronizando com rede, armazenamento, timer ou outra fonte externa? Se não, talvez o código possa ficar na renderização ou em um evento.', analogy: { icon: '🧭', title: 'Use efeito com intenção', value: 'Dependências corretas e limpeza evitam comportamento inesperado' } },
    ],
    questions: [
      { id: 'cleanup-q1', prompt: 'Para que serve [cursoId]?', options: ['Executar efeito quando cursoId mudar', 'Criar array novo', 'Bloquear renderização'], answer: 0, explanation: 'O array de dependências acompanha valores usados no efeito.' },
      { id: 'cleanup-q2', prompt: 'Quando a limpeza de useEffect é útil?', options: ['Timers e listeners', 'JSX simples', 'Props somente leitura'], answer: 0, explanation: 'Recursos externos devem ser encerrados ao sair da tela.' },
      { id: 'cleanup-q3', prompt: 'Um efeito sem sincronização externa é sempre necessário?', options: ['Não', 'Sim', 'Somente em React Native'], answer: 0, explanation: 'Cálculos diretos e eventos normalmente não precisam de useEffect.' },
    ],
  },
  {
    id: 'react-desafio-api', title: 'Desafio: catálogo de cursos', subtitle: 'Carregue, trate erros e mostre dados.', duration: '15 min', eyebrow: 'REACT · EFEITOS · DESAFIO',
    pages: [
      { id: 'api-challenge-mission', label: 'Missão', title: 'Crie uma tela que carrega cursos', body: 'O desafio reúne useEffect, fetch, state e renderização condicional. É a estrutura de uma tela real que consome dados.', analogy: { icon: '🌐', title: 'API → state → interface', value: 'Carregando, erro e sucesso devem ser claros' } },
      { id: 'api-challenge-code', label: 'Solução guiada', title: 'Proteja a busca com try/catch', body: 'A função assíncrona trata a falha, encerra carregando no finally e salva os cursos no state quando tudo dá certo.', code: 'useEffect(() => {\n  async function carregarCursos() {\n    try {\n      const resposta = await fetch(url);\n      if (!resposta.ok) throw new Error("Falha");\n      setCursos(await resposta.json());\n    } catch {\n      setErro("Não foi possível carregar");\n    } finally {\n      setCarregando(false);\n    }\n  }\n  carregarCursos();\n}, []);', notes: [{ token: 'try/catch', text: 'trata falhas da busca' }, { token: 'resposta.ok', text: 'valida a resposta HTTP' }, { token: 'finally', text: 'encerra o carregamento em qualquer resultado' }] },
    ],
    questions: [
      { id: 'api-challenge-q1', prompt: 'Qual hook conecta a busca ao ciclo da tela?', options: ['useEffect', 'useState apenas', 'map'], answer: 0, explanation: 'useEffect é usado para sincronizar com a API ao abrir a tela.' },
      { id: 'api-challenge-q2', prompt: 'Onde setCarregando(false) deve ficar para rodar sempre?', options: ['finally', 'map', 'return JSX'], answer: 0, explanation: 'finally é executado tanto no sucesso quanto no erro.' },
      { id: 'api-challenge-q3', prompt: 'O que setCursos faz?', options: ['Atualiza dados da tela', 'Fecha a API', 'Cria uma key'], answer: 0, explanation: 'O setter atualiza o state e React renderiza os cursos recebidos.' },
    ],
  },
];

export const reactRoutingLessons = [
  {
    id: 'react-rotas-intro', title: 'Rotas e páginas', subtitle: 'Organize telas por URL.', duration: '11 min', eyebrow: 'REACT · ROTAS · AULA 1',
    pages: [
      { id: 'routes-concept', label: 'Conceito', title: 'Uma rota liga uma URL a uma tela', body: 'Aplicações web possuem páginas como início, cursos e perfil. Roteamento escolhe qual componente mostrar de acordo com a URL atual.', analogy: { icon: '🗺️', title: 'URL → componente', value: '/cursos pode mostrar a tela de cursos' }, tip: 'React não inclui um roteador próprio; na web, React Router é uma solução comum.' },
      { id: 'routes-code', label: 'Código explicado', title: 'Routes organiza os caminhos', body: 'O componente Routes escolhe uma Route compatível. Cada Route define path, o endereço, e element, o componente que será renderizado.', code: 'import { Routes, Route } from "react-router";\n\n<Routes>\n  <Route path="/" element={<Inicio />} />\n  <Route path="/cursos" element={<Cursos />} />\n</Routes>', notes: [{ token: 'Routes', text: 'agrupa as rotas da aplicação' }, { token: 'path', text: 'define a URL' }, { token: 'element', text: 'define a tela exibida' }] },
    ],
    questions: [
      { id: 'routes-intro-q1', prompt: 'O que uma rota conecta?', options: ['URL e componente', 'Array e CSS', 'State e JSON'], answer: 0, explanation: 'Rotas escolhem uma interface conforme o endereço.' },
      { id: 'routes-intro-q2', prompt: 'Qual prop define o endereço da rota?', options: ['path', 'element', 'key'], answer: 0, explanation: 'path define o padrão de URL.' },
      { id: 'routes-intro-q3', prompt: 'React inclui roteamento web completo por padrão?', options: ['Não', 'Sim', 'Somente com useState'], answer: 0, explanation: 'É comum usar uma biblioteca de roteamento.' },
    ],
  },
  {
    id: 'react-links', title: 'Links e navegação', subtitle: 'Mude de tela sem recarregar a aplicação.', duration: '10 min', eyebrow: 'REACT · ROTAS · AULA 2',
    pages: [
      { id: 'link-code', label: 'Código explicado', title: 'Link navega sem recarregar a página', body: 'Em uma SPA, Link substitui a tag a para navegação interna. Ele atualiza a URL e troca o componente sem pedir uma página nova ao servidor.', code: 'import { Link } from "react-router";\n\n<Link to="/cursos">Ver cursos</Link>', notes: [{ token: 'Link', text: 'é o componente de navegação interna' }, { token: 'to', text: 'indica o destino' }, { token: '/cursos', text: 'é a URL da tela de cursos' }] },
      { id: 'navigate-code', label: 'Ação', title: 'useNavigate navega por uma função', body: 'Quando a navegação ocorre depois de salvar um formulário ou concluir uma aula, useNavigate devolve uma função para mudar a rota.', code: 'const navigate = useNavigate();\n\nfunction concluir() {\n  navigate("/resultado");\n}', notes: [{ token: 'useNavigate', text: 'obtém a função de navegação' }, { token: 'navigate', text: 'muda a URL por código' }] },
      { id: 'native-navigation', label: 'No celular', title: 'React Native usa navegação nativa', body: 'No React Native, bibliotecas como React Navigation seguem o mesmo conceito, mas trabalham com telas e pilhas de navegação em vez de URLs web.', analogy: { icon: '📱', title: 'Web: URL · Mobile: telas', value: 'A intenção é a mesma: levar o usuário para a tela certa' } },
    ],
    questions: [
      { id: 'links-q1', prompt: 'Qual componente navega internamente na web?', options: ['Link', 'img', 'Fragment'], answer: 0, explanation: 'Link atualiza a rota sem recarregar a SPA.' },
      { id: 'links-q2', prompt: 'Quando useNavigate é útil?', options: ['Após uma ação do usuário', 'Para criar CSS', 'Para ler props'], answer: 0, explanation: 'Ele permite navegar por código após concluir uma ação.' },
      { id: 'links-q3', prompt: 'React Native usa URLs para navegação?', options: ['Não necessariamente', 'Sempre', 'Somente com map'], answer: 0, explanation: 'Apps nativos normalmente trabalham com uma pilha de telas.' },
    ],
  },
  {
    id: 'react-parametros-rota', title: 'Parâmetros de rota', subtitle: 'Mostre dados conforme a URL.', duration: '11 min', eyebrow: 'REACT · ROTAS · AULA 3',
    pages: [
      { id: 'params-code', label: 'Rota dinâmica', title: 'Dois-pontos definem um parâmetro', body: 'Uma rota dinâmica usa : antes de um nome. Assim, a mesma tela atende vários cursos ou aulas conforme o valor presente na URL.', code: '<Route path="/curso/:cursoId" element={<DetalheCurso />} />', notes: [{ token: ':cursoId', text: 'é um parâmetro variável da URL' }, { token: 'DetalheCurso', text: 'é reutilizado para todos os cursos' }] },
      { id: 'params-read', label: 'Leitura', title: 'useParams lê os valores da rota', body: 'Dentro do componente, useParams devolve os parâmetros atuais. Com cursoId, você pode buscar ou selecionar os dados corretos.', code: 'const { cursoId } = useParams();\n\nconsole.log(cursoId);', notes: [{ token: 'useParams', text: 'lê parâmetros da URL atual' }, { token: 'cursoId', text: 'recebe o valor depois de /curso/' }] },
      { id: 'params-project', label: 'Em um projeto', title: 'Uma tela para qualquer aula', body: 'StudyCode poderia usar /curso/react/aula/props para abrir a mesma tela de aula com dados diferentes. A URL vira uma parte útil do estado da aplicação.', analogy: { icon: '🔗', title: 'URL carrega contexto', value: 'O caminho identifica o conteúdo que deve aparecer' } },
    ],
    questions: [
      { id: 'params-q1', prompt: 'O que :cursoId representa?', options: ['Parâmetro variável', 'Classe CSS', 'State local'], answer: 0, explanation: 'Dois-pontos definem uma parte dinâmica do caminho.' },
      { id: 'params-q2', prompt: 'Qual hook lê parâmetros da URL?', options: ['useParams', 'useState', 'useEffect'], answer: 0, explanation: 'useParams devolve os valores definidos na rota.' },
      { id: 'params-q3', prompt: 'Qual URL pode corresponder a /curso/:cursoId?', options: ['/curso/react', '/curso', '/react/curso/a'], answer: 0, explanation: '/curso/react fornece react como cursoId.' },
    ],
  },
  {
    id: 'react-desafio-rotas', title: 'Desafio: mapa de cursos', subtitle: 'Crie páginas conectadas por rotas.', duration: '13 min', eyebrow: 'REACT · ROTAS · DESAFIO',
    pages: [
      { id: 'routes-challenge', label: 'Missão', title: 'Navegue entre início, cursos e detalhes', body: 'Você criará rotas principais, links para a lista e uma rota dinâmica para abrir detalhes de cada curso.', analogy: { icon: '🧭', title: 'Projeto: mapa de cursos', value: 'Início → lista → detalhe do curso' } },
      { id: 'routes-solution', label: 'Solução guiada', title: 'Combine Route e Link', body: 'A lista cria um Link para cada curso. Ao clicar, a URL contém o id e a tela de detalhe lê esse parâmetro.', code: '<Link to={`/curso/${curso.id}`}>{curso.titulo}</Link>\n\n<Route path="/curso/:cursoId" element={<DetalheCurso />} />', notes: [{ token: 'curso.id', text: 'monta um destino único' }, { token: 'Link', text: 'permite a navegação interna' }, { token: ':cursoId', text: 'recebe o id no detalhe' }] },
    ],
    questions: [
      { id: 'routes-challenge-q1', prompt: 'Qual componente define uma página para uma URL?', options: ['Route', 'Link', 'Text'], answer: 0, explanation: 'Route associa um path ao elemento exibido.' },
      { id: 'routes-challenge-q2', prompt: 'Qual recurso cria destino dinâmico?', options: ['`/curso/${curso.id}`', 'useState(0)', 'className'], answer: 0, explanation: 'Template strings montam o caminho usando o id do curso.' },
      { id: 'routes-challenge-q3', prompt: 'O que useParams permite fazer?', options: ['Ler o id da URL', 'Alterar CSS', 'Salvar JSON'], answer: 0, explanation: 'Ele lê valores dinâmicos definidos pelo path.' },
    ],
  },
];

export const reactContextLessons = [
  {
    id: 'react-contexto', title: 'Contexto', subtitle: 'Compartilhe dados sem prop drilling.', duration: '12 min', eyebrow: 'REACT · CONTEXTO · AULA 1',
    pages: [
      { id: 'context-concept', label: 'Conceito', title: 'Context resolve dados profundos', body: 'Quando muitos componentes precisam do mesmo dado, passar props por cada nível fica cansativo. Context permite que componentes abaixo leiam um valor compartilhado.', analogy: { icon: '📡', title: 'Provider fornece · descendentes consomem', value: 'Tema, usuário e progresso são bons candidatos' } },
      { id: 'context-create', label: 'Código explicado', title: 'Crie e forneça um contexto', body: 'createContext cria o contexto. O Provider envolve os componentes que podem acessar o valor.', code: 'const TemaContext = createContext(null);\n\n<TemaContext.Provider value="escuro">\n  <App />\n</TemaContext.Provider>', notes: [{ token: 'createContext', text: 'cria o canal compartilhado' }, { token: 'Provider', text: 'fornece um valor aos descendentes' }, { token: 'value', text: 'é o dado compartilhado' }] },
      { id: 'context-use', label: 'Consumo', title: 'useContext lê o valor fornecido', body: 'Um componente dentro do Provider chama useContext e recebe o valor mais próximo fornecido acima dele.', code: 'const tema = useContext(TemaContext);\n\nreturn <p>Tema: {tema}</p>;', notes: [{ token: 'useContext', text: 'lê o contexto atual' }, { token: 'TemaContext', text: 'indica qual contexto será lido' }] },
    ],
    questions: [
      { id: 'context-q1', prompt: 'Qual problema Context ajuda a evitar?', options: ['Passar props por muitos níveis', 'Criar arrays', 'Fazer fetch'], answer: 0, explanation: 'Context reduz a necessidade de prop drilling.' },
      { id: 'context-q2', prompt: 'Qual componente fornece o valor?', options: ['Provider', 'Link', 'Route'], answer: 0, explanation: 'O Provider disponibiliza o value para seus descendentes.' },
      { id: 'context-q3', prompt: 'Qual hook lê um contexto?', options: ['useContext', 'useParams', 'useEffect'], answer: 0, explanation: 'useContext recebe o valor do contexto informado.' },
    ],
  },
  {
    id: 'react-contexto-state', title: 'Contexto com estado', subtitle: 'Compartilhe e atualize dados globais.', duration: '13 min', eyebrow: 'REACT · CONTEXTO · AULA 2',
    pages: [
      { id: 'context-provider-state', label: 'Provider próprio', title: 'Combine Context e useState', body: 'Um Provider pode guardar state e entregar tanto o valor quanto a função de atualização. Assim, diferentes telas compartilham a mesma fonte de verdade.', code: 'function ProgressoProvider({ children }) {\n  const [xp, setXp] = useState(0);\n\n  return (\n    <ProgressoContext.Provider value={{ xp, setXp }}>\n      {children}\n    </ProgressoContext.Provider>\n  );\n}', notes: [{ token: 'xp, setXp', text: 'são o state e seu setter' }, { token: 'value={{ xp, setXp }}', text: 'compartilha dado e ação' }, { token: 'children', text: 'representa as telas envolvidas' }] },
      { id: 'context-update', label: 'Uso', title: 'Qualquer descendente pode atualizar o contexto', body: 'Depois de consumir xp e setXp, um botão em qualquer tela dentro do Provider pode alterar o progresso global.', code: 'const { xp, setXp } = useContext(ProgressoContext);\n\n<button onClick={() => setXp(xp + 5)}>\n  XP: {xp}\n</button>;', tip: 'Context é poderoso, mas use apenas para dados realmente compartilhados.' },
      { id: 'context-choice', label: 'Escolha', title: 'State local ou Context?', body: 'Prefira state local quando um dado pertence a uma única tela. Use Context quando vários componentes distantes precisam acessar o mesmo valor.', analogy: { icon: '⚖️', title: 'Local para um componente · Context para muitos', value: 'Escolha a solução mais simples que atende o caso' } },
    ],
    questions: [
      { id: 'context-state-q1', prompt: 'O que value={{ xp, setXp }} compartilha?', options: ['Valor e atualizador', 'Somente CSS', 'Uma rota'], answer: 0, explanation: 'O contexto pode oferecer os dados e a função que os altera.' },
      { id: 'context-state-q2', prompt: 'Quando preferir state local?', options: ['Quando só uma tela precisa do dado', 'Sempre que houver XP global', 'Quando usar Link'], answer: 0, explanation: 'State local mantém dados simples próximos de onde são usados.' },
      { id: 'context-state-q3', prompt: 'O que children representa em um Provider?', options: ['Componentes envolvidos', 'Array de erros', 'Propriedades CSS'], answer: 0, explanation: 'children é o conteúdo renderizado dentro do Provider.' },
    ],
  },
  {
    id: 'react-desafio-contexto', title: 'Desafio: progresso global', subtitle: 'Compartilhe XP em toda a aplicação.', duration: '14 min', eyebrow: 'REACT · CONTEXTO · DESAFIO',
    pages: [
      { id: 'context-challenge', label: 'Missão', title: 'Faça XP aparecer em todas as telas', body: 'O desafio cria um ProgressoContext para que início, aula e perfil usem o mesmo XP sem transportar props por todas as rotas.', analogy: { icon: '🏆', title: 'Um estado · várias telas', value: 'Ações em uma tela atualizam todas as outras' } },
      { id: 'context-challenge-code', label: 'Solução guiada', title: 'Exponha um hook de contexto', body: 'Criar um hook personalizado evita repetir useContext e deixa o uso do estado global mais expressivo.', code: 'const ProgressoContext = createContext(null);\n\nfunction useProgresso() {\n  return useContext(ProgressoContext);\n}\n\nconst { xp, setXp } = useProgresso();', notes: [{ token: 'useProgresso', text: 'encapsula o acesso ao contexto' }, { token: 'xp, setXp', text: 'são consumidos em qualquer descendente' }] },
    ],
    questions: [
      { id: 'context-challenge-q1', prompt: 'Qual dado do StudyCode combina com Context?', options: ['XP global', 'Texto de um único input', 'Cor de uma linha isolada'], answer: 0, explanation: 'XP é usado em várias telas e deve permanecer consistente.' },
      { id: 'context-challenge-q2', prompt: 'O que useProgresso pode encapsular?', options: ['useContext(ProgressoContext)', 'fetch obrigatório', 'map'], answer: 0, explanation: 'Um hook personalizado centraliza o acesso ao contexto.' },
      { id: 'context-challenge-q3', prompt: 'Context substitui todo state local?', options: ['Não', 'Sim', 'Somente no React Native'], answer: 0, explanation: 'State local ainda é a melhor solução para dados específicos de um componente.' },
    ],
  },
];

export const reactQualityLessons = [
  {
    id: 'react-renderizacao', title: 'Renderização e pureza', subtitle: 'Mantenha componentes previsíveis.', duration: '11 min', eyebrow: 'REACT · QUALIDADE · AULA 1',
    pages: [
      { id: 'render-concept', label: 'Conceito', title: 'Renderizar é descrever a interface', body: 'Toda renderização deve calcular a mesma interface para as mesmas props e state. Evite alterar variáveis externas, chamar APIs ou iniciar timers diretamente no corpo do componente.', analogy: { icon: '🧭', title: 'Mesma entrada → mesma tela', value: 'Componentes previsíveis são mais fáceis de testar e corrigir' } },
      { id: 'render-code', label: 'Código explicado', title: 'Calcule valores durante a renderização', body: 'Valores derivados dos dados atuais podem ser calculados diretamente. Não crie outro state apenas para guardar um resultado que já pode ser obtido.', code: 'function Resumo({ aulas }) {\n  const concluidas = aulas.filter(aula => aula.concluida);\n\n  return <p>{concluidas.length} concluídas</p>;\n}', notes: [{ token: 'filter', text: 'calcula a lista concluída a partir das aulas' }, { token: 'concluidas.length', text: 'deriva o total sem state extra' }, { token: 'return', text: 'descreve o que a interface deve mostrar' }] },
      { id: 'render-rule', label: 'Regra prática', title: 'Efeitos e eventos ficam fora da renderização', body: 'Use eventos para ações causadas pelo usuário e useEffect para sincronizar com o mundo externo. O corpo do componente deve se concentrar em transformar dados em interface.', tip: 'Se algo acontece porque a pessoa clicou, comece pensando em um evento, não em useEffect.' },
    ],
    questions: [
      { id: 'render-q1', prompt: 'O corpo de um componente deve fazer o quê?', options: ['Descrever a interface pelos dados', 'Fazer fetch sempre', 'Iniciar um timer'], answer: 0, explanation: 'A renderização deve ser previsível e produzir a interface a partir de props e state.' },
      { id: 'render-q2', prompt: 'Aulas concluídas pode ser calculado com?', options: ['filter e length', 'Um novo state obrigatório', 'useEffect sempre'], answer: 0, explanation: 'É um valor derivado das aulas atuais e pode ser calculado diretamente.' },
      { id: 'render-q3', prompt: 'Onde um clique deve ser tratado?', options: ['Em um evento', 'No corpo da renderização', 'Em uma variável global'], answer: 0, explanation: 'Eventos respondem a ações explícitas do usuário.' },
    ],
  },
  {
    id: 'react-keys-imutabilidade', title: 'Keys e imutabilidade', subtitle: 'Atualize listas de forma confiável.', duration: '13 min', eyebrow: 'REACT · QUALIDADE · AULA 2',
    pages: [
      { id: 'keys-concept', label: 'Keys', title: 'Keys identificam cada item da lista', body: 'Uma key estável permite que React reconheça qual item foi mantido, removido ou movido. Prefira um id do dado; use o índice apenas quando a lista nunca muda de ordem.', code: '{aulas.map(aula => (\n  <AulaItem key={aula.id} aula={aula} />\n))}', notes: [{ token: 'map', text: 'cria uma interface para cada aula' }, { token: 'key={aula.id}', text: 'usa uma identidade estável do dado' }, { token: 'aula={aula}', text: 'entrega os dados ao componente filho' }] },
      { id: 'immutability-code', label: 'Imutabilidade', title: 'Crie uma nova lista ao atualizar state', body: 'Não altere diretamente arrays ou objetos que estão no state. Crie uma cópia atualizada e entregue-a ao setter para que React possa reagir corretamente.', code: 'setAulas(aulas =>\n  aulas.map(aula =>\n    aula.id === id ? { ...aula, concluida: true } : aula\n  )\n);', notes: [{ token: 'aulas =>', text: 'recebe o estado mais recente' }, { token: 'map', text: 'cria um novo array' }, { token: '{ ...aula, concluida: true }', text: 'cria um novo objeto para a aula alterada' }] },
      { id: 'immutability-why', label: 'Por que importa?', title: 'Referências novas deixam a mudança clara', body: 'Ao criar novos arrays e objetos, você evita efeitos colaterais e mantém o histórico das mudanças mais fácil de entender.', analogy: { icon: '🧩', title: 'Não altere a peça antiga', value: 'Crie a nova versão e entregue ao React' } },
    ],
    questions: [
      { id: 'keys-q1', prompt: 'Qual é uma boa key para uma aula?', options: ['aula.id', 'Math.random()', 'O título duplicado'], answer: 0, explanation: 'Um id persistente identifica a mesma aula entre renderizações.' },
      { id: 'keys-q2', prompt: 'Como atualizar um item de uma lista no state?', options: ['Criando novo array e novo objeto', 'Alterando aula.concluida diretamente', 'Usando document.querySelector'], answer: 0, explanation: 'Atualizações imutáveis criam novas referências para os dados alterados.' },
      { id: 'keys-q3', prompt: 'Por que evitar Math.random() como key?', options: ['A key muda a cada renderização', 'Ela não é JavaScript', 'Ela bloqueia props'], answer: 0, explanation: 'Keys devem permanecer estáveis para que React acompanhe cada item.' },
    ],
  },
  {
    id: 'react-memoizacao', title: 'Performance com critério', subtitle: 'Otimize depois de entender o problema.', duration: '13 min', eyebrow: 'REACT · QUALIDADE · AULA 3',
    pages: [
      { id: 'performance-first', label: 'Princípio', title: 'Não comece memorizando tudo', body: 'React costuma ser rápido o suficiente. Primeiro mantenha o state local, componentes claros e listas bem identificadas. Use ferramentas de medição quando perceber uma lentidão real.', analogy: { icon: '🎯', title: 'Clareza antes de otimização', value: 'Meça o problema antes de adicionar complexidade' } },
      { id: 'memo-code', label: 'React.memo', title: 'memo pode pular renderizações sem mudanças', body: 'memo envolve um componente e permite que React reutilize o resultado quando suas props não mudam. Use em componentes que renderizam muito e têm custo perceptível.', code: 'import { memo } from "react";\n\nconst CartaoAula = memo(function CartaoAula({ aula }) {\n  return <p>{aula.titulo}</p>;\n});', notes: [{ token: 'memo', text: 'memoriza a renderização conforme as props' }, { token: 'CartaoAula', text: 'é o componente otimizado' }, { token: 'aula', text: 'precisa manter a mesma referência para aproveitar memo' }] },
      { id: 'memo-hooks', label: 'useMemo e useCallback', title: 'Memorize cálculos ou funções caros quando necessário', body: 'useMemo guarda o resultado de um cálculo; useCallback guarda a referência de uma função. Eles só ajudam quando evitam trabalho real ou ajudam uma prop memorizada a não mudar.', code: 'const aulasFiltradas = useMemo(\n  () => aulas.filter(aula => aula.concluida),\n  [aulas]\n);\n\nconst concluir = useCallback((id) => {\n  setAulas(atual => atualizar(atual, id));\n}, []);', notes: [{ token: 'useMemo', text: 'memoriza o resultado de um cálculo' }, { token: '[aulas]', text: 'refaz o cálculo quando aulas muda' }, { token: 'useCallback', text: 'memoriza a função entre renderizações' }] },
    ],
    questions: [
      { id: 'memo-q1', prompt: 'Quando otimizar com memo?', options: ['Após identificar custo real', 'Em todo componente', 'Antes de criar a interface'], answer: 0, explanation: 'Memorização adiciona complexidade e deve resolver uma lentidão observada.' },
      { id: 'memo-q2', prompt: 'O que useMemo memoriza?', options: ['Resultado de um cálculo', 'Um evento de toque', 'Uma rota'], answer: 0, explanation: 'useMemo guarda um valor calculado até que suas dependências mudem.' },
      { id: 'memo-q3', prompt: 'O que useCallback memoriza?', options: ['Uma referência de função', 'Um array automaticamente', 'Uma tela'], answer: 0, explanation: 'useCallback pode manter a mesma função entre renderizações.' },
    ],
  },
  {
    id: 'react-desafio-qualidade', title: 'Desafio: painel eficiente', subtitle: 'Aplique boas práticas no StudyCode.', duration: '15 min', eyebrow: 'REACT · QUALIDADE · DESAFIO',
    pages: [
      { id: 'quality-challenge', label: 'Missão', title: 'Construa um painel de aulas previsível', body: 'Você receberá uma lista de aulas, mostrará o total concluído e permitirá concluir uma aula sem alterar os dados antigos.', analogy: { icon: '🚀', title: 'Dados → cálculo → lista → evento', value: 'Uma estrutura clara é a melhor primeira otimização' } },
      { id: 'quality-solution', label: 'Solução guiada', title: 'Derive, identifique e atualize de forma imutável', body: 'Este padrão combina uma key estável, um valor derivado e uma atualização funcional de state.', code: 'const concluidas = aulas.filter(aula => aula.concluida).length;\n\nfunction concluirAula(id) {\n  setAulas(atuais => atuais.map(aula =>\n    aula.id === id ? { ...aula, concluida: true } : aula\n  ));\n}\n\n{aulas.map(aula => (\n  <CartaoAula key={aula.id} aula={aula} />\n))}', notes: [{ token: 'concluidas', text: 'é calculado sem state extra' }, { token: 'atuais =>', text: 'usa o state mais atualizado' }, { token: 'key={aula.id}', text: 'mantém a identidade visual de cada item' }] },
    ],
    questions: [
      { id: 'quality-challenge-q1', prompt: 'Como obter o número de aulas concluídas?', options: ['filter(...).length', 'Criando três states', 'Mudando o DOM manualmente'], answer: 0, explanation: 'O número é derivado da lista atual de aulas.' },
      { id: 'quality-challenge-q2', prompt: 'Qual padrão é seguro para atualizar state a partir do valor anterior?', options: ['setAulas(atuais => ...)', 'aulas.push()', 'aulas[0] = novo'], answer: 0, explanation: 'A atualização funcional recebe o estado atual e devolve uma nova versão.' },
      { id: 'quality-challenge-q3', prompt: 'Qual deve ser o primeiro foco de performance?', options: ['Código claro e problema medido', 'memo em todos os componentes', 'Eliminar todas as props'], answer: 0, explanation: 'Otimizações devem resolver um custo real sem prejudicar a simplicidade.' },
    ],
  },
];

export const reactProjectLessons = [
  {
    id: 'react-projeto-planejamento', title: 'Planeje o projeto', subtitle: 'Transforme uma ideia em componentes e estados.', duration: '13 min', eyebrow: 'REACT · PROJETO FINAL · ETAPA 1',
    pages: [
      { id: 'project-idea', label: 'Projeto', title: 'Crie o StudyPlanner', body: 'O projeto final é um planejador de estudos: a pessoa adiciona tarefas, filtra por status, conclui aulas e acompanha o progresso. Ele usa os conceitos que você acabou de estudar.', analogy: { icon: '🚀', title: 'StudyPlanner', value: 'Tarefas, filtros, progresso e páginas em uma aplicação real' } },
      { id: 'project-hierarchy', label: 'Componentes', title: 'Quebre a interface em peças pequenas', body: 'Antes de escrever state, liste os componentes. Cada peça deve ter uma responsabilidade clara e receber os dados necessários por props.', code: 'App\n├─ BarraProgresso\n├─ FormularioTarefa\n├─ Filtros\n└─ ListaTarefas\n   └─ CartaoTarefa', notes: [{ token: 'App', text: 'coordena os dados principais' }, { token: 'FormularioTarefa', text: 'cria novas tarefas' }, { token: 'ListaTarefas', text: 'renderiza a coleção' }, { token: 'CartaoTarefa', text: 'mostra uma tarefa individual' }] },
      { id: 'project-state', label: 'Estado mínimo', title: 'Guarde apenas o que muda e não pode ser calculado', body: 'Para este projeto, as tarefas e o filtro são state. O total concluído e a porcentagem são derivados das tarefas, então não precisam de state próprio.', code: 'const [tarefas, setTarefas] = useState([]);\nconst [filtro, setFiltro] = useState("todas");\n\nconst concluidas = tarefas.filter(tarefa => tarefa.concluida).length;', notes: [{ token: 'tarefas', text: 'é a fonte de dados mutável' }, { token: 'filtro', text: 'guarda a escolha atual da pessoa' }, { token: 'concluidas', text: 'é calculado a partir das tarefas' }] },
    ],
    questions: [
      { id: 'project-plan-q1', prompt: 'Qual é o primeiro passo antes de criar o projeto?', options: ['Dividir a interface em componentes', 'Adicionar memo em tudo', 'Criar uma API'], answer: 0, explanation: 'Uma hierarquia clara ajuda a decidir props, state e responsabilidades.' },
      { id: 'project-plan-q2', prompt: 'Qual dado pode ser calculado sem state extra?', options: ['Número de tarefas concluídas', 'Texto que a pessoa digita', 'Filtro escolhido'], answer: 0, explanation: 'O total concluído deriva da lista atual de tarefas.' },
      { id: 'project-plan-q3', prompt: 'Qual componente mostra uma única tarefa?', options: ['CartaoTarefa', 'App', 'Filtros'], answer: 0, explanation: 'O cartão recebe uma tarefa e renderiza suas informações.' },
    ],
  },
  {
    id: 'react-projeto-interacao', title: 'Construa as interações', subtitle: 'Adicione, conclua e filtre tarefas.', duration: '15 min', eyebrow: 'REACT · PROJETO FINAL · ETAPA 2',
    pages: [
      { id: 'project-add', label: 'Adicionar', title: 'Crie novos dados com uma função de evento', body: 'O formulário recebe um título e chama uma função. A função cria uma tarefa com id, título e status inicial, gerando uma nova lista no state.', code: 'function adicionarTarefa(titulo) {\n  const nova = {\n    id: Date.now(),\n    titulo,\n    concluida: false,\n  };\n\n  setTarefas(atuais => [...atuais, nova]);\n}', notes: [{ token: 'Date.now()', text: 'gera um id simples para o exercício' }, { token: 'concluida: false', text: 'define o estado inicial' }, { token: 'atuais =>', text: 'usa a versão mais recente do state' }] },
      { id: 'project-toggle', label: 'Concluir', title: 'Atualize somente a tarefa escolhida', body: 'Para marcar uma tarefa, percorra a lista com map. O item com o id correspondente vira um novo objeto com o status invertido.', code: 'function alternarTarefa(id) {\n  setTarefas(atuais => atuais.map(tarefa =>\n    tarefa.id === id\n      ? { ...tarefa, concluida: !tarefa.concluida }\n      : tarefa\n  ));\n}', notes: [{ token: 'map', text: 'cria uma nova lista' }, { token: 'tarefa.id === id', text: 'encontra o item selecionado' }, { token: '!tarefa.concluida', text: 'alterna entre concluída e pendente' }] },
      { id: 'project-filter', label: 'Filtrar', title: 'Derive a lista que deve aparecer', body: 'O filtro não altera as tarefas originais. Ele apenas calcula a coleção visível com base na escolha atual.', code: 'const visiveis = tarefas.filter(tarefa => {\n  if (filtro === "concluidas") return tarefa.concluida;\n  if (filtro === "pendentes") return !tarefa.concluida;\n  return true;\n});', tip: 'Manter a lista original evita perder dados quando a pessoa troca de filtro.' },
    ],
    questions: [
      { id: 'project-interaction-q1', prompt: 'Como adicionar uma tarefa sem alterar a lista anterior?', options: ['[...atuais, nova]', 'atuais.push(nova)', 'tarefas = nova'], answer: 0, explanation: 'Spread cria um novo array com as tarefas existentes e a nova tarefa.' },
      { id: 'project-interaction-q2', prompt: 'Qual método atualiza uma tarefa pelo id sem alterar as outras?', options: ['map', 'sort', 'join'], answer: 0, explanation: 'map cria uma nova versão de cada item e altera apenas o correspondente.' },
      { id: 'project-interaction-q3', prompt: 'O filtro deve apagar tarefas da lista original?', options: ['Não', 'Sim, sempre', 'Somente no React Native'], answer: 0, explanation: 'O filtro calcula uma lista visível sem destruir os dados originais.' },
    ],
  },
  {
    id: 'react-projeto-evolucao', title: 'Evolua a aplicação', subtitle: 'Persistência, navegação e estado compartilhado.', duration: '14 min', eyebrow: 'REACT · PROJETO FINAL · ETAPA 3',
    pages: [
      { id: 'project-persistence', label: 'Persistência', title: 'Use efeito para salvar ou carregar dados', body: 'Depois da versão local funcionar, você pode sincronizar as tarefas com armazenamento ou uma API. Essa é uma responsabilidade de useEffect, não da renderização.', code: 'useEffect(() => {\n  localStorage.setItem("tarefas", JSON.stringify(tarefas));\n}, [tarefas]);', notes: [{ token: 'useEffect', text: 'sincroniza com o armazenamento externo' }, { token: 'JSON.stringify', text: 'converte dados em texto para salvar' }, { token: '[tarefas]', text: 'salva novamente quando a lista muda' }] },
      { id: 'project-navigation', label: 'Páginas', title: 'Separe lista e detalhes por rotas', body: 'Uma evolução natural é criar uma página de tarefas e outra de detalhes. A rota dinâmica recebe o id e permite abrir uma tarefa específica.', code: '<Route path="/tarefas" element={<ListaTarefas />} />\n<Route path="/tarefas/:id" element={<DetalheTarefa />} />', notes: [{ token: '/tarefas', text: 'mostra a lista principal' }, { token: ':id', text: 'representa o identificador da tarefa' }, { token: 'DetalheTarefa', text: 'reutiliza a tela para cada item' }] },
      { id: 'project-context', label: 'Compartilhar', title: 'Use Context somente se várias páginas precisarem dos dados', body: 'Se lista, detalhes e perfil usam as mesmas tarefas e XP, um Provider pode concentrar esse estado. Se só App e seus filhos próximos usam os dados, props continuam simples e adequadas.', analogy: { icon: '🧠', title: 'Comece local, extraia quando precisar', value: 'A estrutura deve crescer conforme a necessidade do projeto' } },
    ],
    questions: [
      { id: 'project-evolve-q1', prompt: 'Por que salvar no localStorage fica em useEffect?', options: ['É uma sincronização externa', 'É JSX', 'É uma key'], answer: 0, explanation: 'Armazenamento externo é um efeito, separado da renderização.' },
      { id: 'project-evolve-q2', prompt: 'O que :id representa em uma rota?', options: ['Um parâmetro dinâmico', 'Um estilo CSS', 'Um estado global'], answer: 0, explanation: 'O valor identifica qual tarefa deve aparecer no detalhe.' },
      { id: 'project-evolve-q3', prompt: 'Quando Context pode ser útil no projeto?', options: ['Quando páginas distantes compartilham dados', 'Para todo texto local', 'Para substituir map'], answer: 0, explanation: 'Context reduz a passagem de props quando o mesmo dado é usado em muitos níveis.' },
    ],
  },
  {
    id: 'react-desafio-projeto-final', title: 'Desafio final: StudyPlanner', subtitle: 'Construa sua aplicação React sozinho.', duration: '20 min', eyebrow: 'REACT · PROJETO FINAL · DESAFIO',
    pages: [
      { id: 'final-mission', label: 'Sua missão', title: 'Faça a primeira versão funcionar', body: 'Crie o StudyPlanner do zero. Comece sem API: adicione tarefas, marque como concluídas, filtre a lista e mostre o progresso. Depois, escolha uma evolução.', analogy: { icon: '🏁', title: 'Você terminou a trilha React', value: 'Agora o objetivo é escrever, errar, testar e melhorar sozinho' } },
      { id: 'final-checklist', label: 'Checklist', title: 'O que sua aplicação precisa ter', body: 'Use esta lista como um roteiro. Não copie tudo de uma vez: faça uma parte, teste e só então siga para a próxima.', code: '□ Componentes: formulário, filtros e cartão\n□ State: tarefas e filtro\n□ Eventos: adicionar e concluir\n□ Lista: map com key estável\n□ Progresso derivado\n□ Estado vazio\n□ Persistência ou rota como evolução', notes: [{ token: 'State mínimo', text: 'guarda somente tarefas e filtro' }, { token: 'Progresso derivado', text: 'calcula a porcentagem sem duplicar dados' }, { token: 'Evolução', text: 'escolha um passo além da versão inicial' }] },
      { id: 'final-next-step', label: 'Próximo passo', title: 'Você já pode criar aplicações React', body: 'Você tem os blocos principais: componentes, props, state, eventos, listas, efeitos, APIs, rotas, Context e boas práticas. O caminho agora é construir projetos pequenos e aumentar a dificuldade gradualmente.', tip: 'Quando concluir, recrie este projeto sem olhar a solução. Essa repetição consolida muito mais do que apenas ler código.' },
    ],
    questions: [
      { id: 'final-project-q1', prompt: 'Qual deve ser a primeira versão do StudyPlanner?', options: ['Uma versão local e funcional', 'Uma aplicação com todas as APIs', 'Um Context para cada campo'], answer: 0, explanation: 'Começar pequeno permite validar a estrutura antes de adicionar complexidade.' },
      { id: 'final-project-q2', prompt: 'Qual é uma boa estratégia de construção?', options: ['Fazer uma parte e testar', 'Copiar tudo sem executar', 'Otimizar antes de existir tela'], answer: 0, explanation: 'Iterações curtas tornam erros mais fáceis de entender e corrigir.' },
      { id: 'final-project-q3', prompt: 'Depois de concluir a trilha, o que mais fortalece seu aprendizado?', options: ['Reconstruir um projeto sozinho', 'Evitar novos projetos', 'Memorizar toda a documentação'], answer: 0, explanation: 'Praticar a construção independente transforma conceitos em habilidade.' },
    ],
  },
];

export const allReactLessons = [...reactLessons, ...reactInteractionLessons, ...reactEffectLessons, ...reactRoutingLessons, ...reactContextLessons, ...reactQualityLessons, ...reactProjectLessons];

export const reactModules = [
  { id: 'react-fundamentos', number: 1, title: 'Fundamentos do React', description: 'Componentes, JSX, props e estado', color: colors.primaryLight, lessons: reactLessons },
  { id: 'react-interacao', number: 2, title: 'Interação e listas', description: 'Eventos, formulários e renderização dinâmica', color: colors.secondaryLight, lessons: reactInteractionLessons, requiresModule: 'react-fundamentos' },
  { id: 'react-efeitos', number: 3, title: 'Efeitos e APIs', description: 'useEffect, dados externos e tratamento de erros', color: colors.success, lessons: reactEffectLessons, requiresModule: 'react-interacao' },
  { id: 'react-rotas', number: 4, title: 'Rotas e navegação', description: 'Páginas, links e rotas dinâmicas', color: colors.info, lessons: reactRoutingLessons, requiresModule: 'react-efeitos' },
  { id: 'react-contexto', number: 5, title: 'Contexto e estado global', description: 'Dados compartilhados entre componentes', color: colors.pink, lessons: reactContextLessons, requiresModule: 'react-rotas' },
  { id: 'react-qualidade', number: 6, title: 'Boas práticas e performance', description: 'Renderização previsível, listas e otimização com critério', color: colors.gold, lessons: reactQualityLessons, requiresModule: 'react-contexto' },
  { id: 'react-projeto-final', number: 7, title: 'Projeto final: StudyPlanner', description: 'Planeje e construa uma aplicação React completa', color: colors.flame, lessons: reactProjectLessons, requiresModule: 'react-qualidade' },
];

export function getAnyLessonById(lessonId) {
  const lesson = [...allHtmlLessons, ...allCssLessons, ...allJavascriptLessons, ...allReactLessons, ...allNextLessons, ...allNodeLessons, ...allTypescriptLessons].find((item) => item.id === lessonId)
    ?? allJavascriptLessons[0];
  return enrichLesson(lesson);
}
