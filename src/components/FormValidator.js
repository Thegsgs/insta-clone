// Validation class

class FormValidator {
  constructor(settings, formSelector) {
    this._settings = settings;
    this._form = formSelector;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(this._settings.errorType + inputElement.id);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(this._settings.errorType + inputElement.id);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", true);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

const resetValidation = (popup, validationObject) => {
  const inputList = Array.from(popup.querySelectorAll(validationObject.inputSelector));
  inputList.forEach(inputElement => {
    inputElement.classList.remove(validationObject.inputErrorClass);
  });

  const errorList = Array.from(popup.querySelectorAll(validationObject.popupError));
  errorList.forEach(errorElement => {
    errorElement.classList.remove(validationObject.errorClass);
    errorElement.textContent = "";
  });

}

function resetSubmitBtn(popup, validationObject) {
  const submitBtn = popup.querySelector(validationObject.submitButtonSelector);
  if (submitBtn !== null) {
    submitBtn.classList.add(validationObject.inactiveButtonClass);
  }
}

export {
  resetValidation,
  resetSubmitBtn,
  FormValidator
};
