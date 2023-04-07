import { Popup } from "./Popup.js";

export class PopupWithMessage extends Popup {
    constructor(popupSelector, buttonSelector) {
        super(popupSelector);
        this.setEventListeners = this.setEventListeners.bind(this);
        this._saveButton = this._popup.querySelector(buttonSelector);
    }
    setEventListeners() {
        super.setEventListeners();
        this._saveButton.addEventListener('click', this._submitAction);
    }
    addEventListener(){
        this._saveButton.addEventListener('click', this._submitAction);
    }
    removeEventListener(){
        this._saveButton.removeEventListener('click', this._submitAction);
    }
    setSubmitAction(action) {
        this._submitAction = action;
    }
   
}