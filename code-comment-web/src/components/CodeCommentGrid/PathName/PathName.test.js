import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import PathName from './PathName';

afterEach(() => cleanup());

describe('<PathName/>', () => {
  it('PathName mounts without failing', () => {
    render(<PathName />); 
    expect(screen.getAllByTestId("test-for-PathName").length).toBeGreaterThan(0);
  });
});

