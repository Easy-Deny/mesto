import {Popup} from "./Popup.js";
import { openedPopupSelector } from "../Utils/constants.js";

export class PopupWithImage extends Popup{
    constructor(data, popupSelector){
        super(popupSelector);
        this._image = data.src;
        this._alt = data.alt;
        this.popupSelector  = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    openPopup() {
        //console.log(this);
       //console.log(this.popupSelector);
        this._popup = document.querySelector(`.${this.popupSelector}`);
       // console.log(this._popup);
       // console.log(this._popup.querySelector('.popup-photo__img'));
        this._popupImg = this._popup.querySelector(`.${this.popupSelector}__img`);
        this._popupText = this._popup.querySelector(`.${this.popupSelector}__name`)
        this._popupImg.src = this._image;
        this._popupImg.alt = this._alt;
        this._popupText.textContent = this._alt;
        this._popup.classList.add(openedPopupSelector);
        document.addEventListener('keydown', this._handleEscClose);
        this.setEventListeners();
    }
}