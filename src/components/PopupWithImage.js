import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImg = this._popup.querySelector('.image-popup__image');
    this._popupTitle = this._popup.querySelector('.image-popup__text');
  }

  setEventListeners() {
    super.setEventListeners();
  }

  _removeEventListeners() {
    super._removeEventListeners();
  }

  open(url, title) {
    this._popupImg.src = url;
    this._popupImg.alt = title;
    this._popupTitle.textContent = title;
    super.open();
  }

  close() {
    super.close();
  }
}
