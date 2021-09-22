// Imports and initial declarations

import { Card } from './card.js';
import { initialCards } from './initial-cards.js';
import {
  resetValidation,
  resetSubmitBtn,
  FormValidator
} from './FormValidator.js';

const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  popupError: ".popup__error",
  errorType: ".popup__error_type_"
}

const editBtn = document.querySelector('.profile__button-edit');
const addBtn = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.elements');
const addCardPopupBtn = document.querySelector('.popup__close_type_add');
const editCardPopupBtn = document.querySelector('.popup__close_type_edit');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const nameInput = editPopup.querySelector('#name-input');
const jobInput = editPopup.querySelector('#job-input');
const titleInput = addPopup.querySelector('#title-input');
const urlInput = addPopup.querySelector('#url-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addForm = document.querySelector('.popup__form_type_add-card');
const editForm = document.querySelector('.popup__form_type_edit-profile');
const formList = document.querySelectorAll(validationObject.formSelector);
const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseBtn = imagePopup.querySelector('.image-popup__button-close');
const popupImg = imagePopup.querySelector('.image-popup__image');
const popupImgTitle = imagePopup.querySelector('.image-popup__text');

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

imagePopupCloseBtn.addEventListener('click', () => closePopup(imagePopup));

function openImagePopup(title, url) {
  popupImg.src = url;
  popupImg.alt = title;
  popupImgTitle.textContent = title;
  openPopup(imagePopup);
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

addBtn.addEventListener('click', () => {
  addForm.reset();
  openPopup(addPopup);
});

addCardPopupBtn.addEventListener('click', () => closePopup(addPopup));

editBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

editForm.addEventListener('submit', () => {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
});

editCardPopupBtn.addEventListener('click', () => closePopup(editPopup));

addForm.addEventListener('submit', () => {
  cardsContainer.prepend(new Card(titleInput.value,
    urlInput.value,
    "#element-template", { handlePopupOpen: openImagePopup }).createCard());
  closePopup(addPopup);
});

// Creating initial cards.

initialCards.forEach(card => {
  cardsContainer.append(new Card(card.name,
    card.link,
    "#element-template", { handlePopupOpen: openImagePopup }).createCard());
});

// Setting form validation for all forms.

formList.forEach(formElement => {
  new FormValidator(validationObject, formElement).enableValidation();
});
