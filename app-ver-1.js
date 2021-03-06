import galleryItems from './gallery.js';

// get refs

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalContent: document.querySelector('.lightbox__content'),
  modalImage: document.querySelector('.lightbox__image'),
  modalBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

const CSS_ANIM_DURATION = 200;

let currentLiRef;

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

const toggleHidden = () => document.body.classList.toggle('is-hidden');
const toggleNext = () => refs.modalContent.classList.toggle('next');
const toggleNextNext = () => refs.modalContent.classList.toggle('next-next');

// Scrolling animation

const imageAnimation = duration => {
  const hasNext = refs.modalContent.classList.contains('next');
  if (hasNext) {
    refs.modalImage.addEventListener(
      'load',
      () => {
        console.log('картинка загрузилась');
        toggleNext();
        setTimeout(toggleNextNext, duration);
      },
      { once: true },
    );
    // toggleNext();
    // setTimeout(toggleNextNext, duration);
  } else {
    refs.modalImage.addEventListener(
      'load',
      () => {
        console.log('картинка загрузилась');
        setTimeout(toggleNext, duration);
        toggleNextNext();
      },
      { once: true },
    );
    // setTimeout(toggleNext, duration);
    // toggleNextNext();
  }
};

// Modal changes

const modalFilling = (el, duration) => {
  refs.modalImage.src = el.dataset.source;
  refs.modalImage.alt = el.alt;
  refs.modal.classList.add('is-open');
  toggleNext();
};

const modalChange = (el, duration) => {
  setTimeout(() => {
    refs.modalImage.src = el.dataset.source;
    refs.modalImage.alt = el.alt;
  }, duration * 0.75);
};

const modalClear = duration => {
  const hasNext = refs.modalContent.classList.contains('next');

  refs.modal.classList.remove('is-open');
  refs.modalContent.classList.remove(hasNext ? 'next' : 'next-next');

  setTimeout(() => {
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
  }, duration);
};

/*  throttle for Arrows keys listener (lodash library).
 *   onPrevNextPress() on the 145 line
 */

const throttleNextPrev = _.throttle(onPrevNextPress, CSS_ANIM_DURATION * 2);

// Open modal by click on the gallery item

refs.gallery.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
  e.preventDefault();
  const targetObj = e.target;
  if (!targetObj.classList.contains('gallery__image')) {
    return;
  }

  modalFilling(targetObj);

  toggleHidden();

  currentLiRef = targetObj.closest('li');

  window.addEventListener('keydown', onEscPress);
  window.addEventListener('keydown', throttleNextPrev);
}

// Display next or previous image from the list on the modal window by ArrowRight/ArrowLeft

function onPrevNextPress(e) {
  if (!(e.code === 'ArrowRight' || e.code === 'ArrowLeft')) {
    return;
  }

  if (e.code === 'ArrowRight' && currentLiRef.nextSibling) {
    const nextImage = currentLiRef.nextSibling.querySelector('.gallery__image');

    modalChange(nextImage, CSS_ANIM_DURATION);
    imageAnimation(CSS_ANIM_DURATION);

    currentLiRef = currentLiRef.nextSibling;
  }

  if (e.code === 'ArrowLeft' && currentLiRef.previousSibling) {
    const prevImage =
      currentLiRef.previousSibling.querySelector('.gallery__image');

    modalChange(prevImage, CSS_ANIM_DURATION);
    imageAnimation(CSS_ANIM_DURATION);

    currentLiRef = currentLiRef.previousSibling;
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

  toggleHidden();
  modalClear(CSS_ANIM_DURATION);

  window.removeEventListener('keydown', onEscPress);
  window.removeEventListener('keydown', throttleNextPrev);
}

// Close modal by Escape

function onEscPress(e) {
  if (e.code === 'Escape') {
    toggleHidden();
    modalClear(CSS_ANIM_DURATION);

    window.removeEventListener('keydown', onEscPress);
    window.removeEventListener('keydown', throttleNextPrev);
  }
}
