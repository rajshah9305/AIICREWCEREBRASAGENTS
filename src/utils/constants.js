// Application constants
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'CrewAI Dashboard';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

// Cerebras configuration
export const CEREBRAS_API_KEY = import.meta.env.VITE_CEREBRAS_API_KEY;
export const CEREBRAS_MODEL_ID = import.meta.env.VITE_CEREBRAS_MODEL_ID;
export const CEREBRAS_BASE_URL = import.meta.env.VITE_CEREBRAS_BASE_URL || 'https://api.cerebras.ai';

// Execution statuses
export const EXECUTION_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  PAUSED: 'paused',
};

// Agent types
export const AGENT_TYPES = {
  RESEARCHER: 'researcher',
  WRITER: 'writer',
  ANALYST: 'analyst',
  COORDINATOR: 'coordinator',
  VALIDATOR: 'validator',
  CUSTOM: 'custom',
};

// Task types
export const TASK_TYPES = {
  RESEARCH: 'research',
  WRITE: 'write',
  ANALYZE: 'analyze',
  VALIDATE: 'validate',
  COORDINATE: 'coordinate',
  CUSTOM: 'custom',
};

// UI constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Chart colors
export const CHART_COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
  success: '#10B981',
  gray: '#6B7280',
};

// Performance metrics
export const METRICS = {
  EXECUTION_TIME: 'execution_time',
  MEMORY_USAGE: 'memory_usage',
  CPU_USAGE: 'cpu_usage',
  TOKEN_COUNT: 'token_count',
  SUCCESS_RATE: 'success_rate',
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'crewai_theme',
  SIDEBAR_COLLAPSED: 'crewai_sidebar_collapsed',
  RECENT_CREWS: 'crewai_recent_crews',
  USER_PREFERENCES: 'crewai_user_preferences',
  AUTH_TOKEN: 'auth_token',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'text/plain',
    'text/markdown',
    'application/json',
    'application/yaml',
    'application/yml',
  ],
};

// Code editor
export const CODE_EDITOR = {
  THEMES: ['vs-dark', 'vs-light', 'hc-black'],
  LANGUAGES: ['javascript', 'python', 'json', 'yaml', 'markdown'],
  FONT_SIZE: 14,
  TAB_SIZE: 2,
};

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Crew templates
export const CREW_TEMPLATES = {
  RESEARCH_AND_WRITE: {
    name: 'Research and Write',
    description: 'A crew for researching topics and writing content',
    agents: ['researcher', 'writer', 'validator'],
    tasks: ['research', 'write', 'validate'],
  },
  DATA_ANALYSIS: {
    name: 'Data Analysis',
    description: 'A crew for analyzing data and generating insights',
    agents: ['analyst', 'researcher', 'coordinator'],
    tasks: ['analyze', 'research', 'coordinate'],
  },
  CONTENT_CREATION: {
    name: 'Content Creation',
    description: 'A crew for creating various types of content',
    agents: ['writer', 'researcher', 'validator'],
    tasks: ['write', 'research', 'validate'],
  },
};

// Default agent configurations
export const DEFAULT_AGENTS = {
  RESEARCHER: {
    name: 'Researcher',
    role: 'Research and gather information on given topics',
    goal: 'Provide comprehensive and accurate research findings',
    backstory: 'An expert researcher with years of experience in data gathering and analysis',
    verbose: true,
    allow_delegation: false,
  },
  WRITER: {
    name: 'Writer',
    role: 'Create high-quality written content based on research',
    goal: 'Produce engaging and informative content',
    backstory: 'A skilled writer with expertise in various writing styles and formats',
    verbose: true,
    allow_delegation: false,
  },
  ANALYST: {
    name: 'Analyst',
    role: 'Analyze data and provide insights',
    goal: 'Generate actionable insights from data analysis',
    backstory: 'A data analyst with strong analytical and problem-solving skills',
    verbose: true,
    allow_delegation: false,
  },
  COORDINATOR: {
    name: 'Coordinator',
    role: 'Coordinate and manage crew activities',
    goal: 'Ensure smooth execution and optimal resource utilization',
    backstory: 'An experienced project coordinator with excellent organizational skills',
    verbose: true,
    allow_delegation: true,
  },
  VALIDATOR: {
    name: 'Validator',
    role: 'Validate and quality-check outputs',
    goal: 'Ensure high quality and accuracy of all deliverables',
    backstory: 'A quality assurance expert with attention to detail',
    verbose: true,
    allow_delegation: false,
  },
};

// Default task configurations
export const DEFAULT_TASKS = {
  RESEARCH: {
    description: 'Research the given topic thoroughly',
    expected_output: 'Comprehensive research findings with sources',
    agent: 'researcher',
  },
  WRITE: {
    description: 'Write content based on research findings',
    expected_output: 'Well-written content in the specified format',
    agent: 'writer',
  },
  ANALYZE: {
    description: 'Analyze data and provide insights',
    expected_output: 'Detailed analysis with actionable insights',
    agent: 'analyst',
  },
  VALIDATE: {
    description: 'Validate the quality and accuracy of outputs',
    expected_output: 'Validation report with recommendations',
    agent: 'validator',
  },
  COORDINATE: {
    description: 'Coordinate crew activities and manage workflow',
    expected_output: 'Coordination report and workflow status',
    agent: 'coordinator',
  },
}; 