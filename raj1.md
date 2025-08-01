
Role: You are an expert full-stack developer specializing in Python, FastAPI, crewAI, and modern vanilla JavaScript/HTML/CSS.

Project Goal: Your task is to build a complete, production-ready web application that provides a user interface for creating, managing, and running crewAI agent crews. This application will use Cerebras models as the backend LLM for the agents.


**Deliver the code for the project, ONLY that is missing, and to complete the code. Below is my existing codebase. 
Reference - https://inference-docs.cerebras.ai/introduction and https://github.com/tonykipkemboi/crewai-cerebras-integration-demo/tree/main?ref=blog.crewai.com and https://blog.crewai.com/build-a-multi-ai-agent-workflow-cerebras-crewai-2/** -

# CrewAI Dashboard - Complete Project Setup

## 📁 Project Structure

```
crewai-dashboard/
├── package.json
├── package-lock.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── components/
│       └── CrewAIDashboard.jsx
└── README.md
```

## 🚀 Quick Start Guide

### 1. **package.json**

```json
{
  "name": "crewai-dashboard",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}
```

### 2. **vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### 3. **tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
```

### 4. **postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. **index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CrewAI Dashboard - AI Agent Platform</title>
    <meta name="description" content="Advanced CrewAI Dashboard for managing multi-agent AI workflows" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 6. **src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 7. **src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #f9fafb;
  }
}

@layer components {
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Custom scrollbar for output */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```

### 8. **src/App.jsx**

```jsx
import React from 'react'
import CrewAIDashboard from './components/CrewAIDashboard'

function App() {
  return (
    <div className="App">
      <CrewAIDashboard />
    </div>
  )
}

export default App
```

### 9. **src/components/CrewAIDashboard.jsx**

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, CheckSquare, Play, FileText, Plus, Download, Settings, ChevronDown, 
  User, Target, Briefcase, Upload, Save, FolderOpen, Trash2, Edit3, Copy,
  BarChart3, Clock, Zap, Brain, Network, Eye, Pause, RotateCcw, 
  MessageSquare, Star, Filter, Search, Calendar, TrendingUp, Activity,
  Database, Code, Globe, Shield, Cpu, Layers, Monitor
} from 'lucide-react';

const CrewAIDashboard = () => {
  const [activeTab, setActiveTab] = useState('agents');
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Research & Analysis Team",
      description: "Multi-agent research workflow with analyst, researcher, and writer",
      agents: 3,
      tasks: 5,
      category: "Research",
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      name: "Content Creation Squad",
      description: "SEO-optimized content creation with strategist and editor",
      agents: 2,
      tasks: 4,
      category: "Marketing",
      rating: 4.6,
      featured: false
    },
    {
      id: 3,
      name: "Code Review Team",
      description: "Automated code review with security and performance analysis",
      agents: 3,
      tasks: 6,
      category: "Development",
      rating: 4.9,
      featured: true
    }
  ]);
  
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'crew-results-2024-01-15T10-30-00.txt',
      size: '2.0 KB',
      date: '2024-01-15 10:30:00',
      type: 'output',
      status: 'completed'
    },
    {
      id: 2,
      name: 'market-analysis-report.md',
      size: '4.0 KB',
      date: '2024-01-15 09:15:00',
      type: 'report',
      status: 'completed'
    }
  ]);

  const [agentForm, setAgentForm] = useState({
    role: '',
    goal: '',
    backstory: '',
    tools: [],
    maxIterations: 5,
    temperature: 0.7,
    model: 'llama-3.3-70b'
  });

  const [taskForm, setTaskForm] = useState({
    name: '',
    description: '',
    expectedOutput: '',
    assignedAgent: '',
    priority: 'medium',
    context: '',
    outputFormat: 'text'
  });

  const [executionConfig, setExecutionConfig] = useState({
    topic: '',
    model: 'llama-3.3-70b',
    process: 'sequential',
    maxIterations: 10,
    verbose: true,
    memory: true,
    collaboration: true
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState('');
  const [executionLogs, setExecutionLogs] = useState([]);
  const [executionStats, setExecutionStats] = useState({
    startTime: null,
    duration: 0,
    tokensUsed: 0,
    apiCalls: 0,
    status: 'idle'
  });

  const [analytics, setAnalytics] = useState({
    totalExecutions: 47,
    successRate: 94.2,
    avgDuration: '2m 34s',
    totalTokens: 847293,
    topPerformingAgent: 'Research Analyst',
    weeklyTrend: '+12.4%'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const outputRef = useRef(null);

  // Auto-scroll output to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [executionOutput]);

  // Simulate real-time execution
  const simulateExecution = async () => {
    setIsExecuting(true);
    setExecutionOutput('');
    setExecutionLogs([]);
    setExecutionStats({
      startTime: new Date(),
      duration: 0,
      tokensUsed: 0,
      apiCalls: 0,
      status: 'running'
    });

    const steps = [
      '🚀 Initializing CrewAI execution environment...',
      '🔧 Loading agent configurations and tools...',
      '🧠 Starting agent: Research Analyst',
      '📊 Analyzing topic: "' + executionConfig.topic + '"',
      '🔍 Conducting web research and data collection...',
      '💭 Agent thinking: Processing research findings...',
      '📝 Generating preliminary analysis report...',
      '🤝 Initiating collaboration between agents...',
      '🧠 Starting agent: Content Strategist',
      '✍️ Creating structured content outline...',
      '📊 Analyzing SEO opportunities and keywords...',
      '🔄 Reviewing and refining content strategy...',
      '🧠 Starting agent: Technical Writer',
      '📝 Writing comprehensive technical documentation...',
      '🔍 Fact-checking and citation verification...',
      '✨ Applying final formatting and optimization...',
      '🎯 Quality assurance and final review...',
      '📤 Generating downloadable reports...',
      '✅ Crew execution completed successfully!'
    ];

    const outputs = [
      '\n=== RESEARCH PHASE ===\n\nInitiating comprehensive research on: "' + executionConfig.topic + '"\n\nAgent: Research Analyst\nStatus: Active\nMode: Deep Research\n\n',
      '📊 Market Analysis Results:\n• Market size: $2.4B (2024)\n• Growth rate: 18.5% YoY\n• Key players identified: 47 companies\n• Emerging trends: 12 significant patterns\n\n',
      '🔍 Data Collection Summary:\n• Sources analyzed: 156\n• Academic papers: 23\n• Industry reports: 31\n• News articles: 89\n• Expert interviews: 13\n\n',
      '\n=== ANALYSIS PHASE ===\n\nAgent: Content Strategist\nStatus: Processing research data\nMode: Strategic Analysis\n\n',
      '💡 Key Insights Discovered:\n\n1. Market Opportunity\n   - Underserved segment: Small business automation\n   - Revenue potential: $340M in next 24 months\n   - Implementation complexity: Medium\n\n',
      '2. Competitive Landscape\n   - Direct competitors: 8 major players\n   - Indirect competitors: 23 adjacent solutions\n   - Competitive advantages identified: 5 key differentiators\n\n',
      '3. Technology Trends\n   - AI adoption rate: 67% increase in target market\n   - Preferred integration methods: API-first (78%)\n   - Security requirements: Enterprise-grade encryption\n\n',
      '\n=== CONTENT CREATION PHASE ===\n\nAgent: Technical Writer\nStatus: Generating documentation\nMode: Content Production\n\n',
      '📝 Executive Summary:\n\nBased on comprehensive market research and analysis, we have identified significant opportunities in the ' + executionConfig.topic + ' sector. The following recommendations outline a strategic approach for market entry and competitive positioning.\n\n',
      '🎯 Strategic Recommendations:\n\n1. IMMEDIATE ACTIONS (0-3 months)\n   • Develop MVP with core features\n   • Establish partnerships with 3-5 key integrators\n   • Launch beta program with 50 early adopters\n\n',
      '2. SHORT-TERM GOALS (3-6 months)\n   • Scale user base to 500+ active users\n   • Implement advanced analytics dashboard\n   • Establish customer success program\n\n',
      '3. LONG-TERM VISION (6-12 months)\n   • Enterprise sales channel development\n   • International market expansion\n   • Advanced AI capabilities integration\n\n',
      '📊 Financial Projections:\n\n• Year 1 Revenue Target: $2.1M\n• Break-even Timeline: Month 8\n• Customer Acquisition Cost: $180\n• Lifetime Value: $3,200\n• Projected ROI: 340%\n\n',
      '🔍 Risk Assessment:\n\n• Technical risks: Medium (mitigated by experienced team)\n• Market risks: Low (validated demand)\n• Competitive risks: Medium (differentiated positioning)\n• Financial risks: Low (conservative projections)\n\n',
      '✨ Implementation Roadmap:\n\nPhase 1: Foundation (Months 1-2)\n□ Core platform development\n□ Security infrastructure\n□ Initial integrations\n\nPhase 2: Growth (Months 3-4)\n□ User onboarding optimization\n□ Feature expansion\n□ Customer feedback integration\n\nPhase 3: Scale (Months 5-6)\n□ Enterprise features\n□ Advanced analytics\n□ Partnership ecosystem\n\n',
      '\n=== QUALITY ASSURANCE ===\n\n✅ Research completeness: 100%\n✅ Data accuracy verified\n✅ Sources cited and validated\n✅ Strategic alignment confirmed\n✅ Financial models reviewed\n\n',
      '📋 Final Report Generated:\n\n• Executive Summary: 847 words\n• Market Analysis: 1,234 words\n• Strategic Recommendations: 692 words\n• Financial Projections: 445 words\n• Implementation Plan: 573 words\n\nTotal Report Length: 3,791 words\nConfidence Score: 94.7%\nQuality Rating: A+\n\n'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));
      
      setExecutionLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        message: steps[i],
        type: i === steps.length - 1 ? 'success' : 'info'
      }]);

      if (i < outputs.length) {
        setExecutionOutput(prev => prev + outputs[i]);
      }

      setExecutionStats(prev => ({
        ...prev,
        duration: Date.now() - prev.startTime.getTime(),
        tokensUsed: Math.floor(Math.random() * 1000) + prev.tokensUsed,
        apiCalls: prev.apiCalls + 1,
        status: i === steps.length - 1 ? 'completed' : 'running'
      }));
    }

    // Add generated file
    const newFile = {
      id: Date.now(),
      name: `${executionConfig.topic.toLowerCase().replace(/\s+/g, '-')}-analysis-${new Date().toISOString().slice(0, 10)}.md`,
      size: '12.4 KB',
      date: new Date().toLocaleString(),
      type: 'report',
      status: 'completed'
    };
    setFiles(prev => [newFile, ...prev]);

    setIsExecuting(false);
  };

  const handleAddAgent = () => {
    if (agentForm.role && agentForm.goal && agentForm.backstory) {
      setAgents([...agents, { 
        id: Date.now(), 
        ...agentForm,
        status: 'idle',
        performance: Math.floor(Math.random() * 20) + 80,
        tasksCompleted: 0
      }]);
      setAgentForm({ 
        role: '', 
        goal: '', 
        backstory: '', 
        tools: [], 
        maxIterations: 5, 
        temperature: 0.7,
        model: 'llama-3.3-70b'
      });
    }
  };

  const handleAddTask = () => {
    if (taskForm.name && taskForm.description && taskForm.expectedOutput) {
      setTasks([...tasks, { 
        id: Date.now(), 
        ...taskForm,
        status: 'pending',
        progress: 0,
        createdAt: new Date().toLocaleString()
      }]);
      setTaskForm({ 
        name: '', 
        description: '', 
        expectedOutput: '', 
        assignedAgent: '', 
        priority: 'medium',
        context: '',
        outputFormat: 'text'
      });
    }
  };

  const saveTemplate = () => {
    if (agents.length > 0 && tasks.length > 0) {
      const newTemplate = {
        id: Date.now(),
        name: `Custom Template ${templates.length + 1}`,
        description: `Template with ${agents.length} agents and ${tasks.length} tasks`,
        agents: agents.length,
        tasks: tasks.length,
        category: "Custom",
        rating: 0,
        featured: false,
        data: { agents, tasks, config: executionConfig }
      };
      setTemplates([...templates, newTemplate]);
      alert('Template saved successfully!');
    }
  };

  const loadTemplate = (template) => {
    if (template.data) {
      setAgents(template.data.agents || []);
      setTasks(template.data.tasks || []);
      setExecutionConfig(template.data.config || executionConfig);
      setActiveTab('agents');
      alert(`Template "${template.name}" loaded successfully!`);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const tabs = [
    { id: 'agents', label: 'Agents', icon: Users, count: agents.length },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, count: tasks.length },
    { id: 'templates', label: 'Templates', icon: Layers, count: templates.length },
    { id: 'execution', label: 'Execution', icon: Play },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'files', label: 'Files', icon: FileText, count: files.length }
  ];

  const availableTools = [
    'web_search', 'file_reader', 'calculator', 'code_interpreter', 
    'database_query', 'api_client', 'email_sender', 'pdf_generator'
  ];

  const models = [
    { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', speed: 'Fast', cost: 'Low' },
    { id: 'gpt-4', name: 'GPT-4', speed: 'Medium', cost: 'High' },
    { id: 'claude-3', name: 'Claude-3', speed: 'Medium', cost: 'Medium' },
    { id: 'mistral-large', name: 'Mistral Large', speed: 'Fast', cost: 'Medium' }
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'agents':
        return (
          <div className="space-y-6 animate-fadeIn">
            {/* Add New Agent Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Add New Agent</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Research Analyst"
                      value={agentForm.role}
                      onChange={(e) => setAgentForm({...agentForm, role: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model
                    </label>
                    <select
                      value={agentForm.model}
                      onChange={(e) => setAgentForm({...agentForm, model: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                    >
                      {models.map(model => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Analyze market trends and provide insights"
                    value={agentForm.goal}
                    onChange={(e) => setAgentForm({...agentForm, goal: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backstory *
                  </label>
                  <textarea
                    placeholder="Describe the agent's background, expertise, and personality..."
                    value={agentForm.backstory}
                    onChange={(e) => setAgentForm({...agentForm, backstory: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Iterations
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={agentForm.maxIterations}
                      onChange={(e) => setAgentForm({...agentForm, maxIterations: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temperature
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={agentForm.temperature}
                      onChange={(e) => setAgentForm({...agentForm, temperature: parseFloat(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tools
                    </label>
                    <select
                      multiple
                      value={agentForm.tools}
                      onChange={(e) => setAgentForm({...agentForm, tools: Array.from(e.target.selectedOptions, option => option.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                      size={3}
                    >
                      {availableTools.map(tool => (
                        <option key={tool} value={tool}>{tool.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleAddAgent}
                  className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Agent
                </button>
              </div>
            </div>

            {/* Current Agents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Current Agents ({agents.length})
                </h3>
                {agents.length > 0 && (
                  <button
                    onClick={() => setAgents([])}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {agents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No agents added yet</p>
                  <p className="text-sm">Add your first agent to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {agents.map((agent, index) => (
                    <div key={agent.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{agent.role}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              agent.status === 'active' ? 'bg-green-100 text
```


* Cerebras Model - llama-4-maverick-17b-128e-instruct
'''
import os
from cerebras.cloud.sdk import Cerebras

client = Cerebras(
    # This is the default and can be omitted
    api_key=os.environ.get("CEREBRAS_API_KEY")
)

stream = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": ""
        }
    ],
    model="llama-4-maverick-17b-128e-instruct",
    stream=True,
    max_completion_tokens=32768,
    temperature=0.6,
    top_p=0.9
)

for chunk in stream:
  print(chunk.choices[0].delta.content or "", end="")
'''

* Cerebras Model - llama-4-scout-17b-16e-instruct
'''
import os
from cerebras.cloud.sdk import Cerebras

client = Cerebras(
    # This is the default and can be omitted
    api_key=os.environ.get("CEREBRAS_API_KEY")
)

stream = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": ""
        }
    ],
    model="llama-4-scout-17b-16e-instruct",
    stream=True,
    max_completion_tokens=2048,
    temperature=0.2,
    top_p=1
)

for chunk in stream:
  print(chunk.choices[0].delta.content or "", end="")
'''

Deliver the complete full stack code implementation for the application, from start to end, with no todos and no errors and all working production ready code for all in a github repo like file format

*Cerebras API keys - csk-fnxf4wvkvrn58rhmvfctmd2vpn8vwrxxm2c8t3wnf543kxjv*

*Serper api key- d4dfd183e6323db6600c32b5e3b8af3d66f10c99*

Pre loaded and pre configured agent templates ready to use - 

1 *Daily Planner Crew – time manager, priority setter, task list generator

2 AI Code Assistant Crew – code generator, bug fixer, documentation writer

3 Job Application Crew – resume writer, cover letter generator, job matcher

4 Market Research Crew - Researcher → Analyst
- Comprehensive market analysis and competitor research*