let editForm = document.querySelector('.popup__container');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.popup__container__button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let saveButton = document.querySelector('.popup__container__button-submit');
let inputJob = document.querySelector('.popup__container__input_type_job');
let inputName = document.querySelector('.popup__container__input_type_name');

function togglepopup_opened() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else { popup.classList.add('popup_opened'); }
}

editButton.addEventListener('click', togglepopup_opened);
closeButton.addEventListener('click', togglepopup_opened);

function changeInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
}

saveButton.addEventListener('click', changeInfo);
