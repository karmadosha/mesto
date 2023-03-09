import { initialCards } from "./initialCards.js";
import Card from "./Card.js";
import { 
  popupProfile, 
  profileName,
  profileAbout, 
  nameInput, 
  aboutInput, 
  formProfileEdit, 
  profileEditBtn, 
  popupAddCard,
  newCardAddBtn,
  formNewCard,
  cardName,
  cardPicture,  
  elementsContainer,
  popups,
  config
} from "./constants.js";

import { FormValidator } from "./FormValidator.js";

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEsc);
}

function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;  
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEsc);
};

function handleCloseByClick(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close-btn")) {
    closePopup(evt.currentTarget);
  }
};

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  };
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupProfile);
};

function createCard(item) {
  const card = new Card(item, '.element-template').generateCard();
  return card;
};

function submitNewCard(evt) {
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