// Imports
import Api from './Api.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import PopupWithConfirm from './PopupWithConfirm.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Validation object with settings for form validation class
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

// Page elements and misc
const editBtn = document.querySelector('.profile__button-edit');
const addBtn = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.elements');
const formList = document.querySelectorAll(validationObject.formSelector);

// addPopup elements
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector('.popup__form');
const addPopupCloseBtn = addPopup.querySelector('.popup__close');
const addPopupSubmitBtn = addPopup.querySelector('.popup__submit');
const titleInput = addPopup.querySelector('#title-input');
const urlInput = addPopup.querySelector('#url-input-add');

// editPopup elements
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('.popup__form');
const editPopupCloseBtn = editPopup.querySelector('.popup__close');
const editPopupSubmitBtn = editPopup.querySelector('.popup__submit');
const nameInput = editPopup.querySelector('#name-input');
const jobInput = editPopup.querySelector('#job-input');

// Popup for changing profile img elements
const imgChangePopup = document.querySelector('.popup_type_profile-picture');
const imgChangeSubmitBtn = imgChangePopup.querySelector('.popup__submit');
const imgInput = imgChangePopup.querySelector('#url-input-profile');
const imgChangeForm = imgChangePopup.querySelector('.popup__form');
const imgChangeBtn = imgChangePopup.querySelector('.popup__close');

// Popup for confirming card deletion elements
const confirmPopup = document.querySelector('.popup_type_confirm');
const confirmPopupBtn = confirmPopup.querySelector('.popup__close');
const confirmPopupForm = confirmPopup.querySelector('.popup__form');
const confirmPopupDelBtn = confirmPopup.querySelector('.popup__submit');

// Profile elements
export const nameField = document.querySelector('.profile__name');
export const jobField = document.querySelector('.profile__job');
const userAvatar = document.querySelector('.profile__avatar');
const imgOverlay = document.querySelector('.profile__avatar-overlay');

// Image popup
const imagePopup = document.querySelector('.image-popup');

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "bd66ac46-8c3d-415b-b4fe-d77bd0af375a",
    "Content-Type": "application/json"
  }
});


// Creating UserInfo class instance
const userInfo = new UserInfo({ name: "", job: "" });

// Function for adding the card to the DOM
const addDomCard = (recievedCard) => {
  const card = new Card(recievedCard, api.getUserInfo(),
    "#element-template", {
      handlePopupOpen: () => {
        englargedImgPopup.open(recievedCard.link, recievedCard.name);
      },
      handleDelete: (delCard, cardId, ) => {
        confirmDelPopup.open(delCard, cardId, confirmPopupDelBtn);
      }
    }).createCard();
  return card;
}

// Enlarged image popup
const englargedImgPopup = new PopupWithImage(imagePopup);

// Popup for confirming card deletion
const confirmDelPopup = new PopupWithConfirm(
  confirmPopup,
  confirmPopupBtn,
  confirmPopupForm);

// Profile editing popup
const editProfilePopup = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    api.uploadUserInfo({ name: inputs.name, job: inputs.job }, editPopupSubmitBtn)
      .then(res => userInfo.setUserInfo({ name: res.name, job: res.about }));

  },
  handlePopupOpen: () => {
    api.getUserInfo().then(userData => {
      nameInput.value = userData.name;
      jobInput.value = userData.about;
    });
  },
}, {
  popup: editPopup,
  form: editForm,
  button: editPopupCloseBtn
});

// Profile picture changing popup
const editProfileImgPopup = new PopupWithForm({
  handleFormSubmit: () => {
    api.uploadProfileImg(imgInput.value, imgChangeSubmitBtn)
      .then(res => userAvatar.src = res.avatar);
  },
  handlePopupOpen: () => {
    imgInput.value = "";
  }
}, {
  popup: imgChangePopup,
  form: imgChangeForm,
  button: imgChangeBtn
});

// Popup for adding new images
const addCardPopup = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    api.uploadCard(inputs.name, inputs.link, addPopupSubmitBtn).then(recievedCard => cardsContainer.prepend(addDomCard(recievedCard)));
  },
  handlePopupOpen: () => {
    titleInput.value = "";
    urlInput.value = "";
    addCardPopup.setEventListeners();
  }
}, {
  popup: addPopup,
  form: addForm,
  button: addPopupCloseBtn
});

// Form validation for all forms
formList.forEach(formElement => {
  new FormValidator(validationObject, formElement).enableValidation();
});

// Button event listeners
editBtn.addEventListener('click', () => {
  editProfilePopup.open();
});

addBtn.addEventListener('click', () => {
  addCardPopup.open();
});

imgOverlay.addEventListener('click', () => {
  editProfileImgPopup.open();
});

// Getting data upon site loading
Promise.all([api.getUserInfo(), api.getInitialCards(), api.getUserImg()])
  .then(([userData, initialCardsData, userImg]) => {
    // Rendering initial cards
    const cardList = new Section({
      items: initialCardsData,
      renderer: (cardElement) => {
        const finishedCard = addDomCard(cardElement);
        cardList.addItem(finishedCard);
      }
    }, '.elements')
    cardList.renderer();


    // Setting initial user data
    nameField.textContent = userData.name;
    jobField.textContent = userData.about;
    userAvatar.src = userImg.avatar;
  })
  .catch(error => console.log(`Error, ${error}`));
