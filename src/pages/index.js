import './index.css';
import {Api} from '../components/Api.js';
import {validationConfig} from '../utils/validationConfig.js'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {PopupDeleteCard} from '../components/PopupDeleteCard.js'

const profilePopup = document.querySelector('.popup_type_profile')
const profilePopupForm = profilePopup.querySelector('.form-profile')
const nameInput = document.querySelector('#name')
const jobInput = document.querySelector('#about')
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

// переменные для попап аватар
const buttonAvatarEdit = document.querySelector('.profile__image');
const popupAvatarEdit = document.querySelector('.popup_type_avatar');
const popupAvatarForm = popupAvatarEdit.querySelector('.form-avatar');

// переменные для попап удаления карточки
const popupDeleteCard = document.querySelector('.popup_type_delete-card');

let usertId = null;
    
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '2043a062-45f6-4faf-829f-6adc32416166',
    'Content-Type': 'application/json'
  }
}); 

const profileFormValidator = new FormValidator(validationConfig, profilePopupForm);
const cardFormValidator = new FormValidator(validationConfig, newCardPopupForm);
const avatarFormValidator = new FormValidator(validationConfig, popupAvatarForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const section = new Section({
  renderer: (element) => {
    createCard(element)
  }
}, placesItems)

//данные профиля
const userInfo = new UserInfo({nameInputSelector: '.profile__name-text', jobInputSelector: '.profile__description', selectorUserAvatar: '.profile__photo'})

// редактировать профиль
const editUserInfo = (data) => {
  popupProfile.functionPreloader(true, 'Сохранение...')
  api.setUserInfo(data)
  .then((data) => {
    userInfo.setUserInfo({
    name: data.name,
    about: data.about
    });
    popupProfile.closePopup()
  })
  .catch((err) => {
    console.log(`${err}`);
  })
  .finally(() => 
  popupProfile.functionPreloader(false))
}
// попап редактирования профиля
const popupProfile = new PopupWithForm(profilePopup, editUserInfo)
popupProfile.setEventListeners();

const openProfilePopup = () => {
  profileFormValidator.disableButton();
  profileFormValidator.removeValidationErrors();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  popupProfile.openPopup()
}

// попап добавления карточек
const popupAddCard = new PopupWithForm(popupCards, (data) => {
popupAddCard.functionPreloader(true, 'Создание...')
  api.createCard(data)
  .then((res) => {
    createCard(res);
    popupAddCard.closePopup();
  })
  .catch((err) => {
    console.log(`${err}`);
  })
  .finally(() => 
  popupAddCard.functionPreloader(false))
})
popupAddCard.setEventListeners(); 

//попап с картинкой
const imagePopup = new PopupWithImage(popupOpenImage);
imagePopup.setEventListeners();

function openCard(name, link) {
  imagePopup.openPopup({name, link})
}
// попап удаления карточки
const popupDeletingCard = new PopupDeleteCard(popupDeleteCard);
popupDeletingCard.setEventListeners();

function handleDeleteCard(card) {
  popupDeletingCard.setSubmitAction(() => {
    api.deleteCard(card._id)
    .then((res) => {
      card.delete(res);
      popupDeletingCard.closePopup();
    })
    .catch((err) => {
    console.log(`${err}`);
    })
  })
  popupDeletingCard.openPopup();
}

// функция создания карточек
const createCard = (item) => {
  const newCard = new Card({
    cardData: item, 
    handleLike: () => {
      api.likeCard(item._id)
        .then(res => newCard.updateLikes(res))
        .catch((err) => {
          console.log(`${err}`);
        })},
    handleDeleteLike: () => {
      api.dislikeCard(item._id)
        .then(res => newCard.updateLikes(res))
        .catch((err) => {
          console.log(`${err}`);
        });
      },
    handleDeleteClick: () => {
      handleDeleteCard(newCard)
      }, 
    openCard
    }, 
    usertId, 
    cardTemplate);
  const cardElement = newCard.generateCard();
  section.addItem(cardElement);
}

// открыть форму добавления карточек
const openCardPopup = function() {
  cardFormValidator.removeValidationErrors();
  cardFormValidator.disableButton();
  popupAddCard.openPopup();
}

// попап смены авы
const popupAvatar = new PopupWithForm(popupAvatarEdit, (item) => {
  popupAvatar.functionPreloader(true, 'Сохранение...')
  api.setAvatar(item)
  .then((res) => {
    userInfo.setAvatar(res);
    popupAvatar.closePopup()
  })
  .catch((err) => {
    console.log(`${err}`)
})
.finally(() => 
popupAvatar.functionPreloader(false))
})
popupAvatar.setEventListeners();

const openAvatarPopup = function() {
  avatarFormValidator.removeValidationErrors();
  avatarFormValidator.disableButton();
  popupAvatar.openPopup();
}

// слушатели:
// на кнопку открыть и закрыть первый попап
buttonOpenPopupProfile.addEventListener('click', openProfilePopup);
// на кнопку открыть и закрыть второй попап
buttonAddCard.addEventListener('click', openCardPopup);
// на кнопку аватара
buttonAvatarEdit.addEventListener('click', openAvatarPopup);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.getUserInfo(userData);
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    usertId = userData._id;
    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(`${err}`);
  });