import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Square, 
  RefreshCw, 
  Download, 
  Eye,
  Clock,
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  BarChart3,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import useExecutionStore from '../stores/executionStore';
import useUIStore from '../stores/uiStore';
import { formatDateTime, formatRelativeTime, formatDuration } from '../utils/helpers';
import { EXECUTION_STATUS } from '../utils/constants';

const Execution = () => {
  const { 
    executions, 
    currentExecution, 
    executionLogs,
    systemMetrics,
    isLoading,
    executeCrew,
    cancelExecution,
    pauseExecution,
    resumeExecution,
    getExecutionById,
    exportExecution,
    addNotification 
  } = useExecutionStore();
  
  const { 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilter 
  } = useUIStore();

  const [selectedExecution, setSelectedExecution] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);

  // Filter executions based on search and filters
  const filteredExecutions = executions.filter(execution => {
    const matchesSearch = execution.crew_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         execution.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || execution.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const handleExecuteCrew = async (crewId) => {
    try {
      await executeCrew(crewId);
      addNotification({
        type: 'success',
        title: 'Execution Started',
        message: 'Crew execution has been initiated',
        duration: 3000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Execution Failed',
        message: 'Failed to start execution',
        duration: 3000,
      });
    }
  };

  const handleCancelExecution = async (executionId) => {
    try {
      await cancelExecution(executionId);
      addNotification({
        type: 'success',
        title: 'Execution Cancelled',
        message: 'Execution has been cancelled',
        duration: 3000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Cancellation Failed',
        message: 'Failed to cancel execution',
        duration: 3000,
      });
    }
  };

  const handlePauseExecution = async (executionId) => {
    try {
      await pauseExecution(executionId);
      addNotification({
        type: 'success',
        title: 'Execution Paused',
        message: 'Execution has been paused',
        duration: 3000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Pause Failed',
        message: 'Failed to pause execution',
        duration: 3000,
      });
    }
  };

  const handleResumeExecution = async (executionId) => {
    try {
      await resumeExecution(executionId);
      addNotification({
        type: 'success',
        title: 'Execution Resumed',
        message: 'Execution has been resumed',
        duration: 3000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Resume Failed',
        message: 'Failed to resume execution',
        duration: 3000,
      });
    }
  };

  const handleViewDetails = (execution) => {
    setSelectedExecution(execution);
    setIsDetailsModalOpen(true);
  };

  const handleViewLogs = (execution) => {
    setSelectedExecution(execution);
    setIsLogsModalOpen(true);
  };

  const handleExportExecution = async (execution) => {
    try {
      await exportExecution(execution.id);
      addNotification({
        type: 'success',
        title: 'Export Successful',
        message: 'Execution data has been exported',
        duration: 3000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'Failed to export execution data',
        duration: 3000,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case EXECUTION_STATUS.COMPLETED:
        return 'text-green-600 bg-green-100';
      case EXECUTION_STATUS.RUNNING:
        return 'text-blue-600 bg-blue-100';
      case EXECUTION_STATUS.FAILED:
        return 'text-red-600 bg-red-100';
      case EXECUTION_STATUS.PENDING:
        return 'text-yellow-600 bg-yellow-100';
      case EXECUTION_STATUS.CANCELLED:
        return 'text-gray-600 bg-gray-100';
      case EXECUTION_STATUS.PAUSED:
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case EXECUTION_STATUS.COMPLETED:
        return <CheckCircle className="h-4 w-4" />;
      case EXECUTION_STATUS.RUNNING:
        return <Activity className="h-4 w-4" />;
      case EXECUTION_STATUS.FAILED:
        return <AlertCircle className="h-4 w-4" />;
      case EXECUTION_STATUS.PENDING:
        return <Clock className="h-4 w-4" />;
      case EXECUTION_STATUS.CANCELLED:
        return <XCircle className="h-4 w-4" />;
      case EXECUTION_STATUS.PAUSED:
        return <Pause className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActionButtons = (execution) => {
    const buttons = [];

    switch (execution.status) {
      case EXECUTION_STATUS.RUNNING:
        buttons.push(
          <Button
            key="pause"
            variant="outline"
            size="sm"
            onClick={() => handlePauseExecution(execution.id)}
            icon={<Pause className="h-3 w-3" />}
          >
            Pause
          </Button>,
          <Button
            key="cancel"
            variant="destructive"
            size="sm"
            onClick={() => handleCancelExecution(execution.id)}
            icon={<Square className="h-3 w-3" />}
          >
            Cancel
          </Button>
        );
        break;
      case EXECUTION_STATUS.PAUSED:
        buttons.push(
          <Button
            key="resume"
            variant="outline"
            size="sm"
            onClick={() => handleResumeExecution(execution.id)}
            icon={<Play className="h-3 w-3" />}
          >
            Resume
          </Button>,
          <Button
            key="cancel"
            variant="destructive"
            size="sm"
            onClick={() => handleCancelExecution(execution.id)}
            icon={<Square className="h-3 w-3" />}
          >
            Cancel
          </Button>
        );
        break;
      case EXECUTION_STATUS.PENDING:
        buttons.push(
          <Button
            key="cancel"
            variant="destructive"
            size="sm"
            onClick={() => handleCancelExecution(execution.id)}
            icon={<Square className="h-3 w-3" />}
          >
            Cancel
          </Button>
        );
        break;
      default:
        buttons.push(
          <Button
            key="retry"
            variant="outline"
            size="sm"
            onClick={() => handleExecuteCrew(execution.crew_id)}
            icon={<RefreshCw className="h-3 w-3" />}
          >
            Retry
          </Button>
        );
    }

    return buttons;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Executions</h1>
          <p className="text-muted-foreground">
            Monitor and manage your crew executions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              addNotification({
                type: 'info',
                title: 'Refresh',
                message: 'Refreshing execution data...',
                duration: 2000,
              });
            }}
            icon={<RefreshCw className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search executions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={filters.status}
                onChange={(e) => setFilter('status', e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="running">Running</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
                <option value="paused">Paused</option>
              </select>
              <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4" />}>
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.cpu}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${systemMetrics.cpu}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.memory}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${systemMetrics.memory}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Executions</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {executions.filter(e => e.status === EXECUTION_STATUS.RUNNING).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executions.length}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Executions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Executions</CardTitle>
          <CardDescription>
            Latest crew executions and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExecutions.length > 0 ? (
              filteredExecutions.map((execution, index) => (
                <motion.div
                  key={execution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors gap-4 sm:gap-0">
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${getStatusColor(execution.status)}`}>
                      {getStatusIcon(execution.status)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {execution.crew_name || 'Unknown Crew'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {execution.id} • {formatRelativeTime(execution.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="text-right">
                      <p className="text-sm font-medium capitalize">
                        {execution.status}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {execution.duration ? formatDuration(execution.duration) : 'N/A'}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {getActionButtons(execution)}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(execution)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewLogs(execution)}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleExportExecution(execution)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No executions found</p>
                <p className="text-sm">
                  {searchQuery || filters.status !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Execute a crew to see results here'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading executions...</p>
        </div>
      )}

      {/* Execution Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedExecution(null);
        }}
        title="Execution Details"
        description="Detailed information about the execution"
        size="lg"
      >
        {selectedExecution && (
          <ExecutionDetails execution={selectedExecution} />
        )}
      </Modal>

      {/* Execution Logs Modal */}
      <Modal
        isOpen={isLogsModalOpen}
        onClose={() => {
          setIsLogsModalOpen(false);
          setSelectedExecution(null);
        }}
        title="Execution Logs"
        description="Real-time logs from the execution"
        size="xl"
      >
        {selectedExecution && (
          <ExecutionLogs execution={selectedExecution} logs={executionLogs} />
        )}
      </Modal>
    </div>
  );
};

// Execution Details Component
const ExecutionDetails = ({ execution }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Execution ID</label>
          <p className="text-sm text-muted-foreground">{execution.id}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Status</label>
          <p className="text-sm text-muted-foreground capitalize">{execution.status}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Crew Name</label>
          <p className="text-sm text-muted-foreground">{execution.crew_name}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Created At</label>
          <p className="text-sm text-muted-foreground">
            {formatDateTime(execution.created_at)}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium">Duration</label>
          <p className="text-sm text-muted-foreground">
            {execution.duration ? formatDuration(execution.duration) : 'N/A'}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium">Completed At</label>
          <p className="text-sm text-muted-foreground">
            {execution.completed_at ? formatDateTime(execution.completed_at) : 'N/A'}
          </p>
        </div>
      </div>
      
      {execution.error && (
        <div>
          <label className="text-sm font-medium text-red-600">Error</label>
          <p className="text-sm text-red-600 mt-1">{execution.error}</p>
        </div>
      )}
    </div>
  );
};

// Execution Logs Component
const ExecutionLogs = ({ execution, logs }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm h-96 overflow-y-auto">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="mb-1">
              <span className="text-gray-500">[{formatDateTime(log.timestamp)}]</span>
              <span className={`ml-2 ${
                log.level === 'error' ? 'text-red-400' :
                log.level === 'warning' ? 'text-yellow-400' :
                log.level === 'info' ? 'text-blue-400' :
                'text-green-400'
              }`}>
                [{log.level.toUpperCase()}]
              </span>
              <span className="ml-2">{log.message}</span>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No logs available</div>
        )}
      </div>
    </div>
  );
};

export default Execution; 