import React from 'react';
import { render, cleanup } from '@testing-library/react';
import MonedasLista from './MoviesList';

afterEach(cleanup)

describe('MonedasLista tests', ()=> {
  it('MonedasLista Snapshot', () => {
    const { asFragment } = render(<MonedasLista />);
    expect(asFragment(<MonedasLista />)).toMatchSnapshot()
  });
  it('Titulo', () => {
    const { getByText  } = render(<MonedasLista />);
    expect(getByText('Monedas')).toBeInTheDocument()
  });
})