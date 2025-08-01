import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Palette, 
  Monitor, 
  Database,
  Shield,
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import useUIStore from '../stores/uiStore';
import { THEMES } from '../utils/constants';

const Settings = () => {
  const { 
    preferences, 
    updatePreference, 
    resetPreferences,
    theme,
    setTheme,
    addNotification 
  } = useUIStore();

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handlePreferenceChange = (key, value) => {
    updatePreference(key, value);
    addNotification({
      type: 'success',
      title: 'Setting Updated',
      message: `${key} has been updated`,
      duration: 2000,
    });
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    addNotification({
      type: 'success',
      title: 'Theme Updated',
      message: `Switched to ${newTheme} theme`,
      duration: 2000,
    });
  };

  const handleResetPreferences = () => {
    resetPreferences();
    addNotification({
      type: 'success',
      title: 'Settings Reset',
      message: 'All settings have been reset to defaults',
      duration: 3000,
    });
  };

  const handleExportSettings = () => {
    const settingsData = {
      preferences,
      theme,
      exported_at: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(settingsData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crewai-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addNotification({
      type: 'success',
      title: 'Settings Exported',
      message: 'Settings have been exported successfully',
      duration: 3000,
    });
  };

  const handleImportSettings = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settingsData = JSON.parse(e.target.result);
        // Apply imported settings
        Object.entries(settingsData.preferences).forEach(([key, value]) => {
          updatePreference(key, value);
        });
        if (settingsData.theme) {
          setTheme(settingsData.theme);
        }
        
        addNotification({
          type: 'success',
          title: 'Settings Imported',
          message: 'Settings have been imported successfully',
          duration: 3000,
        });
      } catch (error) {
        addNotification({
          type: 'error',
          title: 'Import Failed',
          message: 'Failed to import settings. Please check the file format.',
          duration: 3000,
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your CrewAI Dashboard preferences and system settings
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleExportSettings}
            icon={<Download className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Export
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsImportModalOpen(true)}
            icon={<Upload className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Import
          </Button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(THEMES).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange(value)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        theme === value
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Compact Mode</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.compactMode}
                    onChange={(e) => handlePreferenceChange('compactMode', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-muted-foreground">
                    Use compact layout for better space utilization
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>
                Configure notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Show Notifications</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.showNotifications}
                    onChange={(e) => handlePreferenceChange('showNotifications', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-muted-foreground">
                    Display toast notifications
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Sound Enabled</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.soundEnabled}
                    onChange={(e) => handlePreferenceChange('soundEnabled', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-muted-foreground">
                    Play sounds for notifications
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Refresh Interval (seconds)</label>
                <Input
                  type="number"
                  value={preferences.refreshInterval}
                  onChange={(e) => handlePreferenceChange('refreshInterval', parseInt(e.target.value))}
                  min="5"
                  max="300"
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <span>System</span>
              </CardTitle>
              <CardDescription>
                Configure system behavior and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Auto Save</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.autoSave}
                    onChange={(e) => handlePreferenceChange('autoSave', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-muted-foreground">
                    Automatically save changes
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Auto Refresh</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.autoRefresh}
                    onChange={(e) => handlePreferenceChange('autoRefresh', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-muted-foreground">
                    Automatically refresh data
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Show Timestamps</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.showTimestamps}
                    onChange={(e) => handlePreferenceChange('showTimestamps', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-muted-foreground">
                    Display timestamps in logs
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Log Level</label>
                <select
                  value={preferences.logLevel}
                  onChange={(e) => handlePreferenceChange('logLevel', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="debug">Debug</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Log Entries</label>
                <Input
                  type="number"
                  value={preferences.maxLogEntries}
                  onChange={(e) => handlePreferenceChange('maxLogEntries', parseInt(e.target.value))}
                  min="100"
                  max="10000"
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Regional Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Regional</span>
              </CardTitle>
              <CardDescription>
                Configure language and timezone settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                  <option value="pt">Português</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>
              Manage your settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={handleResetPreferences}
                icon={<RefreshCw className="h-4 w-4" />}
              >
                Reset to Defaults
              </Button>
              <Button
                variant="outline"
                onClick={handleExportSettings}
                icon={<Download className="h-4 w-4" />}
              >
                Export Settings
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsImportModalOpen(true)}
                icon={<Upload className="h-4 w-4" />}
              >
                Import Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Import Settings Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Settings"
        description="Import settings from a JSON file"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select File</label>
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleImportSettings(file);
                  setIsImportModalOpen(false);
                }
              }}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Select a JSON file containing exported settings to import them.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Settings; 