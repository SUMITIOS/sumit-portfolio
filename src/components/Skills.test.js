import { render, screen } from '@testing-library/react';
import Skills from './Skills';

test('shows skills and web development technologies', () => {
  render(<Skills />);

  expect(
    screen.getByRole('heading', { name: 'Skills' })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: 'Web Development' })
  ).toBeInTheDocument();

  expect(screen.getByText('React', { exact: true })).toBeInTheDocument();
});