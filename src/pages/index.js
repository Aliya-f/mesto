import './index.css'
import {validationConfig} from '../utils/validationConfig.js'
import {initialCards} from '../utils/initial-cards.js'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'

const profilePopup = document.querySelector('.popup_type_profile')
const profilePopupForm = profilePopup.querySelector('.form-profile')
const nameInput = document.querySelector('#name')
const jobInput = document.querySelector('#job')
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button')

// переменные для второго попап
const buttonAddCard = document.querySelector('.profile__add-button')
const popupCards = document.querySelector('.popup_type_cards');
const newCardPopupForm = popupCards.querySelector('.form-add');

//переменные для карточек
const cardTemplate = document.querySelector('#card').content.querySelector('.places__item');
const placesItems = document.querySelector('.places__items');
//переменные для увеличенных фото
const popupOpenImage = document.querySelector('.popup_type_open-image');

const profileFormValidator = new FormValidator(validationConfig, profilePopupForm);
const cardFormValidator = new FormValidator(validationConfig, newCardPopupForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = createCard(element)
    section.addItem(card)
  }
}, placesItems)

//данные профиля
const userInfo = new UserInfo({nameInputNew: '.profile__name-text', jobInputNew: '.profile__description'})

// редактировать профиль
const editUserInfo = (data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.job
  })
}
// попап редактирования профиля
const popupProfile = new PopupWithForm(profilePopup, editUserInfo)
popupProfile.setEventListeners();

const openProfilePopup = () => {
  profileFormValidator.disableButton();
  profileFormValidator.removeValidationErrors();
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupProfile.openPopup()
}
// попап добавления карточек
const popupAddCard = new PopupWithForm(popupCards, () => {
  section.addItem(createCard(item))
})

popupAddCard.setEventListeners(); 

//попап с картинкой
const imagePopup = new PopupWithImage(popupOpenImage);
imagePopup.setEventListeners();

function openCard(name, link) {
  imagePopup.openPopup(name, link)
  console.log(name)
}

// функция создания карточек
const createCard = (item) => {
  const newCard = new Card(item, cardTemplate, openCard);
  const cardElement = newCard.generateCard();
  return cardElement;
}

// открыть форму добавления карточек
const openCardPopup = function() {
  cardFormValidator.removeValidationErrors();
  cardFormValidator.disableButton();
  popupAddCard.openPopup();
}

// слушатели:
// на кнопку открыть и закрыть первый попап
buttonOpenPopupProfile.addEventListener('click', openProfilePopup);
// на кнопку открыть и закрыть второй попап
buttonAddCard.addEventListener('click', openCardPopup);
