import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import ResumeButton from './ResumeButton';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      // Hide header when scrolling down (and if you've scrolled more than 100px)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.header} ${!showHeader ? styles.hidden : ''}`}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Sumit Pandey</div>
        <ResumeButton />
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