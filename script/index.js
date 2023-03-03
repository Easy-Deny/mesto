import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__content');
const editPopupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const addPopupFormElement = popupAddCard.querySelector('.popup__content')
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const formAddCard = popupAddCard.querySelector('.popup__content');
const addPopupName = popupAddCard.querySelector('.popup__text_type_name');
const addPopupLink = popupAddCard.querySelector('.popup__text_type_description');
const photoPopupElement = document.querySelector('.popup-photo');
const photoPopupElementImg = photoPopupElement.querySelector('.popup-photo__img');
const photoPopupElementName = photoPopupElement.querySelector('.popup-photo__name');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editPopupName = popupEditProfile.querySelector('.popup__text_type_name');
const editPopupDescription = popupEditProfile.querySelector('.popup__text_type_description');
const tempElementSelector = '.temp-element';
const elements = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup')
const validationConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active',
    errorMessageClass: '.popup__text-error'
};
const escKeyCode = 27;
const editFormValidation = new FormValidator(validationConfig, formEditProfile);
const addFormValidation = new FormValidator(validationConfig, formAddCard);
editFormValidation.enableValidation();
addFormValidation.enableValidation();
const openEditProfileForm = function () {
    openPopup(popupEditProfile);
    editPopupName.value = profileName.textContent;
    editPopupDescription.value = profileDescription.textContent;
    editFormValidation.resetValidation();
    
}
const openAddCardForm = function () {
    openPopup(popupAddCard);
    addPopupFormElement.reset();
    addFormValidation.resetValidation();
    
}
const openPopup = function (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEscButton);
}
const closePopup = function (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscButton);
}
const submitEditProfileForm = function (evt) {
    evt.preventDefault();
    profileName.textContent = editPopupName.value;
    profileDescription.textContent = editPopupDescription.value;
    closePopup(popupEditProfile);
}
const submitAddCardForm = function (evt) {
    evt.preventDefault();
    addCard(addPopupName.value, addPopupLink.value);
    closePopup(popupAddCard);
}
const closePopupByEscButton = function (evt) {
    if (evt.keyCode === escKeyCode) {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup !== null) {
            closePopup(openedPopup);
        }
    }
}
initialCards.forEach(item => addCard(item.name, item.link));
function createNewCard(cardName, cardLink) {
    const newCard = new Card(cardName, cardLink, tempElementSelector).createCard();
    return newCard
}
function addCard(cardName, cardLink) {
    const createdCard = createNewCard(cardName, cardLink)
    elements.prepend(createdCard);
};
editPopupOpenButtonElement.addEventListener('click', openEditProfileForm);
formEditProfile.addEventListener('submit', submitEditProfileForm);
addPopupOpenButtonElement.addEventListener('click', openAddCardForm)
formAddCard.addEventListener('submit', submitAddCardForm);
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})

export { openPopup, photoPopupElement, photoPopupElementImg, photoPopupElementName };


