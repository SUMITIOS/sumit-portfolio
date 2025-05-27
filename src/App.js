import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Courses from './components/Courses';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Default home route */}
          <Route path="/" element={<Home />} />
          {/* Individual section routes */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        <footer>
          <p>© {new Date().getFullYear()} Sumit Pandey. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;