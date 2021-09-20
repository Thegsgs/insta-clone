// Imports and initial declarations

import { initialCards } from './initial-cards.js';
import {
  resetValidation,
  enableValidation,
  resetSubmitBtn
} from './FormValidator.js';

const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.image-popup');
const addCardPopupBtn = document.querySelector('.popup__close_type_add');
const editCardPopupBtn = document.querySelector('.popup__close_type_edit');
const imageCardPopupBtn = document.querySelector('.image-popup__button-close');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const nameInput = editPopup.querySelector('#name-input');
const jobInput = editPopup.querySelector('#job-input');
const titleInput = addPopup.querySelector('#title-input');
const urlInput = addPopup.querySelector('#url-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addForm = document.querySelector('.popup__form_type_add-card');

// Opening both forms and adding cards/editing profile

function closeOnClick(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target === popup) {
    closePopup(popup);
  }
}

function closeOnEscape(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function addClosingListeners(popup) {
  document.addEventListener('keydown', closeOnEscape);
  popup.addEventListener('click', closeOnClick);
}

function removeClosingListeners(popup) {
  document.removeEventListener('keydown', closeOnEscape);
  popup.removeEventListener('click', closeOnClick);
}

function closePopup(popup) {
  resetSubmitBtn(popup, validationObject);
  resetValidation(popup, validationObject);
  removeClosingListeners(popup);
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  addClosingListeners(popup);
  popup.classList.add('popup_opened');
}

addButton.addEventListener('click', () => {
  addForm.reset();
  openPopup(addPopup);
});

addCardPopupBtn.addEventListener('click', () => {
  closePopup(addPopup);
});

const popupImage = document.querySelector('.image-popup__image');
const popupImageTitle = document.querySelector('.image-popup__text');

// Card class

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

  createCard() {
    this._setCardElements();

    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._url;
    this._elementImage.alt = this._title;

    this._setEventLiteners();

    return this._element;
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

  _toggleLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
  }

  _delCard(evt) {
    evt.target.closest('.element').remove();
  }

  _handlePopupOpen() {
    popupImage.src = this._url;
    popupImageTitle.textContent = this._title;
    popupImage.alt = this._title;
    openPopup(imagePopup);
  }

}

// end

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

editPopup.addEventListener('submit', () => {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
});

editCardPopupBtn.addEventListener('click', () => {
  closePopup(editPopup);
});

addPopup.addEventListener('submit', () => {
  cardsContainer.prepend(new Card(titleInput.value, urlInput.value, "#element-template").createCard());
  closePopup(addPopup);
});

imageCardPopupBtn.addEventListener('click', () => {
  closePopup(imagePopup);
});

initialCards.forEach(card => {
  cardsContainer.append(new Card(card.name, card.link, "#element-template").createCard());
});

enableValidation(validationObject);
