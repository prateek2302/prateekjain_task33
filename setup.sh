#!/bin/bash

# Todo List App - Quick Start Script
# This script sets up and runs both backend and frontend

echo "🚀 Todo List App - Quick Start Setup"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend
echo "  Installing dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo "  ✅ Backend dependencies installed"
else
    echo "  ❌ Failed to install backend dependencies"
    exit 1
fi

# Check .env file
if [ ! -f .env ]; then
    echo "  ⚠️  .env file not found, creating with defaults..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
NODE_ENV=development
EOF
fi

echo "  ✅ Backend configured"
echo ""

# Setup Frontend
cd ../frontend
echo "📦 Setting up Frontend..."
echo "  Installing dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo "  ✅ Frontend dependencies installed"
else
    echo "  ❌ Failed to install frontend dependencies"
    exit 1
fi

# Check .env file
if [ ! -f .env ]; then
    echo "  ⚠️  .env file not found, creating with defaults..."
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
fi

echo "  ✅ Frontend configured"
echo ""

echo "==========================================="
echo "✅ Setup Complete!"
echo "==========================================="
echo ""
echo "Next Steps:"
echo "1. Make sure MongoDB is running (if using local)"
echo "2. In Terminal 1, run: cd backend && npm start"
echo "3. In Terminal 2, run: cd frontend && npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "Happy coding! 🎉"
