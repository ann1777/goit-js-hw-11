'use strict'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {Notify} from 'notiflix';
import ImgsFetcher from './js/fetchImages';
import markupBuilder from './js/markupBuilder';
import { renderGallery } from './js/renderGallery';

const inputFldEl = document.querySelector('input[name="searchQuery"]');
const inputSearchBtn = document.querySelector('.search-btn.submit');
const galleryItems = document.querySelectorAll('galeryItem'); 
const closeBtn = document.querySelector('.close-btn');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const imagesFetcher = new ImgsFetcher();
const simpleLightbox = new SimpleLightbox('.gallery a');

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
        onBtnLoadClick();
}};
const observer = new IntersectionObserver(callback, options);

async function getRandomPhotos() {
    try {
      const response = await imagesFetcher.getRandomPhotos();
      const data = response.data;
      const result = renderGallery(data);
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
    const pageMarkup = markupBuilder(data);
    renderGallery(pageMarkup);
    showCloseBtn();
    showLoadMoreBtn();
    if (data.total_pages === 0) {
      clearMarkup()
      Notify.failure('Nothing was found for your request');
      return;
    } 
    if (imagesFetcher.page < imagesFetcher.totalPage) {
      imagesFetcher.page += 1;
      showLoadMoreBtn();
      observer.observe(target);         
  }
}

function renderGallery(pageMarkup) {
    gallery.insertAdjacentHTML('beforeend', pageMarkup);
}

async function onLoadMoreBtnClick() {
    const data = await imagesFetcher.getRequest();
    const pageMarkup = markupBuilder(data);
    renderGallery(pageMarkup);
    loadMoreBtn.addEventListener ('click',
    async () => {
      // console.log(imagesFetcher.page);
      if (imagesFetcher.page === imagesFetcher.totalPage) { 
        Notify.info("We're sorry, but you've reached the end of search results.");
        hideLoadMoreBtn();
        showCloseBtn();
        observer.unobserve(target);}
        else if (imagesFetcher.page < imagesFetcher.totalPage) {
          imagesFetcher.page += 1; 
          renderGallery();
          showLoadMoreBtn();
          showCloseBtn();
      } try {
        const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
  
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
     } catch (err) {
        Notify.failure('RenderGallery method error');}     
     });
}

function onCloseBtnClick() {
    closeBtn.addEventListener ('click',
    () => {
      console.log(gallery);
      clearMarkup();
      new SimpleLightbox('.gallery a');
      getRandomPhotos();
      clearInputFld();
      page = 1;
    });
    searchForm.addEventListener('submit', onFormSubmit);
};

function showCloseBtn() {
    closeBtn.style.display = 'block';
    closeBtn.addEventListener('click', onCloseBtnClick); 
}
  
function hideLoadMoreBtn() {
    loadMoreBtn.style.display = 'none';
    loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);

}

function hideCloseBtn() {
    closeBtn.style.display = 'none';
    closeBtn.removeEventListener('click', onCloseBtnClick);
}

function clearInputFld() {
    inputFldEl.value = "";
    searchForm.addEventListener('submit', onFormSubmit);
}

function clearMarkup() {
    ImgsFetcher.page = 1;
    gallery.innerHTML = '';
    hideCloseBtn();
    hideLoadMoreBtn();
    searchForm.addEventListener('submit', onFormSubmit);
}
    



