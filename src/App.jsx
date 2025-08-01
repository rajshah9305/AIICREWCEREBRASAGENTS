import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CrewBuilder from './pages/CrewBuilder';
import Executions from './pages/Executions';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import CrewDetails from './pages/CrewDetails';
import ExecutionDetails from './pages/ExecutionDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crews" element={<CrewBuilder />} />
          <Route path="/crews/:id" element={<CrewDetails />} />
          <Route path="/executions" element={<Executions />} />
          <Route path="/executions/:id" element={<ExecutionDetails />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />
    </Router>
  );
}

export default App;