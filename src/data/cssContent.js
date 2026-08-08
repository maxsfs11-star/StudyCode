import { colors } from '../theme/tokens';

const cssFundamentalsLessons = [
  {
    id: 'css-seletores',
    title: 'Seletores e cascata',
    subtitle: 'Escolha elementos e aplique estilos com previsibilidade.',
    duration: '9 min',
    eyebrow: 'CSS · FUNDAMENTOS · AULA 1',
    pages: [
      { id: 'css-seletores-conceito', label: 'Conceito', title: 'CSS transforma estrutura em interface', body: 'CSS define cores, espacamento, tipografia, tamanhos e posicionamento. Ele le regras e aplica estilos aos elementos HTML selecionados.', analogy: { icon: '🎨', title: 'HTML', value: 'Estrutura' }, tip: 'Comece pela estrutura HTML e use CSS para comunicar hierarquia visual.' },
      { id: 'css-seletores-codigo', label: 'Codigo explicado', title: 'Uma regra CSS tem seletor e declaracoes', body: 'O seletor escolhe o elemento. Dentro das chaves ficam propriedades e valores separados por ponto e virgula.', code: '.lesson-title {\n  color: #f8faff;\n  font-size: 24px;\n  margin-bottom: 12px;\n}', notes: [{ token: '.lesson-title', text: 'seleciona elementos com essa classe' }, { token: 'color', text: 'define a cor do texto' }, { token: 'font-size', text: 'define o tamanho da fonte' }] },
    ],
    questions: [
      { id: 'css-seletores-q1', prompt: 'Qual e o papel do seletor?', options: ['Escolher os elementos que recebem estilo', 'Executar JavaScript', 'Criar uma tabela'], answer: 0, explanation: 'O seletor aponta para os elementos que serao estilizados.' },
      { id: 'css-seletores-q2', prompt: 'Como selecionar uma classe?', options: ['.nome-da-classe', '#nome-do-id', '<classe>'], answer: 0, explanation: 'O ponto indica um seletor de classe.' },
      { id: 'css-seletores-q3', prompt: 'O que fica dentro das chaves?', options: ['Propriedades e valores', 'Somente imagens', 'Rotas de API'], answer: 0, explanation: 'As declaracoes CSS ficam dentro do bloco.' },
    ],
  },
  {
    id: 'css-box-model',
    title: 'Box Model',
    subtitle: 'Entenda a caixa que existe ao redor de cada elemento.',
    duration: '11 min',
    eyebrow: 'CSS · FUNDAMENTOS · AULA 2',
    pages: [
      { id: 'css-box-model-conceito', label: 'Conceito', title: 'Todo elemento e uma caixa', body: 'O Box Model separa content, padding, border e margin. Entender essas camadas resolve boa parte dos problemas de espacamento.', code: '.card {\n  width: 280px;\n  padding: 20px;\n  border: 1px solid #243a72;\n  margin: 16px;\n}', notes: [{ token: 'content', text: 'area interna do texto ou elemento' }, { token: 'padding', text: 'espaco entre conteudo e borda' }, { token: 'margin', text: 'espaco externo entre caixas' }] },
      { id: 'css-box-model-sizing', label: 'Regra pratica', title: 'box-sizing facilita medidas', body: 'Com border-box, width e height incluem padding e border. Isso deixa o tamanho final mais previsivel.', code: '* {\n  box-sizing: border-box;\n}', tip: 'Use border-box como base em projetos para evitar contas inesperadas.' },
    ],
    questions: [
      { id: 'css-box-q1', prompt: 'O que padding representa?', options: ['Espaco interno entre conteudo e borda', 'Espaco entre paginas', 'Cor do fundo'], answer: 0, explanation: 'padding fica dentro da caixa.' },
      { id: 'css-box-q2', prompt: 'O que margin representa?', options: ['Espaco externo da caixa', 'Tamanho do texto', 'Uma rota'], answer: 0, explanation: 'margin cria distancia em relacao a outras caixas.' },
      { id: 'css-box-q3', prompt: 'O que border-box inclui na largura?', options: ['Conteudo, padding e borda', 'Somente margin', 'Apenas a fonte'], answer: 0, explanation: 'border-box torna width e height mais previsiveis.' },
    ],
  },
];

const cssLayoutLessons = [
  {
    id: 'css-flexbox',
    title: 'Flexbox',
    subtitle: 'Alinhe elementos em uma dimensao.',
    duration: '12 min',
    eyebrow: 'CSS · LAYOUT · AULA 1',
    pages: [
      { id: 'css-flexbox-codigo', label: 'Codigo explicado', title: 'Uma linha de cards responsiva', body: 'Flexbox organiza itens em uma linha ou coluna. Use gap para distancia, align-items para o eixo cruzado e justify-content para distribuir o espaco.', code: '.stats {\n  display: flex;\n  gap: 12px;\n  align-items: stretch;\n  justify-content: space-between;\n}', notes: [{ token: 'display: flex', text: 'ativa o layout flexivel' }, { token: 'gap', text: 'cria espaco entre os filhos' }, { token: 'justify-content', text: 'distribui itens no eixo principal' }] },
      { id: 'css-flexbox-direction', label: 'Decisao', title: 'Escolha a direcao', body: 'flex-direction row cria uma linha; column empilha os itens. A escolha depende da relacao visual entre os elementos.', code: '.menu {\n  display: flex;\n  flex-direction: column;\n}', tip: 'Teste a interface em telas estreitas e largas para decidir a melhor direcao.' },
    ],
    questions: [
      { id: 'css-flexbox-q1', prompt: 'Como ativar Flexbox?', options: ['display: flex', 'position: flex', 'layout: row'], answer: 0, explanation: 'display: flex ativa o contexto flexivel.' },
      { id: 'css-flexbox-q2', prompt: 'Para que serve gap?', options: ['Criar espaco entre os filhos', 'Mudar a linguagem', 'Criar uma API'], answer: 0, explanation: 'gap controla o espaco entre itens.' },
      { id: 'css-flexbox-q3', prompt: 'O que flex-direction: column faz?', options: ['Empilha itens verticalmente', 'Esconde os itens', 'Transforma em imagem'], answer: 0, explanation: 'column organiza os filhos em uma coluna.' },
    ],
  },
  {
    id: 'css-grid-responsivo',
    title: 'Grid e responsividade',
    subtitle: 'Crie colunas e adapte a interface para qualquer tela.',
    duration: '13 min',
    eyebrow: 'CSS · LAYOUT · AULA 2',
    pages: [
      { id: 'css-grid-codigo', label: 'Codigo explicado', title: 'Grid cria uma malha de colunas', body: 'CSS Grid e excelente para layouts em duas dimensoes. A funcao repeat reduz repeticao e minmax ajuda a criar colunas flexiveis.', code: '.course-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}', notes: [{ token: 'display: grid', text: 'ativa o layout em linhas e colunas' }, { token: 'repeat(3, ...)', text: 'cria tres colunas semelhantes' }, { token: '1fr', text: 'divide o espaco disponivel' }] },
      { id: 'css-grid-media', label: 'Responsividade', title: 'Media query adapta a tela', body: 'Uma media query aplica regras quando a largura do dispositivo atende a uma condicao. Assim os cards podem virar uma coluna no celular.', code: '@media (max-width: 640px) {\n  .course-grid {\n    grid-template-columns: 1fr;\n  }\n}', tip: 'Responsividade e pensar na experiencia, nao apenas diminuir tudo.' },
    ],
    questions: [
      { id: 'css-grid-q1', prompt: 'Quando Grid e uma boa escolha?', options: ['Quando o layout tem linhas e colunas', 'Somente para texto simples', 'Apenas para animacoes'], answer: 0, explanation: 'Grid organiza duas dimensoes com clareza.' },
      { id: 'css-grid-q2', prompt: 'O que uma media query faz?', options: ['Aplica regras conforme as condicoes da tela', 'Cria uma funcao JavaScript', 'Salva dados'], answer: 0, explanation: 'Media queries permitem adaptar estilos.' },
      { id: 'css-grid-q3', prompt: 'Por que usar 1fr no celular?', options: ['Para ocupar uma coluna disponivel', 'Para ocultar a pagina', 'Para trocar o HTML'], answer: 0, explanation: '1fr divide o espaco restante em uma fracao.' },
    ],
  },
];

const cssStyleLessons = [
  {
    id: 'css-tipografia-cores',
    title: 'Tipografia e cores',
    subtitle: 'Use texto e contraste para criar hierarquia.',
    duration: '11 min',
    eyebrow: 'CSS · ESTILO · AULA 1',
    pages: [
      { id: 'css-tipografia-codigo', label: 'Tipografia', title: 'Tamanho, peso e altura mudam a leitura', body: 'font-family, font-size, font-weight e line-height trabalham juntos para tornar o texto confortavel. Sempre pense em contraste e legibilidade.', code: '.hero-title {\n  font-size: 32px;\n  font-weight: 800;\n  line-height: 1.1;\n  letter-spacing: -0.02em;\n}', notes: [{ token: 'font-weight', text: 'define o peso visual das letras' }, { token: 'line-height', text: 'define a distancia entre linhas' }, { token: 'letter-spacing', text: 'ajusta o espaco entre caracteres' }] },
      { id: 'css-cores-variaveis', label: 'Variaveis', title: 'Centralize as cores do projeto', body: 'Custom properties evitam repetir valores e permitem trocar o tema em um unico lugar.', code: ':root {\n  --color-bg: #050816;\n  --color-primary: #13c8ff;\n}\n\n.card {\n  background: var(--color-bg);\n  border-color: var(--color-primary);\n}', tip: 'Variaveis sao uma ponte entre identidade visual e manutencao.' },
    ],
    questions: [
      { id: 'css-tipografia-q1', prompt: 'Para que serve line-height?', options: ['Controlar a distancia entre linhas', 'Mudar a URL', 'Criar uma tabela'], answer: 0, explanation: 'line-height melhora a leitura de blocos de texto.' },
      { id: 'css-tipografia-q2', prompt: 'Por que usar variaveis CSS?', options: ['Centralizar valores e facilitar temas', 'Substituir HTML', 'Executar logica'], answer: 0, explanation: 'Custom properties reduzem repeticao e facilitam manutencao.' },
      { id: 'css-tipografia-q3', prompt: 'O que font-weight controla?', options: ['Peso da fonte', 'Largura da tela', 'Espaco externo'], answer: 0, explanation: 'font-weight define o quao espesso e o texto.' },
    ],
  },
  {
    id: 'css-posicionamento',
    title: 'Posicionamento e camadas',
    subtitle: 'Controle onde elementos aparecem sem quebrar o layout.',
    duration: '12 min',
    eyebrow: 'CSS · ESTILO · AULA 2',
    pages: [
      { id: 'css-posicionamento-codigo', label: 'Codigo explicado', title: 'relative cria uma referencia', body: 'Um elemento relative continua no fluxo, mas pode servir de referencia para um filho absolute. Isso e util em badges, botoes e detalhes decorativos.', code: '.card {\n  position: relative;\n}\n\n.card-badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}', notes: [{ token: 'position: relative', text: 'mantem o elemento no fluxo e cria referencia' }, { token: 'position: absolute', text: 'posiciona o filho em relacao a referencia' }, { token: 'top/right', text: 'definem o deslocamento' }] },
      { id: 'css-posicionamento-z', label: 'Camadas', title: 'z-index organiza sobreposicoes', body: 'Quando elementos se sobrepoem, z-index define qual camada aparece na frente. Ele funciona dentro de contextos de posicionamento.', code: '.modal {\n  position: fixed;\n  z-index: 20;\n}', tip: 'Use camadas com parcimonia. Muitos z-index tornam o CSS dificil de entender.' },
    ],
    questions: [
      { id: 'css-posicionamento-q1', prompt: 'Por que usar position: relative no card?', options: ['Para criar referencia para um filho absolute', 'Para esconder o card', 'Para mudar a linguagem'], answer: 0, explanation: 'relative cria o contexto de posicionamento.' },
      { id: 'css-posicionamento-q2', prompt: 'O que position: fixed faz?', options: ['Posiciona em relacao a janela', 'Cria uma lista', 'Altera o HTML'], answer: 0, explanation: 'fixed pode manter um elemento preso a viewport.' },
      { id: 'css-posicionamento-q3', prompt: 'Para que serve z-index?', options: ['Controlar a ordem das camadas', 'Mudar a fonte', 'Criar um endpoint'], answer: 0, explanation: 'z-index define qual elemento fica na frente.' },
    ],
  },
];

const cssEffectsLessons = [
  {
    id: 'css-transicoes',
    title: 'Transicoes e estados',
    subtitle: 'Crie respostas visuais suaves para as interacoes.',
    duration: '10 min',
    eyebrow: 'CSS · EFEITOS · AULA 1',
    pages: [
      { id: 'css-transicoes-codigo', label: 'Codigo explicado', title: 'Uma transicao precisa de intencao', body: 'transition descreve quais mudancas devem acontecer suavemente. Combine com hover, focus e active sem prejudicar quem prefere menos movimento.', code: '.button {\n  transition: transform 180ms ease, background 180ms ease;\n}\n\n.button:hover {\n  transform: translateY(-2px);\n}', notes: [{ token: 'transition', text: 'anima a mudanca entre estados' }, { token: ':hover', text: 'aplica estilo quando o cursor esta sobre o elemento' }, { token: 'transform', text: 'move sem alterar o fluxo' }] },
      { id: 'css-transicoes-reduced', label: 'Acessibilidade', title: 'Respeite menos movimento', body: 'Algumas pessoas preferem reduzir animacoes. A media query prefers-reduced-motion permite desligar transicoes decorativas.', code: '@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    transition-duration: 0.01ms;\n  }\n}', tip: 'Efeito bom e o que melhora a compreensao, nao o que distrai.' },
    ],
    questions: [
      { id: 'css-transicoes-q1', prompt: 'O que transition faz?', options: ['Suaviza mudancas entre estados', 'Cria uma pagina HTML', 'Consulta um banco'], answer: 0, explanation: 'transition evita mudancas visuais abruptas.' },
      { id: 'css-transicoes-q2', prompt: 'Por que cuidar de reduced-motion?', options: ['Para respeitar preferencias de movimento', 'Para aumentar sempre a animacao', 'Para substituir responsividade'], answer: 0, explanation: 'Acessibilidade inclui controle de movimento.' },
      { id: 'css-transicoes-q3', prompt: 'Qual pseudo-classe representa foco?', options: [':focus', ':color', ':route'], answer: 0, explanation: ':focus indica quando um elemento recebe foco.' },
    ],
  },
  {
    id: 'css-animacoes',
    title: 'Animacoes e sombras',
    subtitle: 'Adicione personalidade sem transformar tudo em neon.',
    duration: '11 min',
    eyebrow: 'CSS · EFEITOS · AULA 2',
    pages: [
      { id: 'css-animacoes-keyframes', label: 'Animacao', title: 'Keyframes descrevem etapas', body: 'Use @keyframes quando uma animacao tem mais de um estado. animation-duration e animation-timing-function controlam o ritmo.', code: '@keyframes float {\n  from { transform: translateY(0); }\n  to { transform: translateY(-6px); }\n}\n\n.mascot { animation: float 2s ease-in-out infinite alternate; }', tip: 'Reserve brilho e movimento para pontos de foco, como o mascote e a conquista atual.' },
      { id: 'css-animacoes-sombras', label: 'Profundidade', title: 'Sombras criam hierarquia', body: 'box-shadow pode separar um card do fundo. Use valores discretos e contraste suficiente para nao deixar a interface pesada.', code: '.card {\n  box-shadow: 0 14px 34px rgba(0, 0, 0, .28);\n}', notes: [{ token: 'offset', text: 'desloca a sombra' }, { token: 'blur', text: 'define o espalhamento suave' }, { token: 'alpha', text: 'controla a intensidade' }] },
    ],
    questions: [
      { id: 'css-animacoes-q1', prompt: 'Quando usar @keyframes?', options: ['Quando a animacao possui varias etapas', 'Para criar tabelas', 'Para validar formulario'], answer: 0, explanation: 'Keyframes descrevem estados ao longo do tempo.' },
      { id: 'css-animacoes-q2', prompt: 'O que box-shadow ajuda a criar?', options: ['Profundidade visual', 'Dados persistentes', 'Rotas'], answer: 0, explanation: 'Sombras ajudam a separar superficies.' },
      { id: 'css-animacoes-q3', prompt: 'Qual e uma boa regra de uso de efeitos?', options: ['Usar para reforcar a hierarquia', 'Aplicar glow em tudo', 'Animar cada texto'], answer: 0, explanation: 'Efeitos devem orientar e nao competir com o conteudo.' },
    ],
  },
];

const cssResponsiveLessons = [
  {
    id: 'css-responsivo-container',
    title: 'Container e breakpoints',
    subtitle: 'Crie uma base que cresce sem perder legibilidade.',
    duration: '11 min',
    eyebrow: 'CSS · RESPONSIVIDADE · AULA 1',
    pages: [
      { id: 'css-responsivo-container-codigo', label: 'Codigo explicado', title: 'Limite a largura do conteudo', body: 'Um container com max-width e margin auto impede linhas gigantes e centraliza a experiencia em telas largas.', code: '.container {\n  width: min(100% - 32px, 1120px);\n  margin-inline: auto;\n}', notes: [{ token: 'min()', text: 'escolhe o menor valor entre as opcoes' }, { token: 'margin-inline: auto', text: 'centraliza o container horizontalmente' }] },
      { id: 'css-responsivo-mobile', label: 'Estrategia', title: 'Comece pelo menor viewport', body: 'Mobile-first significa criar uma base simples para telas pequenas e adicionar melhorias conforme o espaco aumenta.', code: '.hero-title { font-size: 28px; }\n\n@media (min-width: 768px) {\n  .hero-title { font-size: 44px; }\n}', tip: 'Nao esconda informacao essencial apenas porque a tela ficou menor.' },
    ],
    questions: [
      { id: 'css-responsivo-q1', prompt: 'Por que usar max-width?', options: ['Para manter linhas legiveis em telas grandes', 'Para impedir celular', 'Para criar um link'], answer: 0, explanation: 'Limitar a largura melhora leitura e composicao.' },
      { id: 'css-responsivo-q2', prompt: 'O que mobile-first recomenda?', options: ['Comecar pela tela pequena e evoluir', 'Criar somente desktop', 'Remover media queries'], answer: 0, explanation: 'A base deve funcionar no menor espaco.' },
      { id: 'css-responsivo-q3', prompt: 'O que margin-inline: auto faz?', options: ['Centraliza horizontalmente', 'Muda o idioma', 'Cria sombra'], answer: 0, explanation: 'Com largura definida, auto distribui o espaco lateral.' },
    ],
  },
  {
    id: 'css-organizacao',
    title: 'Organizando CSS',
    subtitle: 'Evite conflitos e mantenha o projeto evoluivel.',
    duration: '10 min',
    eyebrow: 'CSS · RESPONSIVIDADE · AULA 2',
    pages: [
      { id: 'css-organizacao-camadas', label: 'Arquitetura', title: 'Separe base, componentes e utilitarios', body: 'Uma organizacao simples pode ter reset, tokens, layout, componentes e estados. O importante e deixar a responsabilidade visivel.', code: 'styles/\n├─ tokens.css\n├─ base.css\n├─ layout.css\n└─ components/\n   └─ card.css', tip: 'Nomes de classe orientados por componente costumam ser mais sustentaveis que seletores muito profundos.' },
      { id: 'css-organizacao-especificidade', label: 'Especificidade', title: 'Menos seletores profundos, menos surpresa', body: 'Regras muito especificas vencem regras simples e dificultam a manutencao. Prefira classes claras e evite !important como primeira opcao.', code: '.card .header .title { ... }\n\n/* melhor: */\n.card-title { ... }', notes: [{ token: '!important', text: 'forca uma regra e pode esconder um conflito' }, { token: '.card-title', text: 'deixa a intencao mais direta' }] },
    ],
    questions: [
      { id: 'css-organizacao-q1', prompt: 'Por que separar arquivos CSS?', options: ['Para tornar responsabilidades encontraveis', 'Para aumentar conflitos', 'Para evitar componentes'], answer: 0, explanation: 'Organizacao ajuda a crescer sem perder controle.' },
      { id: 'css-organizacao-q2', prompt: 'Por que evitar !important?', options: ['Ele esconde conflitos de especificidade', 'Ele sempre melhora acessibilidade', 'Ele cria responsividade'], answer: 0, explanation: 'Use-o apenas quando houver uma decisao muito consciente.' },
      { id: 'css-organizacao-q3', prompt: 'Qual classe e mais direta?', options: ['.card-title', '.page main section div h2', '.text-blue-only'], answer: 0, explanation: 'Classes de componente reduzem dependencias de estrutura.' },
    ],
  },
];

const cssProjectLessons = [
  {
    id: 'css-projeto-studycard',
    title: 'Projeto: card de trilha',
    subtitle: 'Transforme uma estrutura HTML em uma interface moderna.',
    duration: '14 min',
    eyebrow: 'CSS · PROJETO FINAL · AULA 1',
    pages: [
      { id: 'css-projeto-visual', label: 'Desafio', title: 'Crie uma hierarquia visual', body: 'Estilize um card StudyCode com titulo, descricao, barra de progresso e botao. Use tokens de cor, espacamento consistente e estados de foco.', code: '.course-card:focus-within {\n  border-color: #13c8ff;\n  transform: translateY(-2px);\n}', tip: 'Efeitos devem reforcar a acao, nao disputar atencao com o conteudo.' },
      { id: 'css-projeto-checklist', label: 'Checklist', title: 'Revise no celular', body: 'Teste contraste, tamanho do toque, overflow horizontal e leitura em telas estreitas. Uma interface bonita precisa continuar usavel.', analogy: { icon: '🚀', title: 'Conquista', value: 'Primeiro layout responsivo' } },
    ],
    questions: [
      { id: 'css-projeto-q1', prompt: 'O que :focus-within ajuda a comunicar?', options: ['Qual elemento esta em foco dentro do card', 'Qual API esta online', 'Qual imagem foi salva'], answer: 0, explanation: 'O estado de foco melhora orientacao e acessibilidade.' },
      { id: 'css-projeto-q2', prompt: 'O que revisar no celular?', options: ['Contraste, toque e overflow', 'Somente o logo', 'Apenas a cor do botao'], answer: 0, explanation: 'A experiencia precisa funcionar em diferentes telas.' },
      { id: 'css-projeto-q3', prompt: 'Qual e a ordem recomendada?', options: ['HTML estrutura, CSS apresenta, JS interage', 'CSS antes de qualquer estrutura', 'JavaScript substitui tudo'], answer: 0, explanation: 'As tres tecnologias colaboram com responsabilidades diferentes.' },
    ],
  },
];

export const allCssLessons = [...cssFundamentalsLessons, ...cssLayoutLessons, ...cssStyleLessons, ...cssEffectsLessons, ...cssResponsiveLessons, ...cssProjectLessons];

export const cssModules = [
  { id: 'css-fundamentos', number: 1, title: 'Fundamentos do CSS', description: 'Seletores, cascata e Box Model', color: colors.primaryLight, lessons: cssFundamentalsLessons },
  { id: 'css-layout', number: 2, title: 'Layout responsivo', description: 'Flexbox, Grid e media queries', color: colors.secondaryLight, lessons: cssLayoutLessons, requiresModule: 'css-fundamentos' },
  { id: 'css-estilo', number: 3, title: 'Tipografia e posicionamento', description: 'Variaveis, camadas e hierarquia visual', color: colors.info, lessons: cssStyleLessons, requiresModule: 'css-layout' },
  { id: 'css-efeitos', number: 4, title: 'Efeitos e movimento', description: 'Transicoes, animacoes e sombras', color: colors.gold, lessons: cssEffectsLessons, requiresModule: 'css-estilo' },
  { id: 'css-responsivo', number: 5, title: 'Responsividade e organizacao', description: 'Breakpoints e arquitetura CSS', color: colors.success, lessons: cssResponsiveLessons, requiresModule: 'css-efeitos' },
  { id: 'css-projeto-final', number: 6, title: 'Projeto final: card StudyCode', description: 'Crie uma interface moderna', color: colors.flame, lessons: cssProjectLessons, requiresModule: 'css-responsivo' },
];
