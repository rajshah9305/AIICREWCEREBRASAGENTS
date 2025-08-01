import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Key, 
  Bell, 
  Shield,
  Save,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAppStore from '../stores/appStore';

const Settings = () => {
  const { theme, setTheme, settings, updateSettings } = useAppStore();

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  const settingSections = [
    {
      title: 'Appearance',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      settings: [
        {
          label: 'Theme',
          type: 'select',
          key: 'theme',
          value: theme,
          onChange: setTheme,
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' }
          ]
        }
      ]
    },
    {
      title: 'API Configuration',
      icon: Key,
      color: 'from-blue-500 to-blue-600',
      settings: [
        {
          label: 'Cerebras API Key',
          type: 'password',
          key: 'apiKey',
          value: settings.apiKey,
          onChange: (value) => updateSettings({ apiKey: value }),
          placeholder: 'Enter your Cerebras API key'
        },
        {
          label: 'Default Model',
          type: 'select',
          key: 'model',
          value: settings.model,
          onChange: (value) => updateSettings({ model: value }),
          options: [
            { value: 'llama-3.1-8b', label: 'Llama 3.1 8B' },
            { value: 'llama-3.1-70b', label: 'Llama 3.1 70B' },
            { value: 'gpt-4', label: 'GPT-4' }
          ]
        },
        {
          label: 'Max Tokens',
          type: 'number',
          key: 'maxTokens',
          value: settings.maxTokens,
          onChange: (value) => updateSettings({ maxTokens: parseInt(value) }),
          min: 100,
          max: 8000
        },
        {
          label: 'Temperature',
          type: 'range',
          key: 'temperature',
          value: settings.temperature,
          onChange: (value) => updateSettings({ temperature: parseFloat(value) }),
          min: 0,
          max: 1,
          step: 0.1
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: 'from-green-500 to-green-600',
      settings: [
        {
          label: 'Enable Notifications',
          type: 'toggle',
          key: 'notifications',
          value: settings.notifications,
          onChange: (value) => updateSettings({ notifications: value })
        }
      ]
    },
    {
      title: 'General',
      icon: SettingsIcon,
      color: 'from-orange-500 to-orange-600',
      settings: [
        {
          label: 'Auto Save',
          type: 'toggle',
          key: 'autoSave',
          value: settings.autoSave,
          onChange: (value) => updateSettings({ autoSave: value })
        }
      ]
    }
  ];

  const renderSetting = (setting) => {
    switch (setting.type) {
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => setting.onChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {setting.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'password':
        return (
          <input
            type="password"
            value={setting.value}
            onChange={(e) => setting.onChange(e.target.value)}
            placeholder={setting.placeholder}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => setting.onChange(e.target.value)}
            min={setting.min}
            max={setting.max}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        );
      
      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={setting.value}
              onChange={(e) => setting.onChange(e.target.value)}
              min={setting.min}
              max={setting.max}
              step={setting.step}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              {setting.value}
            </div>
          </div>
        );
      
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={setting.value}
              onChange={(e) => setting.onChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
          </label>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Configure your CrewAI Dashboard preferences and integrations.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center`}>
                <section.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {section.title}
              </h3>
            </div>
            
            <div className="space-y-6">
              {section.settings.map((setting, settingIndex) => (
                <motion.div
                  key={setting.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (settingIndex * 0.05) }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {setting.label}
                  </label>
                  {renderSetting(setting)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Advanced Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Advanced Configuration</h3>
            </div>
            <p className="text-slate-300">
              Fine-tune your AI crew performance and behavior settings for optimal results.
            </p>
          </div>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Advanced Settings</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;