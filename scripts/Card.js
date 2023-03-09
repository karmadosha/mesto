export default class Card {
    constructor(data, templateSelector, likeButton, deleteButton) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._likeButton = likeButton;
    this._deleteButton = deleteButton;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPicture = this._element.querySelector('.element__picture');
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;  
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__remove');

    this._popupImage = document.querySelector('.popup_type_big-picture');
    this._popupImagePicture = this._popupImage.querySelector('.popup__image');
    this._popupImageTitle = this._popupImage.querySelector('.popup__image-title');

    this._setEventListeners();
    
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('element__like_active');
    });

    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick();
    })

    this._deleteButton.addEventListener('click', () => {
      this._element.remove();
    });
  }

  _handleCardClick() {
    this._popupImage.classList.add('popup_opened');
    this._popupImagePicture.src = this._link;
    this._popupImageTitle.textContent = this._name;
    this._popupImagePicture.alt = this._name;    
  }
}