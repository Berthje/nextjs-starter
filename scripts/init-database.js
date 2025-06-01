/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  console.log('🔧 Initializing Better Auth database...');

  // Check if .env exists
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found. Run npm run setup first.');
    process.exit(1);
  }

  // Check if Better Auth secret is configured
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('your-secret-key-here-make-it-long-and-random')) {
    console.log('⚠️  Better Auth secret not configured in .env file');
    console.log('💡 Please add your BETTER_AUTH_SECRET to .env before running database migration');
    console.log('💡 You can generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
    process.exit(1);
  }

  try {
    // Wait for database to be ready
    console.log('⏳ Waiting for database to be ready...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check if Docker containers are running
    try {
      execSync('docker ps --format "table {{.Names}}" | grep -E "(postgres|db)"', { encoding: 'utf8', stdio: 'pipe' });
      console.log('✅ Database container is running');
    } catch (error) {
      console.log('❌ Database container not found. Make sure Docker containers are running.');
      console.log('💡 Start containers with: npm run docker:dev');
      process.exit(1);
    }

    // Run Better Auth migration
    console.log('🔄 Running Better Auth database migration...');
    console.log('💡 This will create or update the required tables for authentication');

    try {
      execSync('npx @better-auth/cli migrate', {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });

      console.log('✅ Better Auth database migration completed successfully!');
      console.log('');
      console.log('📋 Tables created/updated:');
      console.log('   👤 user - User accounts and profiles');
      console.log('   🔐 session - User sessions and tokens');
      console.log('   🔗 account - OAuth and credential accounts');
      console.log('   ✉️  verification - Email verification and password resets');
      console.log('');
      console.log('🚀 Your authentication database is ready!');

    } catch (migrationError) {
      console.log('❌ Better Auth migration failed');
      console.log('🔍 This might happen if:');
      console.log('   • Better Auth secret is not properly configured');
      console.log('   • Database connection issues');
      console.log('   • Network connectivity problems');
      console.log('');
      console.log('💡 Try running manually: npm run db:migrate');
      console.log('💡 Or check your .env configuration');

      // Don't exit with error - let user try manual migration
      console.log('⚠️  Continuing without database migration...');
    }

  } catch (error) {
    console.log('❌ Database initialization failed:', error.message);
    console.log('💡 You can run database migration manually later with: npm run db:migrate');
  }
}

// Run initialization
initializeDatabase();
