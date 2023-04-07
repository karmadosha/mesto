import './index.css';
import Api from '../components/Api.js';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import { config,  
  profileEditBtn,
  newCardAddBtn,
  formNewCard,
  formProfileEdit,
  formAvatar,
  avatarEditBtn
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";

const profileFormValidation = new FormValidator(config, formProfileEdit);
const newCardFormValidation = new FormValidator(config, formNewCard);
const avatarFormValidation = new FormValidator(config, formAvatar);
const popupWithImage = new PopupWithImage('.popup_type_big-picture');
const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');
const popupCardDeleteConfirm = new PopupWithConfirmation('.popup_type_card-delete');

let userId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    'Content-type': 'application/json',
    Authorization: '0fa20944-2374-4f9d-8a10-46389229647c'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {    
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardsData.forEach((card) => {
      cardList.addInitialCards(createCard(card));
    });
    userInfo.setAvatar(userData);
  })
  .catch(err => console.log(err));

const createCard = (item) => {
  const card = new Card({
    data: item,
    userId: userInfo.getUserId(),
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteCard: (card) => {
      popupCardDeleteConfirm.open();
      popupCardDeleteConfirm.setSubmitAction(() => {
        api.deleteCard(item._id)
          .then(() => {
            card.deleteCard();
            popupCardDeleteConfirm.close();
          })
          .catch(err => console.log(err));
      })
    },
    handleLikeClick: () => {
      api.changeLikeStatus(item._id, !card.getLikeStatus())
        .then((res) => {
          card.isLiked = card.setLikes(res);
        })
        .catch(err => console.log(err));
    }
  },    
  '.element-template');
  const cardElement =  card.generateCard();
  card.checkLikeStatus();
  return cardElement;
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.elements');

const popupProfileEdit = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (inputData) => {
    api.editProfile(inputData)
      .then(res => {
        userInfo.setUserInfo(res);
        popupProfileEdit.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupProfileEdit.renderLoading(false, 'Сохранить'))    
  }
});

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (inputData) => {
    api.addNewCard(inputData)
      .then((res) => {
        cardList.addItem(createCard(res));        
        popupAddNewCard.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupAddNewCard.renderLoading(false, 'Создать'))
  }
});

const popupAvatarEdit = new PopupWithForm({
  popupSelector: '.popup_type_avatar-edit',
  handleFormSubmit: (inputData) => {
    api.editAvatar(inputData.link)
      .then((res) => {
        userInfo.setAvatar({ avatar: res.avatar});
        popupAvatarEdit.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupAvatarEdit.renderLoading(false, 'Сохранить'))
  }
});

const openPopupProfileEdit = () => {
  profileFormValidation.resetValidation();
  popupProfileEdit.open();
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
}

newCardAddBtn.addEventListener('click', () => {
  newCardFormValidation.resetValidation();
  popupAddNewCard.open();
});
profileEditBtn.addEventListener('click', openPopupProfileEdit);

avatarEditBtn.addEventListener('click', () => {
  avatarFormValidation.resetValidation();
  popupAvatarEdit.open();
})

popupWithImage.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarEdit.setEventListeners();
popupAddNewCard.setEventListeners();
popupCardDeleteConfirm.setEventListeners();

profileFormValidation.enableValidation();
newCardFormValidation.enableValidation();
avatarFormValidation.enableValidation();