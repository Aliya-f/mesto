export class UserInfo {
  constructor({nameInputNew, jobInputNew}) {
    this._name = document.querySelector(nameInputNew)
    this._job = document.querySelector(jobInputNew)
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