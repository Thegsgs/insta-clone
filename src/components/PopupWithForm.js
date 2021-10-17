import Popup from "./Popup.js";
import { validationObject } from "../constants.js";
import { resetSubmitBtn, resetValidation } from "./FormValidator.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, handlePopupOpen }, { popup, form }) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._handlePopupOpen = handlePopupOpen;
    this._form = form;
    this._handleSubmission = this._handleSubmission.bind(this);
  }

  _getInputValues(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const inputObj = {};
    inputList.forEach(inputElement => {
      const inputName = inputElement.name.split("-")[0];
      inputObj[inputName] = inputElement.value;
    });
    return inputObj;
  }

  _handleSubmission() {
    this._handleFormSubmit(this._getInputValues(this._form));
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmission);
  }

  _removeEventListeners() {
    this._form.removeEventListener('submit', this._handleSubmission);
  }

  open() {
    this._handlePopupOpen();
    this._setEventListeners();
    super.open();
  }

  close() {
    resetSubmitBtn(this._popup, validationObject);
    resetValidation(this._popup, validationObject);
    super.close();
  }
}
