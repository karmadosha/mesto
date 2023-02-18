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
}

function handleCloseByClick(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close-btn")) {
    closePopup(evt.currentTarget);
  }
};

function closeWithEsc(event) {
  if (event.key === "Escape") {
    const formOpen = document.querySelector('.popup_opened');
    closePopup(formOpen);
  };
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupProfile);
};

function createCard(item) {
  const card = elementsTemplate.cloneNode(true);
  const cardImage = card.querySelector('.element__picture');
  const cardLike = card.querySelector('.element__like');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__remove').addEventListener('click', (e) => {
    card.remove();
  });

  cardLike.addEventListener('click', (e) => { 
    card.querySelector('.element__like').classList.toggle('element__like_active');
  });

  cardImage.addEventListener('click', (evt) => {
    openPopup(popupImage);
    popupImageTitle.textContent = item.name;
    popupImagePicture.src = item.link;
    popupImagePicture.alt = item.name;
  });

  return card;
};

function renderCards() {
  const cards = initialCards.map((item) => {
    return createCard(item);
  });
  elementsContainer.append(...cards);
};

function addNewCard() {
  const newCard = {link: cardPicture.value, name: cardName.value};
  const card = createCard(newCard);
  
  elementsContainer.prepend(card);
};

function submitNewCard(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAddCard);
  formNewCard.reset();
};

renderCards();

profileEditBtn.addEventListener('click', openPopupProfile);
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

formNewCard.addEventListener('submit', submitNewCard);
newCardAddBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
});

popups.forEach((popup) => {
  popup.addEventListener('click', handleCloseByClick);
});