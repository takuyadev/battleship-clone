import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@assets/globals.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Play from '@pages/Play';
import About from '@pages/About';
import HowToPlay from '@pages/HowToPlay';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        path: 'play',
        element: <Play />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'howtoplay',
        element: <HowToPlay/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
