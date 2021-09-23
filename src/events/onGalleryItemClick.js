import CSS from '../data/css.js';
import { toggleClass } from '../utils/classTogglers.js';
import { modalFilling } from '../utils/createModalContent.js';
import throttleOnPressKey from './onKeysPress.js';

let firstOpenPictureSrc;

const onGalleryItemClick = e => {
  e.preventDefault();
  const targetObj = e.target;
  if (!targetObj.classList.contains('gallery__image')) {
    return;
  }

  modalFilling(targetObj);
  toggleClass(document.body, CSS.IS_HIDDEN);

  firstOpenPictureSrc = targetObj.dataset.source;

  window.addEventListener('keydown', throttleOnPressKey);
};

export { onGalleryItemClick, firstOpenPictureSrc };
