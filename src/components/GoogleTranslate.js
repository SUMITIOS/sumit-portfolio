import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    window.googleTranslateElementInit = function () {
      try {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
          'google_translate_element'
        );
      } catch (e) {
        // ignore initialization errors
      }
    };

    // Restore the callback before checking for an existing script. React StrictMode
    // runs effect cleanup and setup again in development.
    if (document.getElementById('google-translate-script')) return;

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // cleanup: remove global callback and script if needed
      try {
        delete window.googleTranslateElementInit;
      } catch (e) {}
    };
  }, []);

  return <div id="google_translate_element" style={{ display: 'inline-block' }} />;
};

export default GoogleTranslate;
