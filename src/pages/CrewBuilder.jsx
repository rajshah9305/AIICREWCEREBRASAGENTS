import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Users, 
  Play, 
  Edit, 
  Trash2, 
  Copy,
  Bot,
  Zap,
  Clock,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAppStore from '../stores/appStore';
import CrewModal from '../components/CrewModal';

const CrewBuilder = () => {
  const { crews, deleteCrew } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrew, setEditingCrew] = useState(null);

  const handleDelete = (crewId) => {
    if (window.confirm('Are you sure you want to delete this crew?')) {
      deleteCrew(crewId);
      toast.success('Crew deleted successfully');
    }
  };

  const handleDuplicate = (crew) => {
    // Implementation for duplicating crew
    toast.success('Crew duplicated successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Crew Builder
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Create and manage your AI agent crews for automated workflows.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Crew</span>
        </button>
      </div>

      {/* Crews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crews.map((crew, index) => (
          <motion.div
            key={crew.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {crew.name}
                  </h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crew.status)}`}>
                    {crew.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => {
                    setEditingCrew(crew);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDuplicate(crew)}
                  className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(crew.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
              {crew.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {crew.agents?.length || 0} Agents
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {crew.tasks?.length || 0} Tasks
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Link
                to={`/crews/${crew.id}`}
                className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-center text-sm font-medium"
              >
                View Details
              </Link>
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-md transition-all duration-200 flex items-center space-x-1">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Execute</span>
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3 h-3" />
                <span>Updated {new Date(crew.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                <Zap className="w-3 h-3" />
                <span>Ready</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {crews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-12"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No crews yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-6 max-w-md">
              Create your first AI crew to start automating workflows with intelligent agents.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Crew</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Crew Modal */}
      <CrewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCrew(null);
        }}
        crew={editingCrew}
      />
    </div>
  );
};

export default CrewBuilder;