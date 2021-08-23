import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CodeCommentGrid from './CodeCommentGrid';

afterEach(() => cleanup());

describe('<CodeCommentGrid/>', () => {
  it('CodeCommentGrid mounts without failing', () => {
    render(<CodeCommentGrid />); 
    expect(screen.getAllByTestId("test-for-CodeCommentGrid").length).toBeGreaterThan(0);
  });
});

