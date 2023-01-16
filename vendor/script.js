let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-btn');
let profileName = document.querySelector('.profile__name');
let aboutInfo = document.querySelector('.profile__about');
let saveBtn = document.querySelector('.popup__btn');
let closeBtn = document.querySelector('.popup__close');
let nameInput = document.querySelector('.popup__name');
let aboutInput = document.querySelector('.popup__about');
let formEdit = document.querySelector('.edit-form');

function openEditForm() {
  popup.classList.toggle('popup_open'); 
  nameInput.value = profileName.textContent;
  aboutInput.value = aboutInfo.textContent;
}

closeBtn.addEventListener("click", closeForm);
function closeForm() {
    popup.classList.toggle('popup_open');
}
editBtn.addEventListener("click", openEditForm);

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  aboutInfo.textContent = aboutInput.value;
  closeForm();
}

formEdit.addEventListener('submit', formSubmitHandler);