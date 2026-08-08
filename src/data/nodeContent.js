import { colors } from '../theme/tokens';

const nodeFundamentalsLessons = [
  {
    id: 'node-runtime',
    title: 'O que e Node.js?',
    subtitle: 'Entenda como JavaScript roda fora do navegador.',
    duration: '9 min',
    eyebrow: 'NODE.JS · FUNDAMENTOS · AULA 1',
    pages: [
      {
        id: 'node-runtime-conceito',
        label: 'Conceito',
        title: 'Node.js e um runtime JavaScript',
        body: 'O navegador executa JavaScript dentro da pagina. O Node.js usa o motor V8 para executar JavaScript no computador ou servidor, permitindo criar APIs, scripts, automacoes e ferramentas de linha de comando.',
        analogy: { icon: '🛠️', title: 'Navegador', value: 'Interface no cliente' },
        tip: 'Node.js nao e uma linguagem nova: e um ambiente para executar JavaScript fora do navegador.',
      },
      {
        id: 'node-runtime-comando',
        label: 'Codigo explicado',
        title: 'Execute seu primeiro arquivo',
        body: 'Depois de criar um arquivo, o comando node informa ao runtime qual script deve ser executado.',
        code: "console.log('Servidor StudyCode iniciado');\n\n// terminal\nnode index.js",
        notes: [
          { token: 'console.log', text: 'exibe uma mensagem no terminal' },
          { token: 'node', text: 'chama o runtime instalado na maquina' },
          { token: 'index.js', text: 'e o arquivo JavaScript executado' },
        ],
      },
    ],
    questions: [
      { id: 'node-runtime-q1', prompt: 'O que e Node.js?', options: ['Um runtime para executar JavaScript fora do navegador', 'Uma nova linguagem', 'Um banco de dados'], answer: 0, explanation: 'Node.js executa JavaScript usando o motor V8.' },
      { id: 'node-runtime-q2', prompt: 'Qual comando executa index.js?', options: ['node index.js', 'run browser index.js', 'start-css index.js'], answer: 0, explanation: 'O comando node recebe o caminho do arquivo.' },
      { id: 'node-runtime-q3', prompt: 'Onde aparece console.log no Node?', options: ['No terminal', 'No HTML automaticamente', 'No banco de dados'], answer: 0, explanation: 'O log e enviado para a saida do processo.' },
    ],
  },
  {
    id: 'node-npm-modulos',
    title: 'NPM e modulos',
    subtitle: 'Organize dependencias e divida o codigo em arquivos.',
    duration: '11 min',
    eyebrow: 'NODE.JS · FUNDAMENTOS · AULA 2',
    pages: [
      {
        id: 'node-npm-package',
        label: 'Projeto',
        title: 'package.json descreve a aplicacao',
        body: 'O comando npm init cria o arquivo que registra nome, versao, scripts e dependencias do projeto.',
        code: 'npm init -y\n\n// package.json\n{\n  "scripts": { "start": "node index.js" }\n}',
        notes: [
          { token: 'npm init', text: 'inicia a configuracao de um pacote Node.js' },
          { token: 'scripts', text: 'guarda comandos curtos para tarefas repetidas' },
          { token: 'dependencies', text: 'lista pacotes usados pelo projeto' },
        ],
      },
      {
        id: 'node-npm-import',
        label: 'Modulos',
        title: 'Importe apenas o que precisa',
        body: 'Modulos ajudam a separar responsabilidades. Um arquivo exporta uma funcao e outro arquivo importa e utiliza essa funcao.',
        code: "// math.js\nexport function somar(a, b) {\n  return a + b;\n}\n\n// index.js\nimport { somar } from './math.js';\nconsole.log(somar(2, 3));",
        tip: 'Arquivos pequenos e com uma responsabilidade clara sao mais faceis de testar.',
      },
    ],
    questions: [
      { id: 'node-npm-q1', prompt: 'Para que serve package.json?', options: ['Descrever scripts e dependencias do projeto', 'Guardar imagens da interface', 'Substituir o servidor'], answer: 0, explanation: 'package.json e o manifesto do projeto Node.' },
      { id: 'node-npm-q2', prompt: 'O que um modulo faz?', options: ['Separa e reutiliza responsabilidades', 'Apaga todos os arquivos', 'Cria uma senha automaticamente'], answer: 0, explanation: 'Modulos tornam o codigo mais organizado.' },
      { id: 'node-npm-q3', prompt: 'Qual comando instala um pacote?', options: ['npm install nome-do-pacote', 'node add css', 'install browser'], answer: 0, explanation: 'npm install registra e baixa uma dependencia.' },
    ],
  },
];

const nodeServerLessons = [
  {
    id: 'node-http-server',
    title: 'Primeiro servidor HTTP',
    subtitle: 'Responda requisicoes usando o modulo http.',
    duration: '12 min',
    eyebrow: 'NODE.JS · SERVIDORES · AULA 1',
    pages: [
      {
        id: 'node-http-create',
        label: 'Codigo explicado',
        title: 'Criando um servidor minimo',
        body: 'O modulo http inclui ferramentas para ouvir uma porta e responder requisicoes. A funcao recebe request e response a cada acesso.',
        code: "import { createServer } from 'node:http';\n\nconst server = createServer((request, response) => {\n  response.writeHead(200, { 'Content-Type': 'text/plain' });\n  response.end('Ola, StudyCode!');\n});\n\nserver.listen(3000);",
        notes: [
          { token: 'createServer', text: 'cria o servidor e registra a funcao de atendimento' },
          { token: 'response', text: 'permite configurar e enviar a resposta' },
          { token: 'listen(3000)', text: 'abre a porta 3000 para receber acessos' },
        ],
      },
      {
        id: 'node-http-request',
        label: 'Request e response',
        title: 'Cada requisicao conta uma historia',
        body: 'request informa o metodo e a URL que chegaram. response define o status, os cabecalhos e o corpo devolvido ao cliente.',
        code: "if (request.url === '/status') {\n  response.writeHead(200);\n  response.end('online');\n  return;\n}",
        tip: 'Sempre finalize uma resposta. Sem response.end, o cliente pode ficar esperando.',
      },
    ],
    questions: [
      { id: 'node-http-q1', prompt: 'Qual modulo nativo cria um servidor HTTP?', options: ['node:http', 'node:colors', 'node:html'], answer: 0, explanation: 'O modulo node:http fornece createServer.' },
      { id: 'node-http-q2', prompt: 'Para que serve server.listen(3000)?', options: ['Escutar requisicoes na porta 3000', 'Encerrar o processo', 'Criar uma tabela SQL'], answer: 0, explanation: 'listen abre a porta para o servidor receber trafego.' },
      { id: 'node-http-q3', prompt: 'O que response.end faz?', options: ['Envia e finaliza a resposta', 'Inicia um novo projeto', 'Le um arquivo CSS'], answer: 0, explanation: 'A resposta precisa ser finalizada para o cliente continuar.' },
    ],
  },
  {
    id: 'node-rotas-status',
    title: 'Rotas e status HTTP',
    subtitle: 'Organize respostas para cada caminho da API.',
    duration: '10 min',
    eyebrow: 'NODE.JS · SERVIDORES · AULA 2',
    pages: [
      {
        id: 'node-rotas-switch',
        label: 'Decisao',
        title: 'Metodo e URL orientam a resposta',
        body: 'Uma API pode usar o metodo e a URL para decidir o que fazer. Mesmo em um servidor pequeno, manter as rotas explicitas facilita a evolucao.',
        code: "if (request.method === 'GET' && request.url === '/api/cursos') {\n  response.writeHead(200, { 'Content-Type': 'application/json' });\n  response.end(JSON.stringify({ cursos: [] }));\n  return;\n}",
        notes: [
          { token: 'request.method', text: 'identifica GET, POST e outros metodos' },
          { token: 'request.url', text: 'informa o caminho acessado' },
          { token: 'JSON.stringify', text: 'transforma um objeto em texto JSON' },
        ],
      },
      {
        id: 'node-rotas-status-code',
        label: 'Status',
        title: 'Status comunica o resultado',
        body: 'Use 200 para sucesso, 201 para criacao, 400 quando os dados sao invalidos e 404 quando o recurso nao existe. O status ajuda o cliente a tomar decisoes.',
        tip: 'Uma mensagem clara e um status coerente tornam a API muito mais facil de consumir.',
      },
    ],
    questions: [
      { id: 'node-rotas-q1', prompt: 'O que uma rota combina?', options: ['Metodo HTTP e URL', 'Apenas uma cor', 'Nome do computador e teclado'], answer: 0, explanation: 'Metodo e caminho definem a intencao da requisicao.' },
      { id: 'node-rotas-q2', prompt: 'Qual status representa recurso nao encontrado?', options: ['404', '201', '999'], answer: 0, explanation: '404 e o status HTTP tradicional para nao encontrado.' },
      { id: 'node-rotas-q3', prompt: 'Por que usar JSON.stringify?', options: ['Para enviar um objeto em formato JSON', 'Para abrir uma porta', 'Para instalar Node'], answer: 0, explanation: 'A resposta HTTP precisa de texto ou bytes no corpo.' },
    ],
  },
];

const nodeApiLessons = [
  {
    id: 'node-async-files',
    title: 'Operacoes assincronas',
    subtitle: 'Leia arquivos sem bloquear o servidor.',
    duration: '11 min',
    eyebrow: 'NODE.JS · APIS · AULA 1',
    pages: [
      {
        id: 'node-async-files-conceito',
        label: 'Conceito',
        title: 'Nao bloqueie o caminho principal',
        body: 'Operacoes de rede e disco podem demorar. As APIs assincronas permitem que o processo continue atendendo outras requisicoes enquanto aguarda o resultado.',
        code: "import { readFile } from 'node:fs/promises';\n\nconst content = await readFile('./data.json', 'utf8');\nconst data = JSON.parse(content);",
        notes: [
          { token: 'node:fs/promises', text: 'oferece funcoes de arquivo baseadas em Promise' },
          { token: 'await', text: 'espera a leitura sem travar outras tarefas do event loop' },
          { token: 'JSON.parse', text: 'converte texto JSON em objeto JavaScript' },
        ],
      },
      {
        id: 'node-async-errors',
        label: 'Seguranca',
        title: 'Toda Promise pode falhar',
        body: 'Use try/catch em operacoes assincronas e devolva uma resposta adequada. O usuario deve receber uma orientacao, enquanto o terminal registra detalhes para investigacao.',
        code: "try {\n  const data = await loadCourses();\n  return data;\n} catch (error) {\n  console.error(error);\n  return { error: 'Nao foi possivel carregar os cursos' };\n}",
        tip: 'Nunca mostre stack traces ou segredos diretamente para quem usa a API.',
      },
    ],
    questions: [
      { id: 'node-async-q1', prompt: 'Por que preferir APIs assincronas no servidor?', options: ['Para nao bloquear outras requisicoes', 'Para impedir qualquer leitura', 'Para remover o event loop'], answer: 0, explanation: 'O servidor consegue aproveitar melhor o tempo de espera.' },
      { id: 'node-async-q2', prompt: 'O que JSON.parse faz?', options: ['Converte texto JSON em objeto', 'Cria um servidor', 'Fecha uma porta'], answer: 0, explanation: 'parse interpreta uma string JSON.' },
      { id: 'node-async-q3', prompt: 'Onde registrar detalhes tecnicos do erro?', options: ['No log do servidor', 'Na senha do usuario', 'No titulo da pagina'], answer: 0, explanation: 'Logs ajudam a investigar sem expor informacoes internas.' },
    ],
  },
  {
    id: 'node-api-validacao',
    title: 'Validacao e ambiente',
    subtitle: 'Proteja entradas e configure o servidor para cada ambiente.',
    duration: '12 min',
    eyebrow: 'NODE.JS · APIS · AULA 2',
    pages: [
      {
        id: 'node-api-validacao-input',
        label: 'Validacao',
        title: 'Confie no formato, nao no palpite',
        body: 'Dados vindos da internet sao entrada externa. Verifique campos obrigatorios, tipos e limites antes de executar uma regra ou salvar informacoes.',
        code: "function isValidCourse(body) {\n  return typeof body.title === 'string'\n    && body.title.trim().length >= 3;\n}",
        tip: 'Validar cedo reduz bugs e tambem diminui riscos de seguranca.',
      },
      {
        id: 'node-api-validacao-env',
        label: 'Configuracao',
        title: 'Segredos ficam no ambiente',
        body: 'Portas, URLs e chaves nao devem ficar espalhadas no codigo. Variaveis de ambiente permitem trocar configuracoes sem alterar a aplicacao.',
        code: "const port = process.env.PORT || 3000;\nconst databaseUrl = process.env.DATABASE_URL;",
        notes: [
          { token: 'process.env', text: 'le valores fornecidos pelo ambiente de execucao' },
          { token: 'PORT', text: 'define a porta quando o servidor for publicado' },
          { token: 'DATABASE_URL', text: 'guarda a conexao sem colocar segredo no repositorio' },
        ],
      },
    ],
    questions: [
      { id: 'node-api-q1', prompt: 'Por que validar dados recebidos?', options: ['Para garantir formato e proteger a regra de negocio', 'Para deixar o servidor mais colorido', 'Para substituir o HTTP'], answer: 0, explanation: 'Entrada externa sempre precisa ser tratada como nao confiavel.' },
      { id: 'node-api-q2', prompt: 'Onde colocar uma chave secreta?', options: ['Em uma variavel de ambiente', 'Direto no componente publico', 'No nome da rota'], answer: 0, explanation: 'Segredos devem ficar fora do codigo versionado.' },
      { id: 'node-api-q3', prompt: 'O que process.env.PORT permite?', options: ['Configurar a porta sem editar o codigo', 'Criar uma senha automatica', 'Renderizar um botao'], answer: 0, explanation: 'Ambientes diferentes podem fornecer portas diferentes.' },
    ],
  },
];

const nodeProjectLessons = [
  {
    id: 'node-projeto-study-api',
    title: 'Projeto: StudyCode API',
    subtitle: 'Construa uma API pequena para alimentar o aplicativo.',
    duration: '14 min',
    eyebrow: 'NODE.JS · PROJETO FINAL · AULA 1',
    pages: [
      {
        id: 'node-projeto-study-api-rotas',
        label: 'Desafio',
        title: 'Modele o contrato da API',
        body: 'Crie endpoints para listar cursos, consultar uma aula e registrar a conclusao. Primeiro defina entradas e respostas; depois implemente o servidor.',
        code: 'GET  /api/courses\nGET  /api/courses/:courseId/lessons/:lessonId\nPOST /api/progress',
        tip: 'Um contrato claro permite que o app mobile e o servidor evoluam sem adivinhacao.',
      },
      {
        id: 'node-projeto-study-api-fluxo',
        label: 'Fluxo',
        title: 'Conecte a API ao StudyCode',
        body: 'O aplicativo envia uma requisicao, a API valida os dados e responde JSON com status coerente. Em seguida, a interface atualiza o progresso e mostra o resultado.',
        analogy: { icon: '🔌', title: 'Cliente', value: 'Pede dados' },
      },
    ],
    questions: [
      { id: 'node-projeto-q1', prompt: 'Qual metodo registra uma conclusao?', options: ['POST', 'GET sem corpo', 'STYLE'], answer: 0, explanation: 'POST representa o envio de um novo registro.' },
      { id: 'node-projeto-q2', prompt: 'O que a API deve devolver?', options: ['JSON e um status HTTP coerente', 'Somente uma tela HTML fixa', 'A senha do servidor'], answer: 0, explanation: 'O cliente precisa de dados e de um resultado explicito.' },
      { id: 'node-projeto-q3', prompt: 'Qual e a ordem mais segura?', options: ['Validar, processar e responder', 'Responder antes de validar', 'Salvar qualquer entrada'], answer: 0, explanation: 'Validacao deve acontecer antes da regra de negocio.' },
    ],
  },
];

export const allNodeLessons = [
  ...nodeFundamentalsLessons,
  ...nodeServerLessons,
  ...nodeApiLessons,
  ...nodeProjectLessons,
];

export const nodeModules = [
  { id: 'node-fundamentos', number: 1, title: 'Fundamentos do Node.js', description: 'Runtime, NPM e modulos', color: colors.primaryLight, lessons: nodeFundamentalsLessons },
  { id: 'node-servidores', number: 2, title: 'Servidores HTTP', description: 'Requisicoes, respostas, rotas e status', color: colors.secondaryLight, lessons: nodeServerLessons, requiresModule: 'node-fundamentos' },
  { id: 'node-apis', number: 3, title: 'APIs confiaveis', description: 'Async, validacao e ambiente', color: colors.success, lessons: nodeApiLessons, requiresModule: 'node-servidores' },
  { id: 'node-projeto-final', number: 4, title: 'Projeto final: StudyCode API', description: 'Conecte o servidor ao aplicativo', color: colors.flame, lessons: nodeProjectLessons, requiresModule: 'node-apis' },
];
