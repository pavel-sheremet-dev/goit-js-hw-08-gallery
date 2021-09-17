import galleryItems from './gallery.js';

// get refs

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  modalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  modalContent: document.querySelector('.lightbox__content'),
};

let currentLiRef;

// Class toggle functions

const toggleHidden = () => document.body.classList.toggle('is-hidden');
const toggleNext = () => refs.modalContent.classList.toggle('next');
const toggleNextNext = () => refs.modalContent.classList.toggle('next-next');

// Scrolling animation

const imageAnimation = () => {
  const isNext = refs.modalContent.classList.contains('next');
  if (isNext) {
    toggleNext();
    setTimeout(toggleNextNext, 250);
  } else {
    setTimeout(toggleNext, 250);
    toggleNextNext();
  }
};

const modalFilling = obj => {
  refs.modalImage.src = obj.dataset.source;
  refs.modalImage.alt = obj.alt;
  refs.modal.classList.add('is-open');
  toggleNext();
};

const modalClear = () => {
  const isNext = refs.modalContent.classList.contains('next');

  refs.modal.classList.remove('is-open');
  refs.modalContent.classList.remove(isNext ? 'next' : 'next-next');
  setTimeout(() => {
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
  }, 500);
};

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
  window.addEventListener('keydown', onPrevNextPress);
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
  modalClear();

  window.removeEventListener('keydown', onEscPress);
  window.removeEventListener('keydown', onPrevNextPress);
}

// Close modal by Escape

function onEscPress(e) {
  if (e.code === 'Escape') {
    toggleHidden();
    modalClear();

    window.removeEventListener('keydown', onEscPress);
    window.removeEventListener('keydown', onPrevNextPress);
  }
}

function onPrevNextPress(e) {
  if (!(e.code === 'ArrowRight' || e.code === 'ArrowLeft')) {
    return;
  }

  if (e.code === 'ArrowRight' && currentLiRef.nextSibling) {
    const nextImage = currentLiRef.nextSibling.querySelector('.gallery__image');
    setTimeout(() => {
      refs.modalImage.src = nextImage.dataset.source;
      refs.modalImage.alt = nextImage.alt;
    }, 125);

    imageAnimation();

    currentLiRef = currentLiRef.nextSibling;
  }

  if (e.code === 'ArrowLeft' && currentLiRef.previousSibling) {
    const prevImage =
      currentLiRef.previousSibling.querySelector('.gallery__image');
    setTimeout(() => {
      refs.modalImage.src = prevImage.dataset.source;
      refs.modalImage.alt = prevImage.alt;
    }, 200);

    imageAnimation();

    currentLiRef = currentLiRef.previousSibling;
  }
}
