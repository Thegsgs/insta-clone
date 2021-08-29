// Imports and initial declarations

import { initialCards } from './initial-cards.js';
import { resetValidation } from './validate.js';
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
const popupContainer = document.querySelector('.popup__container');

const valObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

// Opening both forms and adding cards/editing profile

function closePopup(popup) {
  popup.classList.remove('opened');
  resetValidation(popup, valObj);
}

function openPopup(popup) {
  popup.classList.add('opened');

  if (popup.querySelector(valObj.submitButtonSelector) !== null) {
    popup.querySelector(valObj.submitButtonSelector).classList.add(valObj.inactiveButtonClass);
  }

  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });

  popup.addEventListener('click', evt => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });

}

addButton.addEventListener('click', () => {
  titleInput.value = '';
  urlInput.value = '';
  openPopup(addPopup);
});

addCardPopupBtn.addEventListener('click', () => {
  closePopup(addPopup);
});

addPopup.addEventListener('submit', () => {
  cardsContainer.prepend(cardBuilder(titleInput.value, urlInput.value));
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


function cardBuilder(title, url) {
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

imageCardPopupBtn.addEventListener('click', () => {
  closePopup(imagePopup);
});

initialCards.forEach(card => {
  cardsContainer.append(cardBuilder(card.name, card.link));
});

// Input validation for all forms

const showInputErorr = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.add(valObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(valObj.errorClass);
}

const hideInputError = (formElement, inputElement, ) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.remove(valObj.inputErrorClass);
  errorElement.classList.remove(valObj.errorClass);
  errorElement.textContent = "";
}


const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputErorr(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(valObj.inactiveButtonClass);
  } else { buttonElement.classList.remove(valObj.inactiveButtonClass); }
}


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(valObj.inputSelector));
  const buttonElement = formElement.querySelector(valObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(valObj.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};



enableValidation();
