import galleryItems from '../data/galleryItems.js'; //

const getCurrentItem = activeImageScr =>
  galleryItems.find(item => item.original === activeImageScr);

const getNextItem = currentItem => {
  const index = galleryItems.indexOf(currentItem);
  return index === galleryItems.length - 1
    ? galleryItems[0]
    : galleryItems[index + 1];
};

const getPrevItem = currentItem => {
  const index = galleryItems.indexOf(currentItem);
  return !index
    ? galleryItems[galleryItems.length - 1]
    : galleryItems[index - 1];
};

export { getCurrentItem, getNextItem, getPrevItem };
