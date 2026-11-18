import { render, screen } from '@testing-library/react';
import Contact from './Contact';

const contact = {
  email: 'hello@example.com',
  phone: '+91 1234567890',
  location: 'Kolkata, India',
  linkedin: 'https://www.linkedin.com/in/example/',
};
const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  if (originalFetch) {
    global.fetch = originalFetch;
  } else {
    delete global.fetch;
  }
});

test('loads contact details from the backend', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => contact,
  });

  render(<Contact />);

  expect(await screen.findByRole('link', { name: contact.email })).toHaveAttribute(
    'href',
    `mailto:${contact.email}`
  );
  expect(screen.getByRole('link', { name: contact.phone })).toHaveAttribute(
    'href',
    'tel:+911234567890'
  );
  expect(screen.getByText('Location: Kolkata, India')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Sumit Pandey' })).toHaveAttribute(
    'href',
    contact.linkedin
  );
});

test('shows an error when the contact backend is unavailable', async () => {
  global.fetch.mockResolvedValue({
    ok: false,
    status: 503,
  });

  render(<Contact />);

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Contact service returned 503'
  );
});
