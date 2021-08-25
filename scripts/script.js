const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.image-popup');
const editCardPopupBtn = document.querySelector('.edit-popup__button-close');
const addCardPopupBtn = document.querySelector('.add-popup__button-close');
const imageCardPopupBtn = document.querySelector('.image-popup__button-close');
const cardTemplate = document.querySelector("#element-template").content;
const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
const editForm = document.querySelector('.edit-popup__form');
const nameInput = editPopup.querySelector('.edit-popup__input_type_name');
const jobInput = editPopup.querySelector('.edit-popup__input_type_job');
const titleInput = addPopup.querySelector('.add-popup__input_type_title');
const urlInput = addPopup.querySelector('.add-popup__input_type_url');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

/* Opening both forms and adding cards/editing profile */

function closePopup(popup) {
  popup.classList.remove('opened');
}

function openPopup(popup) {
  popup.classList.add('opened');
}

addButton.addEventListener('click', () => {
  titleInput.value = '';
  urlInput.value = '';
  openPopup(addPopup);
});

addCardPopupBtn.addEventListener('click', () => {
  closePopup(addPopup);
});

addPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  cardsContainer.prepend(cardBuilder(titleInput.value, urlInput.value));
  closePopup(addPopup);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
});

editCardPopupBtn.addEventListener('click', () => {
  closePopup(editPopup);
});

/* Creating initial cards and handling opening and closing the image popups */

const initialCards = [{
    name: "Temple",
    link: "https://images.pexels.com/photos/3481026/pexels-photo-3481026.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    name: "River",
    link: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    name: "Forest",
    link: "https://images.pexels.com/photos/1995730/pexels-photo-1995730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    name: "Cliffs",
    link: "https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    name: "Sunset",
    link: "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
    name: "Beach",
    link: "https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  }
];

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
