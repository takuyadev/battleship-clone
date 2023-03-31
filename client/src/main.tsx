import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@assets/globals.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from '@pages/Game';
import Local from '@pages/game/Local';
import { GameContextProvider } from '@context/GameContext';
import Computer from '@pages/game/Computer';
import Leaderboard from '@pages/Leaderboard';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        path: '/',
        element: <Game />,
      },
      {
        path: 'game/local',
        element: <Local />,
      },
      // {
      //   path: 'game/online',
      //   element: <Online />,
      // },
      {
        path: 'game/computer',
        element: <Computer />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameContextProvider>
      <RouterProvider router={router} />
    </GameContextProvider>
  </React.StrictMode>
);
