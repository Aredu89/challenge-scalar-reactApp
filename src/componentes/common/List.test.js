import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Lista from './Lista';

afterEach(cleanup)

describe('Lista tests', ()=> {
  it('Lista Snapshot', () => {
    const { asFragment } = render(<Lista />);
    expect(asFragment(<Lista />)).toMatchSnapshot()
  });
  it('Lista sin datos', () => {
    const { getByText  } = render(<Lista />);
    expect(getByText('No hay datos para mostrar')).toBeInTheDocument()
  });
})