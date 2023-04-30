import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {Notify} from 'notiflix';
import { fetchImages } from './js/fetchImages';
// import { renderGallery } from './renderGallery';

const inputFldEl = document.querySelector('input[name="searchQuery"]');
const closeBtn = document.querySelector('.close-btn');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let perPage = 40;
let page = 0;
let name = inputFldEl.value;

// Needed to hide "load more" and "close" buttons

loadMoreBtn.style.display = 'none';
closeBtn.style.display = 'none';

async function eventHandler(e) {
    e.preventDefault();
    console.log(gallery);
    gallery.innerHTML = '';

    page = 1;
    name = inputFldEl.value;
    console.log(name);

    fetchImages(name, page, perPage)
    .then(name => {
        let totalPages = name.totalHits / perPage;

        if(name.hits.length > 0) {
            Notify.success(`Horray! We found ${name.totalHits} images.`);
            renderGallery(name);
            new SimpleLightbox('.gallery a');
            closeBtn.style.display = 'block';
            closeBtn.addEventListener('click', () => {
            gallery.innerHTML = '';
            // closeBtn.style.display = 'none';
        });
        if (page < totalPages) {
            loadMoreBtn.style.display = 'block';
          } else {
            loadMoreBtn.style.display = 'none';
            Notify.info("You've reached the end of search results.");
          }
        } else {
            Notify.info("You've reached the end of search results.");
          gallery.uinnerHTML = '';
        }
    })
    .catch(error => console.log('ERROR: ' +error));
}
    
searchForm.addEventListener('submit', eventHandler);

function renderGallery(name) {
    const markup = name.hits
      .map(hit => {
        return `<div class="photo-card">
  
          <a class="gallery-item" href="${hit.largeImageURL}">
            <img
              class="gallery__image"
              src="${hit.webformatURL}"
              alt="${hit.tags}"
              loading="lazy"
          /></a>
  
          <div class="info">
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">thumb_up</b>
              </p>
              <p class="info-counter">${hit.likes.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">visibility</b>
              </p>
              <p class="info-counter">${hit.views.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">forum</b>
              </p>
              <p class="info-counter">${hit.comments.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">download</b>
              </p>
              <p class="info-counter">${hit.downloads.toLocaleString()}</p>
            </div>
  
          </div>
        </div>`;
      })
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.addEventListener(
    'click',
    () => {
      name = inputFldEl.value;
      page += 1;
      fetchImages(name, page, perPage).then(name => {
        let totalPages = name.totalHits / perPage;
        renderGallery(name);
        closeBtn.style.display = 'block';
        new SimpleLightbox('.gallery a');
        if (page >= totalPages) {
            loadMoreBtn.style.display = 'none';
            Notify.info(
            "Ooops, you've reached the end of search results."
          );
        }
      });
    },
    true
  );

  closeBtn.addEventListener(
    'click',
    () => {
      name = inputFldEl.value;
      page += 1;
      fetchImages(name, page, perPage).then(name => {
        let totalPages = name.totalHits / perPage;
        renderGallery(name);
        closeBtn.style.display = 'none';
        new SimpleLightbox('.gallery a');
        gallery.innerHTML = '';
        page = 1;
      }
  );
  window.addEventListener('load', fadeEffect);
});
  