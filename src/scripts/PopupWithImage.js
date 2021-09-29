import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ url, title }, popup) {
    super(popup);
    this._popupImg = this._popup.querySelector('.image-popup__image');
    this._button = this._popup.querySelector('.image-popup__button-close');
    this._popupTitle = this._popup.querySelector('.image-popup__text');
    this._url = url;
    this._title = title;
  }

  _createPopup() {
    this._popupImg.src = this._url;
    this._popupImg.alt = this._title;
    this._popupTitle.textContent = this._title;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    this._createPopup();
    super.open();
  }

  close() {
    super.close();
  }
}
