export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _response(res) {
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
    .then(this._response)
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
    .then(this._response)
}
    
  // удаление карточки
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._response)
  }

  // редактирование данных профиля
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(this._response)
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
    .then(this._response)
  }

  // лайк
  likeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(this._response)
  }

  dislikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._response)
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
    .then(this._response)
  }
}
