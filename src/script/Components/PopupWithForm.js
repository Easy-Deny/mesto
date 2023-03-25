import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector,escKeyCode,openedPopupSelector,validationConfig, submitForm) {
        super(popupSelector,escKeyCode,openedPopupSelector);
        this._openedPopupSelector = openedPopupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
        this._popupSelector = popupSelector;
        this._submitForm = submitForm;
        this.openPopup = this.openPopup.bind(this);
        this._popup = document.querySelector(`.${popupSelector}`);
        this._validationConfig = validationConfig;
        this._addCardForm = this._popup.querySelector(this._validationConfig.formSelector);
        this._submit = this._submit.bind(this);
        this.submitButton = this._popup.querySelector(this._validationConfig.submitButtonSelector);
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
            if (evt.target.classList.contains(this._openedPopupSelector)) {
                this.closePopup()
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.closePopup();
            }
        });
        this._addCardForm.addEventListener('submit', this._submit)
    }
    closePopup() {
        this._popup.classList.remove(this._openedPopupSelector);
        document.removeEventListener('keydown', this._handleEscClose);
        //this._addCardForm.removeEventListener('submit', this._submit);
        this._addCardForm.reset();
    }
    _submit(evt) {
        if (!this.submitButton.classList.contains(this._validationConfig.inactiveButtonClass)) {
        evt.preventDefault();
        this._submitForm(this._getInputValues());
        this.submitButton.classList.add(this._validationConfig.inactiveButtonClass);}
    }
}