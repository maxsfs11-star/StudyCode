# CodeQuest

Aplicativo de estudos criado com React Native e Expo. Os primeiros módulos ensinam
fundamentos e decisões em JavaScript com aulas curtas e detalhadas, aplica desafios e salva
XP, sequência e progresso no próprio aparelho.

## Executar no celular

1. Instale o aplicativo **Expo Go** no celular.
2. No computador, abra esta pasta no terminal.
3. Execute `npm start`.
4. Leia o QR Code exibido pelo Expo.

O celular e o computador devem estar, de preferência, na mesma rede Wi-Fi.

## Estrutura inicial

- `App.js`: telas, desbloqueio de aulas, desafios, pontuação e progresso.
- `src/data/courseContent.js`: cursos, módulos, aulas e perguntas.
- `AsyncStorage`: XP, sequência e aulas concluídas salvos localmente.

## Pontuação

- Acerto: +5 XP.
- Erro: -2 XP.
- Conclusão da aula: +10 XP.
- Desafio perfeito: +10 XP extra.
- Revisões não alteram o XP e o total nunca fica negativo.

## Módulos disponíveis

1. Fundamentos: variáveis, tipos, operadores, strings e fluxo de dados.
2. Decisões no código: comparações, `if`, `else`, lógica, `switch` e ternário.
3. Repetições: `for`, `while`, `for...of`, `break` e `continue`.
4. Funções: parâmetros, `return`, escopo e arrow functions.
5. Arrays: listas, índices, métodos, `map`, `filter` e `find`.
6. Objetos: propriedades, métodos, desestruturação, spread e JSON.
7. JavaScript no navegador: DOM, eventos, formulários e `localStorage`.
8. APIs e projetos: Promises, `fetch`, `async/await`, erros e projeto final.

Cada módulo é liberado após a conclusão de todos os desafios do módulo anterior.

## Conteúdo planejado

JavaScript → React → Next.js → Node.js → TypeScript.

React já possui sua primeira trilha disponível: componentes, JSX, props e estado com `useState`.
