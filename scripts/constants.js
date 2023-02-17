const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_active'
};

const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.form__item_user_name');
const aboutInput = document.querySelector('.form__item_user_about');
const formProfileEdit = document.querySelector('.form_type_profile');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const popupSubmitBtn = document.querySelector('.form__save-btn_type_card');

const popupAddCard = document.querySelector('.popup_type_new-card');
const newCardAddBtn = document.querySelector('.profile__add-btn');
const formNewCard = document.querySelector('.form_type_card');
const cardName = document.querySelector('.form__item_card_name');
const cardPicture = document.querySelector('.form__item_card_about');

const popupImage = document.querySelector('.popup_type_big-picture');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const popupImagePicture = popupImage.querySelector('.popup__image');

const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#element-template').content.querySelector('.element');

const popups = Array.from(document.querySelectorAll('.popup'));