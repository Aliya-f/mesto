import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__form-input');
    }

    _getInputValues () {
        this._inputValues = {};
        this._inputs.forEach(input => {
            return this._inputValues[input.id] = input.value;
        })
        return this._inputValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup()
        })
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}