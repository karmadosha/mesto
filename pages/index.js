import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config,
  initialCards,
  profileEditBtn,
  popupProfile,
  profileName,
  profileAbout,
  newCardAddBtn,
  popupAddCard,
  formNewCard,
  formProfileEdit,
  popupImage,
  cardNameInput, 
  cardPictureInput,
  cardTemplate,
  containerSelector
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";

//попап с большой картинкой
const popupWithImage = new PopupWithImage('.popup_type_big-picture');
popupWithImage.setEventListeners();

//создание карточки
const createCard = (data) => {
  const card = new Card(data, cardTemplate, (name, link) => {
    popupWithImage.open(name, link);
  }); 
  const cardElement = card.generateCard();
  return cardElement;
};

//начальный массив
const cardList = new Section({
  items: initialCards,
  renderer: createCard
}, containerSelector);

cardList.renderItems();

//добавление новой карточки
const popupAddNewCard = new PopupWithForm(popupAddCard, submitNewCard);
popupAddNewCard.setEventListeners();

//сабмит формы добавления карточки
const submitNewCard = (evt) => {
  evt.preventDefault();
  const data = {};
  data.name = cardNameInput;
  data.link = cardPictureInput;
  cardList.addItem(createCard(data));
  popupAddNewCard.close();
};

//валидация формы добавления карточки
const newCardFormValidation = new FormValidator(config, formNewCard);
newCardFormValidation.enableValidation();

//слушатель на кнопке добавления карточки
newCardAddBtn.addEventListener('click', () => {
  newCardFormValidation.resetValidation();
  popupAddNewCard.open();
});

//инфо пользователя
const userInfo = new UserInfo(profileName, profileAbout);

//попап редактирования профиля
const popupProfileEdit = new PopupWithForm(popupProfile, handleProfileFormSubmit);
popupProfileEdit.setEventListeners();

//сабмит формы редактирования профиля
const handleProfileFormSubmit = (evt, nameInput, aboutInput) => {
  evt.preventDefault();
  userInfo.setUserInfo(nameInput, aboutInput);
  popupProfileEdit.close();
}
//валидация формы профиля
const profileFormValidation = new FormValidator(config, formProfileEdit);
profileFormValidation.enableValidation();

//слушатель кнопки редактирования профиля
profileEditBtn.addEventListener('click', () => {
  profileFormValidation.resetValidation();
  userInfo.getUserInfo();
  popupProfileEdit.open();
});