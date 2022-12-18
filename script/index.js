const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupSaveButtonElement = popupElement.querySelector('.popup__save-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let likeButton = document.querySelector('.element__like-button');

function openPopup() {
    popupElement.classList.add('popup_is-opened');
    let profileName = document.querySelector('.profile__name');
    let profileDescription = document.querySelector('.profile__description');
    console.log(profileName.textContent);
    console.log(profileDescription.textContent);
    let popupName = popupElement.querySelector('.popup__text_name');
    popupName.value = profileName.textContent;
    let popupDescription = popupElement.querySelector('.popup__text_description');
    popupDescription.value = profileDescription.textContent;
}
const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
}

const savePopup = function () {
    let popupName = popupElement.querySelector('.popup__text_name');
    let popupDescription = popupElement.querySelector('.popup__text_description');
    if (popupName.value.length < 2) {
        alert('длина имени должна быть больше 3х символов');
    } else if (popupDescription.value.length < 2) {
        alert('длина подписи должна быть больше 3х символов');
    } else {
        console.log(popupName.value.length);
        let profileName = document.querySelector('.profile__name');
        let profileDescription = document.querySelector('.profile__description');
        profileName.textContent = popupName.value;
        profileDescription.textContent = popupDescription.value;
        closePopup();
        return;
    }
}

const likeActivate = function (event) {
    console.log(event.target);
    console.log(likeButton);
    likeButton = event.target;
    likeButton.classList.toggle('element__like-button_is-liked');
}
const closePopupByClickOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup();
    }
}


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupSaveButtonElement.addEventListener('click', savePopup);
likeButton.addEventListener('click', likeActivate);
popupElement.addEventListener('click', closePopupByClickOverlay);
