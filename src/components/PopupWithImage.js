import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector('.popup__image');
        this._title = this._popup.querySelector('.popup__title-card');
    }

    openPopup(name, link) {
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;
        super.openPopup();
    }
}