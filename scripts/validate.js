// Input validation for all forms

const showInputErorr = (formElement, inputElement, errorMessage, valObj) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.add(valObj.inputErrorClass);
  errorElement.classList.add(valObj.errorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, valObj) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.remove(valObj.inputErrorClass);
  errorElement.classList.remove(valObj.errorClass);
  errorElement.textContent = "";
}

const checkInputValidity = (formElement, inputElement, valObj) => {
  if (!inputElement.validity.valid) {
    showInputErorr(formElement, inputElement, inputElement.validationMessage, valObj);
  } else {
    hideInputError(formElement, inputElement, valObj);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, valObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(valObj.inactiveButtonClass);
  } else { buttonElement.classList.remove(valObj.inactiveButtonClass); }
}

const setEventListeners = (formElement, valObj) => {
  const inputList = Array.from(formElement.querySelectorAll(valObj.inputSelector));
  const buttonElement = formElement.querySelector(valObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, valObj);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, valObj);
      toggleButtonState(inputList, buttonElement, valObj);
    });
  });
}

const enableValidation = (valObj) => {
  const formList = Array.from(document.querySelectorAll(valObj.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, valObj);
  });
};

const resetValidation = (popup, valObj) => {
  const inputList = Array.from(popup.querySelectorAll(valObj.inputSelector));
  inputList.forEach(inputElement => {
    inputElement.classList.remove(valObj.inputErrorClass);
  });

  const errorList = Array.from(popup.querySelectorAll('.popup__error'));
  errorList.forEach(errorElement => {
    errorElement.classList.remove(valObj.errorClass);
    errorElement.textContent = "";
  });

}

function submitReset(popup, valObj) {
  if (popup.querySelector(valObj.submitButtonSelector) !== null) {
    popup.querySelector(valObj.submitButtonSelector).classList.add(valObj.inactiveButtonClass);
  }
}

export {
  resetValidation,
  enableValidation,
  submitReset
};
