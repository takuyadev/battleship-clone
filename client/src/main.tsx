import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@assets/globals.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Play from '@pages/Play';
import About from '@pages/About';
import HowToPlay from '@pages/HowToPlay';
import Computer from '@pages/game/Computer';
import Local from '@pages/game/Local';
import Online from '@pages/game/Online';
import { GameContextProvider } from '@context/GameContext';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        path: 'play',
        element: <Play />,
        children: [
          {
            path: 'computer',
            element: <Computer />,
          },
          {
            path: 'local',
            element: <Local />,
          },
          {
            path: 'online',
            element: <Online />,
          },
        ],
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
