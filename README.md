# Battleship Clone

## Links to project
https://battleship-clone.vercel.app/ 

*Leaderboard my take a few seconds to startup, since the server takes a bit to go*

## Summary
Battleship clone built using React.js + Vite + TypeScript + React Router DOM, with a simple leaderboard to keep track of other player's scores.

- Supports local multiplayer and playing against computer
- Focus on animations, and overall fluidity of the page
- Tracks leaderboard and shows the best performing players

## Retrospect
This was an interesting project to create, due to it being something that I was mostly uncomfortable with creating, as a base project. I'm more accustomed to creating static or semi interactive websites, but not one particular part with a focus on full interactivity, so going into this project I wasn't too sure how it would pan out. 

Proceeding with this project, there were several things I picked up on that I will keep in mind for future projects.

- As the file grows in size, it's extremely hard to keep track of what files goes where, and harder to keep track of utils. It sounded obvious to me, but even then being in the position inside a larger project was a whole new perspective
- Following up, the way I structured utils and functions I thought got extremely messy in the end, with lots of functions that produced side effects. Next time, focusing more on pure functions, then testing them first would be the way to approach larger projects. Cypress + vitest / Jest / Mocha + chai is a must learn at this point.
- TypeScript is extremely powerful, but it's incredibly important to type any crucial types, interfaces, or enums early on so you can reuse them again and again later. I'm dropping using "I_" prefixes as well, as they are ugly and not really common.
- useEffects should be used sparingly, and should be avoided in most scenarios. Instead, try to implement a normal function to call or change states on the page, as re-renders could miss the mark.

Although this project was a challenge in terms of getting more accustomed to TypeScript, while trying to incorporate more custom hooks and overall modularity and file structure, I am happy where this project has landed, although I couldn't complete all the features. I'm hoping to come back to this project, and implement more features, such as multiplayer, additional configuration, and AI difficulty settings in the future.
 
## Install
Run following commands on your local machine in order:

```git clone <SSH or HTTPS>```

```terminal npm install ```
```terminal npm run dev ```

## Front-end Techstack
* React + Vite
* TailwindCSS
* TypeScript
* axios
* Framer-motion

## Back-end Techstack
* Node + Express.js
* TypeScript
