import React, { useEffect } from 'react';
import './App.css';
import Home from './Layout/Home';
import Services from './components/Services'
import MainLayout from './Layout/MainLayout';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Authentication from './Service/Authentication';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
    ],
  },
  {
    path: "/authentication",
    element: <Authentication />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
