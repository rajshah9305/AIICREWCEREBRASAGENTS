# 🚀 CrewAI Dashboard with Cerebras Integration

A modern, production-ready full-stack web application for creating, managing, and running CrewAI agent crews with Cerebras LLM integration.

![CrewAI Dashboard](https://img.shields.io/badge/CrewAI-Dashboard-blue)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![Cerebras](https://img.shields.io/badge/Cerebras-LLM-purple)

## ✨ Features

### 🎯 Core Functionality
- **Crew Management**: Create, edit, and manage AI agent crews
- **Real-time Execution**: Run crews and monitor progress in real-time
- **Cerebras Integration**: Seamless integration with Cerebras LLM models
- **WebSocket Support**: Live updates and real-time communication
- **Responsive Design**: Mobile-first responsive UI design
- **Dark/Light Theme**: System-aware theme switching

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern interface with Tailwind CSS
- **Real-time Updates**: WebSocket-powered live updates
- **Smooth Animations**: Framer Motion animations
- **Toast Notifications**: User-friendly notifications
- **Mobile Responsive**: Works perfectly on all devices

### 🔧 Technical Features
- **Full-Stack**: Complete frontend and backend implementation
- **Database**: SQLite with SQLAlchemy ORM
- **API**: RESTful API with FastAPI
- **Security**: Input sanitization and error handling
- **Performance**: Optimized database operations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zustand** - State management
- **React Router DOM** - Client-side routing

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Lightweight database
- **WebSockets** - Real-time communication
- **Cerebras API** - LLM integration
- **Uvicorn** - ASGI server

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/rajshah9305/AIICREWCEREBRASAGENTS.git
cd AIICREWCEREBRASAGENTS
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp env.example .env
# Edit .env with your Cerebras API key

# Start backend server
python start.py
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
AIICREWCEREBRASAGENTS/
├── src/                     # React frontend
│   ├── components/         # UI components
│   ├── pages/             # Page components
│   ├── stores/            # State management
│   └── utils/             # Utility functions
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core configuration
│   │   ├── models/        # Data models
│   │   └── services/      # Business logic
│   └── requirements.txt   # Python dependencies
├── package.json           # Frontend dependencies
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md             # This file
```

## 🔧 Configuration

### Frontend Environment Variables (.env.local)
```env
VITE_API_URL=http://localhost:8000
VITE_CEREBRAS_API_KEY=your_cerebras_api_key
VITE_CEREBRAS_MODEL_ID=llama-4-maverick-17b-128e-instruct
VITE_WS_URL=ws://localhost:8000/ws
```

### Backend Environment Variables (.env)
```env
DATABASE_URL=sqlite:///./crewai_dashboard.db
CEREBRAS_API_KEY=your_cerebras_api_key
CEREBRAS_BASE_URL=https://api.cerebras.ai
CEREBRAS_MODEL_ID=llama-4-maverick-17b-128e-instruct
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Docker (Optional)
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 📊 API Endpoints

### Crews
- `GET /api/v1/crews` - Get all crews
- `POST /api/v1/crews` - Create new crew
- `GET /api/v1/crews/{id}` - Get specific crew
- `PUT /api/v1/crews/{id}` - Update crew
- `DELETE /api/v1/crews/{id}` - Delete crew

### Executions
- `GET /api/v1/executions` - Get all executions
- `POST /api/v1/crews/{id}/execute` - Execute crew
- `GET /api/v1/executions/{id}` - Get execution details

### System
- `GET /api/v1/system/metrics` - Get system metrics
- `GET /api/v1/system/health` - Health check

### WebSocket
- `WS /ws` - Real-time updates

## 🎯 Usage

### Creating a Crew
1. Navigate to Crew Builder
2. Click "Create Crew"
3. Configure agents and tasks
4. Save the crew

### Executing a Crew
1. Select a crew from dashboard
2. Click "Execute"
3. Monitor real-time progress
4. View execution logs

## 🔒 Security Features

- Input sanitization for log injection prevention
- Authorization checks for protected routes
- Comprehensive error handling
- Environment variable protection

## 📈 Performance Features

- Optimized database operations
- Real-time WebSocket connections
- Responsive design with mobile optimization
- Code splitting and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Open an issue on GitHub
- **Documentation**: Check the code comments and API docs
- **Discussions**: Use GitHub Discussions

## 🔗 Links

- [CrewAI Documentation](https://docs.crewai.com/)
- [Cerebras Documentation](https://inference-docs.cerebras.ai/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)

---

**Made with ❤️ for AI Agent Management**