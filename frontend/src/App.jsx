import React from 'react';
import './App.css';
import Home from './Layout/Home';
import Services from './components/Services'
import MainLayout from './Layout/MainLayout';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Authenticate from './Service/Authenticate';

const scripts = [
  "js/vendor/jquery-2.2.4.min.js",
  "js/popper.min.js",
  "js/vendor/bootstrap.min.js",
  "js/jquery-ui.js",
  "js/easing.min.js",
  "js/hoverIntent.js",
  "js/superfish.min.js",
  "js/jquery.ajaxchimp.min.js",
  "js/jquery.magnific-popup.min.js",
  "js/jquery.nice-select.min.js",
  "js/owl.carousel.min.js",
  "js/mail-script.js",
  "js/main.js"
];

scripts.forEach(src => {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
});

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
    path: "/authenticate",
    element: <Authenticate />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
