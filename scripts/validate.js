const validationConfig = {
    formSelector: '.popup__form', // форма
    inputSelector: '.popup__form-input', // поле ввода
    submitButtonSelector: '.popup__form-button', // кнопка формы
    inactiveButtonClass: 'popup__button-disabled', // кнопка неактивна
    activeButtonClass: 'popup__button-enabled', // кнопка активна
    inputErrorClass: 'popup__form-input_type_error', // инпут красный бордер
    errorClass: 'popup__error-visible' // поле спан с текстом ошибки
  }

const enableValidation = function ({formSelector, ...rest}) {
    const forms = Array.from(document.querySelectorAll(formSelector))
 forms.forEach(form => {
     form.addEventListener('submit', (evt) => {
         evt.preventDefault()
     })
     setEventListeners(form, rest)
 })
}

// делает активной\неактивной кнопку
const setEventListeners = (formToValidate, {inputSelector, submitButtonSelector, ...rest}) => {
    const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector))
    const formButton = formToValidate.querySelector(submitButtonSelector)
    disableButton(formButton, rest)
    //проверяет валидность поля
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input, validationConfig)
    
        if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest)
        } else {
        enableButton(formButton, rest)
        }
         })
    })
}

// проверяет валидность поля и выводит сообщение ошибки
const checkInputValidity = (input, validationConfig) => {
    if (input.checkValidity()) {
      hideInputError(input, validationConfig)
    } else {
      showInputError(input, validationConfig)
    }
}
// функции показа спан с ошибкой
function showInputError(input, validationConfig) {
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
    currentInputErrorContainer.textContent = input.validationMessage;
    input.classList.add(validationConfig.inputErrorClass)
    }
  
  function hideInputError(input, validationConfig) {
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
    currentInputErrorContainer.textContent = '';
    input.classList.remove(validationConfig.inputErrorClass)
  }
  
// есть ли в форме невалидное поле
const hasInvalidInput = (formInputs) => {
    return formInputs.some((item) => !item.validity.valid)
}

// кнопка неактивна
const disableButton = (button, {inactiveButtonClass, activeButtonClass}) => {
    button.classList.add(inactiveButtonClass)
    button.classList.remove(activeButtonClass)
    button.setAttribute('disabled', true)
 }
// кнопка активна
 const enableButton = (button, {inactiveButtonClass, activeButtonClass}) => {
    button.classList.remove(inactiveButtonClass)
    button.classList.add(activeButtonClass)
    button.removeAttribute('disabled')
 }
   
 enableValidation(validationConfig)