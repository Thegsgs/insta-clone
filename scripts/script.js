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
const imagePopup = document.querySelector('.image-popup');



function editPopupClose() {

  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    popup.classList.add('popup_opened');
  }
}

editButton.addEventListener('click', editPopupOpen);
closeButton.addEventListener('click', editPopupClose);

function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
}

editForm.addEventListener('submit', handleEditSubmit);

const cardTemplate = document.querySelector("#element-template").content;
const popupTemplate = document.querySelector('#popup-template').content;
const addPopup = popupTemplate.querySelector('.popup').cloneNode(true);


const initialCards = [{
    name: "Yosemite Valley",
    link: "https://images.pexels.com/photos/3481026/pexels-photo-3481026.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    name: "Lake Louise",
    link: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
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

function addCard(title, url) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = title;
  cardElement.querySelector('.element__image').src = url;
  cardElement.querySelector('.element__button-like').addEventListener('click', function addLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  cardElement.querySelector('.element__button-delete').addEventListener('click', function cardRemove(evt) {
    evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__image').addEventListener('click', function imageToggle() {
    document.querySelector('.image-popup__image').src = url;
    document.querySelector('.image-popup__text').textContent = title;
    document.querySelector('.image-popup').classList.toggle('image-popup_opened');
  });
  return cardElement;
}

initialCards.forEach(card => {
  cardsContainer.append(addCard(card.name, card.link));
});

function handleAddSubmit(evt) {
  title = addPopup.querySelector('.popup__input_line_1').value;
  url = addPopup.querySelector('.popup__input_line_2').value;
  cardsContainer.prepend(addCard(title, url));
  evt.preventDefault();
  addPopup.classList.remove('popup_opened');
}

function editPopupOpen() {
  addPopup.querySelector(".popup__title").textContent = "Edit profile";
  addPopup.querySelector('.popup__input_line_1').setAttribute('placeholder', 'Name');
  addPopup.querySelector('.popup__input_line_2').setAttribute('placeholder', 'About me');
  addPopup.querySelector('.popup__button-submit').value = "Save";
  document.querySelector('.page').append(addPopup);
  addPopup.classList.add('popup_opened');

  addPopup.querySelector('.popup__button-close').addEventListener('click', function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
  });
}

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

addPopup.querySelector('.popup__container').addEventListener('submit', handleAddSubmit);
addButton.addEventListener('click', addPopupOpen);

const imageClose = document.querySelector('.image-popup__button-close');

function imagePopupClose() {
  document.querySelector('.image-popup').classList.toggle('image-popup_opened');
}

imageClose.addEventListener('click', imagePopupClose);
