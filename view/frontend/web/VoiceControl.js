define([], function() {
  'use strict';
  var recognition = new webkitSpeechRecognition();
  var elements;
  recognition.lang = 'nl-NL';
  recognition.onresult = function (event) {
    var text = event.results[0][0].transcript;
    console.log(text);
    if (text.indexOf('volgende pagina') !== -1) {
      elements = document.getElementsByClassName('action next');
      elements[1].click();
      return;
    }

    if (text.indexOf('vorige pagina') !== -1) {
      elements = document.getElementsByClassName('action previous');
      elements[1].click();
      return;
    }

    if (text.indexOf('zoek') !== -1) {
      text = text.replace('zoek ', '');
      document.getElementById('search').value = text;
      document.getElementById('search_mini_form').submit();
    }

    if(text.indexOf('hoe gaat het') !== -1) {
      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[76];
      msg.text = 'goed hoor met jou';
      msg.lang = 'nl-NL';
      speechSynthesis.speak(msg);
    }
  };
});
