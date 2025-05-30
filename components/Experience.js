import React from 'react';
import styles from './Experience.module.css';

const experiences = [
  {
    id: 1,
    company: "Capgemini",
    position: "Consultant B2",
    duration: "Feb 2022 - Present",
    location: "Bangalore, India",
    responsibilities: [
      "Senior Engineering lead in React and React Native.",
      "Frontend lead in the current project, aspiring architect.",
      "Collaborated with cross-functional teams to deliver high-quality software solutions."
    ]
  },
  {
    id: 2,
    company: "Photon Interactive",
    position: "Software Engineer",
    duration: "Jan 2021 - Feb 2022",
    location: "Bangalore, India",
    responsibilities: [
      "Accountable for integration of specific modules from scratch.",
      "Often led a small team of 2-3 developers.",
      "Ensured timely delivery of high-quality code."
    ]
  },
  {
    id: 3,
    company: "Tweb Exponent Services Pvt Ltd",
    position: "Software Developer",
    duration: "Apr 2019 - Jan 2021",
    location: "Bangalore, India",
    responsibilities: [
      "Designed and developed iOS and Android applications from beginning to delivery.",
      "Maintained applications post-delivery as needed.",
      "Communicated with clients to address queries and ensure project success."
    ]
  },
  {
    id: 4,
    company: "Webgen Technology Pvt Ltd",
    position: "Mobile Application Developer",
    duration: "Oct 2018 - Apr 2019",
    location: "Kolkata, India",
    responsibilities: [
      "Developed mobile applications for various clients.",
      "Collaborated with team members to ensure project success.",
      "Provided post-delivery support and maintenance."
    ]
  },
  {
    id: 5,
    company: "Bgp Internet and Media Pvt Ltd",
    position: "Mobile Application Developer",
    duration: "Jun 2017 - Oct 2018",
    location: "Kolkata, India",
    responsibilities: [
      "Developed and maintained mobile applications.",
      "Worked closely with clients to gather requirements and deliver solutions.",
      "Ensured applications met performance and quality standards."
    ]
  }
];

const Experience = () => {
  return (
    <section className={styles.experience}>
      <h2 className={styles.title}>Work Experience</h2>
      <div className={styles.timeline}>
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3 className={styles.company}>{exp.company}</h3>
              <h4 className={styles.position}>{exp.position}</h4>
              <p className={styles.duration}>{exp.duration}</p>
              <p className={styles.location}>{exp.location}</p>
              <ul className={styles.responsibilities}>
                {exp.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;