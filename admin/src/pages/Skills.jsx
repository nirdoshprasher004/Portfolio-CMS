import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', level: 80 });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/skills');
      setSkills(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/skills', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ name: '', category: '', level: 80 });
      fetchSkills();
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
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
        <h1>Manage Skills</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Skill Name</label>
            <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} placeholder="e.g., Frontend, Backend" />
          </div>
          <div className="form-group">
            <label>Level (0-100)</label>
            <input type="number" min="0" max="100" value={form.level} onChange={(e) => setForm({...form, level: parseInt(e.target.value)})} />
          </div>
          <button type="submit">Add Skill</button>
        </form>
        <div className="project-list">
          {skills.map(skill => (
            <div key={skill.id} className="project-item">
              <h3>{skill.name}</h3>
              <p>Category: {skill.category}</p>
              <p>Level: {skill.level}%</p>
              <button onClick={() => handleDelete(skill.id)} style={{ background: '#e53e3e', marginTop: '1rem' }}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Skills;
