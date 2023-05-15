export class Card {
  constructor (cardData, cardTemplate, openCard) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
    this._openCard = openCard;
   }
  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true)
    return cardElement;
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
    return this._card
  }
  _deleteCard () {
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
    //удалить карточку
    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard()
    });
  }
  }