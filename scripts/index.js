let formElement = document.querySelector('.form')
let popup = document.querySelector('.popup')
let nameInput = document.querySelector('#name')
let jobInput = document.querySelector('#job')
let openPopupButton = document.querySelector('.profile__edit-button')
let closePopupButton = document.querySelector('.popup__close-button')
/*let saveButton = document.querySelector('.form__button')*/
let nameInputNew = document.querySelector('.profile__name-text')
let jobInputNew = document.querySelector('.profile__description')

function openPopup () {
  nameInput.value = nameInputNew.textContent
  jobInput.value = jobInputNew.textContent
  popup.classList.add('popup_opened')
}

function closePopup () {
  popup.classList.remove('popup_opened')
}

// Обработчик «отправки» формы

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Так мы можем определить свою логику отправки.

    // Выберите элементы, куда должны быть вставлены значения полей
    nameInputNew.textContent = nameInput.value;
    jobInputNew.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

openPopupButton.addEventListener('click', openPopup)
closePopupButton.addEventListener('click', closePopup)