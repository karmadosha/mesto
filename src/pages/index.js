import './index.css';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config,
  initialCards,
  profileEditBtn,
  nameInput,
  aboutInput,
  newCardAddBtn,
  formNewCard,
  formProfileEdit
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";

const popupWithImage = new PopupWithImage('.popup_type_big-picture');
popupWithImage.setEventListeners();

const createCard = (item) => {
  const card = new Card (item, '.element-template', popupWithImage.open);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.elements');

cardList.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__about');

const popupProfileEdit = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput.value, aboutInput.value);
    popupProfileEdit.close();
  }
})
popupProfileEdit.setEventListeners();

profileEditBtn.addEventListener('click', () => {
  popupProfileEdit.open();
  profileFormValidation.resetValidation();
  const newUserInfo = userInfo.getUserInfo();
  nameInput.value = newUserInfo.name;
  aboutInput.value = newUserInfo.about;
});

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (item) => {
    const value = { name: item.placeInput, link: item.linkInput };
    cardList.addItem(createCard(value, '.elements'));
    popupAddNewCard.close();
  }
})
popupAddNewCard.setEventListeners();

newCardAddBtn.addEventListener('click', () => {
  newCardFormValidation.resetValidation();
  popupAddNewCard.open();
});

const profileFormValidation = new FormValidator(config, formProfileEdit);
profileFormValidation.enableValidation();

const newCardFormValidation = new FormValidator(config, formNewCard);
newCardFormValidation.enableValidation();