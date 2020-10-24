'use strict';

const view = new class {
  canvas    = document.getElementById('canvas')
  formula   = document.getElementById('formula')
  inputList = document.getElementById('inputList')
  dataItemTemplate = `
    <div class="data-item data-group">
      <input type="number" name="year" step="1" placeholder="Rok">
      <input type="number" name="delta" placeholder="Przyrost">
      <button class="remove-button" onClick="view.removeInput(this)">x</button>
    </div>`

  spawnInput() {
    this.inputList.insertAdjacentHTML('beforebegin', this.dataItemTemplate)
  }

  importData() { }
  removeInput(element) {
    let container = element.parentNode
    container.parentNode.removeChild(container)
  }
  removeAllInputs() { }
}()

view.spawnInput();
