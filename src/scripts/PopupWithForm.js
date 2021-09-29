import Popup from "./Popup.js";
import { validationObject } from "./index.js";
import { resetSubmitBtn, resetValidation } from "./FormValidator.js";

export default class PopupWithForm extends Popup {
  constructor({ inputField1, inputField2 }, { handleFormSubmit, handlePopupOpen }, { popup, form, button }) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._handlePopupOpen = handlePopupOpen;
    this._form = form;
    this._button = button;
    this._inputField1 = inputField1;
    this._inputField2 = inputField2;
  }

  _getInputValues() {
    const inputObj = {
      input1: this._inputField1.value,
      input2: this._inputField2.value
    }

    return inputObj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    this._button.addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    this._handlePopupOpen();
    super.open();
  }

  close() {
    resetSubmitBtn(this._popup, validationObject);
    resetValidation(this._popup, validationObject);
    super.close();
  }
}
