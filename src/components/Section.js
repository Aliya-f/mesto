export class Section {
    constructor ({items, renderer}, selectorContainer) {
      this._items = items;
      this._selectorContainer = selectorContainer;
      this._renderer = renderer
    }
    renderItems() {
      this._items.forEach(item => {
        this._renderer(item)
      })
     
    }
    addItem(elem) {
      this._selectorContainer.prepend(elem)
    }
  }