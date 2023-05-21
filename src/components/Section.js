export class Section {
  constructor ({renderer}, container) {
    this._container = container;
    this._renderer = renderer
  }
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item)
    })
     
  }
  addItem(elem) {
    this._container.prepend(elem)
  }
}