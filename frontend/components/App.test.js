import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import AppClass from './AppClass';

test('renders without errors', () => {
  render(<AppClass />);
});