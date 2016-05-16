define([], function () {
  'use strict';
  if (typeof webkitSpeechRecognition === 'undefined' && typeof speechSynthesis !== 'undefined') {
    return;
  }

  function triggerNavigationClick (el) {
    elements = document.getElementsByClassName('action ' + el);
    if (elements.length > 0) {
      elements[1].click();
    }
  }

  var recognition = new webkitSpeechRecognition();
  var elements;
  recognition.lang = 'en-US';
  recognition.onresult = function (event) {
    var text = event.results[0][0].transcript;

    console.log(text);

    if (text.indexOf('go to homepage') !== -1) {
      location.href = '/';
      return;
    }

    if (text.indexOf('next page') !== -1) {
      triggerNavigationClick('next');
      return;
    }

    if (text.indexOf('previous page') !== -1) {
      triggerNavigationClick('previous');
      return;
    }

    if (text.indexOf('search for') !== -1) {
      text = text.replace('search for ', '');
      document.getElementById('search').value = text;
      document.getElementById('search_mini_form').submit();
    }

    if (text.indexOf('how are you') !== -1) {
      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[0]; // 76 is dutch
      msg.text = 'I am fine. What about you';
      msg.lang = 'en-US';
      speechSynthesis.speak(msg);
    }
  };

  document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyM' && event.ctrlKey) {
      recognition.start();
    }
  });
});
