import { escKeyCode,openedPopupSelector } from "../Utils/constants.js";
export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(`.${popupSelector}`);
    }
    openPopup() {
        this._popup.classList.add(openedPopupSelector);
        document.addEventListener('keydown', this._handleEscClose);
    }
    closePopup() {
        this._popup.classList.remove(openedPopupSelector);
        document.removeEventListener('keydown', this._handleEscClose);

    }
    _handleEscClose(evt) {
        if (evt.keyCode === escKeyCode) {
            this._openedPopup = document.querySelector(`.${openedPopupSelector}`);
            if (this._openedPopup !== null) {
                this.closePopup();
            }
        }
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(openedPopupSelector)) {
                this.closePopup()
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.closePopup();
            }
        })
    }
}