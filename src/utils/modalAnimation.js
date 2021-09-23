import refs from '../data/references.js';
import { toggleNext, toggleLoaded } from '../utils/classTogglers.js';

const imageAnimation = duration => {
  toggleNext();
  setTimeout(toggleNext, duration);
  toggleLoaded();
  refs.modalImage.addEventListener(
    'load',
    () => {
      setTimeout(toggleLoaded, duration);
    },
    { once: true },
  );
};

export default imageAnimation;
