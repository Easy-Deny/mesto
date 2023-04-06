import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector, escKeyCode,  openedPopupSelector  ) {
        super(popupSelector, escKeyCode, openedPopupSelector );
        //this._openedPopupSelector = openedPopupSelector;
        this.popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
        this._popupImg = this._popup.querySelector(`.${this.popupSelector}__img`);
        this._popupText = this._popup.querySelector(`.${this.popupSelector}__name`)
    }
    openPopup(data) {
        this._popupImg.src = data.src;
        this._popupImg.alt = data.alt;
        this._popupText.textContent = data.alt;
        super.openPopup();
    }
}