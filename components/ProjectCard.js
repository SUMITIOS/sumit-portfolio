import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.card}><h3 className={styles.title}>{project.name}</h3><p className={styles.description}>{project.description}</p><p className={styles.duration}>Duration: {project.duration} days</p><a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
        View Project
      </a></div>
  );
};

export default ProjectCard;