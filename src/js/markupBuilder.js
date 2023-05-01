export default function markupBuilder(array) {
    const markupStrings = array.map(el => {
    return `<div class="photo-card">
    <img src="${el.previewURL
    }" alt="${el.tags}" loading="lazy" />
        <div class="gallery-item" href="${el.largeImageURL}>
        <img
            class="gallery__image"
            src="${el.webformatURL}"
            alt="${el.tags}"
            loading="lazy"
        /></div>

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
    </div>`
    })
    return markupStrings.join('')

}