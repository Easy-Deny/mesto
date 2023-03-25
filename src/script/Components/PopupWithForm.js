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
        this._validationConfig = validationConfig;
        this._addCardForm = this._popup.querySelector(this._validationConfig.formSelector);
        this._submit = this._submit.bind(this);
        this.submitButton = this._popup.querySelector(this._validationConfig.submitButtonSelector);
    }
    
    _getInputValues() {
        this._item={};
        this._inputList = this._popup.querySelectorAll('.popup__text');
        this._inputList.forEach((input) => {
        this._item[((input.name).slice(5)).toLowerCase()]= input.value
        })
        return this._item;
    }
    setEventListeners() {
super.setEventListeners();
        this._addCardForm.addEventListener('submit', this._submit)
    }
    closePopup() {
        super.closePopup();
        this._addCardForm.reset();

    }
    _submit(evt) {
        if (!this.submitButton.classList.contains(this._validationConfig.inactiveButtonClass)) {
        evt.preventDefault();
        this._submitForm(this._getInputValues());
        this.submitButton.classList.add(this._validationConfig.inactiveButtonClass);}
    }
}