let formElement = document.querySelector('.popup__container')
let popup = document.querySelector('.popup')
let nameInput = document.querySelector('#name')
let jobInput = document.querySelector('#job')
let openPopupButton = document.querySelector('.profile__edit-button')
let closePopupButton = document.querySelector('.popup__close-button')
/*let saveButton = document.querySelector('.form__button')*/
let name1 = document.querySelector('#name')
let name2 = document.querySelector('.profile__name-text')
let job1 = document.querySelector('#job')
let job2 = document.querySelector('.profile__description')
// Получите значение полей jobInput и nameInput из свойства value
let nameInputNew = document.querySelector('.profile__name-text')
let jobInputNew = document.querySelector('.profile__description')

function openPopup () {
  name1.value = name2.textContent
  job1.value = job2.textContent
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
popup.addEventListener('submit', handleFormSubmit); 

openPopupButton.addEventListener('click', openPopup)
closePopupButton.addEventListener('click', closePopup)