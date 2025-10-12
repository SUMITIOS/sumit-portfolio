import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Avoid injecting multiple times
    if (document.getElementById('google-translate-script')) return;

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    window.googleTranslateElementInit = function () {
      /* global google */
      try {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
          'google_translate_element'
        );
      } catch (e) {
        // ignore initialization errors
      }
    };

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
