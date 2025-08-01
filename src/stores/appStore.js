import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'system',
      setTheme: (theme) => {
        set({ theme });
        const root = document.documentElement;
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      },

      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Crews
      crews: [
        {
          id: '1',
          name: 'Research Team',
          description: 'AI agents specialized in research and analysis',
          status: 'active',
          agents: [
            { id: '1', name: 'Research Analyst', role: 'researcher', model: 'llama-3.1-8b' },
            { id: '2', name: 'Data Scientist', role: 'analyst', model: 'llama-3.1-8b' }
          ],
          tasks: [
            { id: '1', name: 'Market Research', description: 'Analyze market trends' },
            { id: '2', name: 'Competitor Analysis', description: 'Research competitors' }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      addCrew: (crew) => set((state) => ({ crews: [...state.crews, { ...crew, id: Date.now().toString() }] })),
      updateCrew: (id, updates) => set((state) => ({
        crews: state.crews.map(crew => crew.id === id ? { ...crew, ...updates } : crew)
      })),
      deleteCrew: (id) => set((state) => ({ crews: state.crews.filter(crew => crew.id !== id) })),

      // Executions
      executions: [
        {
          id: '1',
          crewId: '1',
          crewName: 'Research Team',
          status: 'completed',
          startedAt: new Date(Date.now() - 3600000).toISOString(),
          completedAt: new Date(Date.now() - 1800000).toISOString(),
          duration: 1800000,
          tokensUsed: 15420,
          cost: 0.23,
          result: 'Research completed successfully with comprehensive market analysis.',
          logs: [
            { timestamp: new Date().toISOString(), level: 'info', message: 'Execution started' },
            { timestamp: new Date().toISOString(), level: 'success', message: 'Research completed' }
          ]
        }
      ],
      addExecution: (execution) => set((state) => ({ 
        executions: [{ ...execution, id: Date.now().toString() }, ...state.executions] 
      })),
      updateExecution: (id, updates) => set((state) => ({
        executions: state.executions.map(exec => exec.id === id ? { ...exec, ...updates } : exec)
      })),

      // WebSocket
      wsConnected: false,
      setWsConnected: (connected) => set({ wsConnected: connected }),

      // Analytics
      analytics: {
        totalExecutions: 156,
        successRate: 94.2,
        avgExecutionTime: 245,
        totalTokensUsed: 2456789,
        totalCost: 45.67,
        executionTrends: [
          { date: '2024-01-01', executions: 12, success: 11 },
          { date: '2024-01-02', executions: 15, success: 14 },
          { date: '2024-01-03', executions: 18, success: 17 },
          { date: '2024-01-04', executions: 22, success: 21 },
          { date: '2024-01-05', executions: 25, success: 24 },
          { date: '2024-01-06', executions: 28, success: 26 },
          { date: '2024-01-07', executions: 32, success: 30 }
        ]
      },

      // Settings
      settings: {
        apiKey: '',
        model: 'llama-3.1-8b',
        maxTokens: 4000,
        temperature: 0.7,
        notifications: true,
        autoSave: true
      },
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      }))
    }),
    {
      name: 'crewai-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        crews: state.crews,
        settings: state.settings
      })
    }
  )
);

export default useAppStore;