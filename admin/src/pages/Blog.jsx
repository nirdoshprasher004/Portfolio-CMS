import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', slug: '', published: false });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/blog/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/blog', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', content: '', excerpt: '', slug: '', published: false });
      fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
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
        <h1>Manage Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Slug (URL)</label>
            <input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} placeholder="my-blog-post" required />
          </div>
          <div className="form-group">
            <label>Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({...form, excerpt: e.target.value})} rows="2" />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} rows="8" />
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({...form, published: e.target.checked})} />
              {' '}Published
            </label>
          </div>
          <button type="submit">Add Blog Post</button>
        </form>
        <div className="project-list">
          {blogs.map(blog => (
            <div key={blog.id} className="project-item">
              <h3>{blog.title} {!blog.published && <span style={{ color: '#e53e3e' }}>(Draft)</span>}</h3>
              <p>{blog.excerpt}</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Slug: {blog.slug}</p>
              <button onClick={() => handleDelete(blog.id)} style={{ background: '#e53e3e', marginTop: '1rem' }}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Blog;
