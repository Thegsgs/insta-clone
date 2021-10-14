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
export const editBtn = document.querySelector('.profile__button-edit');
export const addBtn = document.querySelector('.profile__button-add');
export const cardsContainer = document.querySelector('.elements');
export const formList = document.querySelectorAll(validationObject.formSelector);

// addPopup elements
export const addPopup = document.querySelector('.popup_type_add');
export const addForm = addPopup.querySelector('.popup__form');
export const addPopupCloseBtn = addPopup.querySelector('.popup__close');
export const addPopupSubmitBtn = addPopup.querySelector('.popup__submit');
export const titleInput = addPopup.querySelector('#title-input');
export const urlInput = addPopup.querySelector('#url-input');

// editPopup elements
export const editPopup = document.querySelector('.popup_type_edit');
export const editForm = editPopup.querySelector('.popup__form');
export const editPopupCloseBtn = editPopup.querySelector('.popup__close');
export const editPopupSubmitBtn = editPopup.querySelector('.popup__submit');
export const nameInput = editPopup.querySelector('#name-input');
export const jobInput = editPopup.querySelector('#job-input');

// Popup for changing profile img elements
export const imgChangePopup = document.querySelector('.popup_type_profile-picture');
export const imgChangeSubmitBtn = imgChangePopup.querySelector('.popup__submit');
export const imgInput = imgChangePopup.querySelector('#url-input');
export const imgChangeForm = imgChangePopup.querySelector('.popup__form');
export const imgChangeBtn = imgChangePopup.querySelector('.popup__close');

// Popup for confirming card deletion elements
export const confirmPopup = document.querySelector('.popup_type_confirm');
export const confirmPopupBtn = confirmPopup.querySelector('.popup__close');
export const confirmPopupForm = confirmPopup.querySelector('.popup__form');
export const confirmPopupDelBtn = confirmPopup.querySelector('.popup__submit');

// Profile elements
export const nameField = document.querySelector('.profile__name');
export const jobField = document.querySelector('.profile__job');
export const userAvatar = document.querySelector('.profile__avatar');
export const imgOverlay = document.querySelector('.profile__avatar-overlay');

// Image popup
export const imagePopup = document.querySelector('.image-popup');
