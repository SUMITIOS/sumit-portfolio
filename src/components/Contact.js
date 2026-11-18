import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';

const CONTACT_API_URL =
  process.env.REACT_APP_CONTACT_API_URL ||
  'https://mysimplechat.smile-sumit-pandey.workers.dev/api/contact';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [contact, setContact] = useState(null);
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    const loadContact = async () => {
      try {
        const response = await fetch(CONTACT_API_URL);
        if (!response.ok) {
          throw new Error(`Contact service returned ${response.status}.`);
        }

        const result = await response.json();
        if (
          !result ||
          ['email', 'phone', 'location', 'linkedin'].some(
            (field) => typeof result[field] !== 'string'
          )
        ) {
          throw new Error('Contact service returned invalid information.');
        }

        if (isCurrent) setContact(result);
      } catch (requestError) {
        if (isCurrent) {
          setContactError(requestError.message || 'Could not load contact information.');
        }
      }
    };

    loadContact();
    return () => {
      isCurrent = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const phoneLink = contact?.phone.replace(/[^\d+]/g, '');

  return (
    <section className={styles.contact}>
      <h2 className={styles.title}>Contact Me</h2>
      <div className={styles.content}>
        <div className={styles.info}>
          <p>Feel free to reach out to me for any inquiries or opportunities:</p>
          {contact ? (
            <ul className={styles.contactList}>
              <li>
                Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                Phone: <a href={`tel:${phoneLink}`}>{contact.phone}</a>
              </li>
              <li>Location: {contact.location}</li>
              <li>
                LinkedIn:{' '}
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  Sumit Pandey
                </a>
              </li>
            </ul>
          ) : (
            <p role={contactError ? 'alert' : 'status'}>
              {contactError
                ? `Could not load contact information: ${contactError}`
                : 'Loading contact information...'}
            </p>
          )}
        </div>
        <form
          className={styles.form}
          action="https://formspree.io/f/mzzgpjjz"
          method="POST"
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;