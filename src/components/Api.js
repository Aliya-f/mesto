export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // отрисовка карточек
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

  // добавление карточки
  createCard(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      })
    })
    .then(this._checkResponse)
}
    
  // удаление карточки
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

  // редактирование данных профиля
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(this._checkResponse)
  }

  setUserInfo(item) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
    .then(this._checkResponse)
  }

  // лайк
  likeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

  dislikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._checkResponse)
  }
 
  // аватар
  setAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then(this._checkResponse)
  }
}
