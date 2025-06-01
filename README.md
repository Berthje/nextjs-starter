# 🚀 Next.js Production-Ready Starter Kit

> **Zero-setup development environment with Docker** - Clone, run one command, start coding!

A modern, battle-tested Next.js starter kit that gets you from idea to production in minutes, not hours. Everything is containerized - no local dependencies required except Docker.

---

## ✨ What Makes This Special?

### 🎯 **Instant Development Setup**
- **One command setup** - `npm run docker:dev` and you're coding
- **Zero local dependencies** - Only Docker required
- **Complete isolation** - Each project in its own containers
- **Hot reload** - See changes instantly while developing

### 🏗️ **Production-Ready Stack**
- **Next.js 15.3** with App Router & TypeScript
- **PostgreSQL 17.5** with automatic initialization
- **Better Auth** for secure authentication
- **Tailwind CSS** for beautiful styling
- **ESLint + Prettier** for code quality

### 🐳 **Docker-First Approach**
- **Development containers** with hot reload
- **Production containers** with optimized builds
- **Database included** - PostgreSQL containerized
- **Environment isolation** - No conflicts between projects

---

## 🏃‍♂️ Quick Start (2 Minutes)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- That's it! No Node.js, PostgreSQL, or other tools needed locally

### 1. Clone & Start
```bash
# Clone this repository
git clone [your-repository-url]
cd nextjs-starter

# Start everything with one command
npm run docker:dev
```

### 2. Open Your App
- **Frontend**: http://localhost:3000
- **Test Page**: http://localhost:3000/test (verify everything works)

### 3. Start Coding!
Your development environment is ready with:
- ✅ PostgreSQL database running
- ✅ Next.js with hot reload
- ✅ Authentication system ready
- ✅ All npm packages installed

---

## 🛠️ Development Commands

```bash
# Development
npm run docker:dev              # Start dev environment (with logs)
npm run docker:dev:detached     # Start in background
npm run docker:dev:stop         # Stop containers

# Production Testing
npm run docker:prod             # Start production build
npm run docker:prod:stop        # Stop production containers

# Utilities
npm run docker:logs             # View container logs
npm run docker:restart          # Restart just the app
npm run docker:clean            # Complete cleanup & reset
```

---

## 📁 Project Structure

```
nextjs-starter/
├── 🐳 Docker Configuration
│   ├── Dockerfile              # Production container
│   ├── Dockerfile.dev          # Development container
│   ├── docker-compose.yml      # Development setup
│   ├── docker-compose.prod.yml # Production setup
│   └── docker/
│       └── init.sql            # Database initialization
│
├── 📱 Next.js Application
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   ├── components/        # Reusable components
│   │   └── lib/              # Utilities & config
│   │
│   ├── package.json          # Dependencies & scripts
│   ├── tailwind.config.ts    # Styling configuration
│   └── next.config.ts        # Next.js configuration
│
└── 🔧 Configuration
    ├── .env.example          # Environment template
    ├── .dockerignore         # Docker ignore rules
    └── README.md            # This file
```

---

## 🔧 Customization & Development

### Adding New npm Packages
```bash
# Stop containers
npm run docker:dev:stop

# Add packages to package.json manually, then rebuild
npm run docker:dev
```

### Database Changes
```bash
# Modify docker/init.sql for schema changes
# Then restart with clean database
npm run docker:clean
npm run docker:dev
```

### Environment Variables
```bash
# Copy template and customize
cp .env.example .env.local

# Edit .env.local with your settings
# Restart containers to apply changes
npm run docker:restart
```

### Adding New Features
1. Code changes are automatically reflected (hot reload)
2. Add new pages in `src/app/`
3. Create components in `src/components/`
4. Database queries go in your pages/API routes

---

## 🌍 Production Deployment

### Option 1: Docker Deployment
Your app is production-ready with Docker:

```bash
# Create production environment
cp .env.example .env.prod
# Edit .env.prod with production values

# Build and start production containers
npm run docker:prod
```

Deploy to any Docker platform:
- Railway, DigitalOcean, AWS ECS, Google Cloud Run, etc.

### Option 2: Traditional Deployment
Deploy to Vercel, Netlify, or any Node.js host:
```bash
npm run build
npm start
```

---

## 🧪 Testing Your Setup

Visit http://localhost:3000/test to verify:
- ✅ Database connection working
- ✅ Environment variables loaded
- ✅ Containers communicating properly
- ✅ Authentication system ready

---

## 💡 Why This Approach?

### Traditional Setup Problems:
- ❌ "Works on my machine" syndrome
- ❌ Complex local environment setup
- ❌ Version conflicts between projects
- ❌ Database installation & management
- ❌ Hours spent on configuration

### This Starter Kit Solution:
- ✅ Identical environment for everyone
- ✅ One command to start developing
- ✅ Complete project isolation
- ✅ Database included & auto-configured
- ✅ Production-ready from day one

---

## 🔍 What's Included Out of the Box

### Frontend
- **Next.js 15.3** with TypeScript
- **Tailwind CSS** for styling
- **App Router** for modern routing
- **Hot reload** for instant feedback

### Backend & Database
- **PostgreSQL 17.5** containerized
- **Better Auth** authentication system
- **Database migrations** automatic
- **Environment configuration** simplified

### Development Experience
- **Docker Compose** for orchestration
- **ESLint + Prettier** for code quality
- **TypeScript** for type safety
- **Development/Production** container separation

### Production Ready
- **Optimized Docker** builds
- **Standalone output** for minimal containers
- **Environment** variable management
- **Scalable architecture** from start

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch
3. Make your changes
4. Test with `npm run docker:dev`
5. Submit a pull request

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Guide](https://www.better-auth.com/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🆘 Troubleshooting

### Docker Issues
```bash
# Check Docker is running
docker --version
docker ps

# View logs
npm run docker:logs

# Complete reset
npm run docker:clean
npm run docker:dev
```

### Port Conflicts
If ports 3000 or 5432 are busy:
```bash
# Stop other services or modify ports in docker-compose.yml
# Change "3000:3000" to "3001:3000" for different local port
```

### Permission Issues (Linux/Mac)
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

---

**Happy coding!** 🎉

*Built with ❤️ for developers who want to focus on building, not configuring.*