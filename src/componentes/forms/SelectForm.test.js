import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SelectForm from './SelectForm';

afterEach(cleanup)

describe('SelectForm tests', ()=> {
  it('SelectForm Snapshot', () => {
    const { asFragment } = render(<SelectForm />);
    expect(asFragment(<SelectForm />)).toMatchSnapshot()
  });
})