import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  Play, 
  FileText, 
  Database, 
  Zap,
  ChevronRight,
  ChevronDown,
  Plus,
  FolderOpen,
  Clock,
  Activity
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import Button from '../ui/Button';
import useUIStore from '../../stores/uiStore';
import useCrewStore from '../../stores/crewStore';

const Sidebar = ({ isCollapsed = false }) => {
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    addNotification,
    recentCrews 
  } = useUIStore();
  
  const { crews, currentCrew } = useCrewStore();

  const navigationItems = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/',
      badge: null,
    },
    {
      title: 'Crews',
      icon: Users,
      href: '/crews',
      badge: crews.length,
    },
    {
      title: 'Executions',
      icon: Play,
      href: '/executions',
      badge: null,
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      href: '/analytics',
      badge: null,
    },
    {
      title: 'Templates',
      icon: FileText,
      href: '/templates',
      badge: null,
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings',
      badge: null,
    },
  ];

  const quickActions = [
    {
      title: 'Create Crew',
      icon: Plus,
      action: () => {
        addNotification({
          type: 'info',
          title: 'Create Crew',
          message: 'Crew creation will be available soon',
          duration: 3000,
        });
      },
    },
    {
      title: 'Import Crew',
      icon: FolderOpen,
      action: () => {
        addNotification({
          type: 'info',
          title: 'Import Crew',
          message: 'Import functionality will be available soon',
          duration: 3000,
        });
      },
    },
  ];

  const renderNavItem = (item, index) => {
    const Icon = item.icon;
    const isActive = window.location.pathname === item.href;

    return (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <button
          className={cn(
            'w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
          onClick={() => {
            if (item.href) {
              window.location.href = item.href;
            } else if (item.action) {
              item.action();
            }
          }}
        >
          <Icon className="h-4 w-4" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <span className="ml-auto bg-primary/20 text-primary-foreground px-2 py-1 rounded-full text-xs">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </button>
      </motion.div>
    );
  };

  const renderQuickAction = (action, index) => {
    const Icon = action.icon;

    return (
      <motion.div
        key={action.title}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: (index + navigationItems.length) * 0.1 }}
      >
        <button
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          onClick={action.action}
        >
          <Icon className="h-4 w-4" />
          {!isCollapsed && <span className="flex-1 text-left">{action.title}</span>}
        </button>
      </motion.div>
    );
  };

  const renderRecentCrews = () => {
    if (isCollapsed || recentCrews.length === 0) return null;

    return (
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between px-3 mb-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Crews
          </h3>
        </div>
        <div className="space-y-1">
          {recentCrews.slice(0, 5).map((crew, index) => (
            <motion.div
              key={crew.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <button
                className={cn(
                  'w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors',
                  currentCrew?.id === crew.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
                onClick={() => {
                  // Navigate to crew details
                  addNotification({
                    type: 'info',
                    title: 'Crew Selected',
                    message: `Selected crew: ${crew.name}`,
                    duration: 2000,
                  });
                }}
              >
                <Users className="h-3 w-3" />
                <span className="flex-1 text-left truncate">{crew.name}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.aside
      className={cn(
        'flex flex-col bg-background border-r transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <motion.h2
            className="text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Navigation
          </motion.h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {navigationItems.map(renderNavItem)}
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <motion.div
            className="pt-4 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Quick Actions
            </h3>
            <div className="space-y-1">
              {quickActions.map(renderQuickAction)}
            </div>
          </motion.div>
        )}

        {/* Recent Crews */}
        {renderRecentCrews()}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <motion.div
          className="p-4 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Activity className="h-3 w-3" />
            <span>System Online</span>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar; 