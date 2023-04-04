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
        .then((res) => {
            if (res.ok) {
                //console.log(data);
                return res.json()
            };
            return Promise.reject('произошла ошибка');
        })
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
    editProfile(data) {
        return fetch(this.url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description
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

    addLike(id) {
        return fetch(`${this.url}/${id}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                };
                return Promise.reject('произошла ошибка постановки лайка');
            })
    }

    deleteLike(id) {
        return fetch(`${this.url}/${id}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                };
                return Promise.reject('произошла ошибка снятия лайка');
            })
    }

    editAvatar(data){
        //console.log(data);
        return fetch(`${this.url}/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data
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
}