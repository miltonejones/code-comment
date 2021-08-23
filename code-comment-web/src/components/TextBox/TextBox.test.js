import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import TextBox from './TextBox';

afterEach(() => cleanup());

describe('<TextBox/>', () => {
  it('TextBox mounts without failing', () => {
    render(<TextBox />); 
    expect(screen.getAllByTestId("test-for-TextBox").length).toBeGreaterThan(0);
  });
});

