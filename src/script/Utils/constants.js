export const initialCards = [
    {
        name: 'Архыз',
        description: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        description: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        description: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        description: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        description: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        description: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }

];
export const escKeyCode = 27;
export const openedPopupSelector = 'popup_is-opened';
export const photoPopupSelector = 'popup-photo';
export const validationConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active',
    errorMessageClass: '.popup__text-error'
};
export const tempElementSelector = '.temp-element';
export const addCardPopupSelector = 'popup_type_add-card';
export const editProfilePopupSelector = 'popup_type_edit-profile';
export const editAvatarPopupSelector = 'popup_type_avatar';
export const messagePopupSelector = 'popup_type_message';
export const cardContainer = '.elements';
export const saveButtonSelector = '.popup__save-button';