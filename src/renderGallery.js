const gallery = document.querySelector('.gallery');
 export function renderGallery(data) {
  // console.log(data);
    const markup = data.hits
      .map(hits => {
        return `<div class="photo-card">
  
          <a class="gallery-item" href="${hits.largeImageURL}">
            <img
              class="gallery__image"
              src="${hits.webformatURL}"
              alt="${hits.tags}"
              loading="lazy"
          /></a>
  
          <div class="info">
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">thumb_up</b>
              </p>
              <p class="info-counter">${hits.likes.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">visibility</b>
              </p>
              <p class="info-counter">${hits.views.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">forum</b>
              </p>
              <p class="info-counter">${hits.comments.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">download</b>
              </p>
              <p class="info-counter">${hits.downloads.toLocaleString()}</p>
            </div>
  
          </div>
        </div>`;
      })
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    // console.log(gallery);
    // console.log(markup);
  } 