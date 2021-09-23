import CSS from '../data/css.js';
import { toggleClass } from '../utils/classTogglers.js';
import { modalChange, modalClear } from '../utils/createModalContent.js';
import {
  getCurrentItem,
  getNextItem,
  getPrevItem,
} from '../utils/getingItems.js';
import imageAnimation from '../utils/modalAnimation.js';
import { firstOpenPictureSrc } from '../events/onGalleryItemClick.js';

let currentItem;

const onKeysPress = e => {
  if (!['ArrowRight', 'ArrowLeft', 'Escape'].includes(e.code)) {
    return;
  }
  if (e.code === 'Escape') {
    toggleClass(document.body, CSS.IS_HIDDEN);
    modalClear(CSS.DURATION);

    window.removeEventListener('keydown', throttleOnPressKey);
  }

  if (!currentItem) {
    currentItem = getCurrentItem(firstOpenPictureSrc);
  }

  if (e.code === 'ArrowRight') {
    const nextItem = getNextItem(currentItem);
    modalChange(nextItem, CSS.DURATION);
    imageAnimation(CSS.DURATION);

    currentItem = nextItem;
  }

  if (e.code === 'ArrowLeft') {
    const prevItem = getPrevItem(currentItem);
    modalChange(prevItem, CSS.DURATION);
    imageAnimation(CSS.DURATION);

    currentItem = prevItem;
  }
};

const throttleOnPressKey = _.throttle(onKeysPress, CSS.DURATION * 2);

export default throttleOnPressKey;
