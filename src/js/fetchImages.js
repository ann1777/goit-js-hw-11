'use strict';
import axios from 'axios';

// Fetch images from Pixabay API using Axios

export default class ImagesFetcher {
    #BASE_URL = 'https://pixabay.com/api/';
    #KEY = '35889696-234245940e7cec3ffc17b1751';
    constructor() {
        this.query = '';
        this.page = null;
        this.per_page = 40;
        this.totalPage = 1;
    }
    async getRequest() {
        const searchParams = {
          key: this.#KEY,
          q: this.query,
          page: this.page,
          per_page: this.per_page,
          image_type: 'photo',
          orientation: 'portrait',
          safesearch: true,
        }
    const response = await axios.get(this.#BASE_URL, { params: searchParams });

    if (response.data.total === 0) {Notify.failure("Sorry, there are no images matching your search query. Please try again.");} 

    this.totalPage = Math.ceil(response.data.total / this.per_page);  

    const data = response.data.hits;
    console.log(data);
    return data;
    };

    /* getRandomPhotos() {
      const searchParams = {
        query: 'random',
        page: this.page,
        per_page: this.per_page,
        orientation: 'portrait',
        client_id: this.#KEY,
      };
      return axios.get(`${this.#BASE_URL}/hits`, { params: searchParams });
    } */
}