import galleryItems from '../data/galleryItems.js';

const galleryMarkup = galleryItems
  .map(({ preview, original, description }, idx) => {
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
      data-idx="${idx}"
    />
  </a>
</li>`;
  })
  .join('');

export default galleryMarkup;
