import refs from '../data/references.js';
import CSS from '../data/css.js';
import {
  toggleClass,
  toggleNext,
  toggleLoaded,
} from '../utils/classTogglers.js';

const modalFilling = el => {
  refs.modalImage.src = el.dataset.source;
  refs.modalImage.alt = el.alt;
  refs.modalImage.setAttribute('data-index', el.dataset.idx);
  refs.modalImage.addEventListener(
    'load',
    () => {
      toggleClass(refs.modal, CSS.IS_OPEN);
    },
    { once: true },
  );

  toggleNext();
  toggleLoaded();
};

const modalChange = (item, duration) => {
  setTimeout(() => {
    refs.modalImage.src = item.original;
    refs.modalImage.alt = item.description;
  }, duration * 0.75);
};

const modalClear = duration => {
  toggleLoaded();
  toggleClass(refs.modal, CSS.IS_OPEN);
  toggleNext();

  setTimeout(() => {
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
  }, duration);
};

export { modalFilling, modalChange, modalClear };
