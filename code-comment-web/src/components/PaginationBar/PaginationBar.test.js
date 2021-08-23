import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import PaginationBar from './PaginationBar';

afterEach(() => cleanup());

describe('<PaginationBar/>', () => {
  it('PaginationBar mounts without failing', () => {
    render(<PaginationBar />); 
    expect(screen.getAllByTestId("test-for-PaginationBar").length).toBeGreaterThan(0);
  });
});

