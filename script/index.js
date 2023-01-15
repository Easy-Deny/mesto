const editPopupElement = document.querySelector('.popup_type_edit-profile');
const editPopupCloseButtonElement = editPopupElement.querySelector('.popup__close-button');
const editPopupForm = editPopupElement.querySelector('.popup__content');
const editPopupOpenButtonElement = document.querySelector('.profile__edit-button');
const addPopupElement = document.querySelector('.popup_type_add-card');
const addPopupFormElement = addPopupElement.querySelector('.popup__content')
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const addPopupCloseButtonElement = addPopupElement.querySelector('.popup__close-button');
const addPopupForm = addPopupElement.querySelector('.popup__content');
const addPopupName = addPopupElement.querySelector('.popup__text_type_name');
const addPopupLink = addPopupElement.querySelector('.popup__text_type_description');
const photoPopupElement = document.querySelector('.popup-photo');
const photoPopupCloseButtonElement = photoPopupElement.querySelector('.popup__close-button');
const photoLinkPopupElement = photoPopupElement.querySelector('.popup-photo__img');
const photoNamePopupElement = photoPopupElement.querySelector('.popup-photo__name');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editPopupName = editPopupElement.querySelector('.popup__text_type_name');
const editPopupDescription = editPopupElement.querySelector('.popup__text_type_description');
const tempElement = document.querySelector('.temp-element').content;

const openEditPopup = function () {
    openPopup(editPopupElement);
    editPopupName.value = profileName.textContent;
    editPopupDescription.value = profileDescription.textContent;
}
const openAddPopup = function (evt) {
    openPopup(addPopupElement);
    console.log(evt.target.parentElement);
    addPopupFormElement.reset(); 
}
const openPopup = function (popup) {
    popup.classList.add('popup_is-opened');
}
const closePopup = function (popup) {
    popup.classList.remove('popup_is-opened');
}
const savePopup = function (evt) {
    evt.preventDefault();
    profileName.textContent = editPopupName.value;
    profileDescription.textContent = editPopupDescription.value;
    closePopup(editPopupElement);
    return;
}
const saveAddPopup = function (evt) {
    evt.preventDefault();
    addCard(addPopupName.value, addPopupLink.value);
    closePopup(addPopupElement);
    return;
}
const closePopupByClickOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup(editPopupElement);
        closePopup(addPopupElement);
        closePopup(photoPopupElement);
    }
}
initialCards.forEach(item => addCard(item.name, item.link));
function createCard() {
    const createElement = tempElement.querySelector('.element').cloneNode(true);
    return createElement;
}
function addCard(cardName, cardLink) {
    const elements = document.querySelector('.elements');
    const newElement = createCard();
    const newElementImg = newElement.querySelector('.element__img');
    const photoPopupElementImg = photoPopupElement.querySelector('.popup-photo__img');
    const photoPopupElementName = photoPopupElement.querySelector('.popup-photo__name');
    newElement.querySelector('.element__name').textContent = cardName;
    newElementImg.src = cardLink;
    newElementImg.alt = cardName;
    newElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_is-liked');
    });
    newElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        const targetElement = evt.target;
        targetElement.parentElement.remove();
    });
    newElement.querySelector('.element__img').addEventListener('click', function (evt) {
        openPopup(photoPopupElement);
        photoPopupElementImg.src = cardLink;
        photoPopupElementImg.alt = cardName;
        photoPopupElementName.textContent = cardName;
    });
    elements.prepend(newElement);
};
editPopupOpenButtonElement.addEventListener('click', openEditPopup);
editPopupCloseButtonElement.addEventListener('click', () => closePopup(editPopupElement));
editPopupForm.addEventListener('submit', savePopup);
editPopupElement.addEventListener('click', closePopupByClickOverlay);
addPopupElement.addEventListener('click', closePopupByClickOverlay);
photoPopupElement.addEventListener('click', closePopupByClickOverlay);
addPopupOpenButtonElement.addEventListener('click', openAddPopup)
addPopupCloseButtonElement.addEventListener('click', () => closePopup(addPopupElement));
addPopupForm.addEventListener('submit', saveAddPopup);
photoPopupCloseButtonElement.addEventListener('click', () => closePopup(photoPopupElement));

