import { api } from "./index.js";
import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(Popup, button, form) {
    super(Popup);
    this._button = button;
    this._form = form;
    this._handleButtonClose = this._handleButtonClose.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
  }

  _handleButtonClose() {
    this.close();
  }

  _deleteCard() {
    this._delCard.remove();
    api.deleteCard(this._delCardId, this._delBtn);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', this._handleButtonClose);
    this._form.addEventListener('submit', this._deleteCard);
  }

  _removeEventListeners() {
    this._button.removeEventListener('click', this._handleButtonClose);
    this._form.removeEventListener('submit', this._deleteCard);
  }

  open(delCard, cardId, deleteBtn) {
    this._delCard = delCard;
    this._delCardId = cardId;
    this._delBtn = deleteBtn;
    super.open();
  }

  close() {
    super.close();
    super._removeEventListeners();
    this._removeEventListeners();
  }
}
