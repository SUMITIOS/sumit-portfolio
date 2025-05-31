import React from 'react';
import styles from './ResumeButton.module.css';

const ResumeButton = () => {
  const resumeUrl = process.env.PUBLIC_URL + '/resume.pdf';
  // console.log('Resume URL:', resumeUrl);

  return (
    <a href={resumeUrl} download className={styles.resumeButton}>
      Download Resume
    </a>
  );
};

export default ResumeButton;