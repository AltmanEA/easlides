import Deck, { VERSION } from '../reveal.js/js/reveal';
import '../reveal.js/dist/reveal.css';
import '../reveal.js/dist/theme/white.css';
import RevealMarkdown from '../reveal.js/plugin/markdown/markdown'
import './plugins/audio-slideshow/plugin';
import './plugins/audio-slideshow/recorder';
import RecordRTC from './plugins/audio-slideshow/RecordRTC';

window.slide_init = function slide_init() {
  const deck = new Deck({
    embedded: true,
    plugins: [RevealMarkdown, RevealAudioSlideshow, RevealAudioRecorder],
    // audio: {
    //   prefix: filename + '/',
    //   suffix: '.mp3',
    // },
  });
  deck.initialize();
  window.RecordRTC = RecordRTC;
  window.Reveal = deck;
  return deck;
}

// slide_init();

