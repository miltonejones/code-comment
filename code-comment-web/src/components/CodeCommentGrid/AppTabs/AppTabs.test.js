import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import AppTabs from './AppTabs';

afterEach(() => cleanup());

describe('<AppTabs/>', () => {
  it('AppTabs mounts without failing', () => {
    render(<AppTabs />); 
    expect(screen.getAllByTestId("test-for-AppTabs").length).toBeGreaterThan(0);
  });
});

