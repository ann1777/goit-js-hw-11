import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';

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
    gallery.innerHTML = '';

    page = 1;
    name = inputFldEl.value;

    fetchImages(name, page, perPage)
    .then(name => {
        let totalPages = name.totalSearchResults / perPage;

        if(name.hits.length > 0) {
            Notify.success(`Great! ${name.totalSearchResults} images have been founded.`);
            renderGallery(name);
        }

        if (page < totalPages) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';

        }
    });
}


