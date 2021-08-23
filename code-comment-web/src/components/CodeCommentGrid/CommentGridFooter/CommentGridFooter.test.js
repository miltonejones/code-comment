import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CommentGridFooter from './CommentGridFooter';

afterEach(() => cleanup());

describe('<CommentGridFooter/>', () => {
  it('CommentGridFooter mounts without failing', () => {
    render(<CommentGridFooter />); 
    expect(screen.getAllByTestId("test-for-CommentGridFooter").length).toBeGreaterThan(0);
  });
});

