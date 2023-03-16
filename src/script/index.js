import '../pages/index.css';
import { Card } from './Components/Card.js';
import { FormValidator } from './Components/FormValidator.js';
import { initialCards } from './Utils/constants.js';
import Section from './Components/Section.js';
import { PopupWithForm } from './Components/PopupWithForm.js';
import UserInfo from './Components/UserInfo.js';


const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms['form-profile'];
const editPopupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const formAddCard = document.forms['form-content'];
const photoPopupElement = document.querySelector('.popup-photo');
const photoPopupElementImg = photoPopupElement.querySelector('.popup-photo__img');
const photoPopupElementName = photoPopupElement.querySelector('.popup-photo__name');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
const tempElementSelector = '.temp-element';
const validationConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active',
    errorMessageClass: '.popup__text-error'
};
const editFormValidation = new FormValidator(validationConfig, formEditProfile);
const addFormValidation = new FormValidator(validationConfig, formAddCard);
const addCardPopupSelector = 'popup_type_add-card';
const editProfilePopupSelector = 'popup_type_edit-profile';
const userName = formEditProfile.querySelector('.popup__text_type_name');
const userInfo = formEditProfile.querySelector('.popup__text_type_description');
editFormValidation.enableValidation();
addFormValidation.enableValidation();

const openEditProfileForm = function () {
    const editProfilePopup = new PopupWithForm(editProfilePopupSelector, (item)=>{
        const profileInfo =  new UserInfo(item.name, item.description).setUserInfo(); 
        editProfilePopup.closePopup();
        const a = profileInfo.getUserInfo();
    } )
    userName.value = profileName.textContent;
    userInfo.value = profileDescription.textContent;
    editProfilePopup.openPopup();
    editProfilePopup.setEventListeners();
}
const openAddCardForm = function () {
const addCardPopup = new PopupWithForm(addCardPopupSelector, (item)=>{
    const card =  new Card(item.name, item.description, tempElementSelector).createCard();
    newSection.addItem(card);
    addCardPopup.closePopup();
} )
addCardPopup.openPopup();
addCardPopup.setEventListeners();
}
    const cardContainer = '.elements';
const newSection = new Section({data:initialCards,renderer: (item)=>{
   const card =  new Card(item.name, item.link, tempElementSelector).createCard();
    newSection.addItem(card);
}},
cardContainer);
newSection.createSection();
editPopupOpenButtonElement.addEventListener('click', openEditProfileForm);
addPopupOpenButtonElement.addEventListener('click', openAddCardForm)

export {photoPopupElementImg, photoPopupElementName };


