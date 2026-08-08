export const practiceProjects = [
  {
    id: "html-profile-page",
    courseId: "html",
    title: "Página de perfil",
    subtitle: "Estruture uma apresentação pessoal semântica.",
    duration: "35 min",
    rewardXp: 60,
    level: "Iniciante",
    objective:
      "Criar uma página de perfil clara, com conteúdo organizado e links úteis.",
    steps: [
      "Monte a estrutura base do documento HTML.",
      "Adicione cabeçalho, seção sobre mim, habilidades e contato.",
      "Use tags semânticas para cada área da página.",
      "Revise títulos, textos alternativos e links.",
    ],
    checklist: [
      "O documento possui head e body bem definidos.",
      "As seções usam tags semânticas.",
      "Há pelo menos uma imagem com texto alternativo.",
      "Os links funcionam e têm descrições claras.",
    ],
    tip: "Pense na estrutura antes da aparência. Um HTML bem organizado facilita todo o CSS que virá depois.",
  },
  {
    id: "css-responsive-card",
    courseId: "css",
    title: "Card responsivo",
    subtitle: "Transforme conteúdo simples em uma interface moderna.",
    duration: "45 min",
    rewardXp: 70,
    level: "Iniciante",
    objective:
      "Estilizar um card de perfil que fique bonito no celular e no computador.",
    steps: [
      "Comece com cores, espaçamentos e tipografia.",
      "Use flexbox para organizar os elementos do card.",
      "Crie estados de hover ou foco para botões.",
      "Adicione uma media query para telas menores.",
    ],
    checklist: [
      "O card tem espaçamento e contraste confortáveis.",
      "O layout usa flexbox ou grid.",
      "Existe ao menos uma interação visual de hover ou foco.",
      "A interface continua legível em tela pequena.",
    ],
    tip: "Use poucas cores e repita espaçamentos. Consistência deixa a interface com cara de produto real.",
  },
  {
    id: "javascript-task-list",
    courseId: "javascript",
    title: "Lista de tarefas",
    subtitle: "Crie interações reais com JavaScript.",
    duration: "60 min",
    rewardXp: 90,
    level: "Fundamentos",
    objective:
      "Construir uma lista de tarefas que adiciona, conclui e remove itens.",
    steps: [
      "Modele cada tarefa com texto e status de conclusão.",
      "Capture o formulário e adicione uma tarefa à lista.",
      "Renderize as tarefas usando o DOM.",
      "Implemente concluir e remover sem recarregar a página.",
    ],
    checklist: [
      "Uma tarefa pode ser adicionada pelo formulário.",
      "A lista é atualizada na tela usando JavaScript.",
      "Uma tarefa pode ser marcada como concluída.",
      "Uma tarefa pode ser removida.",
    ],
    tip: "Crie uma função renderizarTarefas. Ela centraliza a atualização visual e evita código repetido.",
  },
  {
    id: "react-habit-dashboard",
    courseId: "react",
    title: "Dashboard de hábitos",
    subtitle: "Organize uma tela com componentes e estado.",
    duration: "75 min",
    rewardXp: 110,
    level: "Intermediário",
    objective:
      "Criar um painel de hábitos diários usando componentes reutilizáveis e useState.",
    steps: [
      "Separe cabeçalho, cards e lista em componentes.",
      "Crie um estado para os hábitos concluídos.",
      "Renderize a lista com map e chaves estáveis.",
      "Calcule e mostre o percentual concluído.",
    ],
    checklist: [
      "O projeto possui componentes separados.",
      "Os hábitos são renderizados a partir de um array.",
      "O clique atualiza o estado com useState.",
      "O progresso é calculado automaticamente.",
    ],
    tip: "Quando um componente parece grande demais, procure uma parte visual que possa virar um componente menor.",
  },
  {
    id: "next-personal-blog",
    courseId: "nextjs",
    title: "Mini blog pessoal",
    subtitle: "Use páginas e rotas em um projeto moderno.",
    duration: "75 min",
    rewardXp: 110,
    level: "Intermediário",
    objective:
      "Montar um mini blog com página inicial e páginas de artigos.",
    steps: [
      "Crie a página inicial com uma lista de artigos.",
      "Adicione uma rota para visualizar cada artigo.",
      "Reutilize um layout com cabeçalho e navegação.",
      "Organize os dados dos artigos em um arquivo próprio.",
    ],
    checklist: [
      "A home lista os artigos disponíveis.",
      "Cada artigo abre em uma rota própria.",
      "O layout é reutilizado nas páginas.",
      "Os dados ficam separados da interface.",
    ],
    tip: "A estrutura de pastas do Next.js já ajuda a contar a história do projeto. Nomeie as rotas de forma simples.",
  },
  {
    id: "typescript-typed-catalog",
    courseId: "typescript",
    title: "Catálogo tipado",
    subtitle: "Dê segurança a dados de produtos com TypeScript.",
    duration: "70 min",
    rewardXp: 110,
    level: "Intermediário",
    objective:
      "Criar um pequeno catálogo de produtos com tipos, interfaces e funções seguras.",
    steps: [
      "Modele Produto e Categoria usando interfaces.",
      "Crie uma lista tipada de produtos.",
      "Escreva uma função para filtrar por categoria.",
      "Use tipos de retorno nas funções principais.",
    ],
    checklist: [
      "As entidades principais usam interface ou type.",
      "A lista de produtos está tipada.",
      "O filtro recebe e retorna dados tipados.",
      "O projeto compila sem erros de tipo.",
    ],
    tip: "TypeScript não serve para deixar tudo mais longo. Ele serve para deixar intenções importantes explícitas.",
  },
  {
    id: "node-task-api",
    courseId: "nodejs",
    title: "API de tarefas",
    subtitle: "Dê vida aos dados com uma API simples.",
    duration: "90 min",
    rewardXp: 120,
    level: "Intermediário",
    objective:
      "Criar uma API que lista, cria e conclui tarefas.",
    steps: [
      "Crie um servidor Express com uma rota de teste.",
      "Modele as tarefas em um array temporário.",
      "Implemente rotas GET, POST e PATCH.",
      "Teste as respostas com uma ferramenta de API.",
    ],
    checklist: [
      "O servidor inicia sem erros.",
      "A API lista tarefas em JSON.",
      "Uma nova tarefa pode ser criada por POST.",
      "Uma tarefa pode ser marcada como concluída.",
    ],
    tip: "Antes do banco de dados, faça a rota funcionar com um array. Depois, a troca de armazenamento fica muito mais clara.",
  },
];

export function getPracticeProject(projectId) {
  return practiceProjects.find((project) => project.id === projectId);
}
