export class Popup {
  constructor (popup) {
    this._popup = popup;
    this._closePopupEsc = this._closePopupEsc.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupEsc);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupEsc)
  }

  _closePopupEsc = (evt) => {
    if (evt.code === 'Escape') {
      this.closePopup()
    }
  }
    
  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-button')) {
        this.closePopup();
      }
    })
  }
}