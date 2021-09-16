const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// Create and render gallery

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('.lightbox__image');
const modalBtnRef = document.querySelector('.lightbox__button');

let siblingList = {};

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

galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

galleryRef.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
  e.preventDefault();
  const targetObj = e.target;
  if (!targetObj.classList.contains('gallery__image')) {
    return;
  }

  modalImageRef.src = targetObj.dataset.source;
  modalImageRef.alt = targetObj.alt;
  modalRef.classList.add('is-open');
  document.body.classList.toggle('is-hidden');

  siblingList = e.target.closest('li');

  window.addEventListener('keydown', onEscPress);
  window.addEventListener('keydown', onPrevNextPress);
}

modalRef.addEventListener('click', modalClose);

function modalClose(e) {
  const targetObj = e.target;
  if (
    !(
      targetObj.classList.contains('lightbox__overlay') ||
      targetObj.classList.contains('lightbox__button')
    )
  ) {
    return;
  }
  e.currentTarget.classList.remove('is-open');
  document.body.classList.toggle('is-hidden');
  modalImageRef.src = '';

  window.removeEventListener('keydown', onEscPress);
  window.removeEventListener('keydown', onPrevNextPress);
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    modalRef.classList.remove('is-open');
    document.body.classList.toggle('is-hidden');
    modalImageRef.src = '';

    window.removeEventListener('keydown', onEscPress);
    window.removeEventListener('keydown', onPrevNextPress);
  }
}

function onPrevNextPress(e) {
  if (!(e.code === 'ArrowRight' || e.code === 'ArrowLeft')) {
    return;
  }

  if (e.code === 'ArrowRight' && siblingList.nextSibling) {
    modalImageRef.src =
      siblingList.nextSibling.querySelector('.gallery__image').dataset.source;
    modalImageRef.alt =
      siblingList.nextSibling.querySelector('.gallery__image').alt;
    siblingList = siblingList.nextSibling;
  }

  if (e.code === 'ArrowLeft' && siblingList.previousSibling) {
    modalImageRef.src =
      siblingList.previousSibling.querySelector(
        '.gallery__image',
      ).dataset.source;
    modalImageRef.alt =
      siblingList.previousSibling.querySelector('.gallery__image').alt;
    siblingList = siblingList.previousSibling;
  }
}
