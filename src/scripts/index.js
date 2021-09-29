// Imports and initial declarations

import { Card } from './Card.js';
import { initialCards } from './initial-cards.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

export const validationObject = {
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
const addPopupBtn = document.querySelector('.popup__close_type_add');
const editPopupBtn = document.querySelector('.popup__close_type_edit');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
export const nameInput = editPopup.querySelector('#name-input');
export const jobInput = editPopup.querySelector('#job-input');
export const titleInput = addPopup.querySelector('#title-input');
export const urlInput = addPopup.querySelector('#url-input');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
const addForm = document.querySelector('.popup__form_type_add-card');
const editForm = document.querySelector('.popup__form_type_edit-profile');
const formList = document.querySelectorAll(validationObject.formSelector);
const imagePopup = document.querySelector('.image-popup');

// Creating initial cards.

const cardList = new Section({
  items: initialCards,
  renderer: (cardElement) => {
    const card = new Card(
      cardElement.name,
      cardElement.link,
      "#element-template", {
        handlePopupOpen: () => {
          const createPopup = new PopupWithImage({ url: cardElement.link, title: cardElement.name },
            imagePopup);
          createPopup.setEventListeners();
          createPopup.open();
        }
      })
    const finishedCard = card.createCard();
    cardList.addItem(finishedCard);
  }
}, '.elements');

// Popup handlers

const editPopupClass = new PopupWithForm({
  inputField1: nameInput,
  inputField2: jobInput
}, {
  handleFormSubmit: (inputObj) => {
    const postUser = new UserInfo({ name: inputObj.input1, job: inputObj.input2 });
    postUser.setUserInfo();
  },
  handlePopupOpen: () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  },
}, {
  popup: editPopup,
  form: editForm,
  button: editPopupBtn
});
editPopupClass.setEventListeners();

const addPopupClass = new PopupWithForm({
  inputField1: titleInput,
  inputField2: urlInput
}, {
  handleFormSubmit: () => {
    cardsContainer.prepend(new Card(
      titleInput.value,
      urlInput.value,
      "#element-template", {
        handlePopupOpen: (inputObj) => {
          const createPopup = new PopupWithImage({ url: inputObj.input1, title: inputObj.input2 },
            imagePopup);
          createPopup.setEventListeners();
          createPopup.open();
        }
      }).createCard());
  },
  handlePopupOpen: () => {
    titleInput.value = "";
    urlInput.value = "";
  },
}, {
  popup: addPopup,
  form: addForm,
  button: addPopupBtn
});
addPopupClass.setEventListeners();

// Form validation

formList.forEach(formElement => {
  new FormValidator(validationObject, formElement).enableValidation();
});

// Button event listeners

editBtn.addEventListener('click', () => {
  editPopupClass.open();
});

addBtn.addEventListener('click', () => {
  addPopupClass.open();
});

// Rendering initial cards

cardList.renderer();
