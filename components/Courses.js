import React from 'react';
import styles from './Courses.module.css';

const coursesData = [
    "iPhone professional course",
    "JavaScript",
    "Using advanced GitHub Copilot features",
    "GitHub Copilot Fundamentals - Understand the AI pair programmer",
    "Developing Back-End Apps with Node.js and Express",
    "Getting started with Flutter Development",
    "Flutter 2: Getting Started",
    "Introduction to Project Management",
    "Agile with Atlassian Jira",
    "Agile Software Development",
    "React - The Complete Guide (incl Hooks, React Router, Redux)",
    "React Native - The Practical Guide",
];

const Courses = () => {
    return (
        <section className={styles.courses}>
            <h2 className={styles.title}>Courses & Certifications</h2>
            <ul className={styles.courseList}>
                {coursesData.map((course, index) => (
                    <li key={index} className={styles.courseItem}>
                        {course}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Courses;