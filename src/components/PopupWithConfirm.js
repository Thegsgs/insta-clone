import { api } from "../index.js";
import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popup, form) {
    super(popup);
    this._form = form;
    this._deleteCard = this._deleteCard.bind(this);
  }

  _deleteCard() {
    api.deleteCard(this._delCardId, this._delBtn)
      .then(() => {
        this._delCard.remove();
        this.close();
      });

  }

  _setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._deleteCard);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._deleteCard);
  }

  open(delCard, cardId, deleteBtn) {
    this._delCard = delCard;
    this._delCardId = cardId;
    this._delBtn = deleteBtn;
    this._setEventListeners();
    super.open();
  }

  close() {
    super.close();
  }
}
