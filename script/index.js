const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupForm = popupElement.querySelector('.popup__content');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const addPopupElement = document.querySelector('.popup_type_add-card');
const addPopupOpenButtonElement = document.querySelector('.profile__add-button');
const addPopupCloseButtonElement = addPopupElement.querySelector('.popup__close-button');
const addPopupForm = addPopupElement.querySelector('.popup__content');
let addPopupName = addPopupElement.querySelector('.popup__text_type_name');
let addPopupLink = addPopupElement.querySelector('.popup__text_type_description');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupName = popupElement.querySelector('.popup__text_type_name');
let popupDescription = popupElement.querySelector('.popup__text_type_description');

const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
}

const openAddPopup = function () {
    addPopupElement.classList.add('popup_is-opened');
    addPopupName.value = '';
    addPopupLink.value = '';
}
const closeAddPopup = function () {
    addPopupElement.classList.remove('popup_is-opened');
}
const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
}
const savePopup = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
    return;
}
const saveAddPopup = function (evt) {
    evt.preventDefault();
    addCard(addPopupName.value, addPopupLink.value);
    closeAddPopup();
    return;
}

const closePopupByClickOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup();
        closeAddPopup();
    }
}

//const deleteCard = function(evt){
//    const deleteElement = evt.target
//    console.log(deleteElement);
//}


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(item => addCard(item.name, item.link));

function addCard(cardName, cardLink) {
    const tempElement = document.querySelector('.temp-element').content;
    const elements = document.querySelector('.elements');
    const newElement = tempElement.querySelector('.element').cloneNode(true);
    newElement.querySelector('.element__name').textContent = cardName;
    newElement.querySelector('.element__img').src = cardLink;
    newElement.querySelector('.element__img').alt = cardName;
    newElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_is-liked');
    });
    newElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        const targetElement = evt.target;
        targetElement.parentElement.remove();
    });
    elements.prepend(newElement);
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupForm.addEventListener('submit', savePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);
addPopupElement.addEventListener('click', closePopupByClickOverlay);
addPopupOpenButtonElement.addEventListener('click', openAddPopup)
addPopupCloseButtonElement.addEventListener('click', closeAddPopup);
addPopupForm.addEventListener('submit', saveAddPopup);

