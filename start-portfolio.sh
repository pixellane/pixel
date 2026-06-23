#!/bin/bash

echo "🚀 Starting Jereme Paragoso Portfolio..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start databases
echo "📊 Starting databases (PostgreSQL & MinIO)..."
docker-compose up -d

# Wait a bit for databases to be ready
echo "⏳ Waiting for databases to initialize..."
sleep 5

# Start backend
echo "🔧 Starting backend API..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Start backend in background
npm run dev &
BACKEND_PID=$!

cd ..

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!

cd ..

echo ""
echo "✅ Portfolio is starting up!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "🗄️  Database: PostgreSQL on port 5432"
echo "📁 MinIO: http://localhost:9001 (admin: jereme/portfolio123)"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
wait $BACKEND_PID $FRONTEND_PID