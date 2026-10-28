import React, { useState } from 'react';
import styles from './Chatbot.module.css';
import ResumeButton from './ResumeButton';
import PageReader from './PageReader';

const CHAT_API_URL = `https://mysimplechat.smile-sumit-pandey.workers.dev/api/chat` //process.env.REACT_APP_CHAT_API_URL;


// const MODEL = 'meta-llama/Llama-3.2-3B-Instruct';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading || !CHAT_API_URL) return;

    const nextMessages = [...messages, { role: 'user', content }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error(`Chat service returned ${response.status}.`);
      }

      const result = await response.json();
      const reply = result.choices?.[0]?.message;
      if (reply?.role !== 'assistant' || typeof reply.content !== 'string') {
        throw new Error('Chat service returned an unexpected response.');
      }

      setMessages((currentMessages) => [...currentMessages, reply]);
    } catch (requestError) {
      setError(requestError.message || 'Could not reach the chat service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className={styles.chatbot}>
      {isOpen && (
        <section className={styles.panel} aria-label="Chat with Sumit's assistant">
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.title}>Chat with Sumit</h2>
              <p className={styles.subtitle}>Ask me about my work and experience</p>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className={styles.messages} aria-live="polite">
            {messages.length === 0 && (
              <p className={styles.welcome}>
                {CHAT_API_URL
                  ? 'Hi! What would you like to know?'
                  : 'The chat service is not connected yet.'}
              </p>
            )}
            {messages.map((message, index) => (
              <p
                className={`${styles.message} ${
                  message.role === 'user' ? styles.userMessage : styles.assistantMessage
                }`}
                key={`${index}-${message.role}`}
              >
                {message.content}
              </p>
            ))}
            {loading && <p className={styles.status}>Thinking…</p>}
            {error && <p className={styles.error} role="alert">{error}</p>}
          </div>

          <form className={styles.form} onSubmit={sendMessage}>
            <input
              className={styles.input}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={CHAT_API_URL ? 'Type a message…' : 'Chat unavailable'}
              aria-label="Message"
              disabled={!CHAT_API_URL || loading}
            />
            <button
              className={styles.sendButton}
              type="submit"
              disabled={!CHAT_API_URL || !input.trim() || loading}
            >
              Send
            </button>
          </form>
        </section>
      )}

      <div className={styles.floatingActions}>
        <PageReader />
        <ResumeButton />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
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
              <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
            </svg>
          )}
          <span className={styles.toggleLabel} aria-hidden="true">
            {isOpen ? 'Close chat' : 'Chat with me'}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Chatbot;
