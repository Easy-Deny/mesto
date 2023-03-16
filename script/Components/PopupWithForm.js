import {Popup} from "./Popup.js";
import { openedPopupSelector } from "../Utils/constants.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, submitForm, data){
        super(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
        this._popupSelector  = popupSelector;
        this._submitForm= submitForm;
        this.openPopup = this.openPopup.bind(this);
        this._popup = document.querySelector(`.${popupSelector}`);
        this._addCardForm = this._popup.querySelector('.popup__content');
        this._addPopupFormName = this._popup.querySelector('.popup__text_type_name');
        this._addPopupFormLink = this._popup.querySelector('.popup__text_type_description');

    }
   // _getInputValues(){}
    setEventListeners(){
        this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains(openedPopupSelector)) {
            this.closePopup()
        }
        if (evt.target.classList.contains('popup__close-button')) {
            this.closePopup();
        }
    });
    console.log(this._addCardForm);
    this._addCardForm.addEventListener('submit', ()=>{this._submitForm(this._addPopupFormName, this._addPopupFormLink)});
}


}