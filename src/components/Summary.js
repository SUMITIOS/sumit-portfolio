import React from 'react';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';
import Contact from './Contact';
import Courses from './Courses';

const Summary = () => {
  return (
    <div>
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Courses />
    </div>
  );
};

export default Summary;