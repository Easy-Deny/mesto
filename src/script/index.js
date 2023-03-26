import '../pages/index.css';
import { Card } from './Components/Card.js';
import { FormValidator } from './Components/FormValidator.js';
import Section from './Components/Section.js';
import { PopupWithForm } from './Components/PopupWithForm.js';
import UserInfo from './Components/UserInfo.js';
import { PopupWithImage } from './Components/PopupWithImage';
import { photoPopupSelector, validationConfig, initialCards, tempElementSelector, addCardPopupSelector, editProfilePopupSelector, cardContainer, escKeyCode, openedPopupSelector } from "./Utils/constants.js";
const formEditProfile = document.forms['form-profile'];
const editPopupOpenButtonElement = document.querySelector('.profile__edit-button');
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const formAddCard = document.forms['form-content'];
const photoPopupElement = document.querySelector('.popup-photo');
const photoPopupElementImg = photoPopupElement.querySelector('.popup-photo__img');
const photoPopupElementName = photoPopupElement.querySelector('.popup-photo__name');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editFormValidation = new FormValidator(validationConfig, formEditProfile);
const addFormValidation = new FormValidator(validationConfig, formAddCard);
const userName = formEditProfile.querySelector('.popup__text_type_name');
const userDescription = formEditProfile.querySelector('.popup__text_type_description');

editFormValidation.enableValidation();
addFormValidation.enableValidation();
const imagePreview = new PopupWithImage(photoPopupSelector, escKeyCode, openedPopupSelector);
imagePreview.setEventListeners();
function handleCardClick(evt) {
    const data = evt.target;
    imagePreview.openPopup(data);
}
const profileInfo = new UserInfo(profileName, profileDescription);
const editProfilePopup = new PopupWithForm(editProfilePopupSelector, escKeyCode, openedPopupSelector, validationConfig, (user) => {
    profileInfo.setUserInfo(user.name, user.description);
    editProfilePopup.closePopup();
    editFormValidation.resetValidation();
})
editProfilePopup.setEventListeners();
const openEditProfileForm = function () {
    const userInfo = profileInfo.getUserInfo();
    userName.value = userInfo.name;
    userDescription.value = userInfo.description;
    editFormValidation.resetValidation();
    editProfilePopup.openPopup();
}
function createCard(item) {
    const cardElement = new Card(item.name, item.description, tempElementSelector, handleCardClick).createCard();
    return cardElement
}

const addCardPopup = new PopupWithForm(addCardPopupSelector, escKeyCode, openedPopupSelector, validationConfig, (item) => {
    newSection.addItem(createCard(item));
    addCardPopup.closePopup();
})
addCardPopup.setEventListeners();
const openAddCardForm = function () {
    addFormValidation.resetValidation();
    addCardPopup.openPopup();
}
const newSection = new Section({
    data: initialCards, renderer: (item) => {
        newSection.addItem(createCard(item));
    }
},
    cardContainer);
newSection.createSection();
editPopupOpenButtonElement.addEventListener('click', openEditProfileForm);
addPopupOpenButtonElement.addEventListener('click', openAddCardForm)

export { photoPopupElementImg, photoPopupElementName };


