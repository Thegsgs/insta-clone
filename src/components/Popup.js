export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleBtnClose = this._handleBtnClose.bind(this);
    this._closeBtn = this._popup.querySelector('.popup__close');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  _handleBtnClose() {
    this.close();
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickClose);
    this._closeBtn.addEventListener('click', this._handleBtnClose);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickClose);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._removeEventListeners();
    this._popup.classList.remove('popup_opened');
  }
}
