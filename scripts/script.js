const editButton = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addButton = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.image-popup');
const popupTemplate = document.querySelector('#popup-template').content;
const addPopup = popupTemplate.querySelector('.popup').cloneNode(true);
const editPopup = popupTemplate.querySelector('.popup').cloneNode(true);
const editCloseButton = document.querySelector('.popup__button-close');
const cardTemplate = document.querySelector("#element-template").content;

/* Creating edit profile form on page load as well as editing the profile */

function editPopupCreate() {
  editPopup.querySelector(".popup__title").textContent = "Edit profile";
  editPopup.querySelector('.popup__input_line_1').setAttribute('placeholder', 'Name');
  editPopup.querySelector('.popup__input_line_2').setAttribute('placeholder', 'About me');
  editPopup.querySelector('.popup__input_line_1').value = profileName.textContent;
  editPopup.querySelector('.popup__input_line_2').value = profileJob.textContent;
  editPopup.querySelector('.popup__button-submit').value = "Save";
  document.querySelector('.page').append(editPopup);

  editPopup.querySelector('.popup__button-close').addEventListener('click', () => {
    editPopup.classList.remove('popup_opened');
  });

}
editPopupCreate();

function editPopupOpen() {
  editPopup.classList.add('popup_opened');
}

editButton.addEventListener('click', editPopupOpen);

function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editPopup.querySelector('.popup__input_line_1').value;
  profileJob.textContent = editPopup.querySelector('.popup__input_line_2').value;
  editPopup.classList.remove('popup_opened');
}

editPopup.addEventListener('submit', handleEditSubmit);

/* Creating initial cards as well as creating the card adding from on load and adding cards */

const initialCards = [{
    name: "Temple",
    link: "https://images.pexels.com/photos/3481026/pexels-photo-3481026.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    name: "Lake ",
    link: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    name: "Forest",
    link: "https://images.pexels.com/photos/1995730/pexels-photo-1995730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function cardBuilder(title, url) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = title;
  cardElement.querySelector('.element__image').src = url;
  cardElement.querySelector('.element__button-like').addEventListener('click', evt => {
    evt.target.classList.toggle('element__button-like_active');
  });
  cardElement.querySelector('.element__button-delete').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__image').addEventListener('click', () => {
    document.querySelector('.image-popup__image').src = url;
    document.querySelector('.image-popup__text').textContent = title;
    document.querySelector('.image-popup').classList.add('image-popup_opened');
  });
  return cardElement;
}

initialCards.forEach(card => {
  cardsContainer.append(cardBuilder(card.name, card.link));
});

function handleAddSubmit(evt) {
  title = addPopup.querySelector('.popup__input_line_1').value;
  url = addPopup.querySelector('.popup__input_line_2').value;
  cardsContainer.prepend(cardBuilder(title, url));
  evt.preventDefault();
  addPopup.classList.remove('popup_opened');
}

addPopup.querySelector('.popup__container').addEventListener('submit', handleAddSubmit);

function addPopupCreate() {

  addPopup.querySelector(".popup__title").textContent = "New place";
  addPopup.querySelector('.popup__input_line_1').setAttribute('placeholder', 'Title');
  addPopup.querySelector('.popup__input_line_2').setAttribute('placeholder', 'Image link');
  addPopup.querySelector('.popup__button-submit').value = "Create";
  document.querySelector('.page').append(addPopup);


  addPopup.querySelector('.popup__button-close').addEventListener('click', () => {
    addPopup.classList.remove('popup_opened');
  });
}
addPopupCreate();

function addPopupOpen() {
  addPopup.classList.add('popup_opened');
}

addButton.addEventListener('click', addPopupOpen);

const imageClose = document.querySelector('.image-popup__button-close');

function imagePopupClose() {
  document.querySelector('.image-popup').classList.remove('image-popup_opened');
}

imageClose.addEventListener('click', imagePopupClose);
