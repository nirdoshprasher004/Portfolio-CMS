import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({ name: '', email: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [stats, setStats] = useState({ projects: 0, skills: 0, experiences: 0, blogs: 0 });

  useEffect(() => {
    fetchUserData();
    fetchStats();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No authentication token found');
        return;
      }
      const response = await axios.get('http://localhost:3001/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setErrorMessage('Failed to load user data. Please try logging in again.');
    }
  };

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/api/auth/profile', user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to update profile');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/api/auth/password', passwordForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to change password');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleClearAll = async (type) => {
    if (!window.confirm(`Are you sure you want to delete all ${type}? This action cannot be undone!`)) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/${type}/clear`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage(`All ${type} deleted successfully!`);
      fetchStats();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(`Failed to delete ${type}`);
      setTimeout(() => setErrorMessage(''), 3000);
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
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            style={{ 
              background: 'rgba(229, 62, 62, 0.2)', 
              color: '#c53030',
              marginTop: '2rem',
              width: '100%'
            }}
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Settings & Management</h1>
        
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="settings-tabs">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
          <button 
            className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Content
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Information</h2>
              <form onSubmit={handleUpdateProfile} className="settings-form">
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={user.name} 
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={user.email} 
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    required 
                  />
                </div>
                <button type="submit" className="btn-primary">Update Profile</button>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="settings-section">
              <h2>Change Password</h2>
              <form onSubmit={handleChangePassword} className="settings-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    required 
                    minLength="6"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    required 
                    minLength="6"
                  />
                </div>
                <button type="submit" className="btn-primary">Change Password</button>
              </form>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="settings-section">
              <h2>Content Management</h2>
              
              <div className="management-grid">
                <div className="management-card">
                  <div className="card-header">
                    <h3>Projects</h3>
                    <span className="count-badge">{stats.projects}</span>
                  </div>
                  <p>Manage your portfolio projects</p>
                  <div className="card-actions">
                    <Link to="/projects" className="btn-small btn-primary">Manage</Link>
                    <button onClick={() => handleClearAll('projects')} className="btn-small btn-danger">Clear All</button>
                  </div>
                </div>

                <div className="management-card">
                  <div className="card-header">
                    <h3>Skills</h3>
                    <span className="count-badge">{stats.skills}</span>
                  </div>
                  <p>Manage your technical skills</p>
                  <div className="card-actions">
                    <Link to="/skills" className="btn-small btn-primary">Manage</Link>
                    <button onClick={() => handleClearAll('skills')} className="btn-small btn-danger">Clear All</button>
                  </div>
                </div>

                <div className="management-card">
                  <div className="card-header">
                    <h3>Experience</h3>
                    <span className="count-badge">{stats.experiences}</span>
                  </div>
                  <p>Manage work experience</p>
                  <div className="card-actions">
                    <Link to="/experience" className="btn-small btn-primary">Manage</Link>
                    <button onClick={() => handleClearAll('experience')} className="btn-small btn-danger">Clear All</button>
                  </div>
                </div>

                <div className="management-card">
                  <div className="card-header">
                    <h3>Blog Posts</h3>
                    <span className="count-badge">{stats.blogs}</span>
                  </div>
                  <p>Manage blog articles</p>
                  <div className="card-actions">
                    <Link to="/blog" className="btn-small btn-primary">Manage</Link>
                    <button onClick={() => handleClearAll('blog')} className="btn-small btn-danger">Clear All</button>
                  </div>
                </div>

                <div className="management-card">
                  <div className="card-header">
                    <h3>About Section</h3>
                    <span className="count-badge">1</span>
                  </div>
                  <p>Manage about information</p>
                  <div className="card-actions">
                    <Link to="/about" className="btn-small btn-primary">Manage</Link>
                  </div>
                </div>
              </div>

              <div className="danger-zone">
                <h3>⚠️ Danger Zone</h3>
                <p>These actions are irreversible. Please be careful!</p>
                <button onClick={() => {
                  if (window.confirm('Are you sure you want to clear ALL content? This cannot be undone!')) {
                    handleClearAll('projects');
                    handleClearAll('skills');
                    handleClearAll('experience');
                    handleClearAll('blog');
                  }
                }} className="btn-danger">
                  Clear All Content
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Settings;