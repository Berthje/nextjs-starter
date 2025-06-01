# 🚀 Next.js Production-Ready Starter Kit

> **Zero-setup development environment with Docker** - Clone, customize, start coding!

A modern, battle-tested Next.js starter kit that gets you from idea to production in minutes, not hours. Everything is containerized with automatic project naming and secure credential generation.

---

## ✨ What Makes This Special?

### 🎯 **Instant Development Setup**
- **One command setup** - Automatic environment creation
- **Smart project naming** - Uses your folder name or custom input
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
- **Project-specific naming** - Clean container organization

---

## 📦 Installation & Setup

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git (for cloning)
- That's it! No Node.js, PostgreSQL, or other tools needed locally

### 🚀 Quick Installation Options

### 🚀 One-Command Setup (Interactive)

```bash
# Clone with your desired project name
git clone https://github.com/berthje/nextjs-starter-kit.git my-awesome-project
cd my-awesome-project

# Start development (will ask for project name)
npm run docker:dev
```

**What happens:**
1. Checks if environment is configured
2. **Asks for your project name** (suggests "My Awesome Project" from folder name)
3. Generates secure credentials
4. Starts Docker containers
5. Opens http://localhost:3000

### ⚡ Silent Mode (for CI/Automation)
```bash
npm run docker:dev:silent
# Uses folder name automatically, no questions
```

### 📋 What the Setup Does Automatically
- ✅ Creates `.env` file with secure random credentials
- ✅ Sets project-specific database name (e.g., `my-awesome-project_db`)
- ✅ Configures container names (e.g., `my-awesome-project-app`)
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
npm run setup               # Interactive setup - choose project name
npm run setup:silent        # Auto setup using folder name
```

### 🐳 Docker Development
```bash
npm run docker:dev              # Start dev environment (with auto-setup)
npm run docker:dev:detached     # Start dev environment in background
npm run docker:dev:stop         # Stop development containers
npm run docker:restart          # Restart just the Next.js app
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
my-awesome-project/
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
│   ├── next.config.ts                # Next.js configuration
│   └── tsconfig.json                 # TypeScript configuration
│
├── 🔧 Configuration & Scripts
│   ├── scripts/
│   │   ├── setup-env.js              # Interactive environment setup
│   │   └── check-env.js              # Auto environment setup
│   ├── .env.example                  # Environment template
│   ├── .env                          # Your environment (auto-generated)
│   ├── .gitignore                    # Git ignore rules
│   └── README.md                     # This documentation
│
└── 📋 Development Files
    ├── .eslintrc.json                # ESLint configuration
    └── .prettierrc            # Prettier configuration
```

---

## 🎨 Project Customization

### 📝 Project Naming Examples

When you clone to different folder names, the setup automatically adapts:

```bash
# E-commerce project
git clone [repo] my-ecommerce-store
# Creates: "My Ecommerce Store" app, my-ecommerce-store_db

# Portfolio site
git clone [repo] john-doe-portfolio
# Creates: "John Doe Portfolio" app, john-doe-portfolio_db

# Corporate dashboard
git clone [repo] company-dashboard
# Creates: "Company Dashboard" app, company-dashboard_db
```

### 🔧 Manual Project Configuration

If you want to customize the project name after setup:

```bash
# Edit your .env file
nano .env

# Update these values:
PROJECT_NAME=my-custom-name
NEXT_PUBLIC_APP_NAME="My Custom App Name"

# Restart containers
npm run docker:dev:stop
npm run docker:clean  # Clean old containers
npm run docker:dev    # Start with new names
```

---

## 🔧 Development Workflow

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
# Edit package.json to add dependencies
npm run docker:dev

# Method 2: Install inside running container
docker exec -it [project-name]-app npm install package-name
npm run docker:restart
```

### 🗄️ Database Schema Changes
```bash
# 1. Modify docker/init.sql for schema changes
# 2. Restart with fresh database
npm run docker:clean
npm run docker:dev
```

### 🔐 Environment Customization
```bash
# Edit your environment variables
nano .env

# Apply changes
npm run docker:restart
```

---

## 🌍 Production Deployment

### 🐳 Docker Deployment (Recommended)

#### Step 1: Create Production Environment
```bash
# Copy your development environment
cp .env .env.prod

# Edit production settings
nano .env.prod
```

#### Step 2: Production Environment Example
```bash
# .env.prod
PROJECT_NAME=my-awesome-project
NODE_ENV=production
DB_PASSWORD=super_secure_production_password_here
BETTER_AUTH_SECRET=your_64_character_production_secret_key_here
BETTER_AUTH_URL=https://myapp.com
NEXT_PUBLIC_APP_NAME="My Awesome Project"
NEXT_PUBLIC_APP_URL=https://myapp.com
DATABASE_URL=postgresql://postgres:super_secure_password@postgres:5432/my-awesome-project_db
DB_HOST=postgres
DB_PORT=5432
DB_NAME=my-awesome-project_db
DB_USER=postgres
```

#### Step 3: Deploy
```bash
# Start production containers
npm run docker:prod

# Your app is now running in production mode!
```

### 🌐 Platform Deployment
Deploy to any Docker-compatible platform:

- **Railway**: Push to Git, auto-deploys with your project name
- **DigitalOcean App Platform**: Connect repository
- **AWS ECS**: Use provided Docker images
- **Google Cloud Run**: Deploy containers
- **Heroku**: Use container registry

### 🔄 Traditional Deployment (Vercel/Netlify)
```bash
# Build locally
npm run build

# Deploy built files to your platform
# Set environment variables in platform dashboard
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

# Check your project name appears correctly
# Should show your custom app name in the title
```

### 🛠️ Database Connection Test
```bash
# Connect to your project-specific database
docker exec -it [your-project-name]-db psql -U postgres -d [your-project-name]_db

# Example for "my-awesome-project":
docker exec -it my-awesome-project-db psql -U postgres -d my-awesome-project_db

# Run a test query
SELECT version();

# Exit
\q
```

### 📊 Container Status Check
```bash
# See your project's containers
docker ps
# Should show: your-project-name-app, your-project-name-db

# Check logs for your specific project
docker logs [your-project-name]-app
docker logs [your-project-name]-db
```

---

## 🗑️ Uninstallation & Cleanup

### 🧹 Complete Project Removal

#### Step 1: Stop and Remove Containers
```bash
# Navigate to project directory
cd my-awesome-project

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
rm -rf my-awesome-project  # Linux/Mac
rmdir /s my-awesome-project  # Windows Command Prompt
Remove-Item -Recurse -Force my-awesome-project  # Windows PowerShell
```

### 🔧 Partial Cleanup Options

```bash
# Remove only containers (keep images for faster restart)
docker-compose down

# Remove containers and volumes (reset database)
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
# Windows/Mac: Start menu → Docker Desktop
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

#### Container Name Conflicts
```bash
# Error: Container name already exists

# Solution: Clean existing containers
npm run docker:clean

# Or use different project name
# Rename your project folder and restart
```

### 🔧 Application Issues

#### Environment Variables Not Loading
```bash
# Recreate environment file
npm run setup

# Restart containers
npm run docker:restart
```

#### Database Connection Errors
```bash
# Check database container
docker ps | grep postgres

# View database logs
docker logs [your-project-name]-db

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
# All container logs for your project
npm run docker:logs

# Specific container logs
docker logs [your-project-name]-app
docker logs [your-project-name]-db
```

#### Container Shell Access
```bash
# Access app container
docker exec -it [your-project-name]-app sh

# Access database container
docker exec -it [your-project-name]-db bash
```

#### Complete Reset
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
- Manual credential management
- Inconsistent project naming

### ✅ This Starter Kit Benefits
- **Identical environment** for all developers
- **5-minute setup** from zero to coding
- **Complete project isolation** with Docker
- **Smart project naming** from folder names
- **Automatic credential generation**
- **Production-ready** architecture from day one
- **Easy cleanup** when project is done

### 🎯 Perfect For
- **New projects** that need quick setup
- **Team development** requiring identical environments
- **Learning** Next.js without setup complexity
- **Prototyping** with full-stack capabilities
- **Production deployment** with Docker
- **Multiple projects** with clean isolation

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
4. Update documentation if needed
5. Submit a pull request

### 🐛 Reporting Issues
- Use GitHub Issues
- Include Docker and system information
- Provide steps to reproduce
- Include relevant logs
- Mention your project name setup

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
npm run setup               # Interactive setup with project naming
npm run docker:dev          # Start development (auto-setup)

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

## 🌟 Project Examples

### 📱 E-commerce Store
```bash
git clone [repo] shopify-clone
cd shopify-clone
npm run docker:dev
# Creates: "Shopify Clone" app with shopify-clone_db
```

### 💼 Corporate Dashboard
```bash
git clone [repo] acme-dashboard
cd acme-dashboard
npm run docker:dev
# Creates: "Acme Dashboard" app with acme-dashboard_db
```

### 🎨 Portfolio Website
```bash
git clone [repo] jane-portfolio
cd jane-portfolio
npm run docker:dev
# Creates: "Jane Portfolio" app with jane-portfolio_db
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