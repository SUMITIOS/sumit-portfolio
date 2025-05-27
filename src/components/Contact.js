
import React, { useState } from 'react';
import styles from './Contact.module.css';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server or email service
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
    };
    return (
        <section className={styles.contact}><h2 className={styles.title}>Contact Me</h2><div className={styles.content}><div className={styles.info}><p>Feel free to reach out to me for any inquiries or opportunities:</p><ul className={styles.contactList}><li>Email: smile.sumit.pandey@gmail.com</li><li>Phone: (+91) 8583882934</li><li>Location: Kolkata, Bangalore, India</li><li>
            LinkedIn: <a href="https://www.linkedin.com/in/sumit-pandey-0a17b816b/" target="_blank" rel="noopener noreferrer">Sumit Pandey</a></li></ul></div><form className={styles.form} onSubmit={handleSubmit}><div className={styles.formGroup}><label htmlFor="name">Name:</label><input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            /></div><div className={styles.formGroup}><label htmlFor="email">Email:</label><input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            /></div><div className={styles.formGroup}><label htmlFor="message">Message:</label><textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea></div><button type="submit" className={styles.submitButton}>Send Message</button></form></div></section>
    );
};
export default Contact;