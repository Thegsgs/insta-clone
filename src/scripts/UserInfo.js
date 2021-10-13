import { nameField, jobField } from "./index.js";

export default class UserInfo {
  constructor({ name, job }) {
    this._nameInput = name;
    this._jobInput = job;
    this._nameField = nameField;
    this._jobField = jobField;
  }

  setUserInfo({ name, job }) {
    this._nameInput = name;
    this._jobInput = job;
    this._nameField.textContent = this._nameInput;
    this._jobField.textContent = this._jobInput;
  }
}
