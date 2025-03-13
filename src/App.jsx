import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Import your preferred icons library
// This example uses React icons but you can replace with any library
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaArrowRight, 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaFigma,
  FaCode,
  FaLaptopCode
} from 'react-icons/fa';

const App = () => {

  // Updated contact form code for your App.js

const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: ''
});
const [formStatus, setFormStatus] = useState({
  message: '',
  type: '' // 'success' or 'error'
});
const [isSubmitting, setIsSubmitting] = useState(false);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setFormStatus({ message: 'Sending...', type: 'info' });
  
  try {
    console.log('Sending form data:', formData);
    
    const response = await fetch('http://localhost:6464/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'omit'
    });
    
    const data = await response.json();
    console.log('Response:', response.status, data);
    
    if (response.ok) {
      setFormStatus({
        message: 'Message sent successfully!',
        type: 'success'
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      setFormStatus({
        message: data.message || 'Something went wrong. Please try again.',
        type: 'error'
      });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    setFormStatus({
      message: 'Network error. Please check that the server is running.',
      type: 'error'
    });
  } finally {
    setIsSubmitting(false);
  }
};







  // State to track active section
  const [activeSection, setActiveSection] = useState('home');
  // State to track if page has loaded
  const [isLoaded, setIsLoaded] = useState(false);
  // State to track if menu is open (mobile)
  const [menuOpen, setMenuOpen] = useState(false);
  // State to track dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Sample data - replace with your own
  const personalInfo = {
    name: "Anwesh Kumar Nayak",
    title: "Full Stack Web Developer",
    location: "Hyderabad,India",
    email: "anweshnayak111@gmail.com",
    bio: "I'm a passionate full-stack web developer skilled in HTML, CSS, JavaScript, React, and Node.js. I specialize in building responsive, high-performance web applications with a focus on clean code, seamless user experiences, and efficient backend development. I thrive in solving complex problems and continuously improving my skills to stay updated with modern web technologies",
    github: "https://github.com/nayakanwesh",
    linkedin: "https://www.linkedin.com/in/anwesh-nayak-58b35a298/",
    twitter: "https://twitter.com/yourusername"
  };

  const skills = [
    { name: "Frontend Development", icon: <FaReact />, level: 90, color: "#61DAFB" },
    { name: "Backend Development", icon: <FaNodeJs />, level: 67, color: "#539E43" },
    { name: "Database Management", icon: <FaDatabase />, level: 65, color: "#336791" },
    { name: "UI/UX Design", icon: <FaFigma />, level:40, color: "#F24E1E" },
    { name: "API Development", icon: <FaCode />, level: 88, color: "#FF6B6B" },
    { name: "Responsive Design", icon: <FaLaptopCode />, level: 92, color: "#9B59B6" }
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "My e-commerce application, Shopper, is a React-based web app with a clean UI, search functionality, category-based browsing, and a shopping cart. It supports user authentication, dynamic product details, and smooth navigation, with future plans for payment integration and advanced UI enhancements.",
      technologies: ["React", "Node.js","Html","Css","Fakestore-Api"],
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      github: "https://github.com/nayakanwesh",
      live: "https://react-shopping-app-rho.vercel.app/"
    },
    {
      id: 2,
      title: "Video Library Project",
      description: "My video library project is a full-stack web app using React, Node.js, and MongoDB. It enables users to browse, search, and manage videos with authentication and a responsive UI, ensuring a seamless and intuitive user experience",
      technologies: ["Html","Css","React","MUI", "Redux","Node Js","Express", "Firebase", "Material UI","Mongo DB"],
      image: "./public/video.png",
      github: "https://github.com/nayakanwesh",
      live: "https://github.com/nayakanwesh"
    },
    {
      id: 3,
      title: "Memory-Game",
      description: "My memory game is a React-based web application that challenges users to match pairs of cards. It features a sleek UI, smooth animations, and engaging gameplay to enhance memory and concentration skills.",
      technologies: ["HTML","CSS","JAVASCRIPT","React Js"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk9oKs3XHX8FAGzzPLc9XXXN6Uhceo4tzyqQ&s",
      github: "https://github.com/nayakanwesh",
      live: "https://memory-game-three-kohl.vercel.app/"
    },
    {
      id: 4,
      title: "Tourism App",
      description: "My first app, Tourism, is a simple static website built using only HTML and CSS. It showcases popular travel destinations with beautiful layouts, images, and descriptions. The website emphasizes a clean design, easy navigation, and an engaging user experience",
      technologies: ["HTML","CSS","BootStrap"],
      image: "./public/tourism.png",
      github: "https://github.com/nayakanwesh",
      live: "https://tourism-tawny.vercel.app/"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  // Handle scroll to section
  const scrollToSection = (ref, section) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
    setMenuOpen(false);
  };

  // Handle intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = [
      homeRef.current,
      aboutRef.current,
      skillsRef.current,
      projectsRef.current,
      contactRef.current
    ];

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`portfolio-app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Initial loading animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="logo"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              <div className="logo-text">AKN</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <header className="header">
        <div className="logo-container">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="logo-text">AKN</div>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <motion.button 
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.button>

        {/* Desktop navigation */}
        <nav className="desktop-nav">
          <ul>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <button 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={() => scrollToSection(homeRef, 'home')}
              >
                Home
              </button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={() => scrollToSection(aboutRef, 'about')}
              >
                About
              </button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                className={activeSection === 'skills' ? 'active' : ''}
                onClick={() => scrollToSection(skillsRef, 'skills')}
              >
                Skills
              </button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button 
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={() => scrollToSection(projectsRef, 'projects')}
              >
                Projects
              </button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={() => scrollToSection(contactRef, 'contact')}
              >
                Contact
              </button>
            </motion.li>
          </ul>
        </nav>

        {/* Dark mode toggle */}
        <motion.button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className={`toggle-thumb ${darkMode ? 'dark' : ''}`}></span>
        </motion.button>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav 
            className="mobile-nav"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <ul>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <button 
                  className={activeSection === 'home' ? 'active' : ''}
                  onClick={() => scrollToSection(homeRef, 'home')}
                >
                  Home
                </button>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button 
                  className={activeSection === 'about' ? 'active' : ''}
                  onClick={() => scrollToSection(aboutRef, 'about')}
                >
                  About
                </button>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button 
                  className={activeSection === 'skills' ? 'active' : ''}
                  onClick={() => scrollToSection(skillsRef, 'skills')}
                >
                  Skills
                </button>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button 
                  className={activeSection === 'projects' ? 'active' : ''}
                  onClick={() => scrollToSection(projectsRef, 'projects')}
                >
                  Projects
                </button>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button 
                  className={activeSection === 'contact' ? 'active' : ''}
                  onClick={() => scrollToSection(contactRef, 'contact')}
                >
                  Contact
                </button>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="main-content">
        {/* Home section */}
        <section id="home" ref={homeRef} className="section home-section">
          <div className="section-content">
            <motion.div 
              className="home-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hi, I'm <span className="highlight">{personalInfo.name}</span>
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {personalInfo.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {personalInfo.location}
              </motion.p>
              <motion.div 
                className="cta-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button 
                  className="primary-btn"
                  onClick={() => scrollToSection(projectsRef, 'projects')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work <FaArrowRight />
                </motion.button>
                <motion.button 
                  className="secondary-btn"
                  onClick={() => scrollToSection(contactRef, 'contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="home-decoration"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="abstract-shape"></div>
              <div className="image-container">
                <img src="./public/photo.jpg" alt="Profile" />
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="mouse"></div>
            <p>Scroll Down</p>
          </motion.div>
        </section>

        {/* About section */}
        <section id="about" ref={aboutRef} className="section about-section">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2>About Me</h2>
            <div className="underline"></div>
          </motion.div>
          <div className="section-content">
            <motion.div 
              className="about-image"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="image-container">
                <img src="./public/dppic.jpg" alt="About Me" />
              </div>
              <div className="experience-badge">
                <span className="number"></span>
                <span className="text ">Welcome To My Profile</span>
              </div>
            </motion.div>
            <motion.div 
              className="about-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <h3>Who Am I?</h3>
              <p className="bio">{personalInfo.bio}</p>
              
              <div className="info-grid">
                <div className="info-item">
                  <h4>Name</h4>
                  <p>{personalInfo.name}</p>
                </div>
                <div className="info-item">
                  <h4>Email</h4>
                  <p>{personalInfo.email}</p>
                </div>
                <div className="info-item">
                  <h4>Location</h4>
                  <p>{personalInfo.location}</p>
                </div>
                <div className="info-item">
                  <h4>Availability</h4>
                  <p>Full-time</p>
                </div>
              </div>
              
              <div className="social-links">
                <motion.a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a 
                  href={personalInfo.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter />
                </motion.a>
              </div>
              
              <motion.button 
  className="download-cv"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => window.open("/resume.pdf", "_blank")}
>
  Download CV
</motion.button>
            </motion.div>
          </div>
        </section>

        {/* Skills section */}
        <section id="skills" ref={skillsRef} className="section skills-section">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2>My Skills</h2>
            <div className="underline"></div>
          </motion.div>
          <motion.div 
            className="skills-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
          >
            {skills.map((skill, index) => (
              <motion.div 
                className="skill-card" 
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <h3>{skill.name}</h3>
                <div className="skill-bar-container">
                  <motion.div 
                    className="skill-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ backgroundColor: skill.color }}
                  >
                    <span className="skill-percentage">{skill.level}%</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Projects section */}
        <section id="projects" ref={projectsRef} className="section projects-section">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2>My Projects</h2>
            <div className="underline"></div>
          </motion.div>
          <motion.div 
            className="projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            {projects.map((project, index) => (
              <motion.div 
                className="project-card" 
                key={project.id}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <motion.a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub />
                    </motion.a>
                    <motion.a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaArrowRight />
                    </motion.a>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="more-projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            transition={{ delay: 0.5 }}
          >
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
              View More Projects <FaArrowRight />
            </a>
          </motion.div>
        </section>

        {/* Contact section */}
        <section id="contact" ref={contactRef} className="section contact-section">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2>Contact Me</h2>
            <div className="underline"></div>
          </motion.div>
          <div className="contact-content">
            <motion.div 
              className="contact-info"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideIn}
              transition={{ delay: 0.2 }}
            >
              <h3>Get In Touch</h3>
              <p>Feel free to reach out to me for any questions or opportunities.</p>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="icon">
                    <FaEnvelope />
                  </div>
                  <div className="details">
                    <h4>Email</h4>
                    <p>{personalInfo.email}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="icon">
                    <FaLinkedin />
                  </div>
                  <div className="details">
                    <h4>LinkedIn</h4>
                    <p>@anweshnayak</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="icon">
                    <FaTwitter />
                  </div>
                  <div className="details">
                    <h4>Twitter</h4>
                    <p>@nayakanwesh</p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* <motion.form 
              className="contact-form"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <motion.button 
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message <FaArrowRight />
              </motion.button>
            </motion.form> */}
            <motion.form 
  className="contact-form"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeIn}
  transition={{ delay: 0.4 }}
  onSubmit={handleSubmit}
>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      value={formData.name}
      onChange={handleInputChange}
      required 
    />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      value={formData.email}
      onChange={handleInputChange}
      required 
    />
  </div>
  <div className="form-group">
    <label htmlFor="subject">Subject</label>
    <input 
      type="text" 
      id="subject" 
      name="subject" 
      value={formData.subject}
      onChange={handleInputChange}
      required 
    />
  </div>
  <div className="form-group">
    <label htmlFor="message">Message</label>
    <textarea 
      id="message" 
      name="message" 
      rows="5" 
      value={formData.message}
      onChange={handleInputChange}
      required
    ></textarea>
  </div>
  {formStatus.message && (
    <div className={`form-status ${formStatus.type}`}>
      {formStatus.message}
    </div>
  )}
  <motion.button 
    type="submit"
    className="submit-btn"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <FaArrowRight />}
  </motion.button>
</motion.form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-text">AKN</div>
            <p>{personalInfo.name}</p>
          </div>
          <div className="footer-links">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection(homeRef, 'home'); }}>Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection(aboutRef, 'about'); }}>About</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection(skillsRef, 'skills'); }}>Skills</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection(projectsRef, 'projects'); }}>Projects</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection(contactRef, 'contact'); }}>Contact</a>
          </div>
          <div className="social-links">
            <motion.a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a 
              href={personalInfo.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter />
            </motion.a>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
