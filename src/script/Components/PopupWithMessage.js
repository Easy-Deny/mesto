import { Popup } from "./Popup.js";

export class PopupWithMessage extends Popup {
    constructor(popupSelector, buttonSelector) {
        super(popupSelector);
        this.setEventListeners = this.setEventListeners.bind(this);
        this._saveButton = this._popup.querySelector(buttonSelector);
    }
    setEventListeners() {
        super.setEventListeners();
        this._saveButton.addEventListener('click', this._onSubmit.bind(this));
    }
    setSubmitAction(action) {
        this._submitAction = action;
    }
    _onSubmit(){
        if (this._submitAction)
            this._submitAction();
     }
}