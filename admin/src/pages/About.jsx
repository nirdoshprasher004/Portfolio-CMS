import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';

function About() {
  const [about, setAbout] = useState({ bio: '', title: '', image: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/about');
      console.log('Fetched about data:', response.data);
      if (response.data) {
        setAbout({
          bio: response.data.bio || '',
          title: response.data.title || '',
          image: response.data.image || ''
        });
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Submitting about data:', about);
      
      const response = await axios.post('http://localhost:3001/api/about', about, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Response:', response.data);
      setSuccessMessage('About section updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating about:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to update about section: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleImageUpload = (imageUrl) => {
    setAbout({ ...about, image: imageUrl });
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
        <h1>Manage About</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="enhanced-form">
          <div className="form-group">
            <label>Profile Picture</label>
            <ImageUpload onImageUpload={handleImageUpload} currentImage={about.image} />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input value={about.title} onChange={(e) => setAbout({...about, title: e.target.value})} placeholder="e.g., Full Stack Developer" />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea value={about.bio} onChange={(e) => setAbout({...about, bio: e.target.value})} rows="8" placeholder="Tell your story..." />
          </div>
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      </main>
    </div>
  );
}

export default About;
