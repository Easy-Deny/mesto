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
        

    }


    _getInputValues(){
        //this._addPopupFormName = this._popup.querySelector('.popup__text_type_name');
        //this._addPopupFormDescription = this._popup.querySelector('.popup__text_type_description');
        //this.name = this._addPopupFormName.value;
        //this.description = this._addPopupFormDescription.value;
        this.name = this._popup.querySelector('.popup__text_type_name').value;
        this.description = this._popup.querySelector('.popup__text_type_description').value;
        this.item = {
            name: this._popup.querySelector('.popup__text_type_name').value,
            description: this._popup.querySelector('.popup__text_type_description').value
        }  
        return this.item;
    }
    setEventListeners(){
        this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains(openedPopupSelector)) {
            this.closePopup()
        }
        if (evt.target.classList.contains('popup__close-button')) {
            this.closePopup();
        }
    });

    //console.log(this._getInputValues());
    //console.log(this._addCardForm);
    this._addCardForm.addEventListener('submit', (evt)=>{
        evt.preventDefault();
        //this.func=this._getInputValues();
        //console.log(this.func);
       this._submitForm(this._getInputValues());
    });
}


}