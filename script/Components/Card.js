import { openPopup, photoPopupElement,photoPopupElementImg, photoPopupElementName } from "../index.js";

class Card {
    constructor(cardName, cardLink, tempElementSelector) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._tempElementSelector = tempElementSelector;
        this._photoPopupElementImg = photoPopupElementImg;
        this._photoPopupElementName = photoPopupElementName;
    }
    _createEmptyCard(element) {
        this._tempElement = document.querySelector(element).content;
        this._createdCard = this._tempElement.querySelector('.element').cloneNode(true);
    }
    _fillEmptyCard(createdCard) {
        this._createdCardImg = createdCard.querySelector('.element__img');
        createdCard.querySelector('.element__name').textContent = this._cardName;
        this._createdCardImg.src = this._cardLink;
        this._createdCardImg.alt = this._cardName;
    }
    _addEventListeners(element, func) {
        this._createdCard.querySelector(element).addEventListener('click', (evt) => {
            func(evt);
        });
    }
    _addReaction(evt) {
        evt.target.classList.toggle('element__like-button_is-liked')
    }
    _deleteCard(evt) {
        evt.target.closest('.element').remove();
    }
    _openPreviewPicture(evt) {
        photoPopupElementImg.src = evt.target.src;
        photoPopupElementName.textContent = evt.target.alt;
        photoPopupElementImg.alt = evt.target.alt;
        openPopup(photoPopupElement);
    }
    _setEventListeners() {
        this._addEventListeners('.element__like-button', this._addReaction);
        this._addEventListeners('.element__delete-button', this._deleteCard);
        this._addEventListeners('.element__img', this._openPreviewPicture);
    }
    createCard() {
        this._createEmptyCard(this._tempElementSelector);
        this._fillEmptyCard(this._createdCard);
        this._setEventListeners();
        return this._createdCard;
    }
}
export { Card };