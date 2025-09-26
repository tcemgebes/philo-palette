#!/bin/bash

# Philo-Palette Development Server Management Script

echo "🔧 Philo-Palette Dev Server Manager"
echo "=================================="

case "$1" in
  "start")
    echo "🚀 Starting development server..."
    echo "📝 To stop: ./dev-scripts.sh stop"
    echo "📝 To restart: ./dev-scripts.sh restart"
    echo "📝 To check status: ./dev-scripts.sh status"
    echo ""
    npm run dev
    ;;
  "stop")
    echo "🛑 Stopping all Vite processes..."
    pkill -f vite
    echo "✅ All Vite processes stopped"
    ;;
  "restart")
    echo "🔄 Restarting development server..."
    pkill -f vite
    sleep 2
    echo "🚀 Starting fresh server..."
    npm run dev
    ;;
  "status")
    echo "📊 Checking Vite processes..."
    VITE_PROCESSES=$(ps aux | grep vite | grep -v grep | wc -l)
    if [ $VITE_PROCESSES -eq 0 ]; then
      echo "❌ No Vite processes running"
    else
      echo "✅ $VITE_PROCESSES Vite process(es) running:"
      ps aux | grep vite | grep -v grep
    fi
    ;;
  "kill-all")
    echo "💀 Killing all Node.js processes..."
    pkill -f node
    echo "✅ All Node.js processes stopped"
    ;;
  "clean-start")
    echo "🧹 Clean start - killing all processes and starting fresh..."
    pkill -f vite
    pkill -f node
    sleep 3
    echo "🚀 Starting fresh development server..."
    npm run dev
    ;;
  *)
    echo "Usage: ./dev-scripts.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start       - Start development server"
    echo "  stop        - Stop all Vite processes"
    echo "  restart     - Restart development server"
    echo "  status      - Check running Vite processes"
    echo "  kill-all    - Kill all Node.js processes"
    echo "  clean-start - Kill all processes and start fresh"
    echo ""
    echo "Examples:"
    echo "  ./dev-scripts.sh start"
    echo "  ./dev-scripts.sh restart"
    echo "  ./dev-scripts.sh clean-start"
    ;;
esac 