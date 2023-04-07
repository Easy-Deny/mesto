class Card {
    constructor(cardName, cardLink, ownerId, cardId, likes, tempElementSelector, handleCardClick, currentUserId, toggleButtonTextLoader, formEditProfile, messagePopup, handleDeleteIconClick, handleAddLike, handDeleteLike) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._ownerId = ownerId;
        this._currentUserId = currentUserId;
        this._tempElementSelector = tempElementSelector;
        this._handleCardClick = handleCardClick;
        this._cardId = cardId;
        this._likes = likes;
        this._addReaction = this._addReaction.bind(this);
        this.createCard = this.createCard.bind(this);
        this.toggleButtonTextLoader = toggleButtonTextLoader;
        this.formEditProfile = formEditProfile;
        this.messagePopup = messagePopup;
        this.handleDeleteIconClick = handleDeleteIconClick;
        this.handleAddLike = handleAddLike;
        this.handDeleteLike = handDeleteLike;
        this._toggleLikeButton = this._toggleLikeButton.bind(this);
        this._isLiked = this._isLiked.bind(this);
    }
    _createEmptyCard(element) {
        this._tempElement = document.querySelector(element).content;
        this._createdCard = this._tempElement.querySelector('.element').cloneNode(true);
    }
    _fillEmptyCard(createdCard) {
        this._createdCardImg = createdCard.querySelector('.element__img');
        this._likeCounter = createdCard.querySelector('.element__like-counter');
        this._likeButton = createdCard.querySelector('.element__like-button');
        createdCard.querySelector('.element__name').textContent = this._cardName;
        this._createdCardImg.src = this._cardLink;
        this._createdCardImg.alt = this._cardName;
        this._likeCounter.textContent = this._likes.length;
        if ((this._currentUserId != this._ownerId) && (this._cardId != undefined)) {
            createdCard.querySelector('.element__delete-button').style.visibility = 'hidden';
        }
        if (this._isLiked(this._likes)) {
            this._likeButton.classList.toggle('element__like-button_is-liked')
        }
        return this._likeCounter
    }
    getLikes(like) {
        this._likes = like;
    }
    _isLiked(like) {
        this._liked = like.some(element => {
            return (element._id === this._currentUserId)
        })
        return this._liked
    }
    _addEventListeners(element, func) {
        this._createdCard.querySelector(element).addEventListener('click', (evt) => {
            func(evt);
        });
    }
    _toggleLikeButton(evt) {
        evt.target.classList.toggle('element__like-button_is-liked')
    }
    _addReaction(evt) {
        if (!this._isLiked(this._likes)) {
            this.handleAddLike(this._cardId, this._likeCounter, this._likes, this._toggleLikeButton, evt)
            console.log('like');
        } else {
            this.handDeleteLike(this._cardId, this._likeCounter, this._likes, this._toggleLikeButton, evt)
            console.log('dislike');
        }
    }
    _setEventListeners() {
        this._addEventListeners('.element__like-button', this._addReaction);
        this._addEventListeners('.element__delete-button', (evt) => { this.handleDeleteIconClick(this._cardId, evt) });
        this._addEventListeners('.element__img', (evt) => { this._handleCardClick(evt) });
    }
    createCard() {
        this._createEmptyCard(this._tempElementSelector);
        this._fillEmptyCard(this._createdCard);
        this._setEventListeners();
        return this._createdCard;
    }
    refreshData(data) {
        this._cardId = data._id
        this._ownerId = data.ownerId
        this._likes = data.likes
        this._currentUserId = data.owner._id
    }
}
export { Card };