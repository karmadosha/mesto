import './index.css';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config,
  initialCards,
  profileEditBtn,
  newCardAddBtn,
  formNewCard,
  formProfileEdit
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";

const profileFormValidation = new FormValidator(config, formProfileEdit);
const newCardFormValidation = new FormValidator(config, formNewCard);
const popupWithImage = new PopupWithImage('.popup_type_big-picture');
const userInfo = new UserInfo('.profile__name', '.profile__about');

const popupProfileEdit = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (inputData) => {
    userInfo.setUserInfo(inputData);
    popupProfileEdit.close();
  }
})

const openPopupProfileEdit = () => {
  profileFormValidation.resetValidation();
  popupProfileEdit.open();
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
}

const createCard = (item) => {
  const card = new Card (item, '.element-template', popupWithImage.open);
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.elements');

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (item) => {
    cardList.addItem(createCard(item));
    console.log(item);
    popupAddNewCard.close();
  }
})

newCardAddBtn.addEventListener('click', () => {
  newCardFormValidation.resetValidation();
  popupAddNewCard.open();
});
profileEditBtn.addEventListener('click', openPopupProfileEdit);

popupWithImage.setEventListeners();
popupProfileEdit.setEventListeners();
popupAddNewCard.setEventListeners();

cardList.renderItems();

profileFormValidation.enableValidation();
newCardFormValidation.enableValidation();
