# Next.js Starter Kit

A modern, production-ready Next.js starter kit with authentication, database integration, and best practices built-in.

## ✨ What's Included

- **Next.js 15.3** with App Router and TypeScript
- **Authentication** with Better Auth (email/password)
- **Database** PostgreSQL with raw SQL queries (no ORM)
- **Styling** Tailwind CSS with custom components
- **Code Quality** ESLint + Prettier configured
- **Type Safety** Full TypeScript support

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <this-repo>
cd nextjs-starter-kit
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=my_app_db
DB_USER=postgres
DB_PASSWORD=your_password
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
```

### 3. Set Up Database
Make sure PostgreSQL is running locally, then test the connection:
```bash
npm run db:setup
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router
│   ├── auth/           # Login/signup pages
│   ├── dashboard/      # Protected pages
│   └── api/auth/       # Auth API routes
├── components/         # Reusable UI components
│   ├── auth/           # Auth-specific components
│   └── ui/             # General UI components
└── lib/                # Utilities and configurations
    ├── auth-client.ts  # Better Auth client setup
    ├── auth.ts         # Better Auth server setup
    ├── db.ts           # Database connection
    └── utils.ts        # Helper functions
```

## 🛠️ Configuration

### Database Setup
1. Install PostgreSQL locally or use a cloud service
2. Create a database for your app
3. Update `DATABASE_URL` in `.env.local`

### Authentication
- Users can sign up/login with email and password
- Better Auth automatically creates necessary database tables
- Sessions are handled server-side

### Styling
- Tailwind CSS is pre-configured
- Custom utility classes in `globals.css`

## 🎯 Next Steps

1. **Customize your app** - Update app name and styling
2. **Add your features** - Build on top of the authentication foundation
3. **Deploy** - Use Vercel, Netlify, or your preferred platform

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Guide](https://www.better-auth.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)

---

**Happy coding!** 🚀