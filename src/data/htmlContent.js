import { colors } from '../theme/tokens';

const htmlFundamentalsLessons = [
  {
    id: 'html-documento',
    title: 'Como funciona um documento HTML',
    subtitle: 'Conheca a estrutura que da significado para uma pagina web.',
    duration: '8 min',
    eyebrow: 'HTML · FUNDAMENTOS · AULA 1',
    pages: [
      { id: 'html-documento-conceito', label: 'Conceito', title: 'HTML organiza o conteudo', body: 'HTML e uma linguagem de marcacao. Ele informa ao navegador o que cada parte representa: titulo, paragrafo, imagem, link, formulario ou secao.', analogy: { icon: '🧱', title: 'Estrutura', value: 'Cada tag da significado ao conteudo' }, tip: 'HTML nao e responsavel por animacao ou logica. Ele cria a estrutura da pagina.' },
      { id: 'html-documento-codigo', label: 'Codigo explicado', title: 'A estrutura minima de uma pagina', body: 'Um documento HTML declara o tipo do documento, cria a raiz html e separa configuracoes no head do conteudo visivel no body.', code: '<!doctype html>\n<html lang="pt-BR">\n  <head>\n    <title>StudyCode</title>\n  </head>\n  <body>\n    <h1>Aprenda codigo</h1>\n  </body>\n</html>', notes: [{ token: '<!doctype html>', text: 'informa que o documento usa HTML moderno' }, { token: '<head>', text: 'guarda metadados e configuracoes' }, { token: '<body>', text: 'contem o que aparece na tela' }] },
    ],
    questions: [
      { id: 'html-documento-q1', prompt: 'Qual e o papel principal do HTML?', options: ['Estruturar e dar significado ao conteudo', 'Criar regras de negocio', 'Armazenar dados'], answer: 0, explanation: 'HTML define a estrutura semantica da pagina.' },
      { id: 'html-documento-q2', prompt: 'Onde fica o conteudo visivel?', options: ['body', 'head', 'doctype'], answer: 0, explanation: 'O body recebe o conteudo apresentado ao visitante.' },
      { id: 'html-documento-q3', prompt: 'Para que serve o title?', options: ['Nomear a pagina no navegador', 'Criar um botao', 'Mudar o fundo'], answer: 0, explanation: 'title aparece na aba e ajuda na identificacao da pagina.' },
    ],
  },
  {
    id: 'html-semantica',
    title: 'Tags semanticas',
    subtitle: 'Escreva HTML que pessoas e tecnologias conseguem entender.',
    duration: '10 min',
    eyebrow: 'HTML · FUNDAMENTOS · AULA 2',
    pages: [
      { id: 'html-semantica-conceito', label: 'Semantica', title: 'A tag certa comunica intencao', body: 'Uma div agrupa conteudo, mas tags como header, nav, main, article e footer explicam a funcao de cada regiao. Isso melhora manutencao, acessibilidade e SEO.', code: '<header>Marca e navegacao</header>\n<main>\n  <article>Uma aula</article>\n</main>\n<footer>Rodape</footer>', tip: 'Antes de escolher uma div, pergunte se existe uma tag que descreve melhor aquela parte.' },
      { id: 'html-semantica-hierarquia', label: 'Hierarquia', title: 'Titulos formam um mapa', body: 'Use h1 para o titulo principal e h2 e h3 para organizar secoes. A ordem ajuda o leitor a navegar pela pagina.', code: '<h1>Trilha de JavaScript</h1>\n<h2>Fundamentos</h2>\n<h3>Variaveis</h3>' },
    ],
    questions: [
      { id: 'html-semantica-q1', prompt: 'Por que usar tags semanticas?', options: ['Para comunicar a funcao do conteudo', 'Para substituir o JavaScript', 'Para criar banco de dados'], answer: 0, explanation: 'Semantica melhora entendimento humano e das tecnologias assistivas.' },
      { id: 'html-semantica-q2', prompt: 'Qual tag representa o conteudo principal?', options: ['main', 'aside-only', 'style'], answer: 0, explanation: 'main identifica o conteudo central da pagina.' },
      { id: 'html-semantica-q3', prompt: 'Qual e a hierarquia correta?', options: ['h1, depois h2 e h3', 'h3 antes de h1 sempre', 'Somente div'], answer: 0, explanation: 'Titulos devem refletir a hierarquia do conteudo.' },
    ],
  },
];

const htmlInteractionLessons = [
  {
    id: 'html-links-imagens',
    title: 'Links e imagens',
    subtitle: 'Conecte paginas e apresente conteudo visual com responsabilidade.',
    duration: '9 min',
    eyebrow: 'HTML · CONTEUDO · AULA 1',
    pages: [
      { id: 'html-links-codigo', label: 'Codigo explicado', title: 'href define o destino', body: 'A tag a cria um link. O atributo href informa para onde a pessoa sera levada.', code: '<a href="/cursos/javascript">\n  Estudar JavaScript\n</a>', notes: [{ token: '<a>', text: 'cria um elemento de ancora clicavel' }, { token: 'href', text: 'define a URL de destino' }, { token: 'texto', text: 'explica para onde o link leva' }] },
      { id: 'html-imagens-codigo', label: 'Acessibilidade', title: 'Toda imagem precisa de contexto', body: 'O atributo alt descreve a imagem para quem nao consegue ve-la e tambem aparece quando o arquivo nao carrega.', code: '<img src="byte.png" alt="Mascote Byte voando sobre um livro" />', tip: 'Evite alt generico como imagem. Descreva a informacao importante da imagem.' },
    ],
    questions: [
      { id: 'html-links-q1', prompt: 'Qual atributo define o destino de um link?', options: ['href', 'src', 'alt'], answer: 0, explanation: 'href aponta para a URL de destino.' },
      { id: 'html-links-q2', prompt: 'Para que serve alt?', options: ['Descrever uma imagem', 'Mudar o tamanho da fonte', 'Executar codigo'], answer: 0, explanation: 'alt e importante para acessibilidade e contexto.' },
      { id: 'html-links-q3', prompt: 'Qual tag apresenta uma imagem?', options: ['img', 'picture-text-only', 'image-link'], answer: 0, explanation: 'img representa uma imagem no documento.' },
    ],
  },
  {
    id: 'html-formularios',
    title: 'Formularios',
    subtitle: 'Colete dados com campos claros e acessiveis.',
    duration: '11 min',
    eyebrow: 'HTML · CONTEUDO · AULA 2',
    pages: [
      { id: 'html-formularios-codigo', label: 'Codigo explicado', title: 'label e input trabalham juntos', body: 'label explica o campo e o atributo htmlFor associa o texto ao input. Isso melhora a experiencia no toque e com leitor de tela.', code: '<label htmlFor="email">Seu e-mail</label>\n<input id="email" type="email" placeholder="voce@email.com" />', notes: [{ token: 'htmlFor', text: 'liga a label ao id do input' }, { token: 'type="email"', text: 'indica o formato esperado' }, { token: 'id', text: 'identifica o campo para a label' }] },
      { id: 'html-formularios-validacao', label: 'Primeira validacao', title: 'O navegador pode ajudar', body: 'Atributos como required, minLength e type orientam o navegador sobre regras basicas. A validacao do servidor continua sendo obrigatoria em um projeto real.', code: '<input required minLength={3} name="nome" />', tip: 'A interface orienta; o backend protege os dados.' },
    ],
    questions: [
      { id: 'html-formularios-q1', prompt: 'Como uma label encontra seu campo?', options: ['Pelo htmlFor e id', 'Pelo texto da cor', 'Pelo nome da imagem'], answer: 0, explanation: 'htmlFor deve apontar para o id do input.' },
      { id: 'html-formularios-q2', prompt: 'O que required indica?', options: ['Campo obrigatorio', 'Campo invisivel', 'Campo somente numerico'], answer: 0, explanation: 'required impede o envio vazio no navegador.' },
      { id: 'html-formularios-q3', prompt: 'A validacao do navegador substitui o backend?', options: ['Nao', 'Sempre', 'Somente em aplicativos grandes'], answer: 0, explanation: 'Dados externos ainda precisam ser validados no servidor.' },
    ],
  },
];

const htmlAdvancedLessons = [
  {
    id: 'html-listas-tabelas',
    title: 'Listas e tabelas',
    subtitle: 'Organize colecoes de dados com a estrutura certa.',
    duration: '10 min',
    eyebrow: 'HTML · CONTEUDO · AULA 3',
    pages: [
      { id: 'html-listas-codigo', label: 'Listas', title: 'Escolha entre lista ordenada e nao ordenada', body: 'Use ul quando a ordem nao importa e ol quando os itens seguem uma sequencia. Cada item fica dentro de li.', code: '<ul>\n  <li>JavaScript</li>\n  <li>React</li>\n</ul>\n\n<ol>\n  <li>Estruturar</li>\n  <li>Estilizar</li>\n</ol>', tip: 'A estrutura comunica se a ordem dos itens tem significado.' },
      { id: 'html-tabelas-codigo', label: 'Tabelas', title: 'Apresente dados em linhas e colunas', body: 'Tabelas servem para dados tabulares, nao para montar o layout inteiro da pagina. Use thead, tbody, tr, th e td para marcar cada parte.', code: '<table>\n  <thead><tr><th>Aula</th><th>Status</th></tr></thead>\n  <tbody><tr><td>Variaveis</td><td>Feita</td></tr></tbody>\n</table>', notes: [{ token: 'th', text: 'representa um cabecalho de coluna' }, { token: 'td', text: 'representa uma celula de dado' }, { token: 'tr', text: 'representa uma linha' }] },
    ],
    questions: [
      { id: 'html-listas-q1', prompt: 'Qual tag cria uma lista nao ordenada?', options: ['ul', 'ol', 'table'], answer: 0, explanation: 'ul representa uma lista em que a ordem nao e o foco.' },
      { id: 'html-listas-q2', prompt: 'Quando usar uma tabela?', options: ['Para dados em linhas e colunas', 'Para qualquer layout visual', 'Para executar JavaScript'], answer: 0, explanation: 'Tabelas devem representar dados tabulares.' },
      { id: 'html-listas-q3', prompt: 'Qual tag representa uma celula de cabecalho?', options: ['th', 'td-only', 'head-cell'], answer: 0, explanation: 'th marca cabecalhos de uma tabela.' },
    ],
  },
  {
    id: 'html-multimidia-seo',
    title: 'Multimidia e SEO basico',
    subtitle: 'Prepare paginas encontraveis e com conteudo rico.',
    duration: '11 min',
    eyebrow: 'HTML · CONTEUDO · AULA 4',
    pages: [
      { id: 'html-multimidia-codigo', label: 'Multimidia', title: 'Inclua audio e video com contexto', body: 'Os elementos audio e video permitem apresentar midia nativa. Sempre ofereca controles e alternativas quando possivel.', code: '<video controls poster="capa.jpg">\n  <source src="aula.mp4" type="video/mp4" />\n  Seu navegador nao suporta video.\n</video>', tip: 'Texto alternativo e legendas tornam a experiencia mais inclusiva.' },
      { id: 'html-seo-codigo', label: 'SEO', title: 'Meta tags descrevem a pagina', body: 'Descricao, idioma e viewport ajudam navegadores, buscadores e dispositivos a interpretar a pagina.', code: '<meta name="description" content="Aprenda programacao no StudyCode" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />', notes: [{ token: 'description', text: 'resume a pagina para mecanismos de busca' }, { token: 'viewport', text: 'ajusta a pagina para a largura do dispositivo' }] },
    ],
    questions: [
      { id: 'html-multimidia-q1', prompt: 'O que controls faz em video?', options: ['Exibe controles para quem assiste', 'Muda a cor do video', 'Cria um formulario'], answer: 0, explanation: 'controls habilita play, pausa e volume.' },
      { id: 'html-multimidia-q2', prompt: 'Para que serve a meta description?', options: ['Resumir a pagina para buscadores', 'Criar uma animacao', 'Definir o tamanho de um botao'], answer: 0, explanation: 'A descricao ajuda a comunicar o conteudo da pagina.' },
      { id: 'html-multimidia-q3', prompt: 'Qual meta ajuda no celular?', options: ['viewport', 'audio-mode', 'mobile-only'], answer: 0, explanation: 'viewport controla como a pagina se adapta a tela.' },
    ],
  },
];

const htmlAccessibilityLessons = [
  {
    id: 'html-acessibilidade-foco',
    title: 'Acessibilidade e foco',
    subtitle: 'Construa paginas que mais pessoas conseguem usar.',
    duration: '12 min',
    eyebrow: 'HTML · ACESSIBILIDADE · AULA 1',
    pages: [
      { id: 'html-acessibilidade-foco-conceito', label: 'Acessibilidade', title: 'Tudo deve funcionar sem mouse', body: 'Navegacao por teclado depende de foco visivel, ordem logica e elementos interativos nativos. Um button real ja possui comportamentos importantes.', code: '<button type="button">Comecar aula</button>\n\n<a href="/cursos">Ver cursos</a>', tip: 'Prefira elementos HTML nativos antes de recriar comportamentos com div e eventos.' },
      { id: 'html-acessibilidade-aria', label: 'ARIA', title: 'Use ARIA apenas quando necessario', body: 'Atributos aria-label e aria-expanded podem complementar componentes personalizados. Eles nao substituem uma estrutura semantica correta.', code: '<button aria-expanded="false" aria-controls="menu">\n  Abrir menu\n</button>', notes: [{ token: 'aria-expanded', text: 'informa se uma regiao esta aberta' }, { token: 'aria-controls', text: 'liga o botao a regiao controlada' }] },
    ],
    questions: [
      { id: 'html-acessibilidade-q1', prompt: 'Por que usar button em vez de uma div clicavel?', options: ['Porque button ja tem comportamento acessivel', 'Porque div nao aceita texto', 'Porque button substitui CSS'], answer: 0, explanation: 'Elementos nativos oferecem teclado e semantica por padrao.' },
      { id: 'html-acessibilidade-q2', prompt: 'O que foco visivel ajuda a indicar?', options: ['Qual elemento recebera a proxima acao', 'Qual arquivo foi salvo', 'Qual API esta ativa'], answer: 0, explanation: 'O foco orienta quem navega pelo teclado.' },
      { id: 'html-acessibilidade-q3', prompt: 'ARIA substitui semantica HTML?', options: ['Nao', 'Sempre', 'Somente em tabelas'], answer: 0, explanation: 'ARIA complementa, mas nao deve substituir elementos nativos sem necessidade.' },
    ],
  },
  {
    id: 'html-estrutura-projeto',
    title: 'Organizacao de um site',
    subtitle: 'Separe paginas, imagens, estilos e scripts com clareza.',
    duration: '10 min',
    eyebrow: 'HTML · PROJETO · AULA 2',
    pages: [
      { id: 'html-estrutura-pastas', label: 'Arquitetura', title: 'Cada pasta tem uma responsabilidade', body: 'Uma estrutura simples facilita encontrar arquivos e evoluir o projeto sem misturar imagens, estilos e paginas.', code: 'study-site/\n├─ index.html\n├─ pages/\n│  └─ cursos.html\n├─ styles/\n│  └─ main.css\n└─ assets/\n   └─ images/', notes: [{ token: 'pages', text: 'guarda paginas adicionais' }, { token: 'styles', text: 'guarda arquivos CSS' }, { token: 'assets', text: 'guarda imagens e outros recursos' }] },
      { id: 'html-estrutura-link', label: 'Integracao', title: 'Ligue o CSS ao HTML', body: 'O elemento link carrega uma folha de estilos externa. Manter o CSS separado deixa a pagina mais organizada.', code: '<link rel="stylesheet" href="styles/main.css" />', tip: 'Nomes previsiveis reduzem o tempo procurando arquivos.' },
    ],
    questions: [
      { id: 'html-estrutura-q1', prompt: 'Onde faz sentido guardar imagens?', options: ['assets', 'styles', 'pages-only'], answer: 0, explanation: 'assets e uma convencao para recursos do projeto.' },
      { id: 'html-estrutura-q2', prompt: 'Qual elemento carrega CSS externo?', options: ['link', 'script-only', 'style-route'], answer: 0, explanation: 'link com rel stylesheet conecta a folha de estilos.' },
      { id: 'html-estrutura-q3', prompt: 'Por que separar arquivos?', options: ['Para facilitar manutencao e crescimento', 'Para impedir o navegador', 'Para eliminar semantica'], answer: 0, explanation: 'Organizacao ajuda o projeto a evoluir.' },
    ],
  },
];

const htmlProjectLessons = [
  {
    id: 'html-projeto-pagina',
    title: 'Projeto: pagina de apresentacao',
    subtitle: 'Monte uma pagina semantica para uma trilha StudyCode.',
    duration: '12 min',
    eyebrow: 'HTML · PROJETO FINAL · AULA 1',
    pages: [
      { id: 'html-projeto-estrutura', label: 'Desafio', title: 'Planeje uma pagina antes do CSS', body: 'Crie uma estrutura com header, main, section, article e footer. Inclua titulo, descricao, lista de beneficios e um formulario de interesse.', code: '<header>StudyCode</header>\n<main>\n  <section>\n    <h1>Aprenda programacao</h1>\n  </section>\n</main>\n<footer>Contato</footer>', tip: 'Uma boa estrutura HTML deixa a estilizacao muito mais simples.' },
      { id: 'html-projeto-checklist', label: 'Checklist', title: 'Revise semantica e acessibilidade', body: 'Confira a ordem dos titulos, textos alternativos, labels, foco pelo teclado e links que realmente explicam seus destinos.', analogy: { icon: '✅', title: 'Conquista', value: 'Primeira pagina semantica' } },
    ],
    questions: [
      { id: 'html-projeto-q1', prompt: 'Qual deve ser o primeiro titulo da pagina?', options: ['h1', 'h4', 'Somente span'], answer: 0, explanation: 'h1 representa o titulo principal da pagina.' },
      { id: 'html-projeto-q2', prompt: 'O que revisar em uma imagem?', options: ['Texto alternativo', 'Apenas a cor', 'Somente o nome do arquivo'], answer: 0, explanation: 'alt garante contexto para diferentes formas de acesso.' },
      { id: 'html-projeto-q3', prompt: 'Qual e o proximo passo depois do HTML?', options: ['CSS para apresentacao visual', 'Banco de dados imediatamente', 'Excluir a estrutura'], answer: 0, explanation: 'CSS estiliza a estrutura HTML.' },
    ],
  },
];

export const allHtmlLessons = [...htmlFundamentalsLessons, ...htmlInteractionLessons, ...htmlAdvancedLessons, ...htmlAccessibilityLessons, ...htmlProjectLessons];

export const htmlModules = [
  { id: 'html-fundamentos', number: 1, title: 'Fundamentos do HTML', description: 'Estrutura e semantica de paginas', color: colors.primaryLight, lessons: htmlFundamentalsLessons },
  { id: 'html-conteudo', number: 2, title: 'Conteudo e formularios', description: 'Links, imagens e entradas', color: colors.secondaryLight, lessons: htmlInteractionLessons, requiresModule: 'html-fundamentos' },
  { id: 'html-avancado', number: 3, title: 'Conteudo avancado e SEO', description: 'Listas, tabelas, multimidia e metadados', color: colors.info, lessons: htmlAdvancedLessons, requiresModule: 'html-conteudo' },
  { id: 'html-acessibilidade', number: 4, title: 'Acessibilidade e organizacao', description: 'Foco, ARIA e estrutura de projeto', color: colors.success, lessons: htmlAccessibilityLessons, requiresModule: 'html-avancado' },
  { id: 'html-projeto-final', number: 5, title: 'Projeto final: pagina StudyCode', description: 'Crie sua primeira pagina completa', color: colors.flame, lessons: htmlProjectLessons, requiresModule: 'html-acessibilidade' },
];
