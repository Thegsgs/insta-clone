import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImg = this._popup.querySelector('.image-popup__image');
    this._button = this._popup.querySelector('.image-popup__button-close');
    this._popupTitle = this._popup.querySelector('.image-popup__text');
    this._handleButtonClose = this._handleButtonClose.bind(this);
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

  open(url, title) {
    this._popupImg.src = url;
    this._popupImg.alt = title;
    this._popupTitle.textContent = title;
    super.open();
  }

  close() {
    super._removeEventListeners();
    this._removeEventListeners();
    super.close();
  }
}
