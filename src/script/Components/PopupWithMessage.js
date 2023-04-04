import { Popup } from "./Popup.js";

export class PopupWithMessage extends Popup {
    constructor(popupSelector,escKeyCode,openedPopupSelector, buttonSelector, event){
    super(popupSelector,escKeyCode,openedPopupSelector);
    this.setEventListeners = this.setEventListeners.bind(this);
    this._event = event;
    //this._button = buttonSelector;
    this._saveButton = this._popup.querySelector(buttonSelector);
    }
setEventListeners() {
        super.setEventListeners();
        this._saveButton.addEventListener('click', this._event)
            }
}