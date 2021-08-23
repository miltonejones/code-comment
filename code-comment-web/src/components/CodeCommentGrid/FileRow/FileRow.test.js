import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import FileRow from './FileRow';

afterEach(() => cleanup());

describe('<FileRow/>', () => {
  it('FileRow mounts without failing', () => {
    render(<FileRow />); 
    expect(screen.getAllByTestId("test-for-FileRow").length).toBeGreaterThan(0);
  });
});

