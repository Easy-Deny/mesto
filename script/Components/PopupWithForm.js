import { Popup } from "./Popup.js";
import { openedPopupSelector } from "../Utils/constants.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm, data) {
        super(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
        this._popupSelector = popupSelector;
        this._submitForm = submitForm;
        this.openPopup = this.openPopup.bind(this);
        this._popup = document.querySelector(`.${popupSelector}`);
        this._addCardForm = this._popup.querySelector('.popup__content');
        this._getInputValues = this._getInputValues.bind(this);

    }


    _getInputValues() {
        this.item = {
            name: this._popup.querySelector('.popup__text_type_name').value,
            description: this._popup.querySelector('.popup__text_type_description').value
        }
        return this.item;
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(openedPopupSelector)) {
                this.closePopup()
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.closePopup();
            }
        });
        this._addCardForm.addEventListener('submit', this._submit)
    }
    closePopup() {
        this._popup.classList.remove(openedPopupSelector);
        document.removeEventListener('keydown', this._handleEscClose);
        this._addCardForm.removeEventListener('submit', this._submit);
        this._addCardForm.reset();
    }
    _submit(evt) {
        console.log('push');
        evt.preventDefault();
        this._submitForm(this._getInputValues());
    }
}