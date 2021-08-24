const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.image-popup');
const editCloseButton = document.querySelector('.edit-popup__button-close');
const addCloseButton = document.querySelector('.add-popup__button-close');
const cardTemplate = document.querySelector("#element-template").content;
const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
const editForm = document.querySelector('.edit-popup__form');
let nameInput = editPopup.querySelector('.edit-popup__input_type_name');
let jobInput = editPopup.querySelector('.edit-popup__input_type_job');
let titleInput = addPopup.querySelector('.add-popup__input_type_title');
let urlInput = addPopup.querySelector('.add-popup__input_type_url');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

/* Opening both form and adding cards/editing profile */

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
  addCloseButton.addEventListener('click', () => {
    closePopup(addPopup);
  });
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
  editCloseButton.addEventListener('click', () => {
    closePopup(editPopup);
  });
  editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editPopup);
  });
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

let popupImageSrc = document.querySelector('.image-popup__image');
let popupImageTitle = document.querySelector('.image-popup__text');
let popupImageAlt = document.querySelector('.image-popup__image');

function cardBuilder(title, url) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = title;
  cardElement.querySelector('.element__image').src = url;
  cardElement.querySelector('.element__image').alt = title;
  cardElement.querySelector('.element__button-like').addEventListener('click', evt => {
    evt.target.classList.toggle('element__button-like_active');
  });
  cardElement.querySelector('.element__button-delete').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__image').addEventListener('click', () => {
    popupImageSrc.src = url;
    popupImageTitle.textContent = title;
    popupImageAlt.textContent = title;
    openPopup(imagePopup);
    document.querySelector('.image-popup__button-close').addEventListener('click', () => {
      closePopup(imagePopup);
    });
  });
  return cardElement;
}

initialCards.forEach(card => {
  cardsContainer.append(cardBuilder(card.name, card.link));
});
