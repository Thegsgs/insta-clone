class Card {
  constructor(title, url, selector) {
    this._title = title;
    this._url = url;
    this._selector = selector;
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
  }

  _setPopupElements() {
    this._imagePopup = document.querySelector('.image-popup');
    this._popupCloseBtn = this._imagePopup.querySelector('.image-popup__button-close');
    this._popupImg = this._imagePopup.querySelector('.image-popup__image');
    this._popupImgTitle = this._imagePopup.querySelector('.image-popup__text');
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
  }

  _delCard(evt) {
    evt.target.closest('.element').remove();
  }

  _handleCloseOnEsc(evt) {
    if (evt.key === 'Escape') {
      this._imagePopup.classList.remove('popup_opened');
    }
  }

  _handleCloseOnClick(evt) {
    if (evt.target === this._imagePopup) {
      this._imagePopup.classList.remove('popup_opened');
    }
  }

  _handleCloseOnBtn() {
    this._imagePopup.classList.remove('popup_opened');
  }

  _setClosingListeners() {
    document.addEventListener('keydown', (evt) => {
      this._handleCloseOnEsc(evt);
    });
    this._imagePopup.addEventListener('click', (evt) => {
      this._handleCloseOnClick(evt);
    });
    this._popupCloseBtn.addEventListener('click', () => {
      this._handleCloseOnBtn();
    });
  }

  _handlePopupOpen() {
    this._setPopupElements();
    this._setClosingListeners();

    this._popupImg.src = this._url;
    this._popupImgTitle.textContent = this._title;
    this._popupImg = this._title;
    this._imagePopup.classList.add('popup_opened');
  }

  _setEventLiteners() {
    this._elementBtnLike.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    this._elementBtnDel.addEventListener('click', (evt) => {
      this._delCard(evt);
    });
    this._elementImage.addEventListener('click', () => {
      this._handlePopupOpen();
    });

  }

  createCard() {
    this._setCardElements();
    this._setPopupElements();

    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._url;
    this._elementImage.alt = this._title;

    this._setEventLiteners();

    return this._element;
  }

}

export { Card };
