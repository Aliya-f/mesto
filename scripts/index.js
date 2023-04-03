const formElement = document.querySelector('.popup__form')
const popup = document.querySelector('.popup')
const profilePopup = document.querySelector('.popup_type_profile')
const nameInput = document.querySelector('#name')
const jobInput = document.querySelector('#job')
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button')
const buttonClosePopupProfile = document.querySelector('.popup__close-button')
/*const saveButton = document.querySelector('.form__button')*/
const nameInputNew = document.querySelector('.profile__name-text')
const jobInputNew = document.querySelector('.profile__description')
// переменные для второго попап
const addButton = document.querySelector('.profile__add-button')
const popupCards = document.querySelector('.popup_type_cards');
const newCardPopupForm = popupCards.querySelector('.form-add');
const placeInput = newCardPopupForm.querySelector('#place');
const linkInput = newCardPopupForm.querySelector('#link');
const submitButton = newCardPopupForm.querySelector('.popup__form-button');
const buttonClosePopupAdd = popupCards.querySelector('.popup__close-button');
//переменные для карточек
//const cardTemp = document.querySelector('#card')
const cardTemplate = document.querySelector('#card').content.querySelector('.places__item');
const placesItems = document.querySelector('.places__items');
//переменные для увеличенных фото
const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImageCard = document.querySelector('.popup__image');
const popupTitleCard = document.querySelector('.popup__title-card');
const buttonClosePopupPhoto = popupOpenImage.querySelector('.popup__close-button');

// открыть и закрыть попап
const openPopup = function(popup) {
  nameInput.value = nameInputNew.textContent
  jobInput.value = jobInputNew.textContent
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
  const formButton = popup.querySelector('.popup__form-button')
  disableButton(formButton, {inactiveButtonClass:validationConfig.inactiveButtonClass, activeButtonClass:validationConfig.activeButtonClass})
}
const closePopup = function(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEsc)
}

function handleFormSubmitProfile (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  //элементы, куда должны быть вставлены значения полей
  nameInputNew.textContent = nameInput.value;
  jobInputNew.textContent = jobInput.value;
  // Вставьте новые значения с помощью textContent
  closePopup(popup)
}

// создание карточки
const createCard = (card) => {
  const templateElements = cardTemplate.cloneNode(true);
  const placesImg = templateElements.querySelector('.places__img');
  const placesTitle = templateElements.querySelector('.places__title');
  //const buttonClosePopupPhoto = popupOpenImage.querySelector('.popup__close-button');
  const likeButton = templateElements.querySelector('.places__like-button');
  const buttonDelete = templateElements.querySelector('.places__delete');
  placesImg.src = card.link;
  placesTitle.textContent = card.name;
  placesImg.alt = card.name;
  
  // слушатель на открыть закрыть фото
  placesImg.addEventListener('click', () => {
  handleElementsCard(card)
  });

  //на кнопку лайк
  likeButton.addEventListener('click', (evt) => {
  likeActive(evt)
  });

  buttonDelete.addEventListener('click', (evt) => {
  deleteCard(evt)
  });

  return templateElements;
};  

/* открытие картинок*/
function handleElementsCard(card) {
  popupImageCard.src = card.link;
  popupImageCard.alt = card.name;
  popupTitleCard.textContent = card.name;
  openPopup(popupOpenImage);
}

const renderCard = (card) => {
  //const templateElements = createCard(card);
 placesItems.prepend(createCard(card));
};
 
initialCards.forEach((card) => {
  renderCard(card);
});

/* добавить место */
const handleFormSubmitCard = (event) => {
  event.preventDefault();
  renderCard({
    name: placeInput.value,
    link: linkInput.value,
  });
  event.target.reset();
  closePopup(popupCards);
};

 // удаление карточки
 function deleteCard (evt) {
   evt.target.closest('.places__item').remove();
}

function likeActive(evt) {
  evt.target.classList.toggle('like-button_type_active')
}

//закрыть попап через оверлэй
const closePopupOverlay = () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach(popup => {
    popup.addEventListener('click', evt => {
      if (evt.target == evt.currentTarget) {
        closePopup(popup)
      }
    })
  })
}

closePopupOverlay()

// закрыть попап через esc
const closePopupEsc = (evt) => {
  if (evt.code === 'Escape') {
    const activePopup = document.querySelector('.popup_opened')   
    closePopup(activePopup)
   }
}

// слушатели:
// на кнопку Сохранить в профиле
formElement.addEventListener('submit', handleFormSubmitProfile); 
//на кнопку создать
newCardPopupForm.addEventListener('submit', handleFormSubmitCard);
// на кнопку открыть и закрыть первый попап
buttonOpenPopupProfile.addEventListener('click', function() { 
  openPopup(profilePopup);
});
buttonClosePopupProfile.addEventListener('click', function() {
  closePopup(profilePopup);
});
// на кнопку открыть и закрыть второй попап
addButton.addEventListener('click', function() {
  openPopup(popupCards);
});
buttonClosePopupAdd.addEventListener('click', function() {
  closePopup(popupCards);
});
// на кнопку закрыть 3 попап
buttonClosePopupPhoto.addEventListener('click', () => {
closePopup(popupOpenImage);
});
