
export default class Section{
    constructor({data,renderer},containerSelector){
        this._initialArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    _clear() {
      this._container.innerHTML = '';
    }
    createSection() {
      //this._clear();
        this._initialArray.forEach(item => {
          this._element = this._renderer(item);
          //this._container.prepend(this._element);
          //console.log(this._element);
          });
      }
    addItem(element) {
      console.log(element);
      console.log(this._container);
        this._container.prepend(element);
    };
}
