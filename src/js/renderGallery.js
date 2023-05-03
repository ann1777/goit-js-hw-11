const gallery = document.querySelector('.gallery');
 export function renderGallery(data) {
    const markup = data.hits.map(el => {
        return `<div class="photo-card">
  
          <a class="gallery__item" href="${el.largeImageURL}">
            <img
              class="gallery__image"
              src="${el.previewURL}"
              alt="${el.tags}"
              loading="lazy"
          /></a>
  
          <div class="info">
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">thumb_up</b>
              </p>
              <p class="info-counter">${el.likes.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">visibility</b>
              </p>
              <p class="info-counter">${el.views.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">forum</b>
              </p>
              <p class="info-counter">${el.comments.toLocaleString()}</p>
            </div>
  
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">download</b>
              </p>
              <p class="info-counter">${el.downloads.toLocaleString()}</p>
            </div>
  
          </div>
        </div>`;
      })
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    // console.log(gallery);
    // console.log(markup);
  } 