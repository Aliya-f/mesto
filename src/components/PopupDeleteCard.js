import {Popup} from './Popup.js'
export class PopupDeleteCard extends Popup {
    constructor(popup) {
        super(popup);
        this._form = this._popup.querySelector('.popup__form');
    }
    
    setSubmitAction(handler) {
        this.setSubmitAction = handler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.setSubmitAction();
        })
    }
}