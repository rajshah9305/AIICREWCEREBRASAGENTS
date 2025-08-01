import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { crewAPI } from '../utils/api';
import { generateId, deepClone } from '../utils/helpers';
import { DEFAULT_AGENTS, DEFAULT_TASKS } from '../utils/constants';

// Mock data for development
const mockCrews = [
  {
    id: '1',
    name: 'Research & Analysis Team',
    description: 'Multi-agent research workflow with analyst, researcher, and writer',
    status: 'active',
    agents: 3,
    tasks: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: 'Research',
    rating: 4.8,
    featured: true,
    executions: 12,
    lastExecuted: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: '2',
    name: 'Content Creation Squad',
    description: 'SEO-optimized content creation with strategist and editor',
    status: 'active',
    agents: 2,
    tasks: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: 'Marketing',
    rating: 4.6,
    featured: false,
    executions: 8,
    lastExecuted: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: '3',
    name: 'Code Review Team',
    description: 'Automated code review with security and performance analysis',
    status: 'idle',
    agents: 3,
    tasks: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: 'Development',
    rating: 4.9,
    featured: true,
    executions: 15,
    lastExecuted: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  }
];

const useCrewStore = create(
  persist(
    (set, get) => ({
      // State
      crews: mockCrews, // Start with mock data
      agents: [],
      tasks: [],
      templates: [],
      currentCrew: null,
      isLoading: false,
      error: null,
      
      // Crew management
      setCrews: (crews) => set({ crews }),
      setCurrentCrew: (crew) => set({ currentCrew: crew }),
      
      // Loading states
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      // Fetch crews
      fetchCrews: async () => {
        set({ isLoading: true, error: null });
        try {
          // Try to fetch from API, fallback to mock data
          const response = await crewAPI.getCrews();
          set({ crews: response.data, isLoading: false });
        } catch (error) {
          // If API fails, use mock data
          console.log('Using mock data for crews');
          set({ crews: mockCrews, isLoading: false });
        }
      },
      
      // Create crew
      createCrew: async (crewData) => {
        set({ isLoading: true, error: null });
        try {
          // Try to create via API
          const response = await crewAPI.createCrew(crewData);
          const newCrew = response.data;
          set((state) => ({
            crews: [...state.crews, newCrew],
            currentCrew: newCrew,
            isLoading: false,
          }));
          return newCrew;
        } catch (error) {
          // If API fails, create locally
          console.log('Creating crew locally');
          const newCrew = {
            id: generateId(),
            ...crewData,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            executions: 0,
            lastExecuted: null,
          };
          set((state) => ({
            crews: [...state.crews, newCrew],
            currentCrew: newCrew,
            isLoading: false,
          }));
          return newCrew;
        }
      },
      
      // Update crew
      updateCrew: async (crewId, updates) => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.updateCrew(crewId, updates);
          const updatedCrew = response.data;
          set((state) => ({
            crews: state.crews.map((crew) =>
              crew.id === crewId ? updatedCrew : crew
            ),
            currentCrew: state.currentCrew?.id === crewId ? updatedCrew : state.currentCrew,
            isLoading: false,
          }));
          return updatedCrew;
        } catch (error) {
          // If API fails, update locally
          console.log('Updating crew locally');
          set((state) => ({
            crews: state.crews.map((crew) =>
              crew.id === crewId 
                ? { ...crew, ...updates, updatedAt: new Date().toISOString() }
                : crew
            ),
            currentCrew: state.currentCrew?.id === crewId 
              ? { ...state.currentCrew, ...updates, updatedAt: new Date().toISOString() }
              : state.currentCrew,
            isLoading: false,
          }));
        }
      },
      
      // Delete crew
      deleteCrew: async (crewId) => {
        set({ isLoading: true, error: null });
        try {
          await crewAPI.deleteCrew(crewId);
          set((state) => ({
            crews: state.crews.filter((crew) => crew.id !== crewId),
            currentCrew: state.currentCrew?.id === crewId ? null : state.currentCrew,
            isLoading: false,
          }));
        } catch (error) {
          // If API fails, delete locally
          console.log('Deleting crew locally');
          set((state) => ({
            crews: state.crews.filter((crew) => crew.id !== crewId),
            currentCrew: state.currentCrew?.id === crewId ? null : state.currentCrew,
            isLoading: false,
          }));
        }
      },
      
      // Get crew by ID
      getCrewById: (crewId) => {
        const crew = get().crews.find((c) => c.id === crewId);
        if (crew) {
          set({ currentCrew: crew });
        }
        return crew;
      },
      
      // Agent management
      setAgents: (agents) => set({ agents }),
      
      fetchAgents: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.getAgents();
          set({ agents: response.data, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
      
      createAgent: async (agentData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.createAgent(agentData);
          const newAgent = response.data;
          set((state) => ({
            agents: [...state.agents, newAgent],
            isLoading: false,
          }));
          return newAgent;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      updateAgent: async (agentId, updates) => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.updateAgent(agentId, updates);
          const updatedAgent = response.data;
          set((state) => ({
            agents: state.agents.map((agent) =>
              agent.id === agentId ? updatedAgent : agent
            ),
            isLoading: false,
          }));
          return updatedAgent;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      deleteAgent: async (agentId) => {
        set({ isLoading: true, error: null });
        try {
          await crewAPI.deleteAgent(agentId);
          set((state) => ({
            agents: state.agents.filter((agent) => agent.id !== agentId),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      // Task management
      setTasks: (tasks) => set({ tasks }),
      
      fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.getTasks();
          set({ tasks: response.data, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
      
      createTask: async (taskData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.createTask(taskData);
          const newTask = response.data;
          set((state) => ({
            tasks: [...state.tasks, newTask],
            isLoading: false,
          }));
          return newTask;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      updateTask: async (taskId, updates) => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.updateTask(taskId, updates);
          const updatedTask = response.data;
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? updatedTask : task
            ),
            isLoading: false,
          }));
          return updatedTask;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      deleteTask: async (taskId) => {
        set({ isLoading: true, error: null });
        try {
          await crewAPI.deleteTask(taskId);
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      // Template management
      setTemplates: (templates) => set({ templates }),
      
      fetchTemplates: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.getTemplates();
          set({ templates: response.data, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
      
      createTemplate: async (templateData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.createTemplate(templateData);
          const newTemplate = response.data;
          set((state) => ({
            templates: [...state.templates, newTemplate],
            isLoading: false,
          }));
          return newTemplate;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      updateTemplate: async (templateId, updates) => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.updateTemplate(templateId, updates);
          const updatedTemplate = response.data;
          set((state) => ({
            templates: state.templates.map((template) =>
              template.id === templateId ? updatedTemplate : template
            ),
            isLoading: false,
          }));
          return updatedTemplate;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      deleteTemplate: async (templateId) => {
        set({ isLoading: true, error: null });
        try {
          await crewAPI.deleteTemplate(templateId);
          set((state) => ({
            templates: state.templates.filter((template) => template.id !== templateId),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      // Crew builder utilities
      createCrewFromTemplate: (template) => {
        const crew = {
          id: generateId(),
          name: template.name,
          description: template.description,
          agents: template.agents.map(agent => ({
            ...DEFAULT_AGENTS[agent.toUpperCase()],
            id: generateId(),
          })),
          tasks: template.tasks.map(task => ({
            ...DEFAULT_TASKS[task.toUpperCase()],
            id: generateId(),
          })),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        set((state) => ({
          crews: [...state.crews, crew],
          currentCrew: crew,
        }));
        
        return crew;
      },
      
      // Crew validation
      validateCrew: (crew) => {
        const errors = [];
        
        if (!crew.name || crew.name.trim().length === 0) {
          errors.push('Crew name is required');
        }
        
        if (!crew.agents || crew.agents.length === 0) {
          errors.push('At least one agent is required');
        }
        
        if (!crew.tasks || crew.tasks.length === 0) {
          errors.push('At least one task is required');
        }
        
        // Validate agents
        crew.agents?.forEach((agent, index) => {
          if (!agent.name || agent.name.trim().length === 0) {
            errors.push(`Agent ${index + 1} name is required`);
          }
          if (!agent.role || agent.role.trim().length === 0) {
            errors.push(`Agent ${index + 1} role is required`);
          }
          if (!agent.goal || agent.goal.trim().length === 0) {
            errors.push(`Agent ${index + 1} goal is required`);
          }
        });
        
        // Validate tasks
        crew.tasks?.forEach((task, index) => {
          if (!task.description || task.description.trim().length === 0) {
            errors.push(`Task ${index + 1} description is required`);
          }
          if (!task.expected_output || task.expected_output.trim().length === 0) {
            errors.push(`Task ${index + 1} expected output is required`);
          }
        });
        
        return errors;
      },
      
      // Export/Import
      exportCrew: async (crewId) => {
        try {
          const response = await crewAPI.exportCrew(crewId);
          return response.data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },
      
      importCrew: async (crewData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await crewAPI.importCrew(crewData);
          const importedCrew = response.data;
          set((state) => ({
            crews: [...state.crews, importedCrew],
            currentCrew: importedCrew,
            isLoading: false,
          }));
          return importedCrew;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      
      // Clear store
      clearStore: () => {
        set({
          crews: [],
          agents: [],
          tasks: [],
          templates: [],
          currentCrew: null,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'crew-store',
      partialize: (state) => ({
        crews: state.crews,
        agents: state.agents,
        tasks: state.tasks,
        templates: state.templates,
      }),
    }
  )
);

export default useCrewStore; 