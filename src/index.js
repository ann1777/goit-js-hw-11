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

let perPage = 40;
let page = 0;
let name = inputFldEl.value;
clearMarkup();
getRandomPhotos();
hideLoadMoreBtn();
hideCloseBtn();
searchForm.addEventListener('submit', onFormSubmit);

async function getRandomPhotos() {
  /* imagesFetcher
    .getRandomPhotos()
    .then(response => {
      const { data } = response;
      return gallery.innerHTML = imagesFetcher(pageMarkup);
    })
    .catch(err => {
      console.log(err);
    }); */
  try {
    const response = await imagesFetcher.getRandomPhotos();
    const data = response.data;
    renderGallery(data);
    lightbox.refresh();
    
  }
  catch (err) {
    console.log(err);
  }
};

async function onFormSubmit(e) {
    e.preventDefault();
  console.log('OnformSubmit');
    clearMarkup();
    imagesFetcher.query = e.target.elements.searchQuery.value;
    console.log(imagesFetcher.query);
    const data = await imagesFetcher.getRequest();

    console.log(data);
    const pageMarkup = markupBuilder(data);
    insertGallery(pageMarkup);
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
      lightbox.refresh();       
  }

// inputSearchBtn.addEventListener('click', (event) => {
//   event.preventDefault();
//   if(!galleryItems) {
//     return;}
  
//   else if(galleryItems.length) { // check if there are any gallery items
//   const cardHeight = galleryItems[0].getBoundingClientRect().height; // use index 0 to get the height of the first gallery item
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   const scrollPosition = scrollTop + (cardHeight * 2);

//   window.scrollBy({
//     top: scrollPosition,
//     behavior: 'smooth',
//   });


 /*  setTimeout(() => {
    if (galleryItems.length > 2) {
      const lastItem = galleryItems[galleryItems.length - 1];
      const lastItemPosition = lastItem.offsetTop + lastItem.offsetHeight;
      const windowHeight = window.innerHeight;

      if (lastItemPosition > scrollTop && lastItemPosition < scrollTop + windowHeight) {
        window.scrollTo({
          top: lastItemPosition,
          behavior: 'smooth'
        });
      }
    }
  }, 100); */
}
// });
clearInputFld();
// searchForm.addEventListener('submit', onFormSubmit);
// const { largeImageURL, webImageURL, likes, views, comments, downloads } = galleryItems;

// try { 

//   document.querySelector(".gallery-item").innerText = largeImageURL;
//   document.querySelector('.gallery__image').innerText = webImageURL;
//   document.querySelector('.info-counter:first-child').innerText += likes;
//   document.querySelector('.info-counter:nth-child(2)').innerText += views;
//   document.querySelector('.info-counter:nth-child(3)').innerText += comments;
//   document.querySelector('.info-counter:last-child').innerText += downloads;
  
// } catch (err) {
//   console.dir(err);
// }
// return galleryItems;
// };

function insertGallery(pageMarkup) {
  gallery.innerHTML = pageMarkup;
  lightbox.refresh();
}

async function onLoadMoreBtnClick() {
    if (imagesFetcher.page === imagesFetcher.totalPage) { 
      Notify.info("We're sorry, but you've reached the end of search results.");
      hideLoadMoreBtn();
      showCloseBtn();
    }
      else if (imagesFetcher.page < imagesFetcher.totalPage) {
        imagesFetcher.page += 1; 
        imagesFetcher.query = this.imagesFetcherQuery;
        const data = await imagesFetcher.getRequest();
        const pageMarkup = markupBuilder(data);
        console.log(pageMarkup);

      // renderGallery(pageMarkup);
        gallery.insertAdjacentHTML('beforeend', pageMarkup);
      // lightbox.refresh();
        showLoadMoreBtn();
        showCloseBtn();
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

function onCloseBtnClick() {
    clearMarkup();
    new SimpleLightbox('.gallery a');
    clearInputFld();
    imagesFetcher.page = 1;
    imagesFetcher.query = '';
    getRandomPhotos();
  // searchForm.addEventListener('submit', onFormSubmit);
};

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
  loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
};

function showCloseBtn() {
  closeBtn.style.display = 'block';
  closeBtn.addEventListener('click', onCloseBtnClick); 
};

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
  loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
 
};

function hideCloseBtn() {
  closeBtn.style.display = 'none';
  closeBtn.removeEventListener('click', onCloseBtnClick);
};

function clearInputFld() {
  inputFldEl.value = "";
  searchForm.addEventListener('submit', onFormSubmit);
};

function clearMarkup() {
  ImgsFetcher.page = 1;
  gallery.innerHTML = '';
  hideCloseBtn();
  hideLoadMoreBtn();
  searchForm.addEventListener('submit', onFormSubmit);
};

  