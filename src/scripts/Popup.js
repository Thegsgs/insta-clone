export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(this._popup);
    }
  }

  _handleClickClose(evt) {
    if (evt.target === this._popup) {
      this.close(this._popup);
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.addEventListener('click', (evt) => {
      this._handleClickClose(evt);
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }
}
