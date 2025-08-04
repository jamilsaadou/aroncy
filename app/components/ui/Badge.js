import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const badgeVariants = {
  variant: {
    default: 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
  },
  size: {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  },
  rounded: {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
};

const Badge = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  rounded = 'md',
  removable = false,
  onRemove,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        // Base styles
        'inline-flex items-center font-medium transition-all duration-200',
        // Variant styles
        badgeVariants.variant[variant],
        // Size styles
        badgeVariants.size[size],
        // Rounded styles
        badgeVariants.rounded[rounded],
        className
      )}
      {...props}
    >
      {/* Left Icon */}
      {LeftIcon && (
        <LeftIcon className={cn(
          'mr-1',
          size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
        )} />
      )}
      
      {/* Content */}
      {children}
      
      {/* Right Icon */}
      {RightIcon && !removable && (
        <RightIcon className={cn(
          'ml-1',
          size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
        )} />
      )}
      
      {/* Remove Button */}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            'ml-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors',
            size === 'sm' ? 'p-0.5' : 'p-1'
          )}
        >
          <X className={cn(
            size === 'sm' ? 'h-2.5 w-2.5' : size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'
          )} />
        </button>
      )}
    </span>
  );
});

Badge.displayName = 'Badge';

// Variants pré-configurés
export const PrimaryBadge = ({ children, ...props }) => (
  <Badge variant="default" {...props}>{children}</Badge>
);

export const SecondaryBadge = ({ children, ...props }) => (
  <Badge variant="secondary" {...props}>{children}</Badge>
);

export const SuccessBadge = ({ children, ...props }) => (
  <Badge variant="success" {...props}>{children}</Badge>
);

export const WarningBadge = ({ children, ...props }) => (
  <Badge variant="warning" {...props}>{children}</Badge>
);

export const DangerBadge = ({ children, ...props }) => (
  <Badge variant="danger" {...props}>{children}</Badge>
);

export const InfoBadge = ({ children, ...props }) => (
  <Badge variant="info" {...props}>{children}</Badge>
);

export const OutlineBadge = ({ children, ...props }) => (
  <Badge variant="outline" {...props}>{children}</Badge>
);

export const GradientBadge = ({ children, ...props }) => (
  <Badge variant="gradient" {...props}>{children}</Badge>
);

// Badge avec notification (point rouge)
export const NotificationBadge = ({ 
  count, 
  showZero = false, 
  max = 99, 
  className,
  ...props 
}) => {
  if (!showZero && (!count || count === 0)) return null;
  
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <Badge
      variant="danger"
      size="sm"
      rounded="full"
      className={cn('min-w-[1.25rem] justify-center', className)}
      {...props}
    >
      {displayCount}
    </Badge>
  );
};

// Badge de statut
export const StatusBadge = ({ 
  status, 
  statusMap = {
    active: { variant: 'success', label: 'Actif' },
    inactive: { variant: 'secondary', label: 'Inactif' },
    pending: { variant: 'warning', label: 'En attente' },
    error: { variant: 'danger', label: 'Erreur' }
  },
  ...props 
}) => {
  const config = statusMap[status] || statusMap.inactive;
  
  return (
    <Badge variant={config.variant} {...props}>
      {config.label}
    </Badge>
  );
};

// Badge avec point de couleur
export const DotBadge = ({ 
  color = 'blue',
  children, 
  ...props 
}) => {
  const dotColors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    gray: 'bg-gray-500'
  };
  
  return (
    <Badge variant="secondary" {...props}>
      <div className={cn('w-2 h-2 rounded-full mr-2', dotColors[color])} />
      {children}
    </Badge>
  );
};

// Badge de priorité
export const PriorityBadge = ({ 
  priority,
  priorityMap = {
    low: { variant: 'success', label: 'Faible' },
    medium: { variant: 'warning', label: 'Moyenne' },
    high: { variant: 'danger', label: 'Élevée' },
    critical: { variant: 'danger', label: 'Critique' }
  },
  ...props 
}) => {
  const config = priorityMap[priority] || priorityMap.medium;
  
  return (
    <Badge variant={config.variant} {...props}>
      {config.label}
    </Badge>
  );
};

// Badge de niveau
export const LevelBadge = ({ 
  level,
  levelMap = {
    beginner: { variant: 'success', label: 'Débutant' },
    intermediate: { variant: 'warning', label: 'Intermédiaire' },
    advanced: { variant: 'danger', label: 'Avancé' },
    expert: { variant: 'gradient', label: 'Expert' }
  },
  ...props 
}) => {
  const config = levelMap[level] || levelMap.beginner;
  
  return (
    <Badge variant={config.variant} {...props}>
      {config.label}
    </Badge>
  );
};

// Container pour grouper plusieurs badges
export const BadgeGroup = ({ 
  children, 
  spacing = 'md',
  className,
  ...props 
}) => {
  const spacingClasses = {
    sm: 'space-x-1',
    md: 'space-x-2',
    lg: 'space-x-3'
  };
  
  return (
    <div 
      className={cn(
        'flex flex-wrap items-center',
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;