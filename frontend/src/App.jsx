import React, { useEffect } from 'react';
import './App.css';
import Home from './Layout/CustomerLayout/Home';
import Blogs from './components/Blogs';
import Services from './components/Services'
import MainLayoutForCus from './Layout/CustomerLayout/MainLayoutForCus';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Authentication from './Service/Authentication';
import Error403 from './Layout/Error403';



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutForCus />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "Blogs",
        element: <Blogs />,
      }
   
    ],
  },
  // {
  //   path: "/manager",
  //   element: <MainLayoutForManager />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Home />,
  //     },
  //   ],
  // },
  {
    path: "/authentication",
    element: <Authentication />,
  },
  {
    path: "/403",
    element: <Error403 />
  }
]);

function App() {
  useEffect(() => {
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
      return () => {
        document.body.removeChild(script);
      }
    });
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
