# 🚀 CrewAI Dashboard - Complete Full-Stack Application

A modern, production-ready web application for creating, managing, and running CrewAI agent crews with Cerebras models integration. This is a complete full-stack application with both frontend and backend components.

## ✨ Features

### 🎯 Core Functionality
- **Crew Management**: Create, edit, and manage AI agent crews
- **Real-time Execution**: Run crews and monitor progress in real-time
- **Advanced Analytics**: Detailed performance metrics and execution logs
- **Cerebras Integration**: Seamless integration with Cerebras models
- **Code Editor**: Built-in code editor for agent configuration
- **Export/Import**: Save and load crew configurations
- **Real-time Logs**: Live execution logs with syntax highlighting
- **Performance Monitoring**: CPU, memory, and execution time tracking

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern, responsive design with dark/light mode
- **Real-time Updates**: WebSocket-powered live updates
- **Interactive Charts**: Performance metrics and analytics
- **Toast Notifications**: User-friendly notifications
- **Smooth Animations**: Framer Motion animations
- **Mobile Responsive**: Works perfectly on all devices

### 🔧 Technical Features
- **Full-Stack**: Complete frontend and backend implementation
- **Real-time**: WebSocket connections for live updates
- **Database**: SQLite with SQLAlchemy ORM
- **API**: RESTful API with FastAPI
- **Authentication**: JWT-based authentication
- **File Upload**: Support for crew configuration files
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **React Router DOM** - Client-side routing
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Recharts** - Chart components
- **React Markdown** - Markdown rendering
- **Prism.js** - Code highlighting

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Lightweight database
- **Pydantic** - Data validation
- **WebSockets** - Real-time communication
- **CrewAI** - AI agent framework
- **Cerebras** - LLM integration
- **Uvicorn** - ASGI server
- **Python 3.9+** - Modern Python

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.9+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/crewai-dashboard.git
cd crewai-dashboard
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp env.example .env

# Start backend server
python start.py
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
crewai-dashboard/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── stores/            # Zustand state management
│   │   ├── utils/             # Utility functions
│   │   └── App.jsx           # Main app component
│   ├── public/                # Static assets
│   └── package.json          # Frontend dependencies
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/              # API endpoints
│   │   ├── core/             # Core configuration
│   │   ├── models/           # Pydantic models
│   │   └── services/         # Business logic
│   ├── main.py               # FastAPI application
│   ├── start.py              # Startup script
│   └── requirements.txt      # Python dependencies
├── docs/                      # Documentation
├── scripts/                   # Deployment scripts
└── README.md                 # This file
```

## 🔧 Configuration

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:8000
VITE_CEREBRAS_API_KEY=your_cerebras_api_key
VITE_CEREBRAS_MODEL_ID=llama-4-maverick-17b-128e-instruct
VITE_WS_URL=ws://localhost:8000/ws
```

### Backend Environment Variables
```env
DATABASE_URL=sqlite:///./crewai_dashboard.db
CEREBRAS_API_KEY=your_cerebras_api_key
CEREBRAS_BASE_URL=https://api.cerebras.ai
CEREBRAS_MODEL_ID=llama-4-maverick-17b-128e-instruct
```

## 🚀 Deployment

### Vercel Deployment (Frontend)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push

### Railway/Render Deployment (Backend)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Docker Deployment
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
- `GET /api/v1/executions/{id}/logs` - Get execution logs

### System
- `GET /api/v1/system/metrics` - Get system metrics
- `GET /api/v1/system/health` - Health check
- `GET /api/v1/system/info` - System information

### WebSocket
- `WS /ws` - Real-time updates

## 🎯 Usage Examples

### Creating a Crew
1. Navigate to the Crew Builder
2. Click "Create Crew"
3. Fill in crew details (name, description, category)
4. Add agents with roles and goals
5. Add tasks with descriptions
6. Save the crew

### Executing a Crew
1. Select a crew from the dashboard
2. Click "Execute"
3. Monitor real-time progress
4. View execution logs
5. Download results

### Monitoring Performance
1. View dashboard statistics
2. Check system metrics
3. Analyze execution logs
4. Monitor resource usage

## 🔒 Security Features

- **CORS Configuration**: Proper CORS setup
- **Input Validation**: Pydantic models for validation
- **Error Handling**: Comprehensive error handling
- **Logging**: Structured logging
- **Environment Variables**: Secure configuration

## 📈 Performance Features

- **Caching**: React Query for data caching
- **Optimization**: Code splitting and lazy loading
- **Compression**: Gzip compression
- **CDN Ready**: Static asset optimization
- **Real-time**: WebSocket for live updates

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Check if backend is running on port 8000
   - Verify environment variables
   - Check CORS configuration

2. **Database Issues**
   - Ensure SQLite file is writable
   - Check database migrations
   - Verify database URL

3. **WebSocket Connection**
   - Check WebSocket URL configuration
   - Verify backend WebSocket endpoint
   - Check firewall settings

### Debug Mode
```bash
# Frontend debug
VITE_DEBUG_MODE=true npm run dev

# Backend debug
LOG_LEVEL=DEBUG python start.py
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Email**: contact@crewai-dashboard.com

## 🔗 Links

- [CrewAI Documentation](https://docs.crewai.com/)
- [Cerebras Documentation](https://inference-docs.cerebras.ai/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🎉 Acknowledgments

- CrewAI team for the amazing framework
- Cerebras for providing powerful LLM models
- The open-source community for excellent tools and libraries

---

**Made with ❤️ by the CrewAI Dashboard Team**

*This is a personal project intended strictly for personal use. Generate production-ready code with real-world implementation across all stages—backend, frontend, and deployment. Include advanced features, functions, and a modern web-based UI that is visually appealing and clearly stands out.* 