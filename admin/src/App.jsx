import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import About from './pages/About';
import Settings from './pages/Settings';

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage on app start
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    setLoading(false);
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Loading Nirdosh's Admin Panel...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/projects" element={token ? <Projects /> : <Navigate to="/login" />} />
        <Route path="/skills" element={token ? <Skills /> : <Navigate to="/login" />} />
        <Route path="/experience" element={token ? <Experience /> : <Navigate to="/login" />} />
        <Route path="/blog" element={token ? <Blog /> : <Navigate to="/login" />} />
        <Route path="/about" element={token ? <About /> : <Navigate to="/login" />} />
        <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
