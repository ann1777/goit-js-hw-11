'use strict'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {Notify} from 'notiflix';
import Fetcher from './js/fetchImages';
import markupBuilder from './js/markupBuilder';
import axios from 'axios';

const inputFldEl = document.querySelector('input[name="searchQuery"]');
const inputSearchBtn = document.querySelector('.search-btn.submit');
const galleryItems = document.querySelectorAll('galeryItem'); 
const closeBtn = document.querySelector('.close-btn');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const ImagesFetcher = new Fetcher();

let perPage = 40;
let page = 0;
let name = inputFldEl.value;


hideLoadMoreBtn();
hideCloseBtn();
searchForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
    e.preventDefault();
    console.log(gallery);
    clearMarkup();
    ImagesFetcher.query = e.target.elements.searchQuery.value;
    const data = await ImagesFetcher.getRequest();
    const pageMarkup = markupBuilder(data);
    renderGallery(pageMarkup);
    showLoadMoreBtn();
    showCloseBtn(); 
    if (ImagesFetcher.page < ImagesFetcher.totalPage) {
      ImagesFetcher.page += 1;         
  }

function renderGallery(pageMarkup) {
  gallery.insertAdjacentHTML('beforeend', pageMarkup);
}


inputSearchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if(!galleryItems) {
    return;}
  
  else if(galleryItems.length) { // check if there are any gallery items
  const cardHeight = galleryItems[0].getBoundingClientRect().height; // use index 0 to get the height of the first gallery item
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPosition = scrollTop + (cardHeight * 2);

  window.scrollBy({
    top: scrollPosition,
    behavior: 'smooth',
  });


  setTimeout(() => {
    if (galleryItems.length > 2) {
      const lastItem = galleryItems[galleryItems.length - 1];
      const lastItemPosition = lastItem.offsetTop + lastItem.offsetHeight;
      const windowHeight = window.innerHeight;

      // If the last item is below the fold, scroll to it
      if (lastItemPosition > scrollTop && lastItemPosition < scrollTop + windowHeight) {
        window.scrollTo({
          top: lastItemPosition,
          behavior: 'smooth'
        });
      }
    }
  }, 100);
}
});
   
const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = galleryItems;

document.querySelector('.gallery-item').innerText = largeImageURL;
document.querySelector('.gallery__image').innerText = webformatURL;
document.querySelector('.gallery__image').innerText = tags;

document.querySelector('.info-counter:first-child').innerText += likes;
document.querySelector('.info-counter:nth-child(2)').innerText += views;
document.querySelector('.info-counter:nth-child(3)').innerText += comments;
document.querySelector('.info-counter:last-child').innerText += downloads;

return galleryItems;}

async function onLoadMoreBtnClick() {
  hideLoadBtn();
  await ImagesFetcher.getRequest();
  const pageMarkup = markupBuilder(data);
  renderGallery(pageMarkup);
  if (ImagesFetcher.page === ImagesFetcher.totalPage) { 
    Notify.info("We're sorry, but you've reached the end of search results.");}
  else {
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    ImagesFetcher.page += 1;  
    showLoadMoreBtn();
    showCloseBtn();
  }     
} 

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

window.addEventListener('scroll',function(e){
  var scrollTop = window.pageYOffset
  var distanseToDownLine = galleryItems.height - scrollTop - galleryItems.clientHeight
  if(distanseToDownLine < 300){
    galleryItems.add()
  }
},false)
  // window.addEventListener('load', fadeEffect);
});

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
  loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
}

function showCloseBtn() {
  closeBtn.style.display = 'block';
  closeBtn.addEventListener('click', onLoadMoreBtnClick); 
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
  loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
 
}

function hideCloseBtn() {
  closeBtn.style.display = 'none';
  closeBtn.removeEventListener('click', onLoadMoreBtnClick);
}

function clearMarkup() {
  page = 1;
  gallery.innerHTML = '';
  hideCloseBtn();
  hideLoadMoreBtn();
}
  