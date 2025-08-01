#!/bin/bash

echo "🚀 Starting CrewAI Dashboard - Complete Full-Stack Application"
echo "=" * 60

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ Port $1 is available"
        return 0
    else
        echo "❌ Port $1 is already in use"
        return 1
    fi
}

# Check if ports are available
echo "🔍 Checking port availability..."
if ! check_port 3000; then
    echo "Please stop the process using port 3000"
    exit 1
fi

if ! check_port 8000; then
    echo "Please stop the process using port 8000"
    exit 1
fi

echo ""
echo "📦 Starting Backend Server..."
cd backend
python simple_server.py &
BACKEND_PID=$!
cd ..

echo ""
echo "📦 Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "⏳ Waiting for servers to start..."
sleep 5

echo ""
echo "🔍 Testing servers..."

# Test backend
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:8000"
else
    echo "❌ Backend failed to start"
fi

# Test frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend failed to start"
fi

echo ""
echo "🎉 CrewAI Dashboard is ready!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for interrupt signal
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait 