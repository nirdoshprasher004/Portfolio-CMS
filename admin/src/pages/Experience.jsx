import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({ company: '', position: '', description: '', startDate: '', endDate: '', current: false });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/experience');
      setExperiences(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/experience', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ company: '', position: '', description: '', startDate: '', endDate: '', current: false });
      fetchExperiences();
    } catch (error) {
      console.error('Error creating experience:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
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
        <h1>Manage Experience</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company</label>
            <input value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Position</label>
            <input value={form.position} onChange={(e) => setForm({...form, position: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows="4" />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input type="date" value={form.endDate} onChange={(e) => setForm({...form, endDate: e.target.value})} disabled={form.current} />
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={form.current} onChange={(e) => setForm({...form, current: e.target.checked})} />
              {' '}Currently working here
            </label>
          </div>
          <button type="submit">Add Experience</button>
        </form>
        <div className="project-list">
          {experiences.map(exp => (
            <div key={exp.id} className="project-item">
              <h3>{exp.position} at {exp.company}</h3>
              <p>{exp.description}</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
              </p>
              <button onClick={() => handleDelete(exp.id)} style={{ background: '#e53e3e', marginTop: '1rem' }}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Experience;
