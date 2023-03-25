import '../pages/index.css';
import { Card } from './Components/Card.js';
import { FormValidator } from './Components/FormValidator.js';
//import { initialCards } from './Utils/constants.js';
import Section from './Components/Section.js';
import { PopupWithForm } from './Components/PopupWithForm.js';
import UserInfo from './Components/UserInfo.js';
import { PopupWithImage } from './Components/PopupWithImage';
import { photoPopupSelector, validationConfig,initialCards,tempElementSelector,addCardPopupSelector,editProfilePopupSelector,cardContainer,escKeyCode,openedPopupSelector } from "./Utils/constants.js";

//const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms['form-profile'];
const editPopupOpenButtonElement = document.querySelector('.profile__edit-button');
//const popupAddCard = document.querySelector('.popup_type_add-card');
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const formAddCard = document.forms['form-content'];
const photoPopupElement = document.querySelector('.popup-photo');
const photoPopupElementImg = photoPopupElement.querySelector('.popup-photo__img');
const photoPopupElementName = photoPopupElement.querySelector('.popup-photo__name');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//const tempElementSelector = '.temp-element';

const editFormValidation = new FormValidator(validationConfig, formEditProfile);
const addFormValidation = new FormValidator(validationConfig, formAddCard);
//const addCardPopupSelector = 'popup_type_add-card';
//const editProfilePopupSelector = 'popup_type_edit-profile';
const userName = formEditProfile.querySelector('.popup__text_type_name');
const userDescription = formEditProfile.querySelector('.popup__text_type_description');
editFormValidation.enableValidation();
addFormValidation.enableValidation();

const imagePreview = new PopupWithImage(photoPopupSelector);
function handleCardClick(evt){
    const data  = evt.target;
    imagePreview.openPopup(data);
}
const profileInfo =  new UserInfo(profileName, profileDescription);
const editProfilePopup = new PopupWithForm(editProfilePopupSelector,validationConfig, ()=>{
    profileInfo.setUserInfo(userName.value,userDescription.value); 
    editProfilePopup.closePopup();
} )
editProfilePopup.setEventListeners();
const openEditProfileForm = function () {
    const userInfo = profileInfo.getUserInfo();
    userName.value = userInfo.name;
    userDescription.value = userInfo.description;
    editProfilePopup.openPopup();
}
function createCard(item) {
    const cardElement = new Card(item.name, item.description, tempElementSelector, handleCardClick).createCard();
    return cardElement
}

const addCardPopup = new PopupWithForm(addCardPopupSelector,validationConfig, (item)=>{
   
    //const card =  new Card(item.name, item.description, tempElementSelector, handleCardClick).createCard();
    newSection.addItem(createCard(item));
    addCardPopup.closePopup();
} )
addCardPopup.setEventListeners();
const openAddCardForm = function () {
addCardPopup.openPopup();
}
   // const cardContainer = '.elements';
const newSection = new Section({data:initialCards,renderer: (item)=>{
   //const card =  new Card(item.name, item.link, tempElementSelector, handleCardClick).createCard();
    newSection.addItem(createCard(item));
}},
cardContainer);
newSection.createSection();
editPopupOpenButtonElement.addEventListener('click', openEditProfileForm);
addPopupOpenButtonElement.addEventListener('click', openAddCardForm)

export {photoPopupElementImg, photoPopupElementName };


