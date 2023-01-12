const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupForm = popupElement.querySelector('.popup__content');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let likeButton = document.querySelector('.element__like-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupName = popupElement.querySelector('.popup__text_type_name');
let popupDescription = popupElement.querySelector('.popup__text_type_description');

function openPopup() {
    popupElement.classList.add('popup_is-opened');
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
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

const closePopupByClickOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup();
    }
}

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
        elements.prepend(newElement);
    };

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupForm.addEventListener('submit', savePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);
