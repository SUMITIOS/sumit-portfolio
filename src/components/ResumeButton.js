import React from 'react';
import styles from './ResumeButton.module.css';
import resumeFile from '../assets/NAUKRI_SUMIT_PANDEY_1746186297946_Sumit Pandey.pdf';

const ResumeButton = () => {
  return (
    <a
      href={resumeFile}
      download="Sumit-Pandey-Resume.pdf"
      className={styles.resumeButton}
      aria-label="Download resume"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M12 12v6m-3-3 3 3 3-3" />
      </svg>
      <span className={styles.resumeLabel} aria-hidden="true">Download resume</span>
    </a>
  );
};

export default ResumeButton;