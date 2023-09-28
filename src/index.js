import Deck from '../reveal.js/js/reveal';
import '../reveal.js/dist/reveal.css';
import '../reveal.js/dist/theme/white.css';
import RevealMarkdown from '../reveal.js/plugin/markdown/markdown'
import Highlight  from '../reveal.js/plugin/highlight/highlight'
import './github.css'
import './plugins/audio-slideshow/plugin';
import './plugins/audio-slideshow/recorder';
import RecordRTC from './plugins/audio-slideshow/RecordRTC';

import { setState, setListeners } from './state';
import { makeRender } from './render';
import './quiz.css'

window.slide_init = function slide_init(url = ".", state = {}) {
  window.EASlides = {};
  window.EASlides.url = url;

  const renderer = makeRender(url)

  const reveal = new Deck({
    // embedded: true,
    plugins: [RevealMarkdown, Highlight, RevealAudioSlideshow, RevealAudioRecorder],
    audio: {
      prefix: url,
      suffix: '.mp3',
      advance: -1
    },
    markdown: {
      renderer
    }
  });
  reveal.initialize();

  window.RecordRTC = RecordRTC;
  window.Reveal = reveal;

  setState(state);
  setListeners();

  return reveal;
}

// slide_init("http://127.0.0.1:8080/example/")


