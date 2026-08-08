import { colors } from '../theme/tokens';

const nextFundamentalsLessons = [
  {
    id: 'next-introducao',
    title: 'O que e Next.js?',
    subtitle: 'Entenda por que equipes usam Next.js para criar apps React completos.',
    duration: '8 min',
    eyebrow: 'NEXT.JS · FUNDAMENTOS · AULA 1',
    pages: [
      {
        id: 'next-introducao-conceito',
        label: 'Conceito',
        title: 'Next.js organiza o React para producao',
        body: 'React resolve a construcao de componentes. Next.js adiciona convencoes para rotas, layouts, renderizacao no servidor, carregamento de dados e otimizacao. Assim voce consegue sair de uma tela isolada e construir um produto completo.',
        analogy: { icon: '🧭', title: 'React e as pecas', value: 'Next.js e o mapa da aplicacao' },
        tip: 'Pense no Next.js como uma camada de organizacao sobre o React, nao como uma substituicao do React.',
      },
      {
        id: 'next-introducao-codigo',
        label: 'Codigo explicado',
        title: 'Uma pagina Next.js nasce de um arquivo',
        body: 'No App Router, cada pasta representa um segmento da URL e o arquivo page.js renderiza a tela daquela rota.',
        code: "export default function HomePage() {\n  return <h1>Bem-vindo ao StudyCode</h1>;\n}",
        notes: [
          { token: 'export default', text: 'torna este componente a pagina principal do arquivo' },
          { token: 'HomePage', text: 'e o nome do componente React' },
          { token: 'return', text: 'devolve o JSX que sera exibido na tela' },
        ],
      },
      {
        id: 'next-introducao-comparacao',
        label: 'Na pratica',
        title: 'O que o Next.js resolve?',
        body: 'Com uma estrutura padronizada, o time encontra paginas, layouts e endpoints sempre no mesmo lugar. O framework tambem prepara recursos como SEO, imagens otimizadas e navegacao rapida.',
        code: 'app/\n├─ layout.js\n├─ page.js\n└─ cursos/\n   └─ page.js',
        tip: 'Comece entendendo a estrutura do App Router antes de memorizar configuracoes avancadas.',
      },
    ],
    questions: [
      { id: 'next-introducao-q1', prompt: 'Qual e a principal relacao entre React e Next.js?', options: ['Next.js organiza e amplia aplicacoes React', 'React so funciona dentro do Next.js', 'Next.js substitui JavaScript'], answer: 0, explanation: 'Next.js usa React e acrescenta convencoes para construir aplicacoes completas.' },
      { id: 'next-introducao-q2', prompt: 'No App Router, qual arquivo representa uma pagina?', options: ['page.js', 'route.css', 'screen.json'], answer: 0, explanation: 'O arquivo page.js define a interface de uma rota.' },
      { id: 'next-introducao-q3', prompt: 'Qual recurso faz parte do valor do Next.js?', options: ['Rotas, layouts e renderizacao', 'Apenas cores de interface', 'Somente consultas SQL'], answer: 0, explanation: 'Next.js reune recursos de aplicacao em uma estrutura consistente.' },
    ],
  },
  {
    id: 'next-estrutura',
    title: 'Estrutura do App Router',
    subtitle: 'Crie paginas e entenda o papel de layout.js.',
    duration: '10 min',
    eyebrow: 'NEXT.JS · FUNDAMENTOS · AULA 2',
    pages: [
      {
        id: 'next-estrutura-pastas',
        label: 'Conceito',
        title: 'Pastas viram caminhos',
        body: 'A pasta app e o ponto de entrada do App Router. Uma pasta chamada cursos com um page.js cria a rota /cursos automaticamente.',
        code: 'app/\n├─ page.js          // /\n└─ cursos/\n   └─ page.js       // /cursos',
        notes: [
          { token: 'app', text: 'guarda as rotas e a estrutura visual da aplicacao' },
          { token: 'cursos', text: 'representa um segmento da URL' },
          { token: 'page.js', text: 'define o conteudo que o visitante ve' },
        ],
      },
      {
        id: 'next-estrutura-layout',
        label: 'Codigo explicado',
        title: 'Layouts permanecem entre navegacoes',
        body: 'Use layout.js para elementos compartilhados, como cabecalho, navegacao e providers. O children recebe a pagina atual.',
        code: "export default function RootLayout({ children }) {\n  return (\n    <html lang=\"pt-BR\">\n      <body>{children}</body>\n    </html>\n  );\n}",
        notes: [
          { token: 'children', text: 'representa a pagina ou layout aninhado' },
          { token: '<html>', text: 'define a estrutura raiz do documento' },
          { token: '<body>', text: 'recebe o conteudo visivel da aplicacao' },
        ],
      },
      {
        id: 'next-estrutura-exercicio',
        label: 'Desafio mental',
        title: 'Qual URL sera criada?',
        body: 'Se voce criar app/trilhas/javascript/page.js, o Next.js transforma essa estrutura em uma rota pronta para navegacao.',
        code: 'app/trilhas/javascript/page.js\n// URL: /trilhas/javascript',
        tip: 'Nomear pastas com clareza deixa a arquitetura legivel para todo o time.',
      },
    ],
    questions: [
      { id: 'next-estrutura-q1', prompt: 'Qual pasta e o ponto de entrada do App Router?', options: ['app', 'public', 'components-only'], answer: 0, explanation: 'No App Router, a pasta app organiza paginas, layouts e segmentos.' },
      { id: 'next-estrutura-q2', prompt: 'Para que serve layout.js?', options: ['Compartilhar estrutura entre paginas', 'Guardar imagens estaticas', 'Executar consultas SQL'], answer: 0, explanation: 'Layouts preservam elementos comuns enquanto a pagina muda.' },
      { id: 'next-estrutura-q3', prompt: 'Qual rota nasce de app/trilhas/javascript/page.js?', options: ['/trilhas/javascript', '/page/trilhas/javascript', '/javascript.js'], answer: 0, explanation: 'Cada pasta representa um segmento da URL.' },
    ],
  },
  {
    id: 'next-componentes',
    title: 'Server e Client Components',
    subtitle: 'Escolha onde cada parte da interface deve executar.',
    duration: '12 min',
    eyebrow: 'NEXT.JS · FUNDAMENTOS · AULA 3',
    pages: [
      {
        id: 'next-componentes-servidor',
        label: 'Conceito',
        title: 'Server Components sao o padrao',
        body: 'No App Router, componentes rodam no servidor por padrao. Isso reduz JavaScript enviado ao navegador e permite buscar dados perto da fonte.',
        analogy: { icon: '🛰️', title: 'Servidor', value: 'prepara dados antes da tela chegar' },
        tip: 'Prefira o servidor quando a interface nao precisa de interacao direta do usuario.',
      },
      {
        id: 'next-componentes-client',
        label: 'Codigo explicado',
        title: 'use client libera interatividade',
        body: 'Adicione a diretiva no topo do arquivo quando o componente precisar de useState, eventos, efeitos ou APIs do navegador.',
        code: "'use client';\n\nimport { useState } from 'react';\n\nexport default function LikeButton() {\n  const [liked, setLiked] = useState(false);\n  return <button onClick={() => setLiked(!liked)}>\n    {liked ? 'Curtido' : 'Curtir'}\n  </button>;\n}",
        notes: [
          { token: "'use client'", text: 'marca o limite que sera executado no navegador' },
          { token: 'useState', text: 'permite guardar estado interativo' },
          { token: 'onClick', text: 'responde a uma acao do usuario' },
        ],
      },
      {
        id: 'next-componentes-regra',
        label: 'Regra de ouro',
        title: 'Use o menor limite necessario',
        body: 'Um Server Component pode renderizar um Client Component. O contrario exige cuidado, pois dados e funcoes precisam atravessar a fronteira de forma serializavel.',
        tip: 'Deixe a pagina e a busca no servidor; transforme apenas o botao ou formulario interativo em Client Component.',
      },
    ],
    questions: [
      { id: 'next-componentes-q1', prompt: 'Qual e o comportamento padrao no App Router?', options: ['Server Components', 'Somente Client Components', 'Componentes sem renderizacao'], answer: 0, explanation: 'Componentes sao de servidor por padrao no App Router.' },
      { id: 'next-componentes-q2', prompt: 'Quando usar use client?', options: ['Quando houver estado, eventos ou APIs do navegador', 'Em todos os arquivos', 'Apenas para mudar a cor do fundo'], answer: 0, explanation: 'A diretiva habilita recursos interativos no cliente.' },
      { id: 'next-componentes-q3', prompt: 'Qual pratica reduz JavaScript enviado ao navegador?', options: ['Manter o maximo possivel no servidor', 'Adicionar use client em tudo', 'Duplicar cada pagina'], answer: 0, explanation: 'Server Components ajudam a entregar apenas a interatividade necessaria.' },
    ],
  },
];

const nextRoutingLessons = [
  {
    id: 'next-navegacao',
    title: 'Navegacao com Link',
    subtitle: 'Troque de pagina sem recarregar o aplicativo inteiro.',
    duration: '8 min',
    eyebrow: 'NEXT.JS · NAVEGACAO · AULA 1',
    pages: [
      {
        id: 'next-navegacao-link',
        label: 'Conceito',
        title: 'Link conhece as rotas do app',
        body: 'O componente Link do Next.js cria navegacao otimizada entre paginas. Ele pre-carrega destinos quando faz sentido e evita um recarregamento completo.',
        code: "import Link from 'next/link';\n\n<Link href=\"/cursos\">Ver cursos</Link>",
        notes: [
          { token: 'next/link', text: 'fornece o componente de navegacao do framework' },
          { token: 'href', text: 'informa o caminho de destino' },
          { token: 'Ver cursos', text: 'e o texto clicavel exibido na tela' },
        ],
      },
      {
        id: 'next-navegacao-dinamica',
        label: 'Rotas dinamicas',
        title: 'Colchetes representam parametros',
        body: 'Uma pasta como [slug] captura um valor variavel da URL. Isso permite reutilizar uma pagina para varias aulas ou cursos.',
        code: 'app/cursos/[slug]/page.js\n// /cursos/javascript\n// /cursos/react',
        tip: 'Rotas dinamicas sao uma ponte natural para paginas de detalhes.',
      },
    ],
    questions: [
      { id: 'next-navegacao-q1', prompt: 'Qual componente e indicado para links internos?', options: ['Link', 'AnchorOnly', 'NavigateNow'], answer: 0, explanation: 'next/link cuida da navegacao interna otimizada.' },
      { id: 'next-navegacao-q2', prompt: 'O que [slug] representa?', options: ['Um segmento dinamico', 'Uma pasta invisivel', 'Um arquivo de estilo'], answer: 0, explanation: 'Colchetes indicam um parametro da rota.' },
      { id: 'next-navegacao-q3', prompt: 'Por que evitar recarregamento completo?', options: ['A navegacao fica mais fluida e preserva o estado quando possivel', 'O app deixa de ter rotas', 'O servidor para de funcionar'], answer: 0, explanation: 'A navegacao client-side melhora a experiencia.' },
    ],
  },
  {
    id: 'next-loading-erros',
    title: 'Loading e estados de erro',
    subtitle: 'De feedback enquanto os dados chegam e trate falhas com clareza.',
    duration: '9 min',
    eyebrow: 'NEXT.JS · NAVEGACAO · AULA 2',
    pages: [
      {
        id: 'next-loading-arquivo',
        label: 'Codigo explicado',
        title: 'loading.js mostra progresso',
        body: 'Ao criar loading.js dentro de uma rota, o Next.js usa esse componente enquanto o segmento esta sendo carregado.',
        code: "export default function Loading() {\n  return <p>Carregando suas aulas...</p>;\n}",
        notes: [
          { token: 'loading.js', text: 'arquivo especial para o estado de carregamento da rota' },
          { token: 'Loading', text: 'componente exibido durante a espera' },
        ],
      },
      {
        id: 'next-loading-error',
        label: 'Resiliencia',
        title: 'error.js cria uma recuperacao',
        body: 'Um error.js permite exibir uma mensagem amigavel e oferecer uma nova tentativa quando uma parte da rota falha.',
        code: "'use client';\n\nexport default function Error({ reset }) {\n  return <button onClick={() => reset()}>Tentar novamente</button>;\n}",
        tip: 'Erros fazem parte de qualquer app. O objetivo e orientar o usuario para o proximo passo.',
      },
    ],
    questions: [
      { id: 'next-loading-q1', prompt: 'Qual arquivo representa o estado de carregamento?', options: ['loading.js', 'waiting.json', 'spinner.route'], answer: 0, explanation: 'loading.js e um arquivo especial do App Router.' },
      { id: 'next-loading-q2', prompt: 'Para que serve error.js?', options: ['Exibir falhas e uma recuperacao', 'Criar o banco de dados', 'Definir a cor do app'], answer: 0, explanation: 'Ele cria uma fronteira de erro para a rota.' },
      { id: 'next-loading-q3', prompt: 'Por que o componente de erro usa use client?', options: ['Porque reset e uma interacao no navegador', 'Porque todo Next.js e cliente', 'Porque JSX so existe no servidor'], answer: 0, explanation: 'A acao de tentar novamente depende de interacao.' },
    ],
  },
];

const nextDataLessons = [
  {
    id: 'next-dados-fetch',
    title: 'Dados no servidor',
    subtitle: 'Busque dados perto da fonte com componentes assincronos.',
    duration: '11 min',
    eyebrow: 'NEXT.JS · DADOS · AULA 1',
    pages: [
      {
        id: 'next-dados-fetch-conceito',
        label: 'Conceito',
        title: 'Uma pagina pode ser async',
        body: 'Server Components podem ser funcoes assincronas. Isso permite esperar uma API no servidor antes de renderizar a tela, sem expor chaves privadas ao navegador.',
        code: "export default async function CursosPage() {\n  const response = await fetch('https://api.exemplo.dev/cursos');\n  const cursos = await response.json();\n  return <ListaCursos cursos={cursos} />;\n}",
        notes: [
          { token: 'async', text: 'permite usar await dentro do componente' },
          { token: 'fetch', text: 'faz a requisicao para a fonte de dados' },
          { token: 'await', text: 'espera a resposta antes de continuar' },
        ],
      },
      {
        id: 'next-dados-cache',
        label: 'Decisao',
        title: 'Defina quando atualizar',
        body: 'Cada dado tem uma necessidade: alguns podem ser reutilizados por um tempo, enquanto outros precisam ser sempre recentes. A politica de cache deve refletir o produto.',
        code: "fetch(url, { cache: 'no-store' });\n// sempre busca uma resposta nova",
        tip: 'Antes de escolher cache, pergunte: esta informacao muda a cada segundo ou pode ser reutilizada?',
      },
    ],
    questions: [
      { id: 'next-dados-q1', prompt: 'Por que buscar dados em um Server Component?', options: ['Para manter a busca perto da fonte e reduzir trabalho no cliente', 'Para impedir qualquer API', 'Para transformar tudo em CSS'], answer: 0, explanation: 'A busca no servidor pode proteger segredos e reduzir JavaScript enviado.' },
      { id: 'next-dados-q2', prompt: 'O que await faz?', options: ['Espera a Promise terminar', 'Cria uma rota', 'Remove o componente'], answer: 0, explanation: 'await pausa a funcao assincrona ate a resposta chegar.' },
      { id: 'next-dados-q3', prompt: 'Quando no-store e uma opcao?', options: ['Quando o dado precisa ser buscado novamente', 'Quando nunca existe uma API', 'Quando queremos apagar o HTML'], answer: 0, explanation: 'no-store evita reutilizar a resposta em cache.' },
    ],
  },
  {
    id: 'next-route-handlers',
    title: 'Route Handlers',
    subtitle: 'Crie endpoints simples para conectar a interface a servicos.',
    duration: '10 min',
    eyebrow: 'NEXT.JS · DADOS · AULA 2',
    pages: [
      {
        id: 'next-route-handlers-conceito',
        label: 'Conceito',
        title: 'A pasta api pode responder requisicoes',
        body: 'Route Handlers ficam em route.js e permitem criar respostas HTTP dentro da estrutura do App Router. Eles sao uteis para pequenos endpoints e integracoes.',
        code: "export async function GET() {\n  return Response.json({ status: 'ok' });\n}\n\n// app/api/status/route.js -> /api/status",
        notes: [
          { token: 'GET', text: 'nomeia o metodo HTTP tratado pelo endpoint' },
          { token: 'Response.json', text: 'devolve dados no formato JSON' },
          { token: '/api/status', text: 'e a URL gerada pelo caminho das pastas' },
        ],
      },
      {
        id: 'next-route-handlers-post',
        label: 'Aplicacao',
        title: 'Escolha o metodo conforme a intencao',
        body: 'GET costuma ler dados. POST cria ou envia dados. Separar intencoes deixa a API mais previsivel e facilita a manutencao.',
        code: "export async function POST(request) {\n  const body = await request.json();\n  return Response.json({ recebido: body }, { status: 201 });\n}",
        tip: 'Em um projeto real, valide o corpo da requisicao e trate erros antes de salvar qualquer coisa.',
      },
    ],
    questions: [
      { id: 'next-route-q1', prompt: 'Qual arquivo cria um Route Handler?', options: ['route.js', 'endpoint.css', 'api.html'], answer: 0, explanation: 'route.js define handlers HTTP no App Router.' },
      { id: 'next-route-q2', prompt: 'Qual metodo normalmente le dados?', options: ['GET', 'POST', 'PAUSE'], answer: 0, explanation: 'GET representa uma leitura.' },
      { id: 'next-route-q3', prompt: 'O que uma API deve validar?', options: ['Os dados recebidos antes de processar', 'Somente o nome da pasta', 'A cor do botao'], answer: 0, explanation: 'Validacao protege a aplicacao e melhora as mensagens de erro.' },
    ],
  },
];

const nextProjectLessons = [
  {
    id: 'next-projeto-planejamento',
    title: 'Projeto: StudyBoard',
    subtitle: 'Planeje uma aplicacao Next.js antes de escrever o codigo.',
    duration: '10 min',
    eyebrow: 'NEXT.JS · PROJETO FINAL · AULA 1',
    pages: [
      {
        id: 'next-projeto-planejamento-escopo',
        label: 'Desafio',
        title: 'Comece pelo menor produto funcional',
        body: 'O StudyBoard sera um painel simples de estudos: uma home com resumo, uma rota de cursos e uma pagina dinamica para cada curso. O objetivo e praticar arquitetura, nao criar dezenas de telas.',
        analogy: { icon: '🧩', title: 'Primeira versao', value: 'Poucas telas, fluxo completo' },
        tip: 'Um projeto pequeno terminado ensina mais do que uma ideia enorme abandonada.',
      },
      {
        id: 'next-projeto-planejamento-arquitetura',
        label: 'Arquitetura',
        title: 'Desenhe as rotas antes dos componentes',
        body: 'Separe as responsabilidades: layout para a navegacao, paginas para cada rota e um componente interativo pequeno para marcar uma aula como concluida.',
        code: 'app/\n├─ layout.js\n├─ page.js\n├─ cursos/page.js\n├─ cursos/[slug]/page.js\n└─ components/CompleteLessonButton.js',
        notes: [
          { token: 'page.js', text: 'representa uma tela acessivel por URL' },
          { token: '[slug]', text: 'permite reutilizar a pagina para cada curso' },
          { token: 'components', text: 'guarda pecas reutilizaveis da interface' },
        ],
      },
    ],
    questions: [
      { id: 'next-projeto-planejamento-q1', prompt: 'Qual e uma boa primeira versao do projeto?', options: ['Poucas telas com um fluxo completo', 'Todas as funcionalidades possiveis', 'Somente uma tela sem navegacao'], answer: 0, explanation: 'Um escopo pequeno permite praticar e terminar o projeto.' },
      { id: 'next-projeto-planejamento-q2', prompt: 'Onde ficaria a pagina de detalhes de um curso?', options: ['app/cursos/[slug]/page.js', 'app/details.css', 'public/course.json'], answer: 0, explanation: 'A rota dinamica atende varios cursos usando a mesma pagina.' },
      { id: 'next-projeto-planejamento-q3', prompt: 'Qual parte deve ser Client Component?', options: ['Apenas o botao que precisa de interacao', 'Toda a aplicacao', 'Nenhuma parte interativa'], answer: 0, explanation: 'Manter o limite pequeno preserva os beneficios do servidor.' },
    ],
  },
  {
    id: 'next-projeto-implementacao',
    title: 'Montando o fluxo',
    subtitle: 'Combine Link, rota dinamica e dados para criar a experiencia.',
    duration: '14 min',
    eyebrow: 'NEXT.JS · PROJETO FINAL · AULA 2',
    pages: [
      {
        id: 'next-projeto-implementacao-lista',
        label: 'Codigo explicado',
        title: 'A lista aponta para cada curso',
        body: 'A pagina de cursos pode renderizar uma colecao e criar um Link para cada slug. O mesmo componente de card funciona para todos os itens.',
        code: "{courses.map((course) => (\n  <Link key={course.slug} href={`/cursos/${course.slug}`}>\n    {course.title}\n  </Link>\n))}",
        notes: [
          { token: 'map', text: 'transforma cada curso em um elemento da interface' },
          { token: 'key', text: 'ajuda o React a identificar cada item da lista' },
          { token: 'href', text: 'monta a URL da pagina dinamica' },
        ],
      },
      {
        id: 'next-projeto-implementacao-detalhe',
        label: 'Pagina dinamica',
        title: 'O slug encontra o curso certo',
        body: 'A pagina dinamica recebe params, busca o curso correspondente e pode renderizar um estado de not-found quando o slug nao existe.',
        code: "export default async function CoursePage({ params }) {\n  const course = await getCourse(params.slug);\n  if (!course) return notFound();\n  return <CourseDetails course={course} />;\n}",
        tip: 'Trate o caminho invalido como uma experiencia planejada, nao como um erro inesperado.',
      },
    ],
    questions: [
      { id: 'next-projeto-implementacao-q1', prompt: 'Por que usar key em uma lista?', options: ['Para identificar cada item para o React', 'Para esconder o card', 'Para criar uma API'], answer: 0, explanation: 'key ajuda o React a acompanhar itens renderizados.' },
      { id: 'next-projeto-implementacao-q2', prompt: 'O que params.slug representa?', options: ['O valor capturado pela rota dinamica', 'O titulo fixo da aplicacao', 'Uma variavel CSS'], answer: 0, explanation: 'params carrega os segmentos variaveis da URL.' },
      { id: 'next-projeto-implementacao-q3', prompt: 'O que fazer quando o curso nao existe?', options: ['Mostrar uma pagina de nao encontrado', 'Renderizar dados inventados', 'Quebrar silenciosamente'], answer: 0, explanation: 'A pessoa precisa entender que o recurso nao foi encontrado.' },
    ],
  },
  {
    id: 'next-projeto-entrega',
    title: 'Checklist de entrega',
    subtitle: 'Revise qualidade, acessibilidade e proximo passo.',
    duration: '9 min',
    eyebrow: 'NEXT.JS · PROJETO FINAL · AULA 3',
    pages: [
      {
        id: 'next-projeto-entrega-checklist',
        label: 'Checklist',
        title: 'Um projeto bom tambem e previsivel',
        body: 'Verifique navegacao por teclado, textos claros, loading, mensagens de erro, estados vazios e links que funcionam. Depois revise o console e o terminal antes de publicar.',
        code: '□ Home abre sem erro\n□ Links levam para a rota correta\n□ Loading aparece durante a busca\n□ Curso inexistente mostra not-found\n□ Botao interativo funciona no celular',
        tip: 'Qualidade nao e apenas estetica: e fazer a aplicacao responder bem em todos os estados.',
      },
      {
        id: 'next-projeto-entrega-proximo',
        label: 'Proximo passo',
        title: 'Prepare a ponte para Node.js',
        body: 'O StudyBoard ja tem paginas e endpoints. Na proxima trilha, voce vai aprofundar servidores, APIs, autenticacao e persistencia usando Node.js.',
        analogy: { icon: '🚀', title: 'Conquista desbloqueada', value: 'Next.js na pratica' },
      },
    ],
    questions: [
      { id: 'next-projeto-entrega-q1', prompt: 'O que deve entrar no checklist?', options: ['Estados de loading, erro e vazio', 'Somente a cor do logo', 'Apenas o nome do projeto'], answer: 0, explanation: 'Uma aplicacao confiavel precisa comunicar todos os estados importantes.' },
      { id: 'next-projeto-entrega-q2', prompt: 'O que revisar antes de publicar?', options: ['Console, terminal, links e comportamento no celular', 'Somente o arquivo README', 'Apenas a tela inicial'], answer: 0, explanation: 'A revisao final reduz erros que aparecem apenas em uso real.' },
      { id: 'next-projeto-entrega-q3', prompt: 'Qual trilha vem depois do projeto?', options: ['Node.js', 'HTML basico', 'CSS introdutorio'], answer: 0, explanation: 'Node.js sera a proxima etapa para aprofundar backend e APIs.' },
    ],
  },
];

export const allNextLessons = [
  ...nextFundamentalsLessons,
  ...nextRoutingLessons,
  ...nextDataLessons,
  ...nextProjectLessons,
];

export const nextModules = [
  {
    id: 'next-fundamentos',
    number: 1,
    title: 'Fundamentos do Next.js',
    description: 'App Router, estrutura e Server Components',
    color: colors.primaryLight,
    lessons: nextFundamentalsLessons,
  },
  {
    id: 'next-navegacao',
    number: 2,
    title: 'Navegacao e experiencia',
    description: 'Links, rotas dinamicas, loading e erros',
    color: colors.secondaryLight,
    lessons: nextRoutingLessons,
    requiresModule: 'next-fundamentos',
  },
  {
    id: 'next-dados',
    number: 3,
    title: 'Dados e endpoints',
    description: 'Fetch no servidor e Route Handlers',
    color: colors.success,
    lessons: nextDataLessons,
    requiresModule: 'next-navegacao',
  },
  {
    id: 'next-projeto-final',
    number: 4,
    title: 'Projeto final: StudyBoard',
    description: 'Construa e revise uma aplicacao Next.js completa',
    color: colors.flame,
    lessons: nextProjectLessons,
    requiresModule: 'next-dados',
  },
];
