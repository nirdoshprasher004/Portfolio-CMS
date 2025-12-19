import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ onLogout }) {
  const [stats, setStats] = useState({ projects: 0, skills: 0, experiences: 0, blogs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, experiences, blogs] = await Promise.all([
          axios.get('http://localhost:3001/api/projects'),
          axios.get('http://localhost:3001/api/skills'),
          axios.get('http://localhost:3001/api/experience'),
          axios.get('http://localhost:3001/api/blog')
        ]);
        setStats({
          projects: projects.data.length,
          skills: skills.data.length,
          experiences: experiences.data.length,
          blogs: blogs.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

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
          <button onClick={onLogout} style={{ width: '100%', marginTop: '2rem' }}>Logout</button>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Dashboard</h1>
        <p style={{ marginBottom: '3rem' }}>Welcome to Nirdosh's portfolio admin panel</p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.projects}</h3>
            <p>Projects</p>
          </div>
          <div className="stat-card">
            <h3>{stats.skills}</h3>
            <p>Skills</p>
          </div>
          <div className="stat-card">
            <h3>{stats.experiences}</h3>
            <p>Experiences</p>
          </div>
          <div className="stat-card">
            <h3>{stats.blogs}</h3>
            <p>Blog Posts</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
