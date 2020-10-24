'use strict';

const view = new class {
  canvas    = document.getElementById('canvas')
  formula   = document.getElementById('formula')
  inputList = document.getElementById('inputList')
  dataItemTemplate = `
    <div class="data-item data-group">
      <input type="number" step="1" placeholder="Rok">
      <input type="number" placeholder="Przyrost">
      <button class="remove-button" onClick="">x</button>
    </div>`

  spawnInput() {
    this.inputList.insertAdjacentHTML('beforebegin', this.dataItemTemplate)
  }

  importData() { }
  removeAll() { }
}()
