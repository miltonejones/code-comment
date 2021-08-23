import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ReadinessSectionHeader from './ReadinessSectionHeader';

afterEach(() => cleanup());

describe('<ReadinessSectionHeader/>', () => {
  it('ReadinessSectionHeader mounts without failing', () => {
    render(<ReadinessSectionHeader />); 
    expect(screen.getAllByTestId("test-for-ReadinessSectionHeader").length).toBeGreaterThan(0);
  });
});

