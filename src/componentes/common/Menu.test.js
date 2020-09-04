import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Menu from './Menu';

afterEach(cleanup)

describe('Menu tests', ()=> {
  it('Menu Snapshot', () => {
    const { asFragment } = render(<Menu />);
    expect(asFragment(<Menu />)).toMatchSnapshot()
  });
})