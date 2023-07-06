import Deck from '../reveal.js/js/reveal';
import '../reveal.js/dist/reveal.css';
import '../reveal.js/dist/theme/white.css';
import RevealMarkdown from '../reveal.js/plugin/markdown/markdown'
import './plugins/audio-slideshow/plugin';
import './plugins/audio-slideshow/recorder';
import RecordRTC from './plugins/audio-slideshow/RecordRTC';

import {setState, setListeners} from './state';
import './quiz.css'

window.slide_init = function slide_init(id="noid", state={}) {
  window.EASlides = {};
  window.EASlides.id = id;

  const reveal = new Deck({
    // embedded: true,
    plugins: [RevealMarkdown, RevealAudioSlideshow, RevealAudioRecorder],
    audio: {
      prefix: 'audio/',
      suffix: '.mp3',
      advance: -1
    },
  });
  reveal.initialize();

  window.RecordRTC = RecordRTC;
  window.Reveal = reveal;

  setState(state);
  setListeners();

  return reveal;
}

slide_init();

