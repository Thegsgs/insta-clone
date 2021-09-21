class Card {
  constructor(title, url, selector, { handlePopupOpen }) {
    this._title = title;
    this._url = url;
    this._selector = selector;
    this._handlePopupOpen = handlePopupOpen;
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

  _toggleLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
  }

  _delCard(evt) {
    evt.target.closest('.element').remove();
  }

  _setEventLiteners() {
    this._elementBtnLike.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    this._elementBtnDel.addEventListener('click', (evt) => {
      this._delCard(evt);
    });
    this._elementImage.addEventListener('click', () => {
      this._handlePopupOpen(this._title, this._url);
    });

  }

  createCard() {
    this._setCardElements();

    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._url;
    this._elementImage.alt = this._title;

    this._setEventLiteners();

    return this._element;
  }

}

export { Card };
