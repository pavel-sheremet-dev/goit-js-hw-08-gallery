import galleryItems from './gallery.js';

// get refs

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalContent: document.querySelector('.lightbox__content'),
  modalImage: document.querySelector('.lightbox__image'),
  modalBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

const CSS = {
  NEXT: 'next',
  IS_HIDDEN: 'is-hidden',
  IS_OPEN: 'is-open',
  LOADED: 'loaded',
  DURATION: 200,
};

let currentItem;

// create and insert markup

const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join('');

refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

// Toggle class functions

const toggleClass = (el, toggledCLass) => {
  el.classList.toggle(toggledCLass);
};

const toggleNext = () => refs.modalContent.classList.toggle(CSS.NEXT);
const toggleLoaded = () => refs.modalImage.classList.toggle(CSS.LOADED);

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

// Modal changes

const modalFilling = el => {
  refs.modalImage.src = el.dataset.source;
  refs.modalImage.alt = el.alt;
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

// Getting items for scroll

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

/*  throttle for Arrows keys listener (lodash library). 
onKeysPress after 130 line */

const throttleOnPressKey = _.throttle(onKeysPress, CSS.DURATION * 2);

// Open modal by click on the gallery item

refs.gallery.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
  e.preventDefault();
  const targetObj = e.target;
  if (!targetObj.classList.contains('gallery__image')) {
    return;
  }

  modalFilling(targetObj);
  toggleClass(document.body, CSS.IS_HIDDEN);
  currentItem = getCurrentItem(targetObj.dataset.source);

  window.addEventListener('keydown', throttleOnPressKey);
}

// Display next or previous image from the list on the modal window by ArrowRight/ArrowLeft

function onKeysPress(e) {
  if (!['ArrowRight', 'ArrowLeft', 'Escape'].includes(e.code)) {
    return;
  }
  if (e.code === 'Escape') {
    toggleClass(document.body, CSS.IS_HIDDEN);
    modalClear(CSS.DURATION);

    window.removeEventListener('keydown', throttleOnPressKey);
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
}

// Close modal by close button and overlay click

refs.modal.addEventListener('click', modalClose);

function modalClose(e) {
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
}
