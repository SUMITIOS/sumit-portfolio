import React from 'react';
import About from './About';
import Education from './Education';
import Skills from './Skills';
import Contact from './Contact';

const Home = () => {
  return (
    <div>
      {/* Start with About section content */}
      <section id="about">
        <About />
      </section>
      {/* Then Education summary */}
      <section id="education">
        <Education />
      </section>
      {/* Then Skills summary */}
      <section id="skills">
        <Skills />
      </section>
      {/* Finally Contact information */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Home;