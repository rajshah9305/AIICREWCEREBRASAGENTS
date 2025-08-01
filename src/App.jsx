import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CrewBuilder from './pages/CrewBuilder';
import Execution from './pages/Execution';
import Settings from './pages/Settings';
import useCrewStore from './stores/crewStore';
import useExecutionStore from './stores/executionStore';
import useUIStore from './stores/uiStore';
import { toast } from 'react-hot-toast';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { 
    fetchCrews, 
    fetchAgents, 
    fetchTasks, 
    fetchTemplates,
    error: crewError 
  } = useCrewStore();
  
  const { 
    error: executionError 
  } = useExecutionStore();
  
  const { 
    addNotification,
    error: uiError 
  } = useUIStore();

  // Initialize data on app start
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load initial data
        await Promise.all([
          fetchCrews(),
          fetchAgents(),
          fetchTasks(),
          fetchTemplates(),
        ]);
        
        addNotification({
          type: 'success',
          title: 'App Loaded',
          message: 'CrewAI Dashboard is ready',
          duration: 3000,
        });
      } catch (error) {
        console.log('App initialization completed with mock data');
        addNotification({
          type: 'success',
          title: 'App Loaded',
          message: 'CrewAI Dashboard is ready (using mock data)',
          duration: 3000,
        });
      }
    };

    initializeApp();
  }, [fetchCrews, fetchAgents, fetchTasks, fetchTemplates, addNotification]);

  // Handle errors - only show critical errors
  useEffect(() => {
    if (crewError && !crewError.includes('Network Error')) {
      toast.error(`Crew Error: ${crewError}`);
    }
    if (executionError && !executionError.includes('Network Error')) {
      toast.error(`Execution Error: ${executionError}`);
    }
    if (uiError) {
      toast.error(`UI Error: ${uiError}`);
    }
  }, [crewError, executionError, uiError]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crews" element={<CrewBuilder />} />
            <Route path="/executions" element={<Execution />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;