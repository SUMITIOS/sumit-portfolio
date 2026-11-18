import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

test('shows navigation links to the main portfolio pages', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/skills');
  expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience');
  expect(screen.getByRole('link', { name: 'Certifications/Courses' })).toHaveAttribute(
    'href',
    '/courses'
  );
});
