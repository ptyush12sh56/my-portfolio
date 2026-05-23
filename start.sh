#!/bin/bash
# Start both frontend and backend
echo "🚀 Starting Pratyush Portfolio..."
echo ""

# Start backend
cd backend
npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo "   → http://localhost:4000"
echo "   → Admin Dashboard: http://localhost:4000/admin"
echo "   → HR Public Page:  http://localhost:4000/hr"

# Start frontend
cd ..
npm run dev &
FRONTEND_PID=$!
echo ""
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo "   → http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait and cleanup
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
