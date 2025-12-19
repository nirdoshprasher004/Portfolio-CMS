import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, aboutRes, skillsRes, experienceRes, blogsRes] = await Promise.all([
          fetch('http://localhost:3001/api/projects'),
          fetch('http://localhost:3001/api/about'),
          fetch('http://localhost:3001/api/skills'),
          fetch('http://localhost:3001/api/experience'),
          fetch('http://localhost:3001/api/blog')
        ]);

        const [projectsData, aboutData, skillsData, experienceData, blogsData] = await Promise.all([
          projectsRes.json(),
          aboutRes.json(),
          skillsRes.json(),
          experienceRes.json(),
          blogsRes.json()
        ]);

        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setAbout(aboutData);
        setSkills(Array.isArray(skillsData) ? skillsData : []);
        setExperiences(Array.isArray(experienceData) ? experienceData : []);
        setBlogs(Array.isArray(blogsData) ? blogsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000); // Smooth loading transition
      }
    };

    fetchData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      });
      const data = await response.json();
      alert(data.message);
      setContact({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send message');
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <header id="home">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-greeting">
                <span className="wave">👋</span>
                <span>Hello, I'm</span>
              </div>
              <h1>Nirdosh Prasher</h1>
              <div className="hero-roles">
                <span className="role-text">I'm a </span>
                <div className="typing-animation">
                  <span className="typed-text">Full Stack Developer</span>
                </div>
              </div>
              <p className="hero-description">
                Passionate about crafting exceptional digital experiences through clean code, 
                innovative solutions, and cutting-edge technologies. I transform ideas into 
                powerful web applications that make a difference.
              </p>
              <div className="hero-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🚀</span>
                  <span>Modern Tech Stack</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💡</span>
                  <span>Creative Solutions</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">⚡</span>
                  <span>Fast Delivery</span>
                </div>
              </div>
              <div className="hero-buttons">
                <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
                  <span>View My Work</span>
                  <span className="btn-icon">→</span>
                </button>
                <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">
                  <span>Let's Talk</span>
                  <span className="btn-icon">💬</span>
                </button>
              </div>
              <div className="hero-social">
                <a href="#" className="social-icon" title="GitHub">
                  <span>⚡</span>
                </a>
                <a href="#" className="social-icon" title="LinkedIn">
                  <span>💼</span>
                </a>
                <a href="#" className="social-icon" title="Twitter">
                  <span>🐦</span>
                </a>
                <a href="#" className="social-icon" title="Email">
                  <span>📧</span>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="floating-card">
                <div className="card-content">
                  {about?.image ? (
                    <div className="floating-profile">
                      <img src={`http://localhost:3001${about.image}`} alt="Nirdosh Prasher" className="floating-avatar" />
                      <div className="profile-glow"></div>
                    </div>
                  ) : (
                    <div className="floating-placeholder">
                      <span className="placeholder-icon">👤</span>
                      <p>Upload your photo in admin panel</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <span>↓</span>
            <p>Scroll to explore</p>
          </div>
        </header>

        <section id="about" className="about">
          <div className="section-header">
            <h2>About Me</h2>
            <div className="section-line"></div>
          </div>
          {about ? (
            <div className="about-content">
              <div className="about-image">
                {about.image ? (
                  <img src={`http://localhost:3001${about.image}`} alt="Nirdosh Prasher" className="profile-image" />
                ) : (
                  <div className="profile-placeholder">
                    <span>👤</span>
                  </div>
                )}
              </div>
              <div className="about-text">
                <h3>{about.title}</h3>
                <p>{about.bio}</p>
                <div className="about-stats">
                  <div className="stat">
                    <span className="stat-number">{projects.length}+</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{experiences.length}+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{skills.length}+</span>
                    <span className="stat-label">Technologies</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </section>

        <section id="skills" className="skills-section">
          <div className="section-header">
            <h2>Skills & Technologies</h2>
            <div className="section-line"></div>
          </div>
        {Object.keys(groupedSkills).map(category => (
          <div key={category} className="skill-category">
            <h3>{category}</h3>
            <div className="skills-grid">
              {groupedSkills[category].map(skill => (
                <div key={skill.id} className="skill-item">
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <div className="skill-level">{skill.level}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

        <section id="experience" className="experience-section">
          <div className="section-header">
            <h2>Professional Experience</h2>
            <div className="section-line"></div>
          </div>
        <div className="timeline">
          {experiences.map(exp => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-date">
                {new Date(exp.startDate).getFullYear()} - {exp.current ? 'Present' : new Date(exp.endDate).getFullYear()}
              </div>
              <div className="timeline-content">
                <h3>{exp.position}</h3>
                <h4>{exp.company}</h4>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

        <section id="projects" className="projects">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <div className="section-line"></div>
          </div>
        {projects.length > 0 ? (
          <div className="project-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'white', textAlign: 'center' }}>No projects yet</p>
        )}
      </section>

        <section id="blog" className="blog-section">
          <div className="section-header">
            <h2>Latest Blog Posts</h2>
            <div className="section-line"></div>
          </div>
        <div className="blog-grid">
          {blogs.slice(0, 3).map(blog => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <a href={`/blog/${blog.slug}`} className="read-more">Read More →</a>
            </div>
          ))}
        </div>
      </section>

        <section id="contact" className="contact-section">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <div className="section-line"></div>
            <p>Let's work together to bring your ideas to life</p>
          </div>
        <form onSubmit={handleContactSubmit} className="contact-form">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={contact.name}
              onChange={(e) => setContact({...contact, name: e.target.value})}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your Email" 
              value={contact.email}
              onChange={(e) => setContact({...contact, email: e.target.value})}
              required 
            />
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Your Message" 
              rows="5"
              value={contact.message}
              onChange={(e) => setContact({...contact, message: e.target.value})}
              required
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Nirdosh Prasher</h3>
              <p>Full Stack Developer passionate about creating amazing digital experiences.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <div className="footer-links">
                <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>About</button>
                <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>Projects</button>
                <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact</button>
              </div>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Nirdosh Prasher. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <ScrollToTop />
    </>
  );
}

export default App;
