export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._currentUser = this.getUserInfo();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(console.log(res.status)))
      .then(res => { return res })
      .catch((error) => { console.log(error); });
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
      .then(res => res.ok ? res.json() : Promise.reject(console.log(res.status)))
      .then(cardObject => {
        submitButton.innerText = "Save";
        return cardObject
      })
      .catch((error) => { console.log(error); });
  }

  uploadProfileImg(link, submitButton) {
    submitButton.innerText = "Saving...";

    fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      }).then(() => submitButton.innerText = "Save")
      .catch((error) => { console.log(error); });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(console.log(res.status)))
      .then(res => { return res })
      .catch((error) => { console.log(error); });
  }

  getUserImg() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(console.log(res.status)))
      .catch((error) => { console.log(error); });
  }

  uploadUserInfo({ name, job }, submitButton) {
    submitButton.innerText = "Saving...";

    fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: job
        })
      }).then(() => { submitButton.innerText = "Save"; })
      .catch((error) => { console.log(error); });
  }

  deleteCard(cardId, deleteButton) {
    deleteButton.innerText = "Deleting...";

    fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      }).then(() => { deleteButton.innerText = "Yes" })
      .catch((error) => { console.log(error); });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(res => res.ok ? res.json() : Promise.reject(console.log(res.status)))
      .then(res => { return res })
      .catch((error) => { console.log(error); });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then(res => res.ok ? res.json() : Promise.reject(console.log(res.status)))
      .then(res => { return res })
      .catch((error) => { console.log(error); });

  }
}
