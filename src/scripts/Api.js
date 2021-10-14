export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._currentUser = this.getUserInfo();
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(console.log(res.status));
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => this._handleResponse(res))
      .then(res => { return res })
      .catch((error) => { `Error, ${error}` });
  }

  uploadCard(title, link, submitButton) {
    submitButton.innerText = "Saving...";

    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: title,
          link: link
        })
      })
      .then(res => this._handleResponse(res))
      .then(cardObject => {
        submitButton.innerText = "Save";
        return cardObject;
      })
      .catch((error) => { `Error, ${error}` });
  }

  uploadProfileImg(link, submitButton) {
    submitButton.innerText = "Saving...";

    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      }).then((res) => {
        submitButton.innerText = "Save";
        return res.json();
      })
      .catch((error) => { `Error, ${error}` });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => this._handleResponse(res))
      .then(res => { return res })
      .catch((error) => { `Error, ${error}` });
  }

  getUserImg() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => this._handleResponse(res))
      .catch((error) => { `Error, ${error}` });
  }

  uploadUserInfo({ name, job }, submitButton) {
    submitButton.innerText = "Saving...";

    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: job
        })
      }).then((res) => {
        submitButton.innerText = "Save";
        return res.json();
      })
      .catch((error) => { `Error, ${error}` });
  }

  deleteCard(cardId, deleteButton) {
    deleteButton.innerText = "Deleting...";

    fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      }).then(() => { deleteButton.innerText = "Yes" })
      .catch((error) => { `Error, ${error}` });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(res => this._handleResponse(res))
      .then(res => { return res })
      .catch((error) => { `Error, ${error}` });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then(res => this._handleResponse(res))
      .then(res => { return res })
      .catch((error) => { `Error, ${error}` });

  }
}
