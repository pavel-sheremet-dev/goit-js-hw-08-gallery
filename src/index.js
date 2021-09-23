import refs from './data/references.js';

import galleryMarkup from './components/galleryMarkup.js';

import { onGalleryItemClick } from './events/onGalleryItemClick.js';

import modalClose from './events/modalClose.js';

// create and insert markup

refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

// Open modal by click on the gallery item

refs.gallery.addEventListener('click', onGalleryItemClick);

// Close modal by close button and overlay click

refs.modal.addEventListener('click', modalClose);
