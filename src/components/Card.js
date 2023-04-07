export default class Card {
  constructor({ data, userId, handleCardClick, handleDeleteCard, handleLikeClick }, templateSelector, ) {
    this._data = data;
    this._link = data.link;  
    this._name = data.name;
    this._userId = userId;  
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
    this.isLiked = false;
};

  _getTemplate() {
    this._cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return this._cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPicture = this._element.querySelector('.element__picture');
    this._cardPicture.src = this._link;    
    this._cardPicture.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__remove');
    this._likeCounter = this._element.querySelector('.element__like-count');
    this._likeCounter.textContent = this._data.likes.length;
    this._ownerId = this._data.owner._id;
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
    this._setEventListeners();
    
    return this._element;
  }

  getLikeStatus() {
    if (this._likeButton.classList.contains('element__like_active')) {
      return this.isLiked = true;
    }
  }

  setLikes(data) {
    this._likeButton.classList.toggle('element__like_active');
    this._likeCounter.textContent = data.likes.length;
    return this.isLiked = !this.isLiked;
  }

  checkLikeStatus() {
    if (this._data.likes.map(like => like._id).some(id => id === this._userId)) {
      this._likeButton.classList.add('element__like_active');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });
  }  
}