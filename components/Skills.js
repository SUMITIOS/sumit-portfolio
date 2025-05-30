import React from "react";
import styles from "./Skills.module.css";
const skillsData = [
  {
    id: 1,
    category: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "Python (beginner)", "Java (beginner)"]
  },
  {
    id: 3,
    category: "Mobile Development",
    skills: ["React Native", "Ionic (cordova)"]
  },
  {
    id: 4,
    category: "Tools & Technologies",
    skills: ["Git", "Android Studio", "XCode", "VS Code", "Postman", "Figma"]
  },
  {
    id: 2,
    category: "Web Development",
    skills: ["HTML", "CSS", "React", "Node.js"]
  },
 
];
const Skills = () => {
  return (
    <section className={styles.skills}>
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.skillsList}>
        {skillsData.map((skillCategory) => (
          <div key={skillCategory.id} className={styles.skillCategory}>
            <h3 className={styles.categoryTitle}>{skillCategory.category}</h3>
            <ul className={styles.skillItems}>
              {skillCategory.skills.map((skill, index) => (
                <li key={index} className={styles.skillItem}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Skills;