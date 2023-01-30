const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_big-picture');

const editBtn = document.querySelector('.profile__edit-btn');
const addNewCardBtn = document.querySelector('.profile__add-btn');

const btnCloseEdit = popupProfile.querySelector('.popup__close-btn');
const btnCloseAddCard = popupAddCard.querySelector('.popup__close-btn');
const btnCloseImage = popupImage.querySelector('.popup__close-btn');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.form__item_user_name');
const aboutInput = document.querySelector('.form__item_user_about');
const formEdit = document.querySelector('.form_type_profile');

const formNewCard = document.querySelector('.form_type_card');
const cardName = document.querySelector('.form__item_card_name');
const cardPicture = document.querySelector('.form__item_card_about');

const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#element-template').content.querySelector('.element');

const initialCards = [
  {
    name: 'Архыз',
    link: '../images/arkhyz-min.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

editBtn.addEventListener('click', openPopupProfile);
btnCloseEdit.addEventListener('click', closePopupProfile);
formEdit.addEventListener('submit', formSubmitHandler);
formNewCard.addEventListener('submit', newCardSubmit);

addNewCardBtn.addEventListener('click', openPopupAddCard);
btnCloseAddCard.addEventListener('click', closePopAddCard);

function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

function openPopupProfile() {
  popupProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popup.classList.remove('popup_opened');
}

function openPopupAddCard() {
  popupAddCard.classList.add('popup_opened');
}

function closePopAddCard() {
  popupAddCard.classList.remove('popup_opened');
}

function createCard(item) {
  const card = elementsTemplate.cloneNode(true);
  card.querySelector('.element__picture').src = item.link;
  card.querySelector('.element__picture').alt = item.name;
  card.querySelector('.element__title').textContent = item.name;
  
  card.querySelector('.element__remove').addEventListener('click', (e) => {
    card.remove();
  });

  const cardLike = card.querySelector('.element__like');
  cardLike.addEventListener('click', (e) => { 
  card.querySelector('.element__like').classList.toggle('element__like_active');
  });

  card.querySelector('.element__picture').addEventListener('click', (evt) => {
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__image-title').textContent = item.name;
    popupImage.querySelector('.popup__image').src = item.link;
    popupImage.querySelector('.popup__image').alt = textContent = item.name;
  });

  btnCloseImage.addEventListener('click', (evt) => {
    popupImage.classList.remove('popup_opened');
  });
  
  return card;
}

function renderCards() {
  const cards = initialCards.map((item) => {
    return createCard(item);
  });
  elementsContainer.append(...cards);
}

function addNewCard() {
  const newCard = {link: cardPicture.value, name: cardName.value};
  const card = createCard(newCard);
  
  elementsContainer.prepend(card);
}

function newCardSubmit(evt) {
  evt.preventDefault();
  addNewCard();
  closePopAddCard();
  formNewCard.reset();
}

renderCards();