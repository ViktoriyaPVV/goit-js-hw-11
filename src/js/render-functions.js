import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createListMarkup(data) {
  const lightbox = new SimpleLightbox('.gallery-list a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

  const gallerylist = document.querySelector('.gallery-list');
  const images = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="card-item">
<a class="gallery-link"  href=${largeImageURL}>
<img class="gallery-image"
src=${webformatURL} alt=${tags} /></a>
   <div class="card-body">
     <p class="card-text">likes<span class="card-value"> ${likes}</span></p>
     <p class="card-text">views<span class="card-value"> ${views}</span></p>
     <p class="card-text">comments<span class="card-value"> ${comments}</span></p>
     <p class="card-text">downloads<span class="card-value"> ${downloads}</span></p>
</li>`
    )
    .join('');

  gallerylist.innerHTML = images;
  lightbox.refresh();
}
