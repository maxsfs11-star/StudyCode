export const learningPaths = [
  {
    id: 'web-zero',
    title: 'Web do zero',
    subtitle: 'Do primeiro HTML a aplicacoes modernas',
    icon: '⌘',
    colorKey: 'primary',
    courseIds: ['html', 'css', 'javascript', 'react', 'typescript', 'nextjs'],
  },
  {
    id: 'frontend',
    title: 'Front-end moderno',
    subtitle: 'Interfaces com React, TypeScript e Next.js',
    icon: '◈',
    colorKey: 'secondary',
    courseIds: ['javascript', 'react', 'typescript', 'nextjs'],
  },
  {
    id: 'backend',
    title: 'Back-end com Node',
    subtitle: 'APIs, servidor e dados',
    icon: '⬡',
    colorKey: 'success',
    courseIds: ['javascript', 'nodejs', 'sql'],
  },
  {
    id: 'fullstack',
    title: 'Full stack',
    subtitle: 'Da interface a uma API completa',
    icon: '✦',
    colorKey: 'gold',
    courseIds: ['html', 'css', 'javascript', 'react', 'typescript', 'nextjs', 'nodejs', 'sql'],
  },
  {
    id: 'mobile',
    title: 'Apps mobile',
    subtitle: 'Base web antes de avançar para React Native',
    icon: '▣',
    colorKey: 'info',
    courseIds: ['javascript', 'react', 'typescript'],
    nextMilestone: 'React Native em breve',
  },
];

export function getLearningPath(pathId) {
  return learningPaths.find((path) => path.id === pathId) ?? learningPaths[0];
}
