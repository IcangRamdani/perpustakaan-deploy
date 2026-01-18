#!/bin/bash
# Railway Deployment Checklist

echo "🚀 Perpustakaan System - Railway Deployment Checklist"
echo "=================================================="
echo ""

# Check Node version
echo "✅ Checking Node.js version..."
node --version

# Check npm version
echo "✅ Checking npm version..."
npm --version

# Check if package.json exists
echo "✅ Checking package.json in backend..."
if [ -f "backend/package.json" ]; then
    echo "   ✓ backend/package.json found"
else
    echo "   ✗ backend/package.json NOT found"
fi

# Check dependencies
echo "✅ Checking dependencies..."
cd backend
npm ls --depth=0 2>/dev/null | head -20

# Check main server file
echo "✅ Checking server.js..."
if [ -f "server.js" ]; then
    echo "   ✓ server.js found"
else
    echo "   ✗ server.js NOT found"
fi

# Check environment config
echo "✅ Checking configuration files..."
if [ -f "config.js" ]; then
    echo "   ✓ config.js found"
fi
if [ -f "env-config.js" ]; then
    echo "   ✓ env-config.js found"
fi

# Check routes
echo "✅ Checking API routes..."
if [ -d "routes" ]; then
    ls -la routes/ | grep ".js"
fi

# Check database setup
echo "✅ Checking database files..."
if [ -f "database.sql" ]; then
    echo "   ✓ database.sql found"
fi

echo ""
echo "=================================================="
echo "✅ Deployment checklist complete!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Create Railway project and connect GitHub"
echo "3. Add MySQL database to Railway"
echo "4. Set environment variables in Railway dashboard"
echo "5. Monitor deployment in Railway dashboard"
echo ""
