import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';
// import { renderGallery } from './renderGallery';

const inputFldEl = document.querySelector('input[name="searchQuery"]');
const closeBtn = document.querySelector('.close-btn');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let perPage = 40;
let page = 0;
let name = inputFldEl.value;

async function eventHandler(e) {
    e.preventDefault();
    console.log(gallery);
    // gallery.innerHTML = '';

    page = 1;
    name = inputFldEl.value;

    fetchImages(name, page, perPage)
    .then(name => {
        let totalPages = name.totalSearchResults / perPage;

        if(name.searchResults.length > 0) {
            Notify.success(`Great! ${name.totalSearchResults} images have been founded.`);
            renderGallery(name);
            new SimpleLightbox('.gallery a');
            closeBtn.style.display = 'block';
            closeBtn.addEventListener('click', () => {
            gallery.innerHTML = '';
            closeBtn.style.display = 'none';
        });
        if (page < totalPages) {
            loadBtn.style.display = 'block';
          } else {
            loadBtn.style.display = 'none';
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
    const markup = name.searchResults
      .map(searchResult => {
        return `<div class="photo-card">
  
          <a class="gallery-item" href="${searchResult.largeImageURL}">
            <img
              class="gallery__image"
              src="${searchResult.webformatURL}"
              alt="${searchResult.tags}"
              loading="lazy"
          /></a>
  
          <div class="info">
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">thumb_up</b>
              </p>
              <p class="info-counter">${searchResult.likes.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">visibility</b>
              </p>
              <p class="info-counter">${searchResult.views.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">forum</b>
              </p>
              <p class="info-counter">${searchResult.comments.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">download</b>
              </p>
              <p class="info-counter">${searchResult.downloads.toLocaleString()}</p>
            </div>
  
          </div>
        </div>`;
      })
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}
