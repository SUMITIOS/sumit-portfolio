import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Sumit Pandey</div>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/projects" className={styles.navLink}>Projects</Link>
          <Link to="/skills" className={styles.navLink}>Skills</Link>
          <Link to="/experience" className={styles.navLink}>Experience</Link>
          <Link to="/courses" className={styles.navLink}>Certifications/Courses</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;