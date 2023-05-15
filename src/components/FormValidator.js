export class FormValidator {
  constructor(validationConfig, form){
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._form = form;
  } 

  enableValidation() {
    this._setEventListeners()
  }
  
  // делает активной\неактивной кнопку
  _setEventListeners() {
    this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector))
    this._formButton = this._form.querySelector(this._submitButtonSelector)       
    this.disableButton(this._formButton)
    //проверяет валидность поля
    this._formInputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        if (this._hasInvalidInput(this._formInputs)) {
          this.disableButton()
        } else {
          this._enableButton()
        }
      })
    })
  }
  
  // проверяет валидность поля и выводит сообщение ошибки
  _checkInputValidity = (input) => {
    if (input.checkValidity()) {
      this._hideInputError(input)
    } else {
      this._showInputError(input)
    }
  }
  // функции показа спан с ошибкой
  _showInputError(input) {
    const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`);
    currentInputErrorContainer.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass)
  }
    
  _hideInputError(input) {
    const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`)
    currentInputErrorContainer.textContent = '';
    input.classList.remove(this._inputErrorClass)
  }
  
  removeValidationErrors = () => {
    this._formInputs.forEach(input => {
      this._hideInputError(input)
    })
  }
    
  // есть ли в форме невалидное поле
  _hasInvalidInput = () => {
    return this._formInputs.some((item) => !item.validity.valid)
  }
  
  // кнопка неактивна
  disableButton = () => {
    this._formButton.classList.add(this._inactiveButtonClass)
    this._formButton.setAttribute('disabled', true)
  }
  // кнопка активна
  _enableButton = () => {
    this._formButton.classList.remove(this._inactiveButtonClass)
    this._formButton.removeAttribute('disabled')
  }
}
  