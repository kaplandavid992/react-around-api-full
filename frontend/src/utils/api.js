class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._setHeaders() }).then(
      this._checkResponse,
    );
  }

  postNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  confirmDelete(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._setHeaders(),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._setHeaders(),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, 
    { headers: this._setHeaders(), }).then(this._checkResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._setHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  editAvatarImage({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._setHeaders(),
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(new Error(`Error ${res.status}`));
  }
  _setHeaders() {
    const token = localStorage.getItem('token');
    return {
      authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    };
  }
}

const api = new Api({
  baseUrl: 'https://api.aroundusa.webdevdav.com',
});

export default api; 