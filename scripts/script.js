const editForm = document.querySelector('.popup__container');
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputJob = document.querySelector('.popup__input_type_job');
const inputName = document.querySelector('.popup__input_type_name');
const addButton = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.elements');


function editPopupClose() {

  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    popup.classList.add('popup_opened');
  }
}

editButton.addEventListener('click', editPopupClose);
closeButton.addEventListener('click', editPopupClose);

function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
}

editForm.addEventListener('submit', handleEditSubmit);

const initialCards = [{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
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

const cardTemplate = document.querySelector("#element-template").content;
const popupTemplate = document.querySelector('#popup-template').content;
const addPopup = popupTemplate.querySelector('.popup').cloneNode(true);

function addCardListeners(cardElement) {
  cardElement.querySelector('.element__button-like').addEventListener('click', function addLike(evt) {
    evt.target.src = './images/button-like-active.svg';
  });

  cardElement.querySelector('.element__button-delete').addEventListener('click', function cardRemove(evt) {
    evt.target.closest('.element').remove();
  });
}

initialCards.forEach(card => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  addCardListeners(cardElement);
  cardsContainer.append(cardElement);
});

function addPopupOpen() {

  addPopup.querySelector(".popup__title").textContent = "New place";
  addPopup.querySelector('.popup__input_line_1').setAttribute('placeholder', 'Title');
  addPopup.querySelector('.popup__input_line_2').setAttribute('placeholder', 'Image link');
  addPopup.querySelector('.popup__button-submit').value = "Create";
  document.querySelector('.page').append(addPopup);
  addPopup.classList.add('popup_opened');

  addPopup.querySelector('.popup__button-close').addEventListener('click', function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
  });
}

function handleAddSubmit(evt) {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = addPopup.querySelector('.popup__input_line_1').value;
  cardElement.querySelector('.element__image').src = addPopup.querySelector('.popup__input_line_2').value;
  cardsContainer.prepend(cardElement);
  addCardListeners(cardElement);
  evt.preventDefault();
  addPopup.classList.remove('popup_opened');
}

addPopup.querySelector('.popup__container').addEventListener('submit', handleAddSubmit);
addButton.addEventListener('click', addPopupOpen);
