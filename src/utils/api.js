import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// CrewAI API endpoints
export const crewAPI = {
  // Crew management
  getCrews: () => api.get('/crews'),
  getCrew: (id) => api.get(`/crews/${id}`),
  createCrew: (data) => api.post('/crews', data),
  updateCrew: (id, data) => api.put(`/crews/${id}`, data),
  deleteCrew: (id) => api.delete(`/crews/${id}`),
  
  // Execution
  executeCrew: (id, params) => api.post(`/crews/${id}/execute`, params),
  getExecutionStatus: (executionId) => api.get(`/executions/${executionId}`),
  getExecutionLogs: (executionId) => api.get(`/executions/${executionId}/logs`),
  
  // Agents
  getAgents: () => api.get('/agents'),
  createAgent: (data) => api.post('/agents', data),
  updateAgent: (id, data) => api.put(`/agents/${id}`, data),
  deleteAgent: (id) => api.delete(`/agents/${id}`),
  
  // Tasks
  getTasks: () => api.get('/tasks'),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  
  // Templates
  getTemplates: () => api.get('/templates'),
  getTemplate: (id) => api.get(`/templates/${id}`),
  createTemplate: (data) => api.post('/templates', data),
  updateTemplate: (id, data) => api.put(`/templates/${id}`, data),
  deleteTemplate: (id) => api.delete(`/templates/${id}`),
};

// Cerebras API endpoints
export const cerebrasAPI = {
  // Model information
  getModels: () => api.get('/cerebras/models'),
  getModelInfo: (modelId) => api.get(`/cerebras/models/${modelId}`),
  
  // Inference
  generateText: (params) => api.post('/cerebras/generate', params),
  chatCompletion: (params) => api.post('/cerebras/chat', params),
  
  // Model status
  getModelStatus: (modelId) => api.get(`/cerebras/models/${modelId}/status`),
};

// Analytics API endpoints
export const analyticsAPI = {
  getExecutionStats: (filters) => api.get('/analytics/executions', { params: filters }),
  getPerformanceMetrics: (crewId) => api.get(`/analytics/crews/${crewId}/performance`),
  getSystemMetrics: () => api.get('/analytics/system'),
  getUsageStats: (period) => api.get('/analytics/usage', { params: { period } }),
};

// System API endpoints
export const systemAPI = {
  getSystemInfo: () => api.get('/system/info'),
  getSystemHealth: () => api.get('/system/health'),
  getSystemMetrics: () => api.get('/system/metrics'),
  updateSettings: (settings) => api.put('/system/settings', settings),
  getSettings: () => api.get('/system/settings'),
};

// WebSocket connection for real-time updates
export const createWebSocket = (executionId) => {
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';
  const ws = new WebSocket(`${wsUrl}/executions/${executionId}`);
  
  ws.onopen = () => {
    console.log('WebSocket connected');
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return ws;
};

// File upload utility
export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress?.(percentCompleted);
    },
  });
};

// Export/Import utilities
export const exportCrew = (crewId) => api.get(`/crews/${crewId}/export`);
export const importCrew = (data) => api.post('/crews/import', data);

export default api; 