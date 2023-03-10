export default class Card {
  constructor(data, templateSelector, openPopupImage) {
  this._link = data.link;
  this._name = data.name;
  this._templateSelector = templateSelector;
  this._openPopupImage = openPopupImage;
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

    this._setEventListeners();
    
    return this._element;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _handleImageClick() {
    this._openPopupImage(this._link, this._name);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._cardPicture.addEventListener('click', () => {
      this._handleImageClick()
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard()
    });
  }  
}