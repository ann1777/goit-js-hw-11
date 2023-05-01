import axios from 'axios';

// Fetch images from Pixabay API using Axios

export default class ImgsFetcher {
    #BASE_URL = 'https://pixabay.com/api/';
    #KEY = '35889696-234245940e7cec3ffc17b1751';
    constructor() {
        this.query = '';
        this.page = 1;
        this.per_page = 40;
        this.totalPage = 1;
    }
    async getRequest() {
        const parametrs = {
          key: this.#KEY,
          q: this.query,
          page: this.page,
          per_page: this.per_page,
        }
    const response = await axios.get(this.#BASE_URL, { params: parametrs });

    if (response.data.total === 0) {Notify.failure("Sorry, there are no images matching your search query. Please try again.");} 

    this.totalPage = Math.ceil(response.data.total / this.per_page);  

    return response.data.hits;
    };
}