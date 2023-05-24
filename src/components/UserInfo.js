export class UserInfo {
  constructor({nameInputSelector, jobInputSelector, selectorUserAvatar}) {
    this._name = document.querySelector(nameInputSelector)
    this._about = document.querySelector(jobInputSelector)
    this._profileAvatar = document.querySelector(selectorUserAvatar);
  }
  
  getUserInfo() {
    return {
        name: this._name.textContent,
        about: this._about.textContent    
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name,
    this._about.textContent = data.about
    //this._profileAvatar.src = data.avatar
  }

  setAvatar(data) {
    this._profileAvatar.src = data.avatar
  }
}