import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the chat button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /open chat/i })).toBeInTheDocument();
});