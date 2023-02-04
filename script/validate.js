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
const toggleButtonState = (inputList, buttonElement,validData) => {
    //console.log(validData.inactiveButtonClass);
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validData.inactiveButtonClass);
        
    } else {
        buttonElement.classList.remove(validData.inactiveButtonClass);
        
    }
}
const checkInputValidity = (formElement, inputElement, validData) => {
    if (!inputElement.validity.valid) {

        showInputError(formElement, inputElement, inputElement.validationMessage, validData);
    } else {
        hideInputError(formElement, inputElement, validData);
    }
};
const setEventListeners = (formElement,validData) => {
    const inputList = Array.from(formElement.querySelectorAll(validData.inputSelector));
    const buttonElement = formElement.querySelector(validData.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validData);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement,validData);
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
        setEventListeners(formElement,validData);
    });
};


