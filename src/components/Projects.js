import React, { useState } from 'react';
import styles from './Projects.module.css';
import profileImage from '../assets/PassPhotoColor.jpg'; // Adjust the path as necessary

const projectsData = [
  {
    id: 1,
    title: "Syngenta",
    description: "Agrochemical application for an agriculture-based company.",
    technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
    duration: "966 Days",
    image: "/path-to-syngenta-image.jpg",
    link: "https://github.com/yourusername/syngenta-app"
  },
  {
    id: 2,
    title: "HnM",
    description: "eCommerce application based in the Middle East.",
    technologies: ["React Native", "Redux", "Firebase"],
    duration: "365 Days",
    image: "/path-to-hnm-image.jpg",
    link: "https://github.com/yourusername/hnm-app"
  },
  {
    id: 3,
    title: "Bath & Body Works",
    description: "eCommerce application based in the Middle East.",
    technologies: ["React Native", "Redux", "Node.js"],
    duration: "365 Days",
    image: "/path-to-bath-body-works-image.jpg",
    link: "https://github.com/yourusername/bath-body-works-app"
  },
  {
    id: 4,
    title: "Horseapp",
    description: "Horse trading-based social media application.",
    technologies: ["React Native", "Redux", "Firebase"],
    duration: "275 Days",
    image: "/path-to-horseapp-image.jpg",
    link: "https://github.com/yourusername/horseapp"
  },
  {
    id: 5,
    title: "Ratebowl",
    description: "Reviews-based social media application.",
    technologies: ["React Native", "Redux", "Node.js"],
    duration: "519 Days",
    image: "/path-to-ratebowl-image.jpg",
    link: "https://github.com/yourusername/ratebowl"
  },
  {
    id: 6,
    title: "Vox24x7",
    description: "News channels mobile application.",
    technologies: ["React Native", "Redux", "Firebase"],
    duration: "59 Days",
    image: "/path-to-vox24x7-image.jpg",
    link: "https://github.com/yourusername/vox24x7"
  },
  {
    id: 7,
    title: "Creoyou",
    description: "Creoyou application for Android and iOS.",
    technologies: ["React Native", "Redux", "Node.js"],
    duration: "151 Days",
    image: "/path-to-creoyou-image.jpg",
    link: "https://github.com/yourusername/creoyou"
  },
  {
    id: 8,
    title: "STM",
    description: "An application for restaurant owners and delivery personnel to track deliveries.",
    technologies: ["React Native", "Redux", "Firebase"],
    duration: "31 Days",
    image: "/path-to-stm-image.jpg",
    link: "https://github.com/yourusername/stm"
  },
  {
    id: 9,
    title: "Trentlo App",
    description: "Online tourism application.",
    technologies: ["React Native", "Redux", "Node.js"],
    duration: "273 Days",
    image: "/path-to-trentlo-image.jpg",
    link: "https://github.com/yourusername/trentlo"
  }
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <section className={styles.projects}>
      <h2 className={styles.title}>My Projects</h2>
      <div className={styles.projectGrid}>
        {projectsData.map((project) => (
          <div
            key={project.id}
            className={styles.projectCard}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* <img src={profileImage} alt={project.title} className={styles.projectImage} /> */}
            <div
              className={`${styles.projectInfo} ${
                hoveredProject === project.id ? styles.showInfo : ''
              }`}
            >
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <p className={styles.duration}>Duration: {project.duration}</p>
              <div className={styles.technologies}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;