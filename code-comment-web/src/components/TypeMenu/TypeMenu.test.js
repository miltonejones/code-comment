import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import TypeMenu from './TypeMenu';

afterEach(() => cleanup());

describe('<TypeMenu/>', () => {
  it('TypeMenu mounts without failing', () => {
    render(<TypeMenu />); 
    expect(screen.getAllByTestId("test-for-TypeMenu").length).toBeGreaterThan(0);
  });
});

