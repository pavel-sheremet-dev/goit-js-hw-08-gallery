import CSS from '../data/css.js';
import refs from '../data/references.js';

const toggleClass = (el, toggledCLass) => {
  el.classList.toggle(toggledCLass);
};

const toggleNext = () => refs.modalContent.classList.toggle(CSS.NEXT);
const toggleLoaded = () => refs.modalImage.classList.toggle(CSS.LOADED);

export { toggleClass, toggleNext, toggleLoaded };
