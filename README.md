# Portfolio Project - Full Stack with Custom CMS

A complete full-stack portfolio application with custom-built CMS, backend API, and beautiful frontend.

## 🎯 Project Structure

```
portfolio/
├── frontend/          # React frontend (Public Portfolio)
├── backend/           # Node.js/Express API + Database
└── admin/             # Custom CMS Admin Panel
```

## 🚀 Tech Stack

**Frontend:**
- React 18 + Vite
- Modern CSS with Glassmorphism effects
- Responsive design
- Smooth animations

**Backend:**
- Node.js + Express
- Sequelize ORM
- SQLite database (no installation needed)
- JWT authentication
- RESTful API

**Admin Panel:**
- React + Vite
- React Router
- Axios for API calls
- Custom dashboard with statistics

## ✨ Features

### Frontend (Public Portfolio)
- ✅ Hero section with gradient background
- ✅ About Me section
- ✅ Skills with progress bars (grouped by category)
- ✅ Experience timeline
- ✅ Projects showcase
- ✅ Blog posts
- ✅ Contact form
- ✅ Responsive design
- ✅ Smooth animations

### Admin Panel (CMS)
- ✅ Secure login with JWT
- ✅ Dashboard with statistics
- ✅ Manage Projects (CRUD)
- ✅ Manage Skills (CRUD)
- ✅ Manage Experience (CRUD)
- ✅ Manage Blog Posts (CRUD)
- ✅ Manage About section
- ✅ Modern UI with sidebar navigation

### Backend API
- ✅ User authentication (register/login)
- ✅ Protected routes with JWT
- ✅ RESTful API endpoints
- ✅ SQLite database
- ✅ CORS enabled
- ✅ Error handling

## 🛠 Getting Started

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Admin Panel
cd ../admin
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start All Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:3001

**Terminal 2 - Admin Panel:**
```bash
cd admin
npm run dev
```
Admin Panel runs on: http://localhost:5175 (or next available port)

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5176 (or next available port)

### 3. Create Admin User

Use PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/auth/register" -Method POST -ContentType "application/json" -Body '{"email":"admin@example.com","password":"admin123","name":"Admin"}'
```

Or use curl:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123","name":"Admin"}'
```

### 4. Login to Admin Panel

Go to http://localhost:5175 and login with:
- **Email:** admin@example.com
- **Password:** admin123

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (auth required)
- `DELETE /api/skills/:id` - Delete skill (auth required)

### Experience
- `GET /api/experience` - Get all experiences
- `POST /api/experience` - Create experience (auth required)
- `DELETE /api/experience/:id` - Delete experience (auth required)

### Blog
- `GET /api/blog` - Get published blogs
- `GET /api/blog/all` - Get all blogs (auth required)
- `GET /api/blog/:slug` - Get blog by slug
- `POST /api/blog` - Create blog (auth required)
- `PUT /api/blog/:id` - Update blog (auth required)
- `DELETE /api/blog/:id` - Delete blog (auth required)

### About
- `GET /api/about` - Get about info
- `POST /api/about` - Create/Update about (auth required)

### Contact
- `POST /api/contact` - Submit contact form

## 🎨 Design Features

- **Gradient Backgrounds:** Purple to violet gradient theme
- **Glassmorphism:** Frosted glass effect on cards
- **Smooth Animations:** Fade in, slide up effects
- **Hover Effects:** Interactive cards with lift and scale
- **Responsive:** Works on all screen sizes
- **Modern Typography:** Clean, readable fonts
- **Progress Bars:** Visual skill level indicators
- **Timeline:** Professional experience display

## 📁 Database

The project uses SQLite with the following models:
- **User** - Admin users
- **Project** - Portfolio projects
- **Skill** - Technical skills
- **Experience** - Work experience
- **Blog** - Blog posts
- **About** - About section content

Database file: `backend/database.sqlite`

## 🔒 Security

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Environment variables for secrets

## 🚀 Deployment Tips

1. Change JWT_SECRET in production
2. Use PostgreSQL/MySQL for production database
3. Set up proper CORS origins
4. Enable HTTPS
5. Use environment variables
6. Set up proper logging
7. Add rate limiting
8. Implement file upload for images

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

This is a portfolio template. Feel free to fork and customize for your needs!
