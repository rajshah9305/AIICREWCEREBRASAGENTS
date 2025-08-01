# CrewAI Dashboard

A modern, production-ready web application for creating, managing, and running CrewAI agent crews with Cerebras models integration.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with dark/light mode
- **Crew Management**: Create, edit, and manage AI agent crews
- **Real-time Execution**: Run crews and monitor progress in real-time
- **Advanced Analytics**: Detailed performance metrics and execution logs
- **Cerebras Integration**: Seamless integration with Cerebras models
- **Code Editor**: Built-in code editor for agent configuration
- **Export/Import**: Save and load crew configurations
- **Real-time Logs**: Live execution logs with syntax highlighting
- **Performance Monitoring**: CPU, memory, and execution time tracking

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: Zustand, React Query
- **UI Components**: Framer Motion, Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Code Highlighting**: Prism.js, React Syntax Highlighter
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crewai-dashboard.git
   cd crewai-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_CEREBRAS_API_KEY=your_cerebras_api_key
   VITE_CEREBRAS_MODEL_ID=your_model_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on every push

### Environment Variables for Production

```env
VITE_API_URL=https://your-api-domain.com
VITE_CEREBRAS_API_KEY=your_production_api_key
VITE_CEREBRAS_MODEL_ID=your_production_model_id
```

## 📁 Project Structure

```
crewai-dashboard/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   ├── dashboard/
│   │   │   ├── CrewCard.jsx
│   │   │   ├── ExecutionLogs.jsx
│   │   │   ├── PerformanceChart.jsx
│   │   │   └── StatsCard.jsx
│   │   ├── crew/
│   │   │   ├── CrewBuilder.jsx
│   │   │   ├── AgentEditor.jsx
│   │   │   ├── TaskEditor.jsx
│   │   │   └── CodeEditor.jsx
│   │   └── CrewAIDashboard.jsx
│   ├── hooks/
│   │   ├── useCrewAI.js
│   │   ├── useLocalStorage.js
│   │   └── useWebSocket.js
│   ├── stores/
│   │   ├── crewStore.js
│   │   ├── uiStore.js
│   │   └── executionStore.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── CrewBuilder.jsx
│   │   ├── Execution.jsx
│   │   └── Settings.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/crewai-dashboard/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🔗 Links

- [CrewAI Documentation](https://docs.crewai.com/)
- [Cerebras Documentation](https://inference-docs.cerebras.ai/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

Made with ❤️ by the CrewAI Dashboard Team 