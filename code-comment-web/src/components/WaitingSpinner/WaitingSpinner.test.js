import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WaitingSpinner from './WaitingSpinner';

afterEach(() => cleanup());

describe('<WaitingSpinner/>', () => {
  it('WaitingSpinner mounts without failing', () => {
    render(<WaitingSpinner />); 
    expect(screen.getAllByTestId("test-for-WaitingSpinner").length).toBeGreaterThan(0);
  });
});

