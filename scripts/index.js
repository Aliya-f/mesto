const formElement = document.querySelector('.form')
const popup = document.querySelector('.popup')
const profilePopup = document.querySelector('.popup_type_profile')
const nameInput = document.querySelector('#name')
const jobInput = document.querySelector('#job')
const openPopupButton = document.querySelector('.profile__edit-button')
const closePopupButton = document.querySelector('.popup__close-button')
/*const saveButton = document.querySelector('.form__button')*/
const nameInputNew = document.querySelector('.profile__name-text')
const jobInputNew = document.querySelector('.profile__description')
nameInput.value = nameInputNew.textContent
jobInput.value = jobInputNew.textContent

// переменные для второго попап
const addButton = document.querySelector('.profile__add-button')
const popupCards = document.querySelector('.popup_type_cards');
const newCardPopupForm = popupCards.querySelector('.form-add');
const placeInput = newCardPopupForm.querySelector('#place');
const linkInput = newCardPopupForm.querySelector('#link');
const submitButton = newCardPopupForm.querySelector('.form__button');
const closePopupButtonAdd = popupCards.querySelector('.popup__close-button');
//переменные для карточек
const cardTemp = document.querySelector('#card')
const cardTemplate = document.querySelector('#card').content.querySelector('.places__item');
const placesItems = document.querySelector('.places__items');
const buttonDelete = cardTemplate.querySelector('.places__delete');
//переменные для лайков 
const likeButton = cardTemplate.querySelector('.places__like-button');

//переменные для увеличенных фото
const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImageCard = document.querySelector('.popup__image');
const popupTitleCard = document.querySelector('.popup__title-card');


// открыть и закрыть попап
const openPopup = function(popup) {
  popup.classList.add('popup_opened')
}
const closePopup = function(popup) {
  popup.classList.remove('popup_opened')
}

// редактировать профиль
function handleFormSubmit (evt) {
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
  const closePopupButtonPhoto = popupOpenImage.querySelector('.popup__close-button');

  placesImg.src = card.link;
  placesTitle.textContent = card.name;
  
  // слушатель на открыть закрыть фото
  placesImg.addEventListener('click', () => {handleElementsCard(card)});
  closePopupButtonPhoto.addEventListener('click', () => {
  closePopup(popupOpenImage);
  });
   //на кнопку лайк
  likeActive(templateElements) 
  deleteCard(templateElements)
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
 function deleteCard (el) {
  el.querySelector('.places__delete').addEventListener('click', function (evt) {
  evt.target.closest('.places__item').remove();
})}

/* функция лайка */
function likeActive(el) {
  el.querySelector('.places__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('like-button_type_active')
  })
}

// слушатели:
// на кнопку Сохранить в профиле
formElement.addEventListener('submit', handleFormSubmit); 
//на кнопку создать
newCardPopupForm.addEventListener('submit', handleFormSubmitCard);
// на кнопку открыть и закрыть первый попап
openPopupButton.addEventListener('click', function() { openPopup(profilePopup);
});
closePopupButton.addEventListener('click', function() {
  closePopup(profilePopup);
});
// на кнопку открыть и закрыть второй попап
addButton.addEventListener('click', function() {
  openPopup(popupCards);
});
closePopupButtonAdd.addEventListener('click', function() {
  closePopup(popupCards);
});
// на кнопку открыть и закрыть 3 попап
//closePopupButtonPhoto.addEventListener('click', function() {
 // closePopup(popupOpenImage);
//});

//на кнопку удалить карточку
//buttonDelete.addEventListener('click', deleteCard)

console.log();