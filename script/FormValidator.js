class FormValidator {
    constructor(validData, form) {
        this._validData = validData;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._validData.inputSelector));
        this._buttonElement = this._form.querySelector(this._validData.submitButtonSelector);
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._form, this._validData);
        this. _removeValidationErrors(this._form, this._validData);
    }
    _setEventListeners(formElement, validData) {
        this._toggleButtonState(this._inputList, this._buttonElement, validData);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState(this._inputList, this._buttonElement, validData);
                this._checkInputValidity(formElement, inputElement, validData);
            });
        });
    };
    _toggleButtonState(inputList, buttonElement, validData) {
        if (this._hasInvalidInput(inputList)) {
            this._disableSubmitButton(buttonElement, validData);
        } else {
            this._enableSubmitButton(buttonElement, validData);  
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
    _disableSubmitButton(buttonElement,validData) {
        buttonElement.classList.add(validData.inactiveButtonClass);
        buttonElement.disabled = true;
    }
    _enableSubmitButton(buttonElement,validData){
        buttonElement.classList.remove(validData.inactiveButtonClass);
        buttonElement.disabled = false;
    }
    _removeValidationErrors(element,validData) {
        this._inputList.forEach((inputElement) => {
            if (inputElement.classList.contains(validData.inputErrorClass)) {
                inputElement.classList.remove(validData.inputErrorClass);
            }
        });
        this._errorList = Array.from(element.querySelectorAll(validData.errorMessageClass));
        this._errorList.forEach((errorMessage) => {
            if (errorMessage.textContent != '') {
                errorMessage.textContent = '';
            }
        });
    }
}
export { FormValidator }