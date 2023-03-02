class FormValidator {
    constructor(validData, element) {
        this._validData = validData;
        this._element = element;
    }

    enableValidation() {
        
        this.formList = Array.from(document.querySelectorAll(this._validData.formSelector));
        this.formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
            this._setEventListeners(formElement, this._validData);
        });
    }
    _setEventListeners(formElement, validData) {
        this._inputList = Array.from(formElement.querySelectorAll(validData.inputSelector));
        this._buttonElement = formElement.querySelector(validData.submitButtonSelector);
        this._toggleButtonState(this._inputList, this._buttonElement, validData);
        this._inputList.forEach((inputElement) => {
           
            inputElement.addEventListener('input',  ()=> {
                this._toggleButtonState(this._inputList, this._buttonElement, validData);
                this._checkInputValidity(formElement, inputElement, validData);          
               
            });
        });
    };
    _toggleButtonState(inputList, buttonElement, validData) {
        if (this._hasInvalidInput(inputList)) {
           
            buttonElement.classList.add(this._validData.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._validData.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
           
            return !inputElement.validity.valid;
        })
    }
    _checkInputValidity(formElement, inputElement, validData) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, validData);
        } else {
            this._hideInputError(formElement, inputElement, validData);
        }
    };
    _showInputError(formElement, inputElement, errorMessage, validData) {
        this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(validData.inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(validData.errorClass);
    };
    _hideInputError(formElement, inputElement, validData) {
        this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(validData.inputErrorClass);
        this._errorElement.classList.remove(validData.errorClass);
        this._errorElement.textContent = '';
    };
    disableSubmitButton(element) {
        element.querySelector(this._validData.submitButtonSelector).classList.add(this._validData.inactiveButtonClass);
    }
    removeValidationErrors(element) {
        this._inputList = Array.from(element.querySelectorAll(this._validData.inputSelector));
        this._inputList.forEach((inputElement) => {
            if (inputElement.classList.contains(this._validData.inputErrorClass)) {
                inputElement.classList.remove(this._validData.inputErrorClass);
            }
        });
        this._errorList = Array.from(element.querySelectorAll(this._validData.errorMessageClass));
        this._errorList.forEach((errorMessage) => {
            if (errorMessage.textContent != '') {
                errorMessage.textContent = '';
            }
        });
    }
}
export { FormValidator }