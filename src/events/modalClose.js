import refs from '../data/references.js';
import CSS from '../data/css.js';
import { toggleClass } from '../utils/classTogglers.js';
import { modalClear } from '../utils/createModalContent.js';
import throttleOnPressKey from './onKeysPress.js';

const modalClose = e => {
  const targetObj = e.target;
  if (
    !(
      targetObj.classList.contains('lightbox__overlay') ||
      targetObj === refs.modalBtn
    )
  ) {
    return;
  }

  toggleClass(document.body, CSS.IS_HIDDEN);
  modalClear(CSS.DURATION);

  window.removeEventListener('keydown', throttleOnPressKey);
};

export default modalClose;
