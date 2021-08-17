let editForm = document.querySelector('.edit-form');
let overlay = document.querySelector('.overlay');
let editButton = document.querySelector('.profile__button-edit')
let closeButton = document.querySelector('.edit-form__button-close')

function makevisible() {
  overlay.classList.add('visible');
}

function makeinvisible() {
  overlay.classList.remove('visible');
}

editButton.addEventListener('click', makevisible);
closeButton.addEventListener('click', makeinvisible);

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let saveButton = document.querySelector('.edit-form__button-submit');
let inputJob = document.querySelector('.edit-form__input_type_job');
let inputName = document.querySelector('.edit-form__input_type_name');

inputName.value = profileName.textContent;
inputJob.value = profileJob.textContent;

function changeInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  overlay.classList.remove('visible');
}

saveButton.addEventListener('click', changeInfo);
