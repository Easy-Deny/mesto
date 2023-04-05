import '../pages/index.css';
import { Card } from './Components/Card.js';
import { FormValidator } from './Components/FormValidator.js';
import Section from './Components/Section.js';
import { PopupWithForm } from './Components/PopupWithForm.js';
import UserInfo from './Components/UserInfo.js';
import { PopupWithImage } from './Components/PopupWithImage';
import { photoPopupSelector, validationConfig, editAvatarPopupSelector, messagePopupSelector, tempElementSelector, addCardPopupSelector, editProfilePopupSelector, cardContainer, escKeyCode, openedPopupSelector, saveButtonSelector } from "./Utils/constants.js";
import { Api } from './Components/Api.js';
import { PopupWithMessage } from './Components/PopupWithMessage.js';
import { toggleButtonTextLoader } from './Utils/utils.js';

const formEditProfile = document.forms['form-profile'];
const editPopupOpenButtonElement = document.querySelector('.profile__edit-button');
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const formAddCard = document.forms['form-content'];
const formEditAvatar = document.forms['form-avatar'];
const messageForm = document.querySelector('.popup_type_message')
const photoPopupElement = document.querySelector('.popup-photo');
const photoPopupElementImg = photoPopupElement.querySelector('.popup-photo__img');
const photoPopupElementName = photoPopupElement.querySelector('.popup-photo__name');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const editFormValidation = new FormValidator(validationConfig, formEditProfile);
const addFormValidation = new FormValidator(validationConfig, formAddCard);
const editAvatarFormValidation = new FormValidator(validationConfig, formEditAvatar);
const userName = formEditProfile.querySelector('.popup__text_type_name');
const userDescription = formEditProfile.querySelector('.popup__text_type_description');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const initialCards = [];
let currentUser = {};
let newSection = {};

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        'content-type': 'application/json',
        authorization: '8fe21241-d4e3-40e9-bdfb-586c0b845bc2'
    }
})
function refreshUserInfo() {
    const userProfile = api.getAllElements();
    userProfile.then((data) => {
        currentUser = data;
        profileInfo.setUserInfo(data.name, data.about)
        profileAvatar.src = currentUser.avatar;
    })
        .then(refreshCards())
        .catch((err) => { console.log(`не загрузить данные профиля, Ошибка: ${err}`) })
}
function refreshCards() {
    const cards = api.getAllCards();
    cards.then((data) => {
        data.map(item => {
            initialCards.push({ name: item.name, description: item.link, ownerId: item.owner._id, likes: item.likes, id: item._id });
        });
    })
        .then(() => {
            newSection = new Section({
                data: initialCards, renderer: (item) => {
                    newSection.addItem(createCard(item).createCard());
                }
            },
                cardContainer);
        })
        .then(() => { newSection.createSection() })
    console.log(initialCards)
}

refreshUserInfo();
editFormValidation.enableValidation();
addFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();

const imagePreview = new PopupWithImage(photoPopupSelector, escKeyCode, openedPopupSelector);
imagePreview.setEventListeners();
function handleCardClick(evt) {
    const data = evt.target;
    imagePreview.openPopup(data);
}
const profileInfo = new UserInfo(profileName, profileDescription);
const editProfilePopup = new PopupWithForm(editProfilePopupSelector, escKeyCode, openedPopupSelector, validationConfig, (user) => {
    toggleButtonTextLoader(formEditProfile, 'Сохранение.....')
    api.editProfile(user)
        .then(() => { profileInfo.setUserInfo(user.name, user.description) })
        .then(() => { editProfilePopup.closePopup() })
        .then(() => { toggleButtonTextLoader(formEditProfile, 'Сохранить') })
        .catch((err) => { console.log(`не удалось сохранить новый профиль, Ошибка: ${err}`) })
})
editProfilePopup.setEventListeners();
const openEditProfileForm = function () {
    const userInfo = profileInfo.getUserInfo();
    userName.value = userInfo.name;
    userDescription.value = userInfo.description;
    editFormValidation.resetValidation();
    editProfilePopup.openPopup();
}
/* function handleAddLike(cardId, likeCounter, likes, toggleLikeButton,evt) {
    api.addLike(cardId)
        .then((data) => {
            likeCounter.textContent = data.likes.length;
            likes = data.likes;
            console.log(likeCounter);
            return data.likes;
        })
        .then(() => { toggleLikeButton(evt) })
        .catch((err) => console.log(`не удалось поставить лайк ${err}`));
}
function handDeleteLike(cardId, likeCounter, likes, toggleLikeButton,evt) {
    api.deleteLike(cardId)
        .then((data) => {
            likeCounter.textContent = data.likes.length;
            likes = data.likes
            console.log(likeCounter.textContent);
        }
        )
        .then(() => {toggleLikeButton(evt)})
        .catch((err) => console.log(`не удалось снять лайк ${err}`));
} */
function createCard(item) {
    const cardElement = new Card(
        item.name,
        item.description,
        item.ownerId,
        item.id,
        item.likes,
        tempElementSelector,
        handleCardClick,
        currentUser._id,
        api,
        toggleButtonTextLoader,
        formEditProfile,
        messagePopup,
        //deleteCard
        (item, evt) => {
            messagePopup.openPopup();
            messagePopup.removeEventListener();
            messagePopup.setSubmitAction(() => {
                toggleButtonTextLoader(messageForm, 'Удаление...')
                api.deleteElement(item)
                    .then(() => console.log(`карта id${item} удалена`))
                    .then(() => { evt.target.closest('.element').remove() })
                    .then(() => messagePopup.closePopup())
                    .then(() => toggleButtonTextLoader(messageForm, 'Да'))
                    .catch((err) => console.log(`не удалось удалить карточку. Ошибка: ${err}`));
            })
            messagePopup.addEventListener();
        },
        // handleAddLike,
        (cardId, likeCounter, likes, toggleLikeButton, evt) => {
            api.addLike(cardId)
                .then((data) => {
                    likeCounter.textContent = data.likes.length;
                    likes = data.likes;
                    cardElement.getLikes(data.likes);
                })
                .then(() => { toggleLikeButton(evt) })
                .catch((err) => console.log(`не удалось поставить лайк ${err}`));
        },
        // handDeleteLike,
        (cardId, likeCounter, likes, toggleLikeButton, evt) => {
            api.deleteLike(cardId)
                .then((data) => {
                    likeCounter.textContent = data.likes.length;
                    likes = data.likes
                    cardElement.getLikes(data.likes);
                }
                )
                .then(() => { toggleLikeButton(evt) })
                .catch((err) => console.log(`не удалось снять лайк ${err}`));
        }
    )
    return cardElement
}
const addCardPopup = new PopupWithForm(addCardPopupSelector, escKeyCode, openedPopupSelector, validationConfig, (item) => {
    const newCard = createCard(item);
    newCard.saveCard();
    newSection.addItem(newCard.createCard());
    addCardPopup.closePopup();
})
addCardPopup.setEventListeners();
const openAddCardForm = function () {
    addFormValidation.resetValidation();
    addCardPopup.openPopup();
}
const editAvatarPopup = new PopupWithForm(editAvatarPopupSelector, escKeyCode, openedPopupSelector, validationConfig, (user) => {
    toggleButtonTextLoader(formEditAvatar, 'Сохранение.....')
    api.editAvatar(user.description)
        .then((data) => { profileAvatar.src = data.avatar })
        .then(() => editAvatarPopup.closePopup())
        .then(() => { toggleButtonTextLoader(formEditAvatar, 'Сохранить') })
        .catch((err) => { console.log(`не удалось сохранить новый аватар, Ошибка: ${err}`) })
})
editAvatarPopup.setEventListeners();

const openAvatarForm = function () {
    editAvatarPopup.openPopup();
    editAvatarFormValidation.resetValidation();
}
const messagePopup = new PopupWithMessage(messagePopupSelector, escKeyCode, openedPopupSelector, saveButtonSelector, () => {
    console.log('work')
    //cardElement._deleteCard
})
messagePopup.setEventListeners()
editPopupOpenButtonElement.addEventListener('click', openEditProfileForm);
addPopupOpenButtonElement.addEventListener('click', openAddCardForm);
editAvatarButton.addEventListener('click', openAvatarForm);
export { photoPopupElementImg, photoPopupElementName };


