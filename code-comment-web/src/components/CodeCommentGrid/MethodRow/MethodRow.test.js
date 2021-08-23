import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import MethodRow from './MethodRow';

afterEach(() => cleanup());

describe('<MethodRow/>', () => {
  it('MethodRow mounts without failing', () => {
    render(<MethodRow />); 
    expect(screen.getAllByTestId("test-for-MethodRow").length).toBeGreaterThan(0);
  });
});

