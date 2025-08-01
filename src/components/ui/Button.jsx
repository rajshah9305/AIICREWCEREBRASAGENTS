import React from 'react';
import { cn } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    info: 'bg-blue-600 text-white hover:bg-blue-700',
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
    xl: 'h-14 px-10 text-xl',
    icon: 'h-10 w-10',
  };
  
  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );
  
  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };
  
  const renderIcon = () => {
    if (loading) {
      return <Loader2 className="animate-spin" />;
    }
    return icon;
  };
  
  const renderContent = () => {
    if (size === 'icon') {
      return renderIcon();
    }
    
    if (icon && iconPosition === 'left') {
      return (
        <>
          {renderIcon()}
          {children && <span className="ml-2">{children}</span>}
        </>
      );
    }
    
    if (icon && iconPosition === 'right') {
      return (
        <>
          {children && <span className="mr-2">{children}</span>}
          {renderIcon()}
        </>
      );
    }
    
    return children;
  };
  
  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 