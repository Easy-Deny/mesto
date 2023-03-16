import { escKeyCode,openedPopupSelector } from "../Utils/constants.js";
import { addFormValidation } from "../index.js";

export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(`.${popupSelector}`);
        //this.__handleEscClose = this.__handleEscClose.bind(this)
    }
    openPopup() {
        this._popup.classList.add(openedPopupSelector);
        document.addEventListener('keydown', this._handleEscClose);
        //document.forms.forEach((form) => {form.reset()});
        addFormValidation.resetValidation();

    }
    closePopup() {
        // console.log('CLOSE');
        this._popup.classList.remove(openedPopupSelector);
        document.removeEventListener('keydown', this._handleEscClose);

    }
    _handleEscClose(evt) {
        if (evt.keyCode === escKeyCode) {
            this._openedPopup = document.querySelector(`.${openedPopupSelector}`);
            if (this._openedPopup !== null) {
                //console.log(this);
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