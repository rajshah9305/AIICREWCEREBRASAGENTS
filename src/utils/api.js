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
    // Handle network errors gracefully
    if (error.code === 'ERR_NETWORK') {
      console.log('Network error - using mock data');
      return Promise.reject(new Error('Network error - using mock data'));
    }
    
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
  getCrews: () => api.get('/api/v1/crews'),
  getCrew: (id) => api.get(`/api/v1/crews/${id}`),
  createCrew: (data) => api.post('/api/v1/crews', data),
  updateCrew: (id, data) => api.put(`/api/v1/crews/${id}`, data),
  deleteCrew: (id) => api.delete(`/api/v1/crews/${id}`),
  
  // Execution
  executeCrew: (id, params) => api.post(`/api/v1/crews/${id}/execute`, params),
  getExecutionStatus: (executionId) => api.get(`/api/v1/executions/${executionId}`),
  getExecutionLogs: (executionId) => api.get(`/api/v1/executions/${executionId}/logs`),
  
  // Agents
  getAgents: () => api.get('/api/v1/agents'),
  createAgent: (data) => api.post('/api/v1/agents', data),
  updateAgent: (id, data) => api.put(`/api/v1/agents/${id}`, data),
  deleteAgent: (id) => api.delete(`/api/v1/agents/${id}`),
  
  // Tasks
  getTasks: () => api.get('/api/v1/tasks'),
  createTask: (data) => api.post('/api/v1/tasks', data),
  updateTask: (id, data) => api.put(`/api/v1/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/api/v1/tasks/${id}`),
  
  // Templates
  getTemplates: () => api.get('/api/v1/templates'),
  getTemplate: (id) => api.get(`/api/v1/templates/${id}`),
  createTemplate: (data) => api.post('/api/v1/templates', data),
  updateTemplate: (id, data) => api.put(`/api/v1/templates/${id}`, data),
  deleteTemplate: (id) => api.delete(`/api/v1/templates/${id}`),
};

// Cerebras API endpoints
export const cerebrasAPI = {
  // Model information
  getModels: () => api.get('/api/v1/cerebras/models'),
  getModelInfo: (modelId) => api.get(`/api/v1/cerebras/models/${modelId}`),
  
  // Inference
  generateText: (params) => api.post('/api/v1/cerebras/generate', params),
  chatCompletion: (params) => api.post('/api/v1/cerebras/chat', params),
  
  // Model status
  getModelStatus: (modelId) => api.get(`/api/v1/cerebras/models/${modelId}/status`),
};

// Analytics API endpoints
export const analyticsAPI = {
  getExecutionStats: (filters) => api.get('/api/v1/analytics/executions', { params: filters }),
  getPerformanceMetrics: (crewId) => api.get(`/api/v1/analytics/crews/${crewId}/performance`),
  getSystemMetrics: () => api.get('/api/v1/system/metrics'),
  getUsageStats: (period) => api.get('/api/v1/analytics/usage', { params: { period } }),
};

// System API endpoints
export const systemAPI = {
  getSystemInfo: () => api.get('/api/v1/system/info'),
  getSystemHealth: () => api.get('/api/v1/system/health'),
  getSystemMetrics: () => api.get('/api/v1/system/metrics'),
  updateSettings: (settings) => api.put('/api/v1/system/settings', settings),
  getSettings: () => api.get('/api/v1/system/settings'),
};

// WebSocket connection
export const createWebSocket = (executionId) => {
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';
  const ws = new WebSocket(wsUrl);
  
  ws.onopen = () => {
    console.log('WebSocket connected');
    ws.send(JSON.stringify({
      type: 'subscribe',
      execution_id: executionId
    }));
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('WebSocket message:', data);
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };
  
  return ws;
};

// File upload utility
export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/api/v1/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });
};

// Export/Import utilities
export const exportCrew = (crewId) => api.get(`/api/v1/crews/${crewId}/export`);
export const importCrew = (data) => api.post('/api/v1/crews/import', data);

export default api; 