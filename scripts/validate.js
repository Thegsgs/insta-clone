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

export { resetValidation };
