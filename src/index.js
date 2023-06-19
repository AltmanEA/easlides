import Deck, { VERSION } from '../reveal.js/js/reveal';
import '../reveal.js/dist/reveal.css';
import '../reveal.js/dist/theme/white.css';
import RevealMarkdown from '../reveal.js/plugin/markdown/markdown'

window.slide_init = function slide_init() {
  const deck = new Deck({
    plugins: [RevealMarkdown]
  });
  deck.initialize();
  return deck;
}


