import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ title, url }, popup) {
    super(popup);
    this._popupImg = this._popup.querySelector('.image-popup__image');
    this._button = this._popup.querySelector('.image-popup__button-close');
    this._popupTitle = this._popup.querySelector('.image-popup__text');
    this._url = url;
    this._title = title;
    this._handleButtonClose = this._handleButtonClose.bind(this);
  }

  createPopup() {
    this._popupImg.src = this._url;
    this._popupImg.alt = this._title;
    this._popupTitle.textContent = this._title;
  }

  _handleButtonClose() {
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', this._handleButtonClose);
  }

  _removeEventListeners() {
    this._button.removeEventListener('click', this._handleButtonClose);
  }

  open() {
    super.open();
  }

  close() {
    super._removeEventListeners();
    this._removeEventListeners();
    super.close();
  }
}
