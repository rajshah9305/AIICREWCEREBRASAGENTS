import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getFromStorage, setToStorage } from '../utils/helpers';
import { THEMES, STORAGE_KEYS } from '../utils/constants';

const useUIStore = create(
  persist(
    (set, get) => ({
      // Theme state
      theme: getFromStorage(STORAGE_KEYS.THEME, THEMES.SYSTEM),
      
      // Layout state
      sidebarCollapsed: getFromStorage(STORAGE_KEYS.SIDEBAR_COLLAPSED, false),
      sidebarWidth: 280,
      
      // Modal states
      modals: {
        createCrew: false,
        editCrew: false,
        deleteCrew: false,
        createAgent: false,
        editAgent: false,
        deleteAgent: false,
        createTask: false,
        editTask: false,
        deleteTask: false,
        settings: false,
        exportCrew: false,
        importCrew: false,
        executionDetails: false,
        systemInfo: false,
      },
      
      // Notification state
      notifications: [],
      
      // Loading states
      loadingStates: {
        crews: false,
        agents: false,
        tasks: false,
        executions: false,
        system: false,
      },
      
      // Search and filter states
      searchQuery: '',
      filters: {
        status: 'all',
        dateRange: 'all',
        crewType: 'all',
      },
      
      // Pagination state
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      
      // User preferences
      preferences: getFromStorage(STORAGE_KEYS.USER_PREFERENCES, {
        autoSave: true,
        autoRefresh: true,
        refreshInterval: 30,
        showNotifications: true,
        soundEnabled: false,
        compactMode: false,
        showTimestamps: true,
        logLevel: 'info',
        maxLogEntries: 1000,
        theme: THEMES.SYSTEM,
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      
      // Recent items
      recentCrews: getFromStorage(STORAGE_KEYS.RECENT_CREWS, []),
      
      // Theme management
      setTheme: (theme) => {
        set({ theme });
        setToStorage(STORAGE_KEYS.THEME, theme);
        
        // Apply theme to document
        const root = document.documentElement;
        if (theme === THEMES.DARK) {
          root.classList.add('dark');
        } else if (theme === THEMES.LIGHT) {
          root.classList.remove('dark');
        } else {
          // System theme
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
          if (systemTheme === THEMES.DARK) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      },
      
      // Layout management
      toggleSidebar: () => {
        const { sidebarCollapsed } = get();
        const newState = !sidebarCollapsed;
        set({ sidebarCollapsed: newState });
        setToStorage(STORAGE_KEYS.SIDEBAR_COLLAPSED, newState);
      },
      
      setSidebarCollapsed: (collapsed) => {
        set({ sidebarCollapsed: collapsed });
        setToStorage(STORAGE_KEYS.SIDEBAR_COLLAPSED, collapsed);
      },
      
      setSidebarWidth: (width) => {
        set({ sidebarWidth: width });
      },
      
      // Modal management
      openModal: (modalName) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: true,
          },
        }));
      },
      
      closeModal: (modalName) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: false,
          },
        }));
      },
      
      closeAllModals: () => {
        set((state) => ({
          modals: Object.keys(state.modals).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {}),
        }));
      },
      
      // Notification management
      addNotification: (notification) => {
        const id = Date.now().toString();
        const newNotification = {
          id,
          type: 'info',
          title: '',
          message: '',
          duration: 5000,
          ...notification,
        };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));
        
        // Auto remove notification after duration
        if (newNotification.duration > 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, newNotification.duration);
        }
        
        return id;
      },
      
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      },
      
      // Loading state management
      setLoadingState: (key, isLoading) => {
        set((state) => ({
          loadingStates: {
            ...state.loadingStates,
            [key]: isLoading,
          },
        }));
      },
      
      // Search and filter management
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      setFilter: (key, value) => {
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        }));
      },
      
      clearFilters: () => {
        set({
          searchQuery: '',
          filters: {
            status: 'all',
            dateRange: 'all',
            crewType: 'all',
          },
        });
      },
      
      // Pagination management
      setPagination: (pagination) => {
        set((state) => ({
          pagination: {
            ...state.pagination,
            ...pagination,
          },
        }));
      },
      
      setPage: (page) => {
        set((state) => ({
          pagination: {
            ...state.pagination,
            page,
          },
        }));
      },
      
      setPageSize: (pageSize) => {
        set((state) => ({
          pagination: {
            ...state.pagination,
            pageSize,
            page: 1, // Reset to first page when changing page size
          },
        }));
      },
      
      // User preferences management
      updatePreference: (key, value) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          },
        }));
        setToStorage(STORAGE_KEYS.USER_PREFERENCES, {
          ...get().preferences,
          [key]: value,
        });
      },
      
      resetPreferences: () => {
        const defaultPreferences = {
          autoSave: true,
          autoRefresh: true,
          refreshInterval: 30,
          showNotifications: true,
          soundEnabled: false,
          compactMode: false,
          showTimestamps: true,
          logLevel: 'info',
          maxLogEntries: 1000,
          theme: THEMES.SYSTEM,
          language: 'en',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        set({ preferences: defaultPreferences });
        setToStorage(STORAGE_KEYS.USER_PREFERENCES, defaultPreferences);
      },
      
      // Recent items management
      addRecentCrew: (crew) => {
        const { recentCrews } = get();
        const updatedCrews = [
          crew,
          ...recentCrews.filter((c) => c.id !== crew.id),
        ].slice(0, 10); // Keep only last 10
        
        set({ recentCrews: updatedCrews });
        setToStorage(STORAGE_KEYS.RECENT_CREWS, updatedCrews);
      },
      
      removeRecentCrew: (crewId) => {
        const { recentCrews } = get();
        const updatedCrews = recentCrews.filter((c) => c.id !== crewId);
        set({ recentCrews: updatedCrews });
        setToStorage(STORAGE_KEYS.RECENT_CREWS, updatedCrews);
      },
      
      clearRecentCrews: () => {
        set({ recentCrews: [] });
        setToStorage(STORAGE_KEYS.RECENT_CREWS, []);
      },
      
      // Utility functions
      isModalOpen: (modalName) => {
        return get().modals[modalName] || false;
      },
      
      isLoading: (key) => {
        return get().loadingStates[key] || false;
      },
      
      hasActiveNotifications: () => {
        return get().notifications.length > 0;
      },
      
      // Initialize theme on app start
      initializeTheme: () => {
        const { theme } = get();
        get().setTheme(theme);
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
          if (theme === THEMES.SYSTEM) {
            get().setTheme(THEMES.SYSTEM);
          }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        
        // Return cleanup function
        return () => mediaQuery.removeEventListener('change', handleChange);
      },
      
      // Clear store
      clearStore: () => {
        set({
          theme: THEMES.SYSTEM,
          sidebarCollapsed: false,
          sidebarWidth: 280,
          modals: Object.keys(get().modals).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {}),
          notifications: [],
          loadingStates: {
            crews: false,
            agents: false,
            tasks: false,
            executions: false,
            system: false,
          },
          searchQuery: '',
          filters: {
            status: 'all',
            dateRange: 'all',
            crewType: 'all',
          },
          pagination: {
            page: 1,
            pageSize: 10,
            total: 0,
          },
          preferences: {
            autoSave: true,
            autoRefresh: true,
            refreshInterval: 30,
            showNotifications: true,
            soundEnabled: false,
            compactMode: false,
            showTimestamps: true,
            logLevel: 'info',
            maxLogEntries: 1000,
            theme: THEMES.SYSTEM,
            language: 'en',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          recentCrews: [],
        });
      },
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        preferences: state.preferences,
        recentCrews: state.recentCrews,
      }),
    }
  )
);

export default useUIStore; 