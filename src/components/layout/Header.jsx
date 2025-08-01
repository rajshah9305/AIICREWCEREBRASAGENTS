import React from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Monitor,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import Button from '../ui/Button';
import useUIStore from '../../stores/uiStore';
import { THEMES } from '../../utils/constants';

const Header = ({ onMenuClick }) => {
  const { 
    theme, 
    setTheme, 
    searchQuery, 
    setSearchQuery,
    notifications,
    clearNotifications,
    addNotification
  } = useUIStore();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    addNotification({
      type: 'success',
      title: 'Theme Updated',
      message: `Switched to ${newTheme} theme`,
      duration: 2000,
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const notificationCount = notifications.length;

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-16 items-center justify-between px-4 w-full max-w-none">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="hidden sm:inline-block font-semibold text-lg">
              CrewAI Dashboard
            </span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search crews, agents, tasks..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const themes = Object.values(THEMES);
                const currentIndex = themes.indexOf(theme);
                const nextIndex = (currentIndex + 1) % themes.length;
                handleThemeChange(themes[nextIndex]);
              }}
              className="relative"
            >
              {theme === THEMES.LIGHT && <Sun className="h-4 w-4" />}
              {theme === THEMES.DARK && <Moon className="h-4 w-4" />}
              {theme === THEMES.SYSTEM && <Monitor className="h-4 w-4" />}
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (notificationCount > 0) {
                  clearNotifications();
                  addNotification({
                    type: 'info',
                    title: 'Notifications Cleared',
                    message: 'All notifications have been cleared',
                    duration: 2000,
                  });
                }
              }}
            >
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              addNotification({
                type: 'info',
                title: 'Settings',
                message: 'Settings panel will be available soon',
                duration: 3000,
              });
            }}
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* User Menu */}
          <div className="relative group">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 px-3"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden sm:inline-block text-sm font-medium">
                Admin
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-accent flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-accent flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <hr className="my-1" />
                <button 
                  className="w-full px-4 py-2 text-left text-sm hover:bg-accent flex items-center space-x-2 text-red-600"
                  onClick={() => {
                    addNotification({
                      type: 'warning',
                      title: 'Logout',
                      message: 'Logout functionality will be implemented soon',
                      duration: 3000,
                    });
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 