#!/bin/bash

# Deploy CREWFINALE to GitHub Repository
# Repository: https://github.com/rajshah9305/AIICREWCEREBRASAGENTS.git

echo "🚀 Starting deployment to GitHub..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add remote origin if not exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Adding remote origin..."
    git remote add origin https://github.com/rajshah9305/AIICREWCEREBRASAGENTS.git
else
    echo "🔄 Updating remote origin..."
    git remote set-url origin https://github.com/rajshah9305/AIICREWCEREBRASAGENTS.git
fi

# Create .gitignore if it doesn't exist or update it
echo "📝 Updating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
*.tsbuildinfo

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Vercel
.vercel

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/

# Database
*.db
*.sqlite
*.sqlite3

# Uploads
uploads/
EOF

# Stage all files
echo "📋 Staging files..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Commit changes
    echo "💾 Committing changes..."
    git commit -m "feat: Complete CrewAI Dashboard with Cerebras integration

- ✅ Full-stack application with React frontend and FastAPI backend
- ✅ Cerebras LLM integration for AI agent crews
- ✅ Real-time WebSocket connections for live updates
- ✅ Responsive UI with dark/light theme support
- ✅ Crew management with agents and tasks
- ✅ Execution monitoring and logging
- ✅ Settings and preferences management
- ✅ Security fixes (log injection, authorization)
- ✅ Performance optimizations
- ✅ Mobile-responsive design
- ✅ Production-ready deployment configuration

Components:
- Frontend: React 18, Vite, Tailwind CSS, Framer Motion
- Backend: FastAPI, SQLAlchemy, WebSockets, Cerebras API
- Database: SQLite with ORM
- Real-time: WebSocket manager for live updates
- Security: Input sanitization, error handling
- UI/UX: Responsive design, animations, notifications"
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main --force

echo "✅ Deployment completed successfully!"
echo "🌐 Repository: https://github.com/rajshah9305/AIICREWCEREBRASAGENTS"
echo ""
echo "📋 Next steps:"
echo "1. Set up environment variables in your deployment platform"
echo "2. Install dependencies: npm install && cd backend && pip install -r requirements.txt"
echo "3. Configure Cerebras API key in environment variables"
echo "4. Deploy frontend and backend to your preferred platforms"