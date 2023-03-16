
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
        this._initialArray.forEach(item => {
          this._element = this._renderer(item);
          });
      }
    addItem(element) {
        this._container.prepend(element);
    };
}
