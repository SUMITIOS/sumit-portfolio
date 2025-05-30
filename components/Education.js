import React from 'react';
import styles from './Education.module.css';

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Technology in Electrical Engineering",
    institution: "Seacom Engineering College",
    location: "Kolkata, India",
    duration: "2013 - 2017",
    achievements: [
    ]
  },
  {
    id: 2,
    degree: "Higher Secondary Education",
    institution: "Shree Jain Vidyalaya",
    location: "Kolkata, India",
    duration: "20011 - 2013",
    achievements: [
    ]
  }
];

const Education = () => {
  return (
    <section className={styles.education}><h2 className={styles.title}>Education</h2><div className={styles.cardContainer}>
        {educationData.map((edu) => (
          <div key={edu.id} className={styles.card}><h3 className={styles.degree}>{edu.degree}</h3><h4 className={styles.institution}>{edu.institution}</h4><p className={styles.location}>{edu.location}</p><p className={styles.duration}>{edu.duration}</p><h5 className={styles.achievementsTitle}>Key Achievements:</h5><ul className={styles.achievements}>
              {edu.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul></div>
        ))}
      </div></section>
  );
};

export default Education;