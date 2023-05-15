export class UserInfo {
  constructor({nameInputSelector, jobInputSelector}) {
    this._name = document.querySelector(nameInputSelector)
    this._job = document.querySelector(jobInputSelector)
  }
  getUserInfo() {
    return {
        name: this._name.textContent,
        job: this._job.textContent    
    }
  }
  setUserInfo(data) {
    this._name.textContent = data.name
    this._job.textContent = data.job
  }
}