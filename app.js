function createInputListener(input) {
  const observerFunctions = []

  input.addEventListener('input', handleInputChange)

  function handleInputChange(ev) {
    const { value } = ev.target

    notifyObservers(value)
  }

  function subscribe(observerFunction) {
    console.log(`${observerFunction.name} is subscribed!`)
    observerFunctions.push(observerFunction)
  }

  function unsubscribe(observerFunction) {
    console.log(`${observerFunction.name} is unsubscribed!`)
    observerFunctions.filter(fn => fn !== observerFunction)
  }

  function notifyObservers(inputValue) {
    observerFunctions.forEach(fn => fn(inputValue))
  }

  return {
    subscribe,
    unsubscribe
  }
}

function createUI() {
  const input = document.querySelector('#input')
  const charCounterParent = document.querySelector('#counter-parent')
  const wordsListParent = document.querySelector('#words-list')
  const lastCharTypedParent = document.querySelector('#last-char')

  return {
    input,
    charCounterParent,
    wordsListParent,
    lastCharTypedParent
  }
}

function createCharCounter(parent) {
  function render(word) {
    const html = `
      <h3>This word has ${word.trim().length} characteres.</h3>
    `

    parent.innerHTML = html
  }

  return {
    render
  }
}

function createWordsList(parent) {
  function render(word) {
    const html = `
      <li>${word.trim()}</li>
    `

    parent.innerHTML += html
  }

  return {
    render
  }
}

function createLastCharTyped(parent) {
  function render(word) {
    const html = `
      <p>Last char typed: ${word[word.length - 1]}</p>
    `

    parent.innerHTML = html
  }

  return {
    render
  }
}

const ui = createUI()
const inputListener = createInputListener(ui.input)
const charCounter = createCharCounter(ui.charCounterParent)
const wordsList = createWordsList(ui.wordsListParent)
const lastCharTyped = createLastCharTyped(ui.lastCharTypedParent)

inputListener.subscribe(charCounter.render)
inputListener.subscribe(wordsList.render)
inputListener.subscribe(lastCharTyped.render)

