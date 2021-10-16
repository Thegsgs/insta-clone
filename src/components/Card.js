import { api } from '../index.js';

export class Card {
  constructor(recievedCard, currentUser, selector, { handlePopupOpen, handleDelete }) {
    this._card = recievedCard;
    this._currentUser = currentUser;
    this._title = this._card.name;
    this._url = this._card.link;
    this._likeArray = this._card.likes;
    this._cardId = this._card._id;
    this._cardOwnerId = this._card.owner._id;
    this._selector = selector;
    this._handlePopupOpen = handlePopupOpen;
    this._handleDelete = handleDelete;
    this._handleToggleLike = this._handleToggleLike.bind(this);
    this._handleDeletion = this._handleDeletion.bind(this);
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _setCardElements() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementBtnLike = this._element.querySelector('.element__button-like');
    this._elementBtnDel = this._element.querySelector('.element__button-delete');
    this._elementLikeCount = this._element.querySelector('.element__like-count');
  }

  _refreshLikesArray(res) {
    this._likeArray = res.likes;
    this._elementLikeCount.textContent = res.likes.length;
  }

  _handleToggleLike() {
    if (this._likeArray.some(arrayObject => arrayObject._id === this._currentUser._id)) {
      this._elementBtnLike.classList.remove('element__button-like_active');

      // Make API call to remove users like
      api.removeLike(this._cardId).then(res => {
        this._refreshLikesArray(res);
      });

    } else {
      this._elementBtnLike.classList.add('element__button-like_active');

      // Make API call to add users like
      api.addLike(this._cardId).then(res => {
        this._refreshLikesArray(res);
      });
    }
  }

  _handleDeletion() {
    this._handleDelete(this._element, this._cardId);
  }

  _setEventLiteners() {
    this._elementBtnLike.addEventListener('click', this._handleToggleLike);
    this._elementBtnDel.addEventListener('click', this._handleDeletion);
    this._elementImage.addEventListener('click', this._handlePopupOpen);
  }

  createCard() {
    this._setCardElements();
    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._url;
    this._elementImage.alt = this._title;
    this._elementLikeCount.textContent = this._card.likes.length;

    // Checks if card belongs to the viewer and removes delete button if not
    if (this._cardOwnerId != this._currentUser._id) {
      this._elementBtnDel.style.visibility = "hidden";
    }

    // Checks if viewer liked the card and makes like button active if has
    if (this._likeArray.some(arrayObject => arrayObject._id === this._currentUser._id)) {
      this._elementBtnLike.classList.add('element__button-like_active');
    }

    this._setEventLiteners();

    return this._element;
  }

}
