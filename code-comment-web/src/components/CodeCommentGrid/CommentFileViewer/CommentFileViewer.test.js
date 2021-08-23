import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CommentFileViewer from './CommentFileViewer';

afterEach(() => cleanup());

describe('<CommentFileViewer/>', () => {
  it('CommentFileViewer mounts without failing', () => {
    render(<CommentFileViewer />); 
    expect(screen.getAllByTestId("test-for-CommentFileViewer").length).toBeGreaterThan(0);
  });
});

