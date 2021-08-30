// Imports and initial declarations

import { initialCards } from './initial-cards.js';
import {
  resetValidation,
  enableValidation,
  resetSubmitBtn
} from './validate.js';

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
const cardTemplate = document.querySelector("#element-template").content;
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

function closeOnClick(evt, popup) {
  if (evt.target === popup) {
    closePopup(popup);
  }
}

function closeOnEscape(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function addClosingListeners(popup) {
  document.addEventListener('keydown', (evt) => {
    closeOnEscape(evt, popup);
  });
  popup.addEventListener('click', (evt) => {
    closeOnClick(evt, popup);
  });
}

function removeClosingListeners(popup) {
  document.removeEventListener('keydown', (evt) => {
    closeOnEscape(evt, popup);
  });
  popup.removeEventListener('click', (evt) => {
    closeOnClick(evt, popup);
  });
}

function closePopup(popup) {
  resetSubmitBtn(popup, validationObject);
  resetValidation(popup, validationObject);
  removeClosingListeners(popup);
  popup.classList.remove('opened');
}

function openPopup(popup) {
  addClosingListeners(popup);
  popup.classList.add('opened');
}

addButton.addEventListener('click', () => {
  addForm.reset();
  openPopup(addPopup);
});

addCardPopupBtn.addEventListener('click', () => {
  closePopup(addPopup);
});

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

// Creating initial cards and handling opening and closing the image popups

const popupImage = document.querySelector('.image-popup__image');
const popupImageTitle = document.querySelector('.image-popup__text');

function createCard(title, url) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  const cardLikeBtn = cardElement.querySelector('.element__button-like');
  const cardDelBtn = cardElement.querySelector('.element__button-delete');
  cardTitle.textContent = title;
  cardImage.src = url;
  cardImage.alt = title;

  cardLikeBtn.addEventListener('click', evt => {
    evt.target.classList.toggle('element__button-like_active');
  });
  cardDelBtn.addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });
  cardImage.addEventListener('click', () => {
    popupImage.src = url;
    popupImageTitle.textContent = title;
    popupImage.alt = title;
    openPopup(imagePopup);
  });
  return cardElement;
}

addPopup.addEventListener('submit', () => {
  cardsContainer.prepend(createCard(titleInput.value, urlInput.value));
  closePopup(addPopup);
});

imageCardPopupBtn.addEventListener('click', () => {
  closePopup(imagePopup);
});

initialCards.forEach(card => {
  cardsContainer.append(createCard(card.name, card.link));
});

enableValidation(validationObject);
