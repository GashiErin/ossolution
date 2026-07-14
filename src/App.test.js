import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the studio landing page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /we make digital feel alive/i })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /hello@orbit.studio/i })).not.toHaveLength(0);
});
