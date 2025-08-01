import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  Activity,
  Zap,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useCrewStore from '../stores/crewStore';
import useExecutionStore from '../stores/executionStore';
import useUIStore from '../stores/uiStore';
import { formatNumber, formatRelativeTime } from '../utils/helpers';
import { EXECUTION_STATUS } from '../utils/constants';

const Dashboard = () => {
  const { crews, isLoading: crewsLoading } = useCrewStore();
  const { 
    executions, 
    systemMetrics, 
    getExecutionStats,
    isLoading: executionsLoading 
  } = useExecutionStore();
  const { addNotification } = useUIStore();
  
  const [stats, setStats] = useState({
    totalCrews: 0,
    totalExecutions: 0,
    successRate: 0,
    avgExecutionTime: 0,
  });

  useEffect(() => {
    const executionStats = getExecutionStats();
    setStats({
      totalCrews: crews.length,
      totalExecutions: executionStats.total,
      successRate: executionStats.successRate,
      avgExecutionTime: 0, // Calculate from actual data
    });
  }, [crews, executions, getExecutionStats]);

  const recentExecutions = executions.slice(0, 5);
  const recentCrews = crews.slice(0, 3);

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
      case EXECUTION_STATUS.COMPLETED:
        return 'text-green-600 bg-green-100';
      case EXECUTION_STATUS.RUNNING:
        return 'text-blue-600 bg-blue-100';
      case EXECUTION_STATUS.FAILED:
        return 'text-red-600 bg-red-100';
      case EXECUTION_STATUS.PENDING:
        return 'text-yellow-600 bg-yellow-100';
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
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your CrewAI Dashboard. Monitor your crews and executions.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => handleQuickAction('Create New Crew')}
            icon={<Users className="h-4 w-4" />}
          >
            Create Crew
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickAction('View Analytics')}
            icon={<BarChart3 className="h-4 w-4" />}
          >
            Analytics
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              <div className="text-2xl font-bold">{formatNumber(stats.totalCrews)}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(Math.random() * 5) + 1} from last month
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
              <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.totalExecutions)}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(Math.random() * 10) + 5} from last week
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
              <div className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
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
              <CardTitle className="text-sm font-medium">Avg Execution Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4s</div>
              <p className="text-xs text-muted-foreground">
                -0.3s from last week
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
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
            <Activity className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Network</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.network}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full" 
                style={{ width: `${systemMetrics.network}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.disk}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${systemMetrics.disk}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Executions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Executions</CardTitle>
            <CardDescription>
              Latest crew executions and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExecutions.length > 0 ? (
                recentExecutions.map((execution, index) => (
                  <motion.div
                    key={execution.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getStatusColor(execution.status)}`}>
                        {getStatusIcon(execution.status)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {execution.crew_name || 'Unknown Crew'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(execution.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium capitalize">
                        {execution.status}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {execution.duration ? `${execution.duration}s` : 'N/A'}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No executions yet</p>
                  <p className="text-sm">Create a crew and start executing</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Crews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Crews</CardTitle>
            <CardDescription>
              Your most recently created or modified crews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCrews.length > 0 ? (
                recentCrews.map((crew, index) => (
                  <motion.div
                    key={crew.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => {
                      addNotification({
                        type: 'info',
                        title: 'Crew Selected',
                        message: `Selected crew: ${crew.name}`,
                        duration: 2000,
                      });
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{crew.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {crew.agents?.length || 0} agents, {crew.tasks?.length || 0} tasks
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No crews yet</p>
                  <p className="text-sm">Create your first crew to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common actions to get you started quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => handleQuickAction('Create New Crew')}
            >
              <Users className="h-6 w-6" />
              <span>Create Crew</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => handleQuickAction('Import Crew')}
            >
              <Calendar className="h-6 w-6" />
              <span>Import Crew</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => handleQuickAction('View Analytics')}
            >
              <BarChart3 className="h-6 w-6" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard; 