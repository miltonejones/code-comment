import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ModalSnackBar from './ModalSnackBar';

afterEach(() => cleanup());

describe('<ModalSnackBar/>', () => {
  it('ModalSnackBar mounts without failing', () => {
    render(<ModalSnackBar />); 
    expect(screen.getAllByTestId("test-for-ModalSnackBar").length).toBeGreaterThan(0);
  });
});

