import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editPopupCloseButtonElement = popupEditProfile.querySelector('.popup__close-button');
const formEditProfile = popupEditProfile.querySelector('.popup__content');
const editPopupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const addPopupFormElement = popupAddCard.querySelector('.popup__content')
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const addPopupCloseButtonElement = popupAddCard.querySelector('.popup__close-button');
const formAddCard = popupAddCard.querySelector('.popup__content');
const addPopupName = popupAddCard.querySelector('.popup__text_type_name');
const addPopupLink = popupAddCard.querySelector('.popup__text_type_description');
const photoPopupElement = document.querySelector('.popup-photo');
const photoPopupCloseButtonElement = photoPopupElement.querySelector('.popup__close-button');
//const photoLinkPopupElement = photoPopupElement.querySelector('.popup-photo__img');
//const photoNamePopupElement = photoPopupElement.querySelector('.popup-photo__name');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editPopupName = popupEditProfile.querySelector('.popup__text_type_name');
const editPopupDescription = popupEditProfile.querySelector('.popup__text_type_description');
const tempElementSelector = '.temp-element';
const elements = document.querySelector('.elements');
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
const openEditProfileForm = function () {
    openPopup(popupEditProfile);
    new FormValidator(validationConfig,formEditProfile).enableValidation();
    editPopupName.value = profileName.textContent;
    editPopupDescription.value = profileDescription.textContent;
}
const openAddCardForm = function (evt) {
    openPopup(popupAddCard);
    new FormValidator(validationConfig,formAddCard).enableValidation();
    addPopupFormElement.reset();
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
    if (!isButtonActive(evt.target)) {
        profileName.textContent = editPopupName.value;
        profileDescription.textContent = editPopupDescription.value;
        closePopup(popupEditProfile);
    }
}
const submitAddCardForm = function (evt) {
    evt.preventDefault();
    if (!isButtonActive(evt.target)) {
        addCard(addPopupName.value, addPopupLink.value);
        closePopup(popupAddCard);
    }
}
const isButtonActive = function (element) {
    return (element.querySelector('.popup__save-button').classList.contains("popup__save-button_inactive"))
}

const closePopupByClickOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
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

function addPictureEventListener(element) {
    const elementImg = element.querySelector('.element__img');
    const elementText = element.querySelector('.element__description').textContent;
    const photoPopupElementImg = photoPopupElement.querySelector('.popup-photo__img');
    const photoPopupElementName = photoPopupElement.querySelector('.popup-photo__name');
    elementImg.addEventListener('click', function () {
        openPopup(photoPopupElement);
        photoPopupElementImg.src = elementImg.src;
        photoPopupElementImg.alt = elementText;
        photoPopupElementName.textContent = elementText;
    });
}
function addCard(cardName, cardLink) {
    const newElement = new Card(cardName, cardLink, tempElementSelector);
    const newCard = newElement.createCard();
    addPictureEventListener(newCard);
    elements.prepend(newCard);
};
editPopupOpenButtonElement.addEventListener('click', openEditProfileForm);
editPopupCloseButtonElement.addEventListener('click', () => closePopup(popupEditProfile));
formEditProfile.addEventListener('submit', submitEditProfileForm);
popupEditProfile.addEventListener('click', closePopupByClickOverlay);
popupAddCard.addEventListener('click', closePopupByClickOverlay);
photoPopupElement.addEventListener('click', closePopupByClickOverlay);
addPopupOpenButtonElement.addEventListener('click', openAddCardForm)
addPopupCloseButtonElement.addEventListener('click', () => closePopup(popupAddCard));
formAddCard.addEventListener('submit', submitAddCardForm);
photoPopupCloseButtonElement.addEventListener('click', () => closePopup(photoPopupElement));





