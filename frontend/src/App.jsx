import React from 'react';
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import Services from './components/Services'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Services />,
  },
]);

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

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
