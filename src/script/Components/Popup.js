export class Popup {
    constructor(popupSelector, escKeyCode, openedPopupSelector) {
        this._popup = document.querySelector(`.${popupSelector}`);
        this._handleEscClose = this._handleEscClose.bind(this)
        this._escKeyCode = escKeyCode;
        this._openedPopupSelector = openedPopupSelector;
    }
    openPopup() {
        this._popup.classList.add(this._openedPopupSelector);
        document.addEventListener('keydown', this._handleEscClose);
    }
    closePopup() {
        this._popup.classList.remove(this._openedPopupSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(evt) {
        if (evt.keyCode === this._escKeyCode) {
            this.closePopup();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(this._openedPopupSelector)) {
                this.closePopup()
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.closePopup();
            }
        })
    }
}