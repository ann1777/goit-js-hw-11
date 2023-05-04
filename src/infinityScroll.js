'use strict'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImgsFetcher from './js/fetchImages';
import { markupBuilder } from './js/markupBuilder';
import { renderGallery } from './js/renderGallery';

const inputFldEl = document.querySelector('input[name="searchQuery"]');
const inputSearchBtn = document.querySelector('.search-btn.submit');
const galleryItems = document.querySelectorAll('galeryItem'); 
const closeBtn = document.querySelector('.close-btn');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const imagesFetcher = new ImgsFetcher();
const lightbox = new SimpleLightbox('.gallery a');
const target = document.querySelector('#js-item');

let page = 0;
clearMarkup();
getRandomPhotos();
hideLoadMoreBtn();
hideCloseBtn();
searchForm.addEventListener('submit', onFormSubmit);

const options = {
    root: null,
    rootMargin: '400px',
    threshold: 0
}
const callback = function(entry, observer) {
    if (entry[0].isIntersecting) {
      onPageDownLoadMore();
}};
const observer = new IntersectionObserver(callback, options);

async function getRandomPhotos() {
  try {
    const response = await imagesFetcher.getRandomPhotos();
    const data = response.data;
    renderGallery(data);
    lightbox.refresh();
    }
    catch (err) {
      console.log(err);
    }
}

async function onFormSubmit(e) {
  e.preventDefault();
  clearMarkup();
  imagesFetcher.query = e.target.elements.searchQuery.value;
  const data = await imagesFetcher.getRequest();

  // console.log(data);
  const pageMarkup = markupBuilder(data);
  insertGallery(pageMarkup);

  if (data.total_pages === 0) {
    clearMarkup()
    Notify.failure('Nothing was found for your request');
    return;
  } 
  if (imagesFetcher.page < imagesFetcher.totalPage) {
    imagesFetcher.page += 1;
    lightbox.refresh();
    observer.observe(target);         
  }
}

function insertGallery(pageMarkup) {
    gallery.insertAdjacentHTML('beforeend', pageMarkup);
}

async function onPageDownLoadMore() {
  imagesFetcher.page += 1;
  const data = await imagesFetcher.getRequest();
  const pageMarkup = markupBuilder(data);
  insertGallery(pageMarkup);
    // console.log(imagesFetcher.page);
  if (imagesFetcher.page === imagesFetcher.totalPage) { 
    Notify.info("We're sorry, but you've reached the end of search results.");
    observer.unobserve(target);}
    else if (imagesFetcher.page < imagesFetcher.totalPage) {
      /* imagesFetcher.page += 1;  */
      lightbox.refresh();
  } try {
    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
  } catch (err) {
    Notify.failure('RenderGallery method error');}     
};


function insertGallery(pageMarkup) {
  gallery.insertAdjacentHTML('beforeend', pageMarkup);
  lightbox.refresh();
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
};

function hideCloseBtn() {
  closeBtn.style.display = 'none';
};

function clearMarkup() {
    ImgsFetcher.page = 1;
    gallery.innerHTML = '';
    searchForm.addEventListener('submit', onFormSubmit);
}