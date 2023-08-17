import server from './backend/mock-server'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppClass from './frontend/components/AppClass'

jest.setTimeout(1000) // default 5000 too long for Codegrade
const waitForOptions = { timeout: 100 }
const queryOptions = { exact: false }

let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
}

const testSquares = (squares, activeIdx) => {
  squares.forEach((square, idx) => {
    if (idx === activeIdx) {
      expect(square.textContent).toBe('B')
      expect(square.className).toMatch(/active/)
    } else {
      expect(square.textContent).toBeFalsy()
      expect(square.className).not.toMatch(/active/)
    }
  })
}

test('AppFunctional is a functional component, Review how to build a functional component, including useState and passing props.', () => {
  expect(
    AppFunctional.prototype &&
    AppFunctional.prototype.isReactComponent
  ).not.toBeTruthy()
})
test('AppClass is a class-based component, Review how to build a class-based component, such as using “extends”, and constructors', () => {
  expect(
    AppClass.prototype &&
    AppClass.prototype.isReactComponent
  ).toBeTruthy()
});

[AppFunctional, AppClass].forEach((Component, idx) => {
  const label = idx === 0 ? 'FUNCTIONAL' : 'CLASS-BASED'

  describe(`${label}`, () => {
    beforeAll(() => { server.listen() })
    afterAll(() => { server.close() })
    beforeEach(() => {
      render(<Component />)
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
    })
    afterEach(() => {
      server.resetHandlers()
      document.body.innerHTML = ''
    })

    describe(`[A ${label}] Active Square, Review how to set a class name and use ternary statements, as well as how to set, manipulate, and read pieces of state. Also review how to handle user interaction.`, () => {
      test(`[A1 ${label}] Actions: none (Initial State of <App />)
          Active Square should be index 4`, () => {
        testSquares(squares, 4)
      })
      test(`[A2 ${label}] Actions: up
          Active Square should be index 1`, () => {
        fireEvent.click(up)
        testSquares(squares, 1)
      })
      test(`[A3 ${label}] Actions: up, up
          Active Square should be index 1`, () => {
        fireEvent.click(up)
        fireEvent.click(up)
        testSquares(squares, 1)
      })
      test(`[A4 ${label}] Actions: up, left
          Active Square should be index 0`, () => {
        fireEvent.click(up)
        fireEvent.click(left)
        testSquares(squares, 0)
      })
      test(`[A5 ${label}] Actions: up, left, left
          Active Square should be index 0`, () => {
        fireEvent.click(up)
        fireEvent.click(left)
        fireEvent.click(left)
        testSquares(squares, 0)
      })
      test(`[A6 ${label}] Actions: up, right
          Active Square should be index 2`, () => {
        fireEvent.click(up)
        fireEvent.click(right)
        testSquares(squares, 2)
      })
      test(`[A7 ${label}] Actions: up, right, right
          Active Square should be index 2`, () => {
        fireEvent.click(up)
        fireEvent.click(right)
        fireEvent.click(right)
        testSquares(squares, 2)
      })
      test(`[A8 ${label}] Actions: right
          Active Square should be index 5`, () => {
        fireEvent.click(right)
        testSquares(squares, 5)
      })
      test(`[A9 ${label}] Actions: right, right
          Active Square should be index 5`, () => {
        fireEvent.click(right)
        fireEvent.click(right)
        testSquares(squares, 5)
      })
      test(`[A10 ${label}] Actions: right, down
          Active Square should be index 8`, () => {
        fireEvent.click(right)
        fireEvent.click(down)
        testSquares(squares, 8)
      })
      test(`[A11 ${label}] Actions: right, down, down
          Active Square should be index 8`, () => {
        fireEvent.click(right)
        fireEvent.click(down)
        fireEvent.click(down)
        testSquares(squares, 8)
      })
      test(`[A12 ${label}] Actions: down, left
          Active Square should be index 6`, () => {
        fireEvent.click(down)
        fireEvent.click(left)
        testSquares(squares, 6)
      })
      test(`[A13 ${label}] Actions: down, down, left, left
          Active Square should be index 6`, () => {
        fireEvent.click(down)
        fireEvent.click(down)
        fireEvent.click(left)
        fireEvent.click(left)
        testSquares(squares, 6)
      })
    })
  })
})
