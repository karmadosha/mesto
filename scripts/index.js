import Card from "./Card.js";
import { config, initialCards } from "./constants.js";
import { FormValidator } from "./FormValidator.js";

const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.form__item_user_name');
const aboutInput = document.querySelector('.form__item_user_about');
const formProfileEdit = document.querySelector('.form_type_profile');
const profileEditBtn = document.querySelector('.profile__edit-btn');

const popupAddCard = document.querySelector('.popup_type_new-card');
const newCardAddBtn = document.querySelector('.profile__add-btn');
const formNewCard = document.querySelector('.form_type_card');
const cardName = document.querySelector('.form__item_card_name');
const cardPicture = document.querySelector('.form__item_card_about');

const popupImage = document.querySelector('.popup_type_big-picture');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const popupImagePicture = popupImage.querySelector('.popup__image');

const elementsContainer = document.querySelector('.elements');

const popups = Array.from(document.querySelectorAll('.popup'));

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEsc);
}

const openPopupProfile = () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;  
}

const openPopupImage = (name, link) => {
  openPopup(popupImage);
  popupImageTitle.textContent = name;
  popupImagePicture.src = link;
  popupImagePicture.alt = name;
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEsc);
};

const handleCloseByClick = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close-btn")) {
    closePopup(evt.currentTarget);
  }
};

const closeWithEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  };
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupProfile);
};

const createCard = (item) => {
  const card = new Card(item, '.element-template', openPopupImage).generateCard();
  return card;
};

const submitNewCard = (evt) => {
  evt.preventDefault();
  elementsContainer.prepend(createCard({
    link: cardPicture.value,
    name: cardName.value
  }))
  formNewCard.reset();
  closePopup(popupAddCard);
};

initialCards.forEach((item) => {
  elementsContainer.append(createCard(item));
});

const newCardFormValidation = new FormValidator(config, formNewCard);
const profileFormValidation = new FormValidator(config, formProfileEdit);
newCardFormValidation.enableValidation();
profileFormValidation.enableValidation();

profileEditBtn.addEventListener('click', () => {
  profileFormValidation.resetValidation();
  openPopupProfile();
});

formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

newCardAddBtn.addEventListener('click', () => {
  newCardFormValidation.resetValidation();
  openPopup(popupAddCard);
});

formNewCard.addEventListener('submit', submitNewCard);

popups.forEach((popup) => {
  popup.addEventListener('click', handleCloseByClick);
});