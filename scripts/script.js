const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.form__item_user_name');
const aboutInput = document.querySelector('.form__item_user_about');
const formProfileEdit = document.querySelector('.form_type_profile');
const editProfileBtn = document.querySelector('.profile__edit-btn');

const popupAddCard = document.querySelector('.popup_type_new-card');
const addNewCardBtn = document.querySelector('.profile__add-btn');
const formNewCard = document.querySelector('.form_type_card');
const cardName = document.querySelector('.form__item_card_name');
const cardPicture = document.querySelector('.form__item_card_about');

const popupImage = document.querySelector('.popup_type_big-picture');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const popupImagePicture = popupImage.querySelector('.popup__image');

const closeButtons = document.querySelectorAll('.popup__close-btn');

const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#element-template').content.querySelector('.element');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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

editProfileBtn.addEventListener('click', openPopupProfile);
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

formNewCard.addEventListener('submit', submitNewCard);
addNewCardBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupProfile);
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
    openPopup(popupImage);
    popupImageTitle.textContent = item.name;
    popupImagePicture.src = item.link;
    popupImagePicture.alt = item.name;
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

function submitNewCard(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAddCard);
  formNewCard.reset();
}

renderCards();