import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AppClass from './AppClass';

test('renders without errors', () => {
  render(<AppClass />);
});

// test('renders the coordinates message header', () => {
  // render(<AppClass />);
 //  const header = screen.queryByText(/coordinates/i);
  // expect(header).toBeInTheDocument();
//});