import { Popup } from "./Popup.js";

export class PopupWithMessage extends Popup {
    constructor(popupSelector,escKeyCode,openedPopupSelector, button, event){
    super(popupSelector,escKeyCode,openedPopupSelector);
    this.setEventListeners = this.setEventListeners.bind(this);
    this._event = event;
    this._button = button;
    }
setEventListeners() {
        super.setEventListeners();
                this._button.addEventListener('click', this._event)
            }
}