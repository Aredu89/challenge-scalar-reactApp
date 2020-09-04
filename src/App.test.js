import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup)

describe('App tests', ()=> {
  it('App Snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot()
  });
})