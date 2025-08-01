import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { crewAPI, createWebSocket } from '../utils/api';
import { generateId, formatDateTime } from '../utils/helpers';
import { EXECUTION_STATUS } from '../utils/constants';

// Mock data for development
const mockExecutions = [
  {
    id: '1',
    crewId: '1',
    crewName: 'Research & Analysis Team',
    status: EXECUTION_STATUS.COMPLETED,
    startedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    completedAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    duration: 1800000, // 30 minutes
    tokensUsed: 15420,
    apiCalls: 45,
    result: 'Research completed successfully',
    logs: [
      { timestamp: new Date().toISOString(), message: 'Execution started', type: 'info' },
      { timestamp: new Date().toISOString(), message: 'Research phase completed', type: 'success' },
      { timestamp: new Date().toISOString(), message: 'Analysis phase completed', type: 'success' },
      { timestamp: new Date().toISOString(), message: 'Execution completed', type: 'success' },
    ]
  },
  {
    id: '2',
    crewId: '2',
    crewName: 'Content Creation Squad',
    status: EXECUTION_STATUS.RUNNING,
    startedAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    completedAt: null,
    duration: 900000, // 15 minutes
    tokensUsed: 8230,
    apiCalls: 23,
    result: null,
    logs: [
      { timestamp: new Date().toISOString(), message: 'Execution started', type: 'info' },
      { timestamp: new Date().toISOString(), message: 'Content creation in progress', type: 'info' },
    ]
  }
];

const mockSystemMetrics = {
  cpu: 45,
  memory: 67,
  network: 23,
  disk: 34,
};

const useExecutionStore = create(
  persist(
    (set, get) => ({
      // State
      executions: mockExecutions, // Start with mock data
      currentExecution: null,
      executionLogs: [],
      systemMetrics: mockSystemMetrics,
      isLoading: false,
      error: null,
      websocket: null,
      
      // Execution management
      setExecutions: (executions) => set({ executions }),
      setCurrentExecution: (execution) => set({ currentExecution: execution }),
      setExecutionLogs: (logs) => set({ executionLogs: logs }),
      setSystemMetrics: (metrics) => set({ systemMetrics: metrics }),
      
      // Loading states
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      // Execute crew
      executeCrew: async (crewId, params = {}) => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.executeCrew(crewId, params);
          const execution = response.data;
          
          set((state) => ({
            executions: [execution, ...state.executions],
            currentExecution: execution,
            isLoading: false,
          }));
          
          // Start WebSocket connection for real-time updates
          get().startWebSocketConnection(execution.id);
          
          return execution;
        } catch (error) {
          // If API fails, create mock execution
          console.log('Creating mock execution');
          const crew = get().crews?.find(c => c.id === crewId);
          const mockExecution = {
            id: generateId(),
            crewId,
            crewName: crew?.name || 'Unknown Crew',
            status: EXECUTION_STATUS.RUNNING,
            startedAt: new Date().toISOString(),
            completedAt: null,
            duration: 0,
            tokensUsed: 0,
            apiCalls: 0,
            result: null,
            logs: [
              { timestamp: new Date().toISOString(), message: 'Mock execution started', type: 'info' },
            ]
          };
          
          set((state) => ({
            executions: [mockExecution, ...state.executions],
            currentExecution: mockExecution,
            isLoading: false,
          }));
          
          return mockExecution;
        }
      },
      
      // Get execution status
      getExecutionStatus: async (executionId) => {
        try {
          const response = await crewAPI.getExecutionStatus(executionId);
          const execution = response.data;
          
          set((state) => ({
            executions: state.executions.map((exec) =>
              exec.id === executionId ? execution : exec
            ),
            currentExecution: state.currentExecution?.id === executionId ? execution : state.currentExecution,
          }));
          
          return execution;
        } catch (error) {
          // If API fails, return mock data
          console.log('Using mock execution status');
          const execution = get().executions.find(e => e.id === executionId);
          return execution;
        }
      },
      
      // Get execution logs
      getExecutionLogs: async (executionId) => {
        try {
          const response = await crewAPI.getExecutionLogs(executionId);
          const logs = response.data;
          set({ executionLogs: logs });
          return logs;
        } catch (error) {
          // If API fails, return mock logs
          console.log('Using mock execution logs');
          const execution = get().executions.find(e => e.id === executionId);
          const mockLogs = execution?.logs || [];
          set({ executionLogs: mockLogs });
          return mockLogs;
        }
      },
      
      // WebSocket connection management
      startWebSocketConnection: (executionId) => {
        const { websocket } = get();
        if (websocket) {
          websocket.close();
        }
        
        const ws = createWebSocket(executionId);
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            get().handleWebSocketMessage(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error.message);
          }
        };
        
        ws.onclose = () => {
          console.log('WebSocket connection closed');
          set({ websocket: null });
        };
        
        set({ websocket: ws });
      },
      
      stopWebSocketConnection: () => {
        const { websocket } = get();
        if (websocket) {
          websocket.close();
          set({ websocket: null });
        }
      },
      
      // Handle WebSocket messages
      handleWebSocketMessage: (data) => {
        const { type, payload } = data;
        
        switch (type) {
          case 'execution_update':
            set((state) => ({
              executions: state.executions.map((exec) =>
                exec.id === payload.id ? { ...exec, ...payload } : exec
              ),
              currentExecution: state.currentExecution?.id === payload.id 
                ? { ...state.currentExecution, ...payload } 
                : state.currentExecution,
            }));
            break;
            
          case 'log_update':
            set((state) => ({
              executionLogs: [...state.executionLogs, {
                id: generateId(),
                timestamp: new Date().toISOString(),
                level: payload.level || 'info',
                message: payload.message,
                source: payload.source || 'system',
              }],
            }));
            break;
            
          case 'system_metrics':
            set({ systemMetrics: payload });
            break;
            
          case 'execution_complete':
            set((state) => ({
              executions: state.executions.map((exec) =>
                exec.id === payload.id 
                  ? { ...exec, status: EXECUTION_STATUS.COMPLETED, completed_at: new Date().toISOString() }
                  : exec
              ),
              currentExecution: state.currentExecution?.id === payload.id 
                ? { ...state.currentExecution, status: EXECUTION_STATUS.COMPLETED, completed_at: new Date().toISOString() }
                : state.currentExecution,
            }));
            get().stopWebSocketConnection();
            break;
            
          case 'execution_error':
            set((state) => ({
              executions: state.executions.map((exec) =>
                exec.id === payload.id 
                  ? { ...exec, status: EXECUTION_STATUS.FAILED, error: payload.error }
                  : exec
              ),
              currentExecution: state.currentExecution?.id === payload.id 
                ? { ...state.currentExecution, status: EXECUTION_STATUS.FAILED, error: payload.error }
                : state.currentExecution,
            }));
            get().stopWebSocketConnection();
            break;
            
          default:
            console.log('Unknown WebSocket message type:', encodeURIComponent(type));
        }
      },
      
      // Cancel execution
      cancelExecution: async (executionId) => {
        try {
          await crewAPI.cancelExecution(executionId);
          set((state) => ({
            executions: state.executions.map((exec) =>
              exec.id === executionId 
                ? { ...exec, status: EXECUTION_STATUS.CANCELLED, cancelled_at: new Date().toISOString() }
                : exec
            ),
            currentExecution: state.currentExecution?.id === executionId 
              ? { ...state.currentExecution, status: EXECUTION_STATUS.CANCELLED, cancelled_at: new Date().toISOString() }
              : state.currentExecution,
          }));
          get().stopWebSocketConnection();
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },
      
      // Pause/Resume execution
      pauseExecution: async (executionId) => {
        try {
          await crewAPI.pauseExecution(executionId);
          set((state) => ({
            executions: state.executions.map((exec) =>
              exec.id === executionId 
                ? { ...exec, status: EXECUTION_STATUS.PAUSED }
                : exec
            ),
            currentExecution: state.currentExecution?.id === executionId 
              ? { ...state.currentExecution, status: EXECUTION_STATUS.PAUSED }
              : state.currentExecution,
          }));
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },
      
      resumeExecution: async (executionId) => {
        try {
          await crewAPI.resumeExecution(executionId);
          set((state) => ({
            executions: state.executions.map((exec) =>
              exec.id === executionId 
                ? { ...exec, status: EXECUTION_STATUS.RUNNING }
                : exec
            ),
            currentExecution: state.currentExecution?.id === executionId 
              ? { ...state.currentExecution, status: EXECUTION_STATUS.RUNNING }
              : state.currentExecution,
          }));
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },
      
      // Get execution by ID
      getExecutionById: (executionId) => {
        const execution = get().executions.find((e) => e.id === executionId);
        if (execution) {
          set({ currentExecution: execution });
        }
        return execution;
      },
      
      // Filter executions
      getExecutionsByStatus: (status) => {
        return get().executions.filter((exec) => exec.status === status);
      },
      
      getExecutionsByCrew: (crewId) => {
        return get().executions.filter((exec) => exec.crew_id === crewId);
      },
      
      // Get execution statistics
      getExecutionStats: () => {
        const executions = get().executions;
        const total = executions.length;
        const completed = executions.filter((e) => e.status === EXECUTION_STATUS.COMPLETED).length;
        const failed = executions.filter((e) => e.status === EXECUTION_STATUS.FAILED).length;
        const running = executions.filter((e) => e.status === EXECUTION_STATUS.RUNNING).length;
        const pending = executions.filter((e) => e.status === EXECUTION_STATUS.PENDING).length;
        
        return {
          total,
          completed,
          failed,
          running,
          pending,
          successRate: total > 0 ? (completed / total) * 100 : 0,
        };
      },
      
      // Clear logs
      clearLogs: () => {
        set({ executionLogs: [] });
      },
      
      // Export execution data
      exportExecution: async (executionId) => {
        try {
          const execution = get().getExecutionById(executionId);
          const logs = await get().getExecutionLogs(executionId);
          
          const exportData = {
            execution,
            logs,
            exported_at: new Date().toISOString(),
          };
          
          const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json',
          });
          
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `execution-${executionId}-${formatDateTime(new Date())}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },
      
      // Clear store
      clearStore: () => {
        get().stopWebSocketConnection();
        set({
          executions: [],
          currentExecution: null,
          executionLogs: [],
          systemMetrics: {
            cpu: 0,
            memory: 0,
            network: 0,
            disk: 0,
          },
          isLoading: false,
          error: null,
          websocket: null,
        });
      },
    }),
    {
      name: 'execution-store',
      partialize: (state) => ({
        executions: state.executions,
        systemMetrics: state.systemMetrics,
      }),
    }
  )
);

export default useExecutionStore; 