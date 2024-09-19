import React, { useEffect } from 'react';
import './App.css';
import AppRouter from './Routers/AppRouter';

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
    <>
      <AppRouter/>
    </>
  );
}

export default App;
