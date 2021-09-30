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
const addForm = document.querySelector('.popup__form_type_add-card');
const editForm = document.querySelector('.popup__form_type_edit-profile');
const formList = document.querySelectorAll(validationObject.formSelector);
const imagePopup = document.querySelector('.image-popup');

const cardCreation = (title, link) => {
  const card = new Card(
    title,
    link,
    "#element-template", {
      handlePopupOpen: () => {
        const createPopup = new PopupWithImage({ title: title, url: link }, imagePopup);
        createPopup.createPopup();
        createPopup.open();
      }
    }).createCard();
  return card;
}

// Creating initial cards.

const cardList = new Section({
  items: initialCards,
  renderer: (cardElement) => {
    const finishedCard = cardCreation(cardElement.name, cardElement.link);
    cardList.addItem(finishedCard);
  }
}, '.elements');

// Popup handlers

const userInfo = new UserInfo({ name: "", job: "" });

const editPopupClass = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    userInfo.setUserInfo({ name: inputs.name, job: inputs.job });
  },
  handlePopupOpen: () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    editPopupClass.setEventListeners();
  },
}, {
  popup: editPopup,
  form: editForm,
  button: editPopupBtn
});

const addPopupClass = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    cardsContainer.prepend(cardCreation(inputs.title, inputs.url));
  },
  handlePopupOpen: () => {
    titleInput.value = "";
    urlInput.value = "";
    addPopupClass.setEventListeners();
  },
}, {
  popup: addPopup,
  form: addForm,
  button: addPopupBtn
});


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
