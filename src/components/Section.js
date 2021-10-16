export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderer() {
    this._renderedItems.forEach(element => {
      this._renderer(element);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
