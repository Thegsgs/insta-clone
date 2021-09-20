// Input validation for all forms

const showInputErorr = (formElement, inputElement, errorMessage, validationObject) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.add(validationObject.inputErrorClass);
  errorElement.classList.add(validationObject.errorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, validationObject) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.remove(validationObject.inputErrorClass);
  errorElement.classList.remove(validationObject.errorClass);
  errorElement.textContent = "";
}

const checkInputValidity = (formElement, inputElement, validationObject) => {
  if (!inputElement.validity.valid) {
    showInputErorr(formElement, inputElement, inputElement.validationMessage, validationObject);
  } else {
    hideInputError(formElement, inputElement, validationObject);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, validationObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObject.inactiveButtonClass);
  } else { buttonElement.classList.remove(validationObject.inactiveButtonClass); }
}

const setEventListeners = (formElement, validationObject) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
  const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObject);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
}

const enableValidation = (validationObject) => {
  const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationObject);
  });
};

const resetValidation = (popup, validationObject) => {
  const inputList = Array.from(popup.querySelectorAll(validationObject.inputSelector));
  inputList.forEach(inputElement => {
    inputElement.classList.remove(validationObject.inputErrorClass);
  });

  const errorList = Array.from(popup.querySelectorAll('.popup__error'));
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
  enableValidation,
  resetSubmitBtn
};
