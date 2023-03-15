import Popup from "./Popup";

export class PopupWithImage extends Popup{
    constructor(popupSelector,submitForm){
        this._popup = document.querySelector(popupSelector);
        
    }
}