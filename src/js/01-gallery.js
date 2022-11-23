// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryContainerEl = document.querySelector('.gallery');

const galleryMarkup = createGalleryItems(galleryItems);

galleryContainerEl.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryItems(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" title="${description}" />
            </a>`;
    })
    .join(' ');
}

const gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
