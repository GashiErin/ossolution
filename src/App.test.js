import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the studio landing page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /we make digital feel alive/i })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /contact@ossolut.com/i })).not.toHaveLength(0);
  expect(screen.getAllByText('Erin Gashi')).not.toHaveLength(0);
  expect(screen.getByText('Euron Osmani')).toBeInTheDocument();
  expect(screen.getByText('Lum Meta')).toBeInTheDocument();
  expect(screen.getByText('Art Sahiti')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /prepare inquiry/i })).toBeInTheDocument();
});
