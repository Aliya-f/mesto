export class UserInfo {
  constructor({nameInputSelector, jobInputSelector}) {
    this._name = document.querySelector(nameInputSelector)
    this._about = document.querySelector(jobInputSelector)
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
  }
}