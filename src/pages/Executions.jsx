import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  DollarSign,
  Zap,
  Eye
} from 'lucide-react';
import useAppStore from '../stores/appStore';

const Executions = () => {
  const { executions } = useAppStore();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'running': return <Play className="w-5 h-5 text-blue-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'paused': return <Pause className="w-5 h-5 text-yellow-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'running': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Executions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Monitor and manage your crew execution history and performance.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { name: 'Total Executions', value: executions.length, icon: Play, color: 'from-blue-500 to-blue-600' },
          { name: 'Success Rate', value: '94.2%', icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { name: 'Avg Duration', value: '4m 32s', icon: Clock, color: 'from-purple-500 to-purple-600' },
          { name: 'Total Cost', value: '$45.67', icon: DollarSign, color: 'from-orange-500 to-orange-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Executions List */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Recent Executions
          </h3>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {executions.map((execution, index) => (
            <motion.div
              key={execution.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(execution.status)}
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                      {execution.crewName}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Started {new Date(execution.startedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Duration
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {execution.duration ? formatDuration(execution.duration) : '-'}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Tokens
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {execution.tokensUsed?.toLocaleString() || '-'}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Cost
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      ${execution.cost || '0.00'}
                    </p>
                  </div>
                  
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
                    {execution.status}
                  </span>
                  
                  <Link
                    to={`/executions/${execution.id}`}
                    className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              {execution.result && (
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {execution.result}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {executions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Play className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No executions yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-6 max-w-md">
            Execute your first crew to see detailed execution history and analytics here.
          </p>
          <Link
            to="/crews"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>Execute a Crew</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Executions;