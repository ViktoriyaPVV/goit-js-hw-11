import { searchImagesByQuery } from './js/pixabay-api.js';
import { createListMarkup } from './js/render-functions.js';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', handleSubmitBtn);

function handleSubmitBtn(event) {
  event.preventDefault();

  galleryList.innerHTML = '';
  loader.classList.remove('hidden');

  const form = event.currentTarget;
  const queryValue = form.elements.query.value.trim().toLowerCase();

  searchImagesByQuery(queryValue)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        loader.classList.add('hidden');
        return;
      }
      if (queryValue === '') {
        iziToast.error({
          position: 'topRight',
          message: 'Please fill the input',
        });
        loader.classList.add('hidden');
        return;
      } else {
        createListMarkup(data);
      }
      loader.classList.add('hidden');
    })
    .catch(onFetchError)
    .finally(() => form.reset());
}

function onFetchError(error) {
  galleryList.innerHTML = '';
  iziToast.error({
    position: 'topRight',
    message: `${error}`,
  });
}
