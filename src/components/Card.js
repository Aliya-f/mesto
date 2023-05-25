export class Card {
  constructor ({cardData, handleLike,  handleDeleteLike, handleDeleteClick, openCard}, usertId, cardTemplate) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
    this._openCard = openCard;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
    this._handleDeleteLike = handleDeleteLike;
    this._likes = cardData.likes;
    this._id = cardData._id;    
    this._usertId = usertId;
    this._ownerId = cardData.owner._id;
  }
  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true)
    return cardElement;
  }
  _getView() {
    if (this._ownerId === this._usertId) {
      this._card.querySelector('.places__delete').classList.add('places__delete_show');
    }
  }
  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.places__img');
    this._cardTitle = this._card.querySelector('.places__title');
    this._buttonLike = this._card.querySelector('.places__like-button');
    this._buttonDelete = this._card.querySelector('.places__delete');
    this._counterLike = this._card.querySelector('.places__like-quantity')
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._drawLikesContainer();
    this._setEventListeners();
    this._getView();
    return this._card
  }
  
  delete() {
    this._card.remove();
    this._card = null;
  }
 
  _drawLikesContainer() {
    this._counterLike.textContent = this._likes.length; // проставляется количество лайков
    // если мой лайк есть, то сердечко черное
    if (this._cardLiked()) {
      this._buttonLike.classList.add('like-button_type_active');
    } else {
      this._buttonLike.classList.remove('like-button_type_active');
    }
  }
  // поставила ли лайк
  _cardLiked() {
    return this._likes.filter((item) => { 
      return item._id == this._usertId}).length > 0; 
  }

  updateLikes(cardData) {
    this._likes = cardData.likes;
    this._drawLikesContainer()
  }

  _setEventListeners() {
    //слушатель на открыть закрыть фото
    this._cardImage.addEventListener('click', () => {
      this._openCard(this._name, this._link)
    });
    //на кнопку лайк
    this._buttonLike.addEventListener('click', () => {
      if (this._cardLiked()) {
      this._handleDeleteLike()
    } else {
      this._handleLike()}
    });
    //попап удалить карточку
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick()
    });
   }
  }