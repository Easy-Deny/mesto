import '../pages/index.css';
import { Card } from './Components/Card.js';
import { FormValidator } from './Components/FormValidator.js';
import Section from './Components/Section.js';
import { PopupWithForm } from './Components/PopupWithForm.js';
import UserInfo from './Components/UserInfo.js';
import { PopupWithImage } from './Components/PopupWithImage';
import { photoPopupSelector, validationConfig, editAvatarPopupSelector, messagePopupSelector, tempElementSelector, addCardPopupSelector, editProfilePopupSelector, cardContainer, escKeyCode, openedPopupSelector } from "./Utils/constants.js";
import { Api } from './Components/Api.js';
//import { PopupWithMessage } from './Components/PopupWithMessage';
const formEditProfile = document.forms['form-profile'];
const editPopupOpenButtonElement = document.querySelector('.profile__edit-button');
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const formAddCard = document.forms['form-content'];
const formEditAvatar = document.forms['form-avatar'];


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
const userApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-62/users/me',
    headers: {
        'content-type': 'application/json',
        authorization: '8fe21241-d4e3-40e9-bdfb-586c0b845bc2'
    }
})
const cardApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-62/cards',
    headers: {
        'content-type': 'application/json',
        authorization: '8fe21241-d4e3-40e9-bdfb-586c0b845bc2'
    }
})

function refreshUserInfo() {
    const userProfile = userApi.getAllElements();
    userProfile.then((data) => {
        currentUser = data;
        profileName.textContent = currentUser.name;
        profileDescription.textContent = currentUser.about;
        profileAvatar.src = currentUser.avatar;
    });
    userProfile.then(refreshCards());
}

function refreshCards() {
    const cards = cardApi.getAllElements();
    cards.then((data) => {
        data.map(item => {
            initialCards.push({ name: item.name, description: item.link, ownerId: item.owner._id, likes: item.likes, id: item._id });
        });
    })
    cards.then(() => {
        newSection = new Section({
            data: initialCards, renderer: (item) => {
                newSection.addItem(createCard(item).createCard());
            }
        },
            cardContainer);
    })
    cards.then(() => { newSection.createSection() })
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
    userApi.editProfile(user)
        .then(() => { profileInfo.setUserInfo(user.name, user.description) })
        .then(() => { toggleButtonTextLoader(formEditProfile) })

    editProfilePopup.closePopup();
    editFormValidation.resetValidation();
})

//const messagePopup = new PopupWithMessage(messagePopupSelector, escKeyCode, openedPopupSelector, button, (event) => { })


editProfilePopup.setEventListeners();
const openEditProfileForm = function () {
    const userInfo = profileInfo.getUserInfo();
    userName.value = userInfo.name;
    userDescription.value = userInfo.description;
    editFormValidation.resetValidation();
    editProfilePopup.openPopup();
}
function createCard(item) {
    const cardElement = new Card(item.name, item.description, item.ownerId, item.id, item.likes, tempElementSelector, handleCardClick, currentUser._id, cardApi);
    return cardElement
}

const addCardPopup = new PopupWithForm(addCardPopupSelector, escKeyCode, openedPopupSelector, validationConfig, (item) => {
    const newCard = createCard(item);
    const data = newCard.saveCard();
    newSection.addItem(newCard.createCard());
    addCardPopup.closePopup();
})
addCardPopup.setEventListeners();
const openAddCardForm = function () {
    addFormValidation.resetValidation();
    addCardPopup.openPopup();
}

function toggleButtonTextLoader(formName) {
    const button = formName.querySelector('.popup__save-button');
    if (button.textContent = 'Cохранить') {
        button.textContent = 'Cохранение...';
    } else { button.textContent = 'Cохранить' }
}

const editAvatarPopup = new PopupWithForm(editAvatarPopupSelector, escKeyCode, openedPopupSelector, validationConfig, (user) => {
    userApi.editAvatar(user.description)
        .then((data) => { profileAvatar.src = data.avatar })
        .then(() => { toggleButtonTextLoader(formEditAvatar) })
        .then(() => editAvatarPopup.closePopup())
})
editAvatarPopup.setEventListeners();

const openAvatarForm = function () {
    editAvatarPopup.openPopup();
    editAvatarFormValidation.resetValidation();
}

editPopupOpenButtonElement.addEventListener('click', openEditProfileForm);
addPopupOpenButtonElement.addEventListener('click', openAddCardForm);
editAvatarButton.addEventListener('click', openAvatarForm);


export { photoPopupElementImg, photoPopupElementName };


