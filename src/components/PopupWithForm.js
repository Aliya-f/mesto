import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__form-input');
        this._buttonSubmit = this._form.querySelector('.popup__form-button');
    }

    _getInputValues () {
        this._inputValues = {};
        this._inputs.forEach(input => {
            return this._inputValues[input.name] = input.value;
        })
        return this._inputValues
    }

    renderLoading(isLoading, loadingText) {
        if (!this._buttonSubmit) return;
        if (isLoading) {
          this.defaulText = this._buttonSubmit.textContent;
          this._buttonSubmit.textContent = loadingText;
        } else {
          this._buttonSubmit.textContent = this.defaulText;
        }
      }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}