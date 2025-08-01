import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Zap,
  Calendar,
  Target
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import useAppStore from '../stores/appStore';

const Analytics = () => {
  const { analytics } = useAppStore();

  const performanceData = [
    { name: 'Jan', executions: 45, success: 42, cost: 12.5 },
    { name: 'Feb', executions: 52, success: 49, cost: 15.2 },
    { name: 'Mar', executions: 48, success: 46, cost: 13.8 },
    { name: 'Apr', executions: 61, success: 58, cost: 18.4 },
    { name: 'May', executions: 55, success: 52, cost: 16.7 },
    { name: 'Jun', executions: 67, success: 63, cost: 20.1 }
  ];

  const modelUsage = [
    { name: 'Llama 3.1 8B', value: 45, color: '#3b82f6' },
    { name: 'Llama 3.1 70B', value: 30, color: '#8b5cf6' },
    { name: 'GPT-4', value: 15, color: '#10b981' },
    { name: 'Claude 3', value: 10, color: '#f59e0b' }
  ];

  const stats = [
    {
      name: 'Total Executions',
      value: analytics.totalExecutions,
      change: '+23%',
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Avg Execution Time',
      value: `${analytics.avgExecutionTime}s`,
      change: '-12%',
      icon: Clock,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Success Rate',
      value: `${analytics.successRate}%`,
      change: '+5.2%',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Total Cost',
      value: `$${analytics.totalCost}`,
      change: '+18%',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Analytics
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Detailed insights into your AI crew performance and usage patterns.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500 ml-1">{stat.change}</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Performance Trends
            </h3>
            <Calendar className="w-5 h-5 text-slate-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorExecutions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="executions" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorExecutions)" 
              />
              <Area 
                type="monotone" 
                dataKey="success" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorSuccess)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Model Usage */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Model Usage Distribution
            </h3>
            <Zap className="w-5 h-5 text-slate-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={modelUsage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {modelUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {modelUsage.map((model, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: model.color }}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {model.name}
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {model.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Cost Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Cost Analysis
          </h3>
          <DollarSign className="w-5 h-5 text-slate-400" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e2e8f0',
                borderRadius: '12px'
              }}
            />
            <Bar 
              dataKey="cost" 
              fill="url(#costGradient)" 
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Analytics;