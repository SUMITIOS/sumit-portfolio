import React, { useState } from 'react';
import styles from './Chatbot.module.css';

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

      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? 'Close chat' : 'Chat with me'}
      </button>
    </aside>
  );
};

export default Chatbot;
