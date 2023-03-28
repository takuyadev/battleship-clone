import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@assets/globals.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from '@pages/Game';
import About from '@pages/About';
import HowToPlay from '@pages/HowToPlay';
import Local from '@pages/game/Local';
import { GameContextProvider } from '@context/GameContext';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        path: 'game',
        element: <Game />,
      },
      {
        path: 'game/local',
        element: <Local />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'howtoplay',
        element: <HowToPlay />,
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
