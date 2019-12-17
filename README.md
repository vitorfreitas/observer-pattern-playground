# Observer Pattern in Practice

## About this repository

I was doing this while learning more about this awesome pattern called "Observer Pattern". The best way
to learn something is practicing, so I started practicing. As a front-end developer that uses React, I saw
this pattern as something I should've practiced way before today, even though I had a solid knowledge on JavaScript
by the time I started with React. React is just a tool and might disappear any time. On the other hand, patterns
and solid technologies such as HTML/CSS/JS are the basics you should know, and mastering these, you'll master
any lib or framework you want.

## About the pattern

The observer pattern is build upon two major entities: The `Subject` and the `Observer`.

![observer pattern image](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Observer_w_update.svg/500px-Observer_w_update.svg.png)

### `Subject`

This one holds a list of observers. He is responsible to add/remove observers from this list and notify all current
observers that something happened. By doing this the observer will know that something has changed, and do whatever
he whats with this fresh new piece of data.

### `Observer`

Observers will watch changes in the Subject, usually a data source or an input layer. Once the observer is notified
that something happened, it will call a given function and respond to that change.

## How?

In this application we have `createInputListener` which returns our `Subject`. This specific subject acts upon
the `Input Layer`, the layer responsible to handle user inputs.

```js
const myInput = document.querySelector('#input')
const inputListener = createInputListener(myInput)
```

`createInputListener` exports two functions:
 * `subscribe(observer)`: Add a observer to the observers list
 * `unsubscribe(observer)`: Remove a observer from the observers list

In order to become a real Subject, it need two more things:
 * An observers list
 * A `notifyObservers` function

`notifyObservers` is responsible to notify all observers that something has changed. In this code it's done
whenever the user type on the input.

```js
// Inside createInputListener function

input.addEventListener('input', handleInputChange)

function handleInputChange(ev) {
  const { value } = ev.target

  notifyObservers(value)
}

function notifyObservers(inputValue) {
  // observerFunctions: array of observers
  observerFunctions.forEach(fn => fn(inputValue))
}
```

Once we create a new `Subject`, we can append observers to it via the subscribe method.

```js
function createObserver() {
  update(newData) {
    console.log(`Hey! Fresh new data just came in: ${newData}`)
  }

  return {
    update
  }
}

const observer = createObserver() // any observer
const inputListener = createInputListener() // our subject

inputListener.subscribe(observer.update)
```

Everytime the user types on the input, the function `update` on the observer will be called
with the new data as an argument.

## Why?

This pattern solves some programming problems:

 * [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) 
 * [Reactive Programming](https://en.wikipedia.org/wiki/Reactive_programming)\*
 * [Decoupling or Loose Coupling](https://softwareengineering.stackexchange.com/a/244478)

> \* Reactive Programming is a paradigm such as OOP or FP. The Observer pattern offers you a glimpse of
what this paradigm is about.
