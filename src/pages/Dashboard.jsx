import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Play, 
  BarChart3, 
  Clock, 
  TrendingUp, 
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Database,
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  XCircle,
  PauseCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useCrewStore from '../stores/crewStore';
import useExecutionStore from '../stores/executionStore';
import useUIStore from '../stores/uiStore';
import { formatDateTime, formatRelativeTime, formatNumber } from '../utils/helpers';

const Dashboard = () => {
  const { crews, isLoading: crewsLoading } = useCrewStore();
  const { executions, systemMetrics, isLoading: executionsLoading } = useExecutionStore();
  const { addNotification } = useUIStore();

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'execution',
      title: 'Research & Analysis Team',
      description: 'Execution completed successfully',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: 'completed',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'crew',
      title: 'Content Creation Squad',
      description: 'New crew created',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'created',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'execution',
      title: 'Code Review Team',
      description: 'Execution started',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'running',
      icon: Play,
      color: 'text-yellow-500'
    }
  ]);

  const handleQuickAction = (action) => {
    addNotification({
      type: 'info',
      title: 'Quick Action',
      message: `${action} will be available soon`,
      duration: 3000,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'running':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'running':
        return Play;
      case 'failed':
        return XCircle;
      case 'pending':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  // Calculate statistics
  const totalCrews = crews.length;
  const activeExecutions = executions.filter(e => e.status === 'running').length;
  const completedExecutions = executions.filter(e => e.status === 'completed').length;
  const successRate = totalCrews > 0 ? ((completedExecutions / totalCrews) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your CrewAI operations and system status
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => handleQuickAction('Create Crew')}
            icon={<Users className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Create Crew
          </Button>
          <Button
            onClick={() => handleQuickAction('Start Execution')}
            icon={<Play className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Start Execution
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Crews</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCrews}</div>
              <p className="text-xs text-muted-foreground">
                Active AI agent teams
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Executions</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeExecutions}</div>
              <p className="text-xs text-muted-foreground">
                Currently running
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successRate}%</div>
              <p className="text-xs text-muted-foreground">
                Completed successfully
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{executions.length}</div>
              <p className="text-xs text-muted-foreground">
                All time executions
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>System Metrics</span>
            </CardTitle>
            <CardDescription>
              Real-time system performance and resource usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Cpu className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">CPU Usage</p>
                  <p className="text-xs text-muted-foreground">{systemMetrics.cpu}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Memory Usage</p>
                  <p className="text-xs text-muted-foreground">{systemMetrics.memory}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Network Usage</p>
                  <p className="text-xs text-muted-foreground">{systemMetrics.network}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <HardDrive className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Disk Usage</p>
                  <p className="text-xs text-muted-foreground">{systemMetrics.disk}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>
              Latest crew executions and system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatRelativeTime(activity.timestamp)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>
              Common actions to get started quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                onClick={() => handleQuickAction('Create New Crew')}
                className="justify-start"
                icon={<Users className="h-4 w-4" />}
              >
                Create New Crew
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction('Import Crew')}
                className="justify-start"
                icon={<Database className="h-4 w-4" />}
              >
                Import Crew
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction('View Analytics')}
                className="justify-start"
                icon={<BarChart3 className="h-4 w-4" />}
              >
                View Analytics
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction('System Settings')}
                className="justify-start"
                icon={<Zap className="h-4 w-4" />}
              >
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard; 