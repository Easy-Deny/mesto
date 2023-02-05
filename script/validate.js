const showInputError = (formElement, inputElement, errorMessage, validData) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validData.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validData.errorClass);
};
const hideInputError = (formElement, inputElement, validData) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validData.inputErrorClass);
    errorElement.classList.remove(validData.errorClass);
    errorElement.textContent = '';
};
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}
const toggleButtonState = (inputList, buttonElement, validData) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validData.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validData.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}
const checkInputValidity = (formElement, inputElement, validData) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validData);
    } else {
        hideInputError(formElement, inputElement, validData);
    }
};
const setEventListeners = (formElement, validData) => {
    const inputList = Array.from(formElement.querySelectorAll(validData.inputSelector));
    const buttonElement = formElement.querySelector(validData.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validData);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validData);
            toggleButtonState(inputList, buttonElement, validData);
        });
    });
};
const enableValidation = (validData) => {
    const formList = Array.from(document.querySelectorAll(validData.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validData);
    });
};
const disableSubmitButton = function (element,validData) {
    element.querySelector(validData.submitButtonSelector).classList.add(validData.inactiveButtonClass);
}
const removeValidationErrors = function(popup,validData) {
    const inputList = Array.from(popup.querySelectorAll(validData.inputSelector));
    inputList.forEach((inputElement) => {
        if (inputElement.classList.contains(validData.inputErrorClass)) {
            inputElement.classList.remove(validData.inputErrorClass);
        }
    });
    const errorList = Array.from(popup.querySelectorAll(validData.errorMessageClass));
    errorList.forEach((errorMessage) => {
        if (errorMessage.textContent != '') {
            errorMessage.textContent = '';
        }
    });
}
