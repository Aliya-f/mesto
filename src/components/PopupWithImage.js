import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector('.popup__image');
        this._title = this._popup.querySelector('.popup__title-card');
    }

    openPopup(card) {
        this._image.src = card.link;
        this._image.alt = card.place;
        this._title.textContent = card.place;
        super.openPopup();
    }
}