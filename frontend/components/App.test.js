import React from 'react';
import { render } from '@testing-library/react';
import AppClass from './AppClass';

test('renders "Coordinates message', () => {
  const { getByText } = render(<AppClass />);
  const coordinatesMessage = getByText(/Coordinates/i);
  expect(coordinatesMessage).toBeInTheDocument();
})
test('sanity', () => {
  expect(true).toBe(false)
})
test('square wont move past the edge of the board', () => {
  const { container } = render(<AppClass />);
  const square = container.querySelector('.square');
  const currentIndex = Number(square.classList[1].split('-')[1])
  const leftButton = container.querySelector('#left');
  const updatedSquare = container.querySelector('.square');
  const updatedIndex = Number(updatedSquare.classList[1].split('-')[1]);

  expect(updatedIndex).toBe(currentIndex)
})
test('visible texts render on the screen', () => {
  render(<AppClass />);

  expect(screen.getByText(/Coordinates/i)).toBeInTheDocument();
  expect(screen.getByText(/Steps/i)).toBeInTheDocument();
  expect(screen.getByText('LEFT')).toBeInTheDocument();
  expect(screen.getByText('UP')).toBeInTheDocument();
  expect(screen.getByText('RIGHT')).toBeInTheDocument();
  expect(screen.getByText('DOWN')).toBeInTheDocument();
  expect(screen.getByText('reset')).toBeInTheDocument();
});

test('typing on the input changes its value', () => {
  render(<AppClass />);

  const emailInput = screen.getByPlaceholderText('type email');
  fireEvent.change(emailInput, { target: { value: 'lady@gaga.com' } });

  expect(emailInput.value).toBe('lada@gaga.com');
})
