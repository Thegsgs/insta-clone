import { profileName, profileJob } from "./index.js";

export default class UserInfo {
  constructor({ name, job }) {
    this._nameInput = name;
    this._jobInput = job;
    this._nameField = profileName;
    this._jobField = profileJob;
  }
  getUserInfo() {
    const userData = {
      name: this._nameField.textContent,
      job: this._jobField.textContent
    };
    return userData;
  }

  setUserInfo({ name, job }) {
    this._nameInput = name;
    this._jobInput = job;
    this._nameField.textContent = this._nameInput;
    this._jobField.textContent = this._jobInput;
  }
}
