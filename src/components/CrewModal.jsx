import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Bot, User, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import useAppStore from '../stores/appStore';

const CrewModal = ({ isOpen, onClose, crew }) => {
  const { addCrew, updateCrew } = useAppStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'draft',
    agents: [],
    tasks: []
  });

  useEffect(() => {
    if (crew) {
      setFormData(crew);
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'draft',
        agents: [],
        tasks: []
      });
    }
  }, [crew]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter a crew name');
      return;
    }

    const crewData = {
      ...formData,
      updatedAt: new Date().toISOString(),
      createdAt: crew?.createdAt || new Date().toISOString()
    };

    if (crew) {
      updateCrew(crew.id, crewData);
      toast.success('Crew updated successfully');
    } else {
      addCrew(crewData);
      toast.success('Crew created successfully');
    }
    onClose();
  };

  const addAgent = () => {
    setFormData(prev => ({
      ...prev,
      agents: [...prev.agents, {
        id: Date.now().toString(),
        name: '',
        role: '',
        model: 'llama-3.1-8b'
      }]
    }));
  };

  const updateAgent = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      agents: prev.agents.map((agent, i) => 
        i === index ? { ...agent, [field]: value } : agent
      )
    }));
  };

  const removeAgent = (index) => {
    setFormData(prev => ({
      ...prev,
      agents: prev.agents.filter((_, i) => i !== index)
    }));
  };

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, {
        id: Date.now().toString(),
        name: '',
        description: ''
      }]
    }));
  };

  const updateTask = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => 
        i === index ? { ...task, [field]: value } : task
      )
    }));
  };

  const removeTask = (index) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index)
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {crew ? 'Edit Crew' : 'Create New Crew'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Crew Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter crew name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Describe what this crew does"
                    rows={3}
                  />
                </div>

                {/* Agents */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                        Agents
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={addAgent}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Agent</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {formData.agents.map((agent, index) => (
                      <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            value={agent.name}
                            onChange={(e) => updateAgent(index, 'name', e.target.value)}
                            className="px-3 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Agent name"
                          />
                          <input
                            type="text"
                            value={agent.role}
                            onChange={(e) => updateAgent(index, 'role', e.target.value)}
                            className="px-3 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Agent role"
                          />
                          <div className="flex space-x-2">
                            <select
                              value={agent.model}
                              onChange={(e) => updateAgent(index, 'model', e.target.value)}
                              className="flex-1 px-3 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="llama-3.1-8b">Llama 3.1 8B</option>
                              <option value="llama-3.1-70b">Llama 3.1 70B</option>
                              <option value="gpt-4">GPT-4</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => removeAgent(index)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                        Tasks
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={addTask}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Task</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {formData.tasks.map((task, index) => (
                      <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <input
                            type="text"
                            value={task.name}
                            onChange={(e) => updateTask(index, 'name', e.target.value)}
                            className="px-3 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Task name"
                          />
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => removeTask(index)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <textarea
                          value={task.description}
                          onChange={(e) => updateTask(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Task description"
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
              >
                {crew ? 'Update Crew' : 'Create Crew'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CrewModal;