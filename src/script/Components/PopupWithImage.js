import {Popup} from "./Popup.js";
import { openedPopupSelector } from "../Utils/constants.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this.popupSelector  = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }
    openPopup(data) {
        this._popup = document.querySelector(`.${this.popupSelector}`);
        this._popupImg = this._popup.querySelector(`.${this.popupSelector}__img`);
        this._popupText = this._popup.querySelector(`.${this.popupSelector}__name`)
        this._popupImg.src = data.src;
        this._popupImg.alt = data.alt;
        this._popupText.textContent = data.alt;
        this._popup.classList.add(openedPopupSelector);
        document.addEventListener('keydown', this._handleEscClose);
        this.setEventListeners();
    }
}