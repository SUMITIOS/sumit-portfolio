import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageReader from './PageReader';

describe('PageReader', () => {
  let speechSynthesis;
  let originalSpeechSynthesis;
  let originalUtterance;

  beforeEach(() => {
    originalSpeechSynthesis = Object.getOwnPropertyDescriptor(window, 'speechSynthesis');
    originalUtterance = Object.getOwnPropertyDescriptor(window, 'SpeechSynthesisUtterance');
    speechSynthesis = {
      cancel: jest.fn(),
      speak: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
    };

    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: speechSynthesis,
    });
    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
      configurable: true,
      value: class {
        constructor(text) {
          this.text = text;
        }
      },
    });
  });

  afterEach(() => {
    if (originalSpeechSynthesis) {
      Object.defineProperty(window, 'speechSynthesis', originalSpeechSynthesis);
    } else {
      delete window.speechSynthesis;
    }

    if (originalUtterance) {
      Object.defineProperty(window, 'SpeechSynthesisUtterance', originalUtterance);
    } else {
      delete window.SpeechSynthesisUtterance;
    }
  });

  test('shows a compact reader and highlights the content as it is read', () => {
    render(
      <MemoryRouter>
        <PageReader />
        <main id="page-content">
          <h1>About Sumit</h1>
          <p>Welcome to my portfolio.</p>
          <button type="button">Do not read this</button>
        </main>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Read me' }));
    expect(speechSynthesis.speak).toHaveBeenCalledTimes(1);
    expect(speechSynthesis.speak.mock.calls[0][0].text).toBe('About Sumit');
    expect(screen.getByRole('heading', { name: 'About Sumit' })).toHaveClass('readingBlock');
    expect(screen.queryByText(/reads the home page/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pause reading' }));
    expect(speechSynthesis.pause).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Resume reading' }));
    expect(speechSynthesis.resume).toHaveBeenCalledTimes(1);

    speechSynthesis.speak.mock.calls[0][0].onend();
    expect(screen.getByRole('heading', { name: 'About Sumit' })).not.toHaveClass('readingBlock');
    expect(screen.getByText('Welcome to my portfolio.')).toHaveClass('readingBlock');

    fireEvent.click(screen.getByRole('button', { name: 'Stop reading' }));
    expect(speechSynthesis.cancel).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Read me' })).toBeInTheDocument();
    expect(screen.getByText('Welcome to my portfolio.')).not.toHaveClass('readingBlock');
  });
});
