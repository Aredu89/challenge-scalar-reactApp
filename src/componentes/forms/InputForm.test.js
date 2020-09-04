import React from 'react';
import { render, cleanup } from '@testing-library/react';
import InputForm from './InputForm';

afterEach(cleanup)

describe('InputForm tests', ()=> {
  it('InputForm Snapshot', () => {
    const { asFragment } = render(<InputForm />);
    expect(asFragment(<InputForm />)).toMatchSnapshot()
  });
})