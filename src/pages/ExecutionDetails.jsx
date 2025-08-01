import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  CheckCircle, 
  DollarSign,
  Zap,
  Terminal,
  Activity
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useAppStore from '../stores/appStore';

const ExecutionDetails = () => {
  const { id } = useParams();
  const { executions } = useAppStore();
  const execution = executions.find(e => e.id === id);

  if (!execution) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Execution not found
          </h2>
          <Link to="/executions" className="text-blue-500 hover:text-blue-600">
            Back to Executions
          </Link>
        </div>
      </div>
    );
  }

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'running': return 'text-blue-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/executions"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Execution Details
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {execution.crewName} • {new Date(execution.startedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${getStatusColor(execution.status)}`}>
          <Activity className="w-5 h-5" />
          <span className="font-medium capitalize">{execution.status}</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            name: 'Duration', 
            value: execution.duration ? formatDuration(execution.duration) : 'N/A', 
            icon: Clock, 
            color: 'from-blue-500 to-blue-600' 
          },
          { 
            name: 'Tokens Used', 
            value: execution.tokensUsed?.toLocaleString() || '0', 
            icon: Zap, 
            color: 'from-purple-500 to-purple-600' 
          },
          { 
            name: 'Cost', 
            value: `$${execution.cost || '0.00'}`, 
            icon: DollarSign, 
            color: 'from-green-500 to-green-600' 
          },
          { 
            name: 'Status', 
            value: execution.status, 
            icon: CheckCircle, 
            color: 'from-orange-500 to-orange-600' 
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {metric.name}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {metric.value}
                </p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Result */}
      {execution.result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Execution Result
            </h3>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                {execution.result}
              </pre>
            </div>
          </div>
        </motion.div>
      )}

      {/* Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Terminal className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Execution Logs
          </h3>
        </div>
        <div className="bg-slate-900 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-slate-400 text-sm">Execution Terminal</span>
            </div>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            {execution.logs?.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start space-x-3 mb-2"
              >
                <span className="text-slate-500 text-xs font-mono min-w-0 flex-shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className={`text-xs font-mono px-2 py-1 rounded ${
                  log.level === 'error' ? 'bg-red-900/30 text-red-400' :
                  log.level === 'warning' ? 'bg-yellow-900/30 text-yellow-400' :
                  log.level === 'success' ? 'bg-green-900/30 text-green-400' :
                  'bg-blue-900/30 text-blue-400'
                }`}>
                  {log.level.toUpperCase()}
                </span>
                <span className="text-slate-300 text-sm font-mono flex-1">
                  {log.message}
                </span>
              </motion.div>
            )) || (
              <div className="text-slate-500 text-center py-8">
                No logs available
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Execution Timeline
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Execution Started
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {new Date(execution.startedAt).toLocaleString()}
              </p>
            </div>
          </div>
          {execution.completedAt && (
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Execution Completed
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date(execution.completedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ExecutionDetails;