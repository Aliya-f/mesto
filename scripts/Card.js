import {handleElementsCard} from './index.js'
export class Card {
  constructor (initialCards, cardTemplate) {
    this._initialCards = initialCards;
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._cardTemplate = cardTemplate;
   }
  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true)
    return cardElement;
  }
  generateCard() {
    this._card = this._getTemplate()
    this._cardImage = this._card.querySelector('.places__img')
    this._cardTitle = this._card.querySelector('.places__title')
    this._likeButton = this._card.querySelector('.places__like-button');
    this._deleteButton = this._card.querySelector('.places__delete');
    this._cardImage.alt = this._name
    this._cardImage.src = this._link
    this._cardTitle.textContent = this._name
    this._setEventListeners();
    return this._card
  }
  _deleteCard () {
    this._card.remove();
  }
  _likeActive() {
    this._likeButton.classList.toggle('like-button_type_active')
  }
  _handleOpenPopupImage = () => {
    handleElementsCard({name: this._name,
      link: this._link})
  }
  _setEventListeners() {
    //слушатель на открыть закрыть фото
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopupImage()
    });
    //на кнопку лайк
    this._likeButton.addEventListener('click', () => {
      this._likeActive()
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard()
    });
  }
  }