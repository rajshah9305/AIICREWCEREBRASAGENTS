import React from 'react';
import { cn } from '../../utils/helpers';

const Input = React.forwardRef(({
  className = '',
  type = 'text',
  error,
  success,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseClasses = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  
  const stateClasses = {
    error: 'border-red-500 focus-visible:ring-red-500',
    success: 'border-green-500 focus-visible:ring-green-500',
    default: '',
  };
  
  const getStateClass = () => {
    if (error) return stateClasses.error;
    if (success) return stateClasses.success;
    return stateClasses.default;
  };
  
  const classes = cn(
    baseClasses,
    getStateClass(),
    icon && iconPosition === 'left' && 'pl-10',
    icon && iconPosition === 'right' && 'pr-10',
    className
  );
  
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconClasses = cn(
      'absolute top-1/2 transform -translate-y-1/2 text-muted-foreground',
      iconPosition === 'left' ? 'left-3' : 'right-3'
    );
    
    return (
      <div className={iconClasses}>
        {icon}
      </div>
    );
  };
  
  const wrapperClasses = cn(
    'relative',
    disabled && 'opacity-50'
  );
  
  return (
    <div className={wrapperClasses}>
      {renderIcon()}
      <input
        type={type}
        className={classes}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {success && (
        <p className="mt-1 text-sm text-green-500">{success}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 