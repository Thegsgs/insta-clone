// Imports
import './index.css';
import * as constants from '../constants.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "bd66ac46-8c3d-415b-b4fe-d77bd0af375a",
    "Content-Type": "application/json"
  }
});

// Getting data upon site loading
Promise.all([api.getUserInfo(), api.getInitialCards(), api.getUserImg()])
  .then(([userData, initialCardsData, userImg]) => {

    // Function for adding the card to the DOM
    const addDomCard = (recievedCard) => {
      const card = new Card(recievedCard, userData,
        "#element-template", {
          handlePopupOpen: () => {
            englargedImgPopup.open(recievedCard.link, recievedCard.name);
          },
          handleDelete: (delCard, cardId, ) => {
            confirmDelPopup.open(delCard, cardId, constants.confirmPopupDelBtn);
          }
        }).createCard();
      return card;
    }

    // Profile editing popup
    const editProfilePopup = new PopupWithForm({
      handleFormSubmit: (inputs) => {
        api.uploadUserInfo({ name: inputs.name, job: inputs.job }, constants.editPopupSubmitBtn)
          .then(res => {
            userInfo.setUserInfo({ name: res.name, job: res.about });
            editProfilePopup.close();
          });

      },
      handlePopupOpen: () => {
        constants.nameInput.value = constants.nameField.textContent;
        constants.jobInput.value = constants.jobField.textContent;
      },
    }, {
      popup: constants.editPopup,
      form: constants.editForm,
    });

    // Rendering initial cards
    const cardList = new Section({
      items: initialCardsData,
      renderer: (cardElement) => {
        cardList.addItem(addDomCard(cardElement));
      }
    }, '.elements');
    cardList.renderer();

    // Setting initial user data
    constants.nameField.textContent = userData.name;
    constants.jobField.textContent = userData.about;
    constants.userAvatar.src = userImg.avatar;

    // Image popup selector
    const imagePopup = document.querySelector('.image-popup');

    // Creating UserInfo class instance
    const userInfo = new UserInfo({ name: "", job: "" });

    // Enlarged image popup
    const englargedImgPopup = new PopupWithImage(imagePopup);

    // Popup for confirming card deletion
    const confirmDelPopup = new PopupWithConfirm(
      constants.confirmPopup,
      constants.confirmPopupForm);

    // Profile picture changing popup
    const editProfileImgPopup = new PopupWithForm({
      handleFormSubmit: () => {
        api.uploadProfileImg(constants.imgInput.value, constants.imgChangeSubmitBtn)
          .then(res => {
            constants.userAvatar.src = res.avatar;
            editProfileImgPopup.close();
          });
      },
      handlePopupOpen: () => {
        constants.imgInput.value = "";
      }
    }, {
      popup: constants.imgChangePopup,
      form: constants.imgChangeForm,
    });

    // Popup for adding new images
    const addCardPopup = new PopupWithForm({
      handleFormSubmit: (inputs) => {
        api.uploadCard(inputs.name, inputs.link, constants.addPopupSubmitBtn)
          .then(recievedCard => {
            constants.cardsContainer.prepend(addDomCard(recievedCard));
            addCardPopup.close();
          });
      },
      handlePopupOpen: () => {
        constants.titleInput.value = "";
        constants.urlInput.value = "";
      }
    }, {
      popup: constants.addPopup,
      form: constants.addForm,
    });

    // Form validation for all forms
    constants.formList.forEach(formElement => {
      new FormValidator(constants.validationObject, formElement).enableValidation();
    });

    // Button event listeners
    constants.addBtn.addEventListener('click', () => {
      addCardPopup.open();
    });

    constants.imgOverlay.addEventListener('click', () => {
      editProfileImgPopup.open();
    });

    constants.editBtn.addEventListener('click', () => {
      editProfilePopup.open();
    });
  }).catch(error => console.log(`Error, ${error}`));
