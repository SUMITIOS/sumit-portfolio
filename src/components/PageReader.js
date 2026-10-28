import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PageReader.module.css';

const PageReader = () => {
  const [status, setStatus] = useState('idle');
  const chunksRef = useRef([]);
  const chunkIndexRef = useRef(0);
  const activeBlockRef = useRef(null);
  const location = useLocation();
  const supported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window;

  const stopReading = () => {
    if (supported) window.speechSynthesis.cancel();
    activeBlockRef.current?.classList.remove(styles.readingBlock);
    activeBlockRef.current = null;
    chunksRef.current = [];
    chunkIndexRef.current = 0;
    setStatus('idle');
  };

  const speakNextChunk = () => {
    if (chunkIndexRef.current >= chunksRef.current.length) {
      activeBlockRef.current?.classList.remove(styles.readingBlock);
      activeBlockRef.current = null;
      setStatus('idle');
      return;
    }

    const chunk = chunksRef.current[chunkIndexRef.current];
    activeBlockRef.current?.classList.remove(styles.readingBlock);
    activeBlockRef.current = chunk.element;
    activeBlockRef.current.classList.add(styles.readingBlock);
    activeBlockRef.current.scrollIntoView?.({ behavior: 'smooth', block: 'center' });

    const utterance = new window.SpeechSynthesisUtterance(chunk.text);
    utterance.onend = () => {
      chunkIndexRef.current += 1;
      speakNextChunk();
    };
    utterance.onerror = (event) => {
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        stopReading();
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  const startReading = () => {
    const pageContent = document.getElementById('page-content');
    if (!pageContent) return;

    const blockSelector = 'h1, h2, h3, h4, h5, h6, p, li, blockquote, figcaption, dt, dd';
    const excludedSelector = 'script, style, noscript, button, input, textarea, select, form, [hidden], [aria-hidden="true"]';
    chunksRef.current = [];

    pageContent.querySelectorAll(blockSelector).forEach((element) => {
      if (element.closest(excludedSelector)) return;

      const readableBlock = element.cloneNode(true);
      readableBlock
        .querySelectorAll(`${blockSelector}, ${excludedSelector}`)
        .forEach((child) => child.remove());
      const text = readableBlock.textContent.replace(/\s+/g, ' ').trim();
      if (!text) return;

      chunksRef.current.push({ text, element });
    });

    if (!chunksRef.current.length) return;
    chunkIndexRef.current = 0;
    window.speechSynthesis.cancel();
    activeBlockRef.current?.classList.remove(styles.readingBlock);
    setStatus('speaking');
    speakNextChunk();
  };

  const toggleReading = () => {
    if (status === 'speaking') {
      window.speechSynthesis.pause();
      setStatus('paused');
    } else if (status === 'paused') {
      window.speechSynthesis.resume();
      setStatus('speaking');
    } else {
      startReading();
    }
  };

  useEffect(() => {
    if (supported) window.speechSynthesis.cancel();
    activeBlockRef.current?.classList.remove(styles.readingBlock);
    activeBlockRef.current = null;
    chunksRef.current = [];
    chunkIndexRef.current = 0;
    setStatus('idle');
  }, [location.pathname, supported]);

  useEffect(() => () => {
    if (supported) window.speechSynthesis?.cancel();
  }, [supported]);

  const label = !supported
    ? 'Read aloud is not supported by this browser'
    : status === 'speaking'
      ? 'Pause reading'
      : status === 'paused'
        ? 'Resume reading'
        : 'Read me';

  return (
    <section className={styles.readerToolbar} aria-label="Page reader">
      <div className={styles.readerControls}>
        <button
          type="button"
          className={styles.readerButton}
          onClick={toggleReading}
          disabled={!supported}
          aria-label={label}
        >
          {status === 'speaking' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 5h4v14H7zM15 5h4v14h-4z" />
            </svg>
          ) : status === 'paused' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 10v4h4l5 4V6l-5 4H3z" />
              <path d="M16 9a5 5 0 0 1 0 6M18.5 6.5a9 9 0 0 1 0 11" />
            </svg>
          )}
          <span>
            {status === 'speaking'
              ? 'Pause'
              : status === 'paused'
                ? 'Resume'
                : 'Read me'}
          </span>
        </button>
        {status !== 'idle' && (
          <button
            type="button"
            className={styles.stopButton}
            onClick={stopReading}
            aria-label="Stop reading"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="6" width="12" height="12" rx="1" />
            </svg>
            <span>Stop</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default PageReader;
