export class PostsService {

    constructor(url) {
        this.url = url;
    }

    async list() {
        const response = await fetch(this.url);
        return response.json();
    }


}
