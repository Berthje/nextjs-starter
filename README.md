# 🚀 Next.js Production-Ready Starter Kit

> **Zero-setup development environment with Docker** - Clone, run two commands, start coding!

A modern, battle-tested Next.js starter kit that gets you from idea to production in minutes, not hours. Everything is containerized - no local dependencies required except Docker.

---

## ✨ What Makes This Special?

### 🎯 **Instant Development Setup**
- **Two command setup** - Setup environment + start coding
- **Zero local dependencies** - Only Docker required
- **Complete isolation** - Each project in its own containers
- **Hot reload** - See changes instantly while developing
- **Auto-generated credentials** - Secure by default

### 🏗️ **Production-Ready Stack**
- **Next.js 15.3** with App Router & TypeScript
- **PostgreSQL 17.5** with automatic initialization
- **Better Auth** for secure authentication
- **Tailwind CSS** with custom components
- **ESLint + Prettier** for code quality

### 🐳 **Docker-First Approach**
- **Development containers** with hot reload
- **Production containers** with optimized builds
- **Database included** - PostgreSQL containerized
- **Environment isolation** - No conflicts between projects

---

## 📦 Installation & Setup

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git (for cloning)
- That's it! No Node.js, PostgreSQL, or other tools needed locally

### 🚀 Quick Installation (2 Commands)

```bash
# 1. Clone and navigate
git clone https://github.com/yourusername/nextjs-starter-kit.git my-new-project
cd my-new-project

# 2. Setup environment (generates secure credentials)
npm run setup

# 3. Start development
npm run docker:dev
```

### 📋 What the Setup Does
The `npm run setup` command:
- ✅ Creates `.env` file from `.env.example`
- ✅ Generates random database password
- ✅ Creates secure authentication secret
- ✅ Sets development-ready defaults

### 🌐 Access Your Application
After setup, your app will be available at:
- **Frontend**: http://localhost:3000
- **Test Page**: http://localhost:3000/test (verify everything works)
- **Database**: localhost:5432 (for external DB tools)

---

## 🛠️ Development Commands Reference

### 🔧 Setup & Environment
```bash
npm run setup           # Initial setup - creates .env with secure credentials
npm run setup:env       # Regenerate .env file (overwrites existing)
```

### 🐳 Docker Development
```bash
npm run docker:dev              # Start dev environment (with logs)
npm run docker:dev:detached     # Start dev environment in background
npm run docker:dev:stop         # Stop development containers
npm run docker:restart          # Restart just the Next.js app (keep DB running)
```

### 🚀 Docker Production
```bash
npm run docker:prod             # Start production containers
npm run docker:prod:stop        # Stop production containers
```

### 🔍 Monitoring & Debugging
```bash
npm run docker:logs             # View real-time logs from all containers
npm run docker:clean            # Complete cleanup (removes containers, volumes, images)
npm run help                    # Show available commands
```

### 📝 Traditional Development (Optional)
```bash
npm run dev                     # Start Next.js dev server (requires local setup)
npm run build                   # Build for production
npm run start                   # Start production server
npm run lint                    # Run ESLint
npm run lint:fix                # Fix ESLint issues
```

---

## 📁 Project Structure

```
my-new-project/
├── 🐳 Docker Configuration
│   ├── Dockerfile                    # Production container
│   ├── Dockerfile.dev                # Development container
│   ├── docker-compose.yml            # Development setup
│   ├── docker-compose.prod.yml       # Production setup
│   ├── .dockerignore                 # Docker ignore rules
│   └── docker/
│       └── init.sql                  # Database initialization
│
├── 📱 Next.js Application
│   ├── src/
│   │   ├── app/                      # App Router pages & layouts
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── layout.tsx            # Root layout
│   │   │   └── globals.css           # Global styles
│   │   ├── components/               # Reusable UI components
│   │   └── lib/                      # Utilities & configurations
│   │
│   ├── package.json                  # Dependencies & scripts
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── next.config.ts                # Next.js configuration
│   └── tsconfig.json                 # TypeScript configuration
│
├── 🔧 Configuration & Scripts
│   ├── scripts/
│   │   └── setup-env.js              # Environment setup script
│   ├── .env.example                  # Environment template
│   ├── .env                          # Your environment (auto-generated)
│   ├── .gitignore                    # Git ignore rules
│   └── README.md                     # This documentation
│
└── 📋 Development Files
    ├── .eslintrc.json                # ESLint configuration
    └── prettier.config.js            # Prettier configuration
```

---

## 🔧 Customization Guide

### 🎨 Adding New Features
```bash
# 1. Make code changes (auto-reload in development)
# 2. Add new pages in src/app/
# 3. Create components in src/components/
# 4. Database queries in your API routes

# No restart needed - hot reload handles everything!
```

### 📦 Adding npm Packages
```bash
# Method 1: Add to package.json and rebuild
npm run docker:dev:stop
# Edit package.json
npm run docker:dev

# Method 2: Install inside running container
docker exec -it nextjs-starter-app npm install package-name
npm run docker:restart
```

### 🗄️ Database Schema Changes
```bash
# 1. Modify docker/init.sql
# 2. Restart with fresh database
npm run docker:clean
npm run docker:dev
```

### 🔐 Environment Customization
```bash
# Edit your environment
nano .env  # or use your preferred editor

# Apply changes
npm run docker:restart
```

### 🏗️ Project Renaming
```bash
# 1. Update package.json name field
# 2. Update container names in docker-compose.yml
# 3. Update NEXT_PUBLIC_APP_NAME in .env
# 4. Restart containers
npm run docker:dev:stop
npm run docker:dev
```

---

## 🌍 Production Deployment

### 🐳 Docker Deployment (Recommended)

#### Step 1: Create Production Environment
```bash
# Copy environment template
cp .env.example .env.prod

# Edit with production values
nano .env.prod
```

#### Step 2: Update Production Settings
```bash
# Example .env.prod
NODE_ENV=production
DB_PASSWORD=your_super_secure_production_password
BETTER_AUTH_SECRET=your_64_character_production_secret_key
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
DATABASE_URL=postgresql://postgres:your_password@postgres:5432/my_app_db
```

#### Step 3: Deploy
```bash
# Start production containers
npm run docker:prod

# Your app is now running in production mode!
```

### 🌐 Platform Deployment
Deploy to any Docker-compatible platform:

- **Railway**: Push to Git, auto-deploys
- **DigitalOcean App Platform**: Connect repository
- **AWS ECS**: Use provided Docker images
- **Google Cloud Run**: Deploy containers
- **Heroku**: Use container registry

### 🔄 Traditional Deployment (Vercel/Netlify)
```bash
# Build locally
npm run build

# Deploy built files to your platform
# Make sure to set environment variables in platform settings
```

---

## 🧪 Testing & Verification

### 🔍 Health Check
Visit these URLs to verify your setup:

```bash
# Main application
http://localhost:3000

# Test page (shows environment status)
http://localhost:3000/test

# API health check (if you add one)
http://localhost:3000/api/health
```

### 🛠️ Database Connection Test
```bash
# Connect to database directly
docker exec -it nextjs-starter-db psql -U postgres -d my_app_db

# Run a test query
SELECT version();

# Exit
\q
```

### 📊 Container Status Check
```bash
# See running containers
docker ps

# Check logs
npm run docker:logs

# View resource usage
docker stats
```

---

## 🗑️ Uninstallation & Cleanup

### 🧹 Complete Project Removal

#### Step 1: Stop and Remove Containers
```bash
# Navigate to project directory
cd my-new-project

# Complete cleanup (removes everything)
npm run docker:clean

# Verify removal
docker ps -a
docker images
```

#### Step 2: Remove Project Files
```bash
# Go back to parent directory
cd ..

# Remove project folder
rm -rf my-new-project  # Linux/Mac
rmdir /s my-new-project  # Windows Command Prompt
Remove-Item -Recurse -Force my-new-project  # Windows PowerShell
```

### 🔧 Partial Cleanup Options

```bash
# Remove only containers (keep images for faster restart)
docker-compose down

# Remove containers and volumes (keep images)
docker-compose down -v

# Remove everything including images
npm run docker:clean
```

### 🗄️ Database Data Only
```bash
# Keep containers but reset database
docker-compose down -v
npm run docker:dev
```

---

## 🆘 Troubleshooting Guide

### 🐳 Docker Issues

#### Docker Not Running
```bash
# Check Docker status
docker --version
docker ps

# Solution: Start Docker Desktop
# Windows: Start menu → Docker Desktop
# Mac: Applications → Docker
# Linux: sudo systemctl start docker
```

#### Port Conflicts
```bash
# Error: Port 3000 or 5432 already in use
# Solution 1: Stop conflicting services
# Solution 2: Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

#### Build Failures
```bash
# Clear Docker cache and rebuild
docker system prune -a
npm run docker:dev
```

### 🔧 Application Issues

#### Environment Variables Not Loading
```bash
# Recreate .env file
npm run setup:env

# Restart containers
npm run docker:restart
```

#### Database Connection Errors
```bash
# Check database is running
docker ps | grep postgres

# View database logs
docker logs nextjs-starter-db

# Reset database
npm run docker:clean
npm run docker:dev
```

#### Hot Reload Not Working
```bash
# Restart just the app container
npm run docker:restart

# If still not working, full restart
npm run docker:dev:stop
npm run docker:dev
```

### 🔍 Getting Help

#### View Detailed Logs
```bash
# All container logs
npm run docker:logs

# Specific container logs
docker logs nextjs-starter-app
docker logs nextjs-starter-db
```

#### Container Shell Access
```bash
# Access app container
docker exec -it nextjs-starter-app sh

# Access database container
docker exec -it nextjs-starter-db bash
```

#### Reset Everything
```bash
# Nuclear option - complete reset
npm run docker:clean
docker system prune -a
npm run setup
npm run docker:dev
```

---

## 💡 Why Use This Starter Kit?

### ❌ Traditional Setup Problems
- "Works on my machine" syndrome
- Hours spent configuring development environment
- Version conflicts between projects
- Complex database setup and management
- Different environments for different developers

### ✅ This Starter Kit Benefits
- **Identical environment** for all developers
- **5-minute setup** from zero to coding
- **Complete project isolation** with Docker
- **Production-ready** architecture from day one
- **Secure defaults** with auto-generated credentials
- **Easy cleanup** when project is done

### 🎯 Perfect For
- **New projects** that need quick setup
- **Team development** requiring identical environments
- **Learning** Next.js without setup complexity
- **Prototyping** with full-stack capabilities
- **Production deployment** with Docker

---

## 🤝 Contributing

We welcome contributions! Here's how:

### 🔧 Development Setup
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/nextjs-starter-kit.git
cd nextjs-starter-kit

# Setup development environment
npm run setup
npm run docker:dev
```

### 📝 Making Changes
1. Create a feature branch: `git checkout -b feature-name`
2. Make your changes
3. Test thoroughly: `npm run docker:dev`
4. Submit a pull request

### 🐛 Reporting Issues
- Use GitHub Issues
- Include Docker and system information
- Provide steps to reproduce
- Include relevant logs

---

## 📚 Learn More

### 🔗 Documentation Links
- [Next.js Documentation](https://nextjs.org/docs) - Learn Next.js features
- [Better Auth Guide](https://www.better-auth.com/) - Authentication setup
- [Docker Documentation](https://docs.docker.com/) - Container fundamentals
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/) - Database operations
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework

### 🎓 Tutorials & Guides
- [Docker for Developers](https://docs.docker.com/get-started/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Beginner Guide](https://www.postgresqltutorial.com/)

---

## 📋 Command Quick Reference

```bash
# 🚀 Getting Started
npm run setup               # Initial setup
npm run docker:dev          # Start development

# 🔧 Development
npm run docker:dev:stop     # Stop containers
npm run docker:restart      # Restart app
npm run docker:logs         # View logs

# 🚀 Production
npm run docker:prod         # Start production
npm run docker:prod:stop    # Stop production

# 🧹 Cleanup
npm run docker:clean        # Complete cleanup
```

---

**Happy coding!** 🎉

*Built with ❤️ for developers who want to focus on building amazing applications, not wrestling with development environment setup.*

---

## 📄 License

MIT License - feel free to use this starter kit for any project!

## 🌟 Support

If this starter kit helped you, please:
- ⭐ Star the repository
- 🐛 Report issues you find
- 🔄 Share with other developers
- 💡 Suggest improvements

**Made with passion by developers, for developers.** 💻✨