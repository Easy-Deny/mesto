export class Api {
    constructor(config) {
        this.url = config.url
        this.headers = config.headers
    }

    getAllElements() {
        return fetch(this.url, {
            method: 'GET',
            headers: this.headers,
        })
            .then((res) => { return res.json() })
    }
    addElement(data) {
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => {
                if (res.ok) {
                    //console.log(data);
                    return res.json()
                };
                return Promise.reject('произошла ошибка');
            })
    }
    
    deleteElement(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    //console.log(data);
                    return res.json()
                };
                return Promise.reject('произошла ошибка');
            })
    }
}