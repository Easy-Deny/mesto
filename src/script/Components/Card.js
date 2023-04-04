class Card {
    constructor(cardName, cardLink, ownerId, cardId, likes, tempElementSelector, handleCardClick, currentUserId, api, toggleButtonTextLoader, formEditProfile, messagePopup) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._ownerId = ownerId;
        this._currentUserId = currentUserId;
        this._tempElementSelector = tempElementSelector;
        this._handleCardClick = handleCardClick;
        this._api = api;
        this._cardId = cardId;
        this._likes = likes;
        this._deleteCard = this._deleteCard.bind(this);
        this._addReaction = this._addReaction.bind(this);
        //this._isLiked = this._isLiked.bind(this);
        this.createCard = this.createCard.bind(this);
        this.toggleButtonTextLoader = toggleButtonTextLoader;
        this.formEditProfile = formEditProfile;
        this.messagePopup = messagePopup;
        this.openPopupWithMessage = this.openPopupWithMessage.bind(this);
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
        //console.log(this._cardId);
        //console.log(this._currentUserId);
        if ((this._currentUserId != this._ownerId) && (this._cardId != undefined)) {
            // console.log('true');
            createdCard.querySelector('.element__delete-button').style.visibility = 'hidden';
        }
        /*   this._likes.forEach(element => {
              if (element._id === this._currentUserId){
              //console.log(element);
              this._likeButton.classList.toggle('element__like-button_is-liked')
              } 
          }); */

        if (this._isLiked()) {
            this._likeButton.classList.toggle('element__like-button_is-liked')
        }
        return this._likeCounter
    }
    _isLiked() {
        this._liked = this._likes.some(element => {
            //console.log(`${element._id} === ${this._currentUserId}`)
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
        if (!this._isLiked()) {
            this._api.addLike(this._cardId)
                .then((data) => {
                    this._likeCounter.textContent = data.likes.length;
                    this._likes = data.likes;
                    console.log(this._likeCounter);
                }
                )
                .then(() => {
                    this._toggleLikeButton(evt);
                    //console.log('like');
                })
                .catch((err) => console.log(`не удалось поставить лайк ${err}`));
        } else {
            this._api.deleteLike(this._cardId)
                .then((data) => {
                    this._likeCounter.textContent = data.likes.length;
                    this._likes = data.likes
                    console.log(this._likeCounter.textContent);
                }
                )
                .then(() => {
                    this._toggleLikeButton(evt);
                    //console.log('dislike');
                })
                .catch((err) => console.log(`не удалось снять лайк ${err}`));
        }
    }
    openPopupWithMessage(){
        this.messagePopup.openPopup();
        this. _deleteCard();
    }
    _deleteCard(evt) {
            this._api.deleteElement(this._cardId)
            .then(() => { evt.target.closest('.element').remove() })
            .catch((err) => console.log('не удалось удалить карточку'));
    }
    _setEventListeners() {
        this._addEventListeners('.element__like-button', this._addReaction);
        //this._addEventListeners('.element__delete-button', this.openPopupWithMessage);
        this._addEventListeners('.element__delete-button', this. _deleteCard);
        this._addEventListeners('.element__img', (evt) => { this._handleCardClick(evt) });
    }
    createCard() {
        this._createEmptyCard(this._tempElementSelector);
        this._fillEmptyCard(this._createdCard);
        this._setEventListeners();
        return this._createdCard;

    }
    saveCard() {
        this._api.addElement({
            name: this._cardName,
            link: this._cardLink
        })
            .then((data) => {
                this.toggleButtonTextLoader(this.formEditProfile, 'Сохранение...')
                return data
            })
            .then((data) => {
                this._cardId = data._id
                this._ownerId = data.ownerId
                this._likes = data.likes
                this._currentUserId = data.owner._id

            })
            .then(() => { return this.createCard() })

            .then(() => { this.toggleButtonTextLoader(this.formEditProfile, 'Сохранить') })
            .catch((err) => { console.log(`Ошибка загрузки карты на сервер ${err}`) })
    }
}
export { Card };