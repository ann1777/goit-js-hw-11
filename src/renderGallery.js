/* export function renderGallery(name) {
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
  } */