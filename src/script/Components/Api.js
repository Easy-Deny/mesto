export class Api {
    constructor(config){
        this.url = config.url
        this.headers = config.headers
    }

getAllCards(){
    return fetch(this.url,{
        method: 'GET',
        headers: this.headers,
    })
    .then((res)=> {return res.json()})
}

}