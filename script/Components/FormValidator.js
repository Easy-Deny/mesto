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
        this._setEventListeners();
    }
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState();
                this._checkInputValidity(inputElement);
            });
        });
    };
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {

            return !inputElement.validity.valid;
        })
    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };
    _showInputError(inputElement) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validData.inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._validData.errorClass);
    };
    _hideInputError(inputElement) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        this._removeValidationErrors(inputElement);
        this._errorElement.classList.remove(this._validData.errorClass);
        this._errorElement.textContent = '';
    };
    _disableSubmitButton() {
        this._buttonElement.classList.add(this._validData.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }
    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._validData.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._disableSubmitButton();
    }
    _removeValidationErrors(inputElement) {
        inputElement.classList.remove(this._validData.inputErrorClass);
    }
}
export { FormValidator }