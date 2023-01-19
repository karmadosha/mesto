let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let nameInput = document.querySelector('.form__item_user_name');
let aboutInput = document.querySelector('.form__item_user_about');
let formEdit = document.querySelector('.form');

function toggleForm() {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  toggleForm();
}

editBtn.addEventListener('click', toggleForm);
closeBtn.addEventListener('click', toggleForm);
formEdit.addEventListener('submit', formSubmitHandler);