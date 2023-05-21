export class Card {
  constructor ({cardData, handleDeleteClick, openCard}, usertId, cardTemplate) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
    this._openCard = openCard;
    this._handleDeleteClick = handleDeleteClick;
    this._id = cardData._id;    
    this._usertId = usertId;
    this._ownerId = cardData._owner._id;
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
    this._card = this._getTemplate()
    this._cardImage = this._card.querySelector('.places__img')
    this._cardTitle = this._card.querySelector('.places__title')
    this._buttonLike = this._card.querySelector('.places__like-button');
    this._buttonDelete = this._card.querySelector('.places__delete');
    this._cardImage.alt = this._name
    this._cardImage.src = this._link
    this._cardTitle.textContent = this._name
    this._setEventListeners();
    this._getView();
    return this._card
  }
  delete() {
    this._card.remove();
    this._card = null;
  }
  
  _likeActive() {
    this._buttonLike.classList.toggle('like-button_type_active')
  }

  _setEventListeners() {
    //слушатель на открыть закрыть фото
    this._cardImage.addEventListener('click', () => {
      this._openCard(this._name, this._link)
    });
    //на кнопку лайк
    this._buttonLike.addEventListener('click', () => {
      this._likeActive()
    });
    //попап удалить карточку
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick()
    });
   }
  }