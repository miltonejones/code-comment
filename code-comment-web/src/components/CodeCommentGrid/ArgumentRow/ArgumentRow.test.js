import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ArgumentRow from './ArgumentRow';

afterEach(() => cleanup());

describe('<ArgumentRow/>', () => {
  it('ArgumentRow mounts without failing', () => {
    render(<ArgumentRow />); 
    expect(screen.getAllByTestId("test-for-ArgumentRow").length).toBeGreaterThan(0);
  });
});

