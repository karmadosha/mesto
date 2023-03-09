export const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_active'
};

export const popupProfile = document.querySelector('.popup_type_profile');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const nameInput = document.querySelector('.form__item_user_name');
export const aboutInput = document.querySelector('.form__item_user_about');
export const formProfileEdit = document.querySelector('.form_type_profile');
export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const popupSubmitBtn = document.querySelector('.form__save-btn_type_card');

export const popupAddCard = document.querySelector('.popup_type_new-card');
export const newCardAddBtn = document.querySelector('.profile__add-btn');
export const formNewCard = document.querySelector('.form_type_card');
export const cardName = document.querySelector('.form__item_card_name');
export const cardPicture = document.querySelector('.form__item_card_about');

export const popupImage = document.querySelector('.popup_type_big-picture');
export const popupImageTitle = popupImage.querySelector('.popup__image-title');
export const popupImagePicture = popupImage.querySelector('.popup__image');

export const elementsContainer = document.querySelector('.elements');
export const elementsTemplate = document.querySelector('.element-template').content.querySelector('.element');

export const popups = Array.from(document.querySelectorAll('.popup'));