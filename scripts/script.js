let editForm = document.querySelector('.popup__container');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let inputJob = document.querySelector('.popup__input_type_job');
let inputName = document.querySelector('.popup__input_type_name');

function togglePopup() {

  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    popup.classList.add('popup_opened');
  }
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
}

editForm.addEventListener('submit', handleFormSubmit);
