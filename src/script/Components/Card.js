class Card {
    constructor(cardName, cardLink, ownerId, cardId, tempElementSelector, handleCardClick, currentUserId, api) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._ownerId = ownerId;
        this._currentUserId = currentUserId;
        this._tempElementSelector = tempElementSelector;
        this._handleCardClick = handleCardClick;
        this._api = api;
        this._cardId = cardId;
        //this._cardId = this._cardId.bind
        this.createCard = this.createCard.bind(this)
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
        //console.log(this._cardId);
        //console.log(this._currentUserId);
        if (this._currentUserId != this._ownerId) {
            // console.log('true');
            createdCard.querySelector('.element__delete-button').style.visibility = 'hidden';
        }
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
        console.log(this._cardId);
     //this._api.deleteElement(this._id);
        evt.target.closest('.element').remove();
    }
    _setEventListeners() {
        this._addEventListeners('.element__like-button', this._addReaction);
        this._addEventListeners('.element__delete-button',this._deleteCard);
        this._addEventListeners('.element__img', (evt) => { this._handleCardClick(evt) });
    }
    createCard() {
        this._createEmptyCard(this._tempElementSelector);
        this._fillEmptyCard(this._createdCard);
        this._setEventListeners();
        console.log(this._cardId);
        return this._createdCard;
        
    }
    saveCard() {
        this._api.addElement({
            name: this._cardName,
            link: this._cardLink
        })
            //.then((data)=>{return 'test 8)'})
            //newSection.addItem(newCard.saveCard());
            .then((data)=>{return this.createCard()})
            .catch((err)=>{console.log(`Ошибка загрузки карты на сервер${err}`)})
            
            
    }
}
export { Card };