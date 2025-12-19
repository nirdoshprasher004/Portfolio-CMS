import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', link: '', github: '', technologies: '', image: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
      setSuccessMessage('Project deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects');
      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/projects', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', description: '', link: '', github: '', technologies: '', image: '' });
      fetchProjects();
      setSuccessMessage('Project added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Nirdosh's Admin</h2>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Manage Projects</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="enhanced-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input value={form.github || ''} onChange={(e) => setForm({...form, github: e.target.value})} placeholder="https://github.com/..." />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Live Demo URL</label>
              <input value={form.link || ''} onChange={(e) => setForm({...form, link: e.target.value})} placeholder="https://..." />
            </div>
            <div className="form-group">
              <label>Technologies</label>
              <input value={form.technologies || ''} onChange={(e) => setForm({...form, technologies: e.target.value})} placeholder="React, Node.js, MongoDB" />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows="4" />
          </div>
          <button type="submit" className="btn-primary">Add Project</button>
        </form>
        <div className="responsive-grid">
          {projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id} className="content-card">
                {project.image && <img src={project.image} alt={project.title} className="card-image" />}
                <div className="card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.technologies && (
                    <p><strong>Tech:</strong> {project.technologies}</p>
                  )}
                  <div className="card-actions">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-small btn-primary">
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-small btn-secondary">
                        GitHub
                      </a>
                    )}
                    <button onClick={() => handleDelete(project.id)} className="btn-small btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No projects yet. Add your first project above!</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Projects;
