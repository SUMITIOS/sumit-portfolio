import React from 'react';
import styles from './About.module.css';
import profileImage from '../assets/PassPhotoColor.jpg';

const About = () => {
  return (
    <section className={styles.about}><h2 className={styles.title}>About Me</h2><div className={styles.content}><div className={styles.imageContainer}><img src={profileImage} alt="Sumit Pandey" className={styles.profileImage} /></div><div className={styles.text}><p>
            Hey There! I'm Sumit Pandey, a proactive Senior Software Engineer specializing in React Native and React JS. 
            With a B.Tech. degree and 8 years of experience, I excel in iOS and Android application development using 
            Xcode, Android Studio, and React Native CLI.
          </p><p>
            I'm proficient in React, TypeScript, HTML5, and SCSS, and I effectively communicate with clients and team members. 
            My portfolio includes over 15 projects, with half of them live on app stores. I've contributed to various industries 
            including eCommerce, social media, tourism, delivery, and news.
          </p><p>
            My expertise lies in delivering high-quality solutions, and I'm always eager to leverage my skills in challenging environments. 
            I'm passionate about creating efficient, user-friendly applications that make a real difference.
          </p></div></div></section>
  );
};

export default About;