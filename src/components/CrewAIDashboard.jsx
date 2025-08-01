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
      name: "Daily Planner Crew",
      description: "Time manager, priority setter, task list generator",
      agents: 3,
      tasks: 5,
      category: "Productivity",
      rating: 4.8,
      featured: true,
      data: {
        agents: [
          {
            id: 1,
            role: "Time Manager",
            goal: "Optimize daily schedule and time allocation",
            backstory: "Expert in time management with deep understanding of productivity principles",
            tools: ["calendar", "scheduler"],
            maxIterations: 5,
            temperature: 0.7,
            model: 'llama-3.3-70b',
            status: 'idle',
            performance: 95,
            tasksCompleted: 0
          },
          {
            id: 2,
            role: "Priority Setter",
            goal: "Analyze and prioritize tasks based on importance and urgency",
            backstory: "Strategic thinker specialized in task prioritization and decision making",
            tools: ["analyzer", "prioritizer"],
            maxIterations: 5,
            temperature: 0.6,
            model: 'llama-3.3-70b',
            status: 'idle',
            performance: 92,
            tasksCompleted: 0
          },
          {
            id: 3,
            role: "Task List Generator",
            goal: "Create comprehensive and actionable task lists",
            backstory: "Organizational expert with experience in task breakdown and planning",
            tools: ["task_creator", "organizer"],
            maxIterations: 5,
            temperature: 0.8,
            model: 'llama-3.3-70b',
            status: 'idle',
            performance: 88,
            tasksCompleted: 0
          }
        ],
        tasks: [
          {
            id: 1,
            name: "Analyze Daily Schedule",
            description: "Review current schedule and identify optimization opportunities",
            expectedOutput: "Detailed schedule analysis with recommendations",
            assignedAgent: "Time Manager",
            priority: "high",
            context: "Daily planning context",
            outputFormat: "text",
            status: 'pending',
            progress: 0,
            createdAt: new Date().toLocaleString()
          }
        ]
      }
    },
    {
      id: 2,
      name: "AI Code Assistant Crew",
      description: "Code generator, bug fixer, documentation writer",
      agents: 3,
      tasks: 4,
      category: "Development",
      rating: 4.9,
      featured: true,
      data: {
        agents: [
          {
            id: 1,
            role: "Code Generator",
            goal: "Generate high-quality, efficient code solutions",
            backstory: "Senior software engineer with expertise in multiple programming languages",
            tools: ["code_interpreter", "compiler"],
            maxIterations: 8,
            temperature: 0.3,
            model: 'llama-3.3-70b',
            status: 'idle',
            performance: 96,
            tasksCompleted: 0
          },
          {
            id: 2,
            role: "Bug Fixer",
            goal: "Identify and resolve code issues and bugs",
            backstory: "Debugging specialist with deep understanding of common programming pitfalls",
            tools: ["debugger", "analyzer"],
            maxIterations: 10,
            temperature: 0.2,
            model: 'llama-3.3-70b',
            status: 'idle',
            performance: 94,
            tasksCompleted: 0
          },
          {
            id: 3,
            role: "Documentation Writer",
            goal: "Create comprehensive and clear code documentation",
            backstory: "Technical writer specialized in software documentation and API references",
            tools: ["doc_generator", "formatter"],
            maxIterations: 5,
            temperature: 0.7,
            model: 'llama-3.3-70b',
            status: 'idle',
            performance: 91,
            tasksCompleted: 0
          }
        ]
      }
    },
    {
      id: 3,
      name: "Job Application Crew",
      description: "Resume writer, cover letter generator, job matcher",
      agents: 3,
      tasks: 6,
      category: "Career",
      rating: 4.7,
      featured: false,
      data: {
        agents: [
          {
            id: 1,
            role: "Resume Writer",
            goal: "Create compelling and ATS-optimized resumes",
            backstory: "HR professional with expertise in resume optimization and recruitment",
            tools: ["formatter", "ats_optimizer"],
            maxIterations: 6,
            temperature: 0.6,
            model: 'llama-3.3-70b',
            status: 'idle',
            performance: 89,
            tasksCompleted: 0
          }
        ]
      }
    },
    {
      id: 4,
      name: "Market Research Crew",
      description: "Comprehensive market analysis and competitor research",
      agents: 2,
      tasks: 4,
      category: "Research",
      rating: 4.8,
      featured: true,
      data: {
        agents: [
          {
            id: 1,
            role: "Market Researcher",
            goal: "Conduct comprehensive market research and data collection",
            backstory: "Market research analyst with expertise in industry analysis and trend identification",
            tools: ["web_search", "data_analyzer"],
            maxIterations: 10,
            temperature: 0.4,
            model: 'llama-3.3-70b',
            status: 'idle',
            performance: 93,
            tasksCompleted: 0
          },
          {
            id: 2,
            role: "Market Analyst",
            goal: "Analyze market data and provide strategic insights",
            backstory: "Strategic analyst with deep understanding of market dynamics and competitive landscapes",
            tools: ["analyzer", "report_generator"],
            maxIterations: 8,
            temperature: 0.5,
            model: 'llama-3.3-70b',
            status: 'idle',
            performance: 95,
            tasksCompleted: 0
          }
        ]
      }
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