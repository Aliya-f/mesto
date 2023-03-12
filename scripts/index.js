let formElement = document.querySelector('.popup')
let popup = document.querySelector('.popup__card')
let nameInput = document.querySelector('#name')
let jobInput = document.querySelector('#job')
let openPopupButton = document.querySelector('.profile__edit-button')
let closePopupButton = document.querySelector('.popup__close-button')
let saveButton = document.querySelector('.form__button')

function openPopup () {
  formElement.classList.add('popup_opened')
}
openPopupButton.addEventListener('click', openPopup)

function closePopup () {
  formElement.classList.remove('popup_opened')
}

closePopupButton.addEventListener('click', closePopup)

// Обработчик «отправки» формы

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Так мы можем определить свою логику отправки.
    nameInput.getAttribute('value')
    jobInput.getAttribute('value')
    // Получите значение полей jobInput и nameInput из свойства value
    let nameInputNew = document.querySelector('.profile__name-text')
    let jobInputNew = document.querySelector('.profile__description')

    // Выберите элементы, куда должны быть вставлены значения полей
    nameInputNew.textContent = nameInput.value;
    jobInputNew.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 
