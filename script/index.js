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
const photoLinkPopupElement = photoPopupElement.querySelector('.popup-photo__img');
const photoNamePopupElement = photoPopupElement.querySelector('.popup-photo__name');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editPopupName = popupEditProfile.querySelector('.popup__text_type_name');
const editPopupDescription = popupEditProfile.querySelector('.popup__text_type_description');
const tempElement = document.querySelector('.temp-element').content;
const elements = document.querySelector('.elements');

const openEditProfileForm = function () {
    openPopup(popupEditProfile);
    editPopupName.value = profileName.textContent;
    editPopupDescription.value = profileDescription.textContent;
    deactivateButton(formEditProfile);
}
const openAddCardForm = function (evt) {
    openPopup(popupAddCard);
    addPopupFormElement.reset();
    deactivateButton(addPopupFormElement);
}

const deactivateButton = function (element) {
    element.querySelector('.popup__save-button').classList.add("popup__save-button_inactive");
}
const openPopup = function (popup) {
    popup.classList.add('popup_is-opened');
}
const closePopup = function (popup) {
    popup.classList.remove('popup_is-opened');
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
    console.log(isButtonActive(evt.target));
    if (!isButtonActive(evt.target)) {
    addCard(addPopupName.value, addPopupLink.value);
    closePopup(popupAddCard);
    }
}
const isButtonActive = function(element) {
    return (element.querySelector('.popup__save-button').classList.contains("popup__save-button_inactive"))  
}

const closePopupByClickOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}
initialCards.forEach(item => addCard(item.name, item.link));

function createCard(cardName, cardLink) {
    const createElement = tempElement.querySelector('.element').cloneNode(true);
    const newElementImg = createElement.querySelector('.element__img');
    const photoPopupElementImg = photoPopupElement.querySelector('.popup-photo__img');
    const photoPopupElementName = photoPopupElement.querySelector('.popup-photo__name');
    createElement.querySelector('.element__name').textContent = cardName;
    newElementImg.src = cardLink;
    newElementImg.alt = cardName;
    createElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_is-liked');
    });
    createElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        const targetElement = evt.target;
        targetElement.parentElement.remove();
    });
    createElement.querySelector('.element__img').addEventListener('click', function (evt) {
        openPopup(photoPopupElement);
        photoPopupElementImg.src = cardLink;
        photoPopupElementImg.alt = cardName;
        photoPopupElementName.textContent = cardName;
    });
    return createElement;
}
function addCard(cardName, cardLink) {
    const newElement = createCard(cardName, cardLink);
    elements.prepend(newElement);
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

