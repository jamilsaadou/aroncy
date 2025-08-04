import React from 'react';
import { cn } from '@/lib/utils';

const cardVariants = {
  variant: {
    default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
    ghost: 'bg-gray-50/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-blue-200 dark:border-gray-700'
  },
  padding: {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full'
  }
};

const Card = React.forwardRef(({
  className,
  variant = 'default',
  padding = 'md',
  rounded = 'lg',
  hover = false,
  clickable = false,
  children,
  onClick,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        // Base styles
        'border transition-all duration-300',
        // Variant styles
        cardVariants.variant[variant],
        // Padding styles
        cardVariants.padding[padding],
        // Rounded styles
        cardVariants.rounded[rounded],
        // Interactive styles
        hover && 'hover:shadow-lg hover:-translate-y-1',
        clickable && 'cursor-pointer hover:shadow-md',
        onClick && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card Header Component
const CardHeader = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

// Card Title Component
const CardTitle = React.forwardRef(({
  className,
  children,
  as: Component = 'h3',
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

CardTitle.displayName = 'CardTitle';

// Card Description Component
const CardDescription = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-sm text-gray-600 dark:text-gray-400',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

// Card Content Component
const CardContent = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

// Card Footer Component
const CardFooter = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center p-6 pt-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

// Variants pré-configurés
export const ElevatedCard = ({ children, ...props }) => (
  <Card variant="elevated" hover {...props}>{children}</Card>
);

export const OutlinedCard = ({ children, ...props }) => (
  <Card variant="outlined" {...props}>{children}</Card>
);

export const GhostCard = ({ children, ...props }) => (
  <Card variant="ghost" {...props}>{children}</Card>
);

export const GradientCard = ({ children, ...props }) => (
  <Card variant="gradient" {...props}>{children}</Card>
);

export const ClickableCard = ({ children, onClick, ...props }) => (
  <Card clickable hover onClick={onClick} {...props}>{children}</Card>
);

// Card avec image
export const ImageCard = ({ 
  image, 
  imageAlt = '', 
  imagePosition = 'top',
  children, 
  ...props 
}) => {
  const isHorizontal = imagePosition === 'left' || imagePosition === 'right';
  
  return (
    <Card className="overflow-hidden" padding="none" {...props}>
      <div className={cn(
        isHorizontal ? 'flex' : 'flex flex-col',
        imagePosition === 'right' && 'flex-row-reverse'
      )}>
        {/* Image */}
        <div className={cn(
          'relative overflow-hidden',
          isHorizontal ? 'w-1/3' : 'w-full h-48'
        )}>
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className={cn(
          'p-6',
          isHorizontal ? 'flex-1' : 'flex-none'
        )}>
          {children}
        </div>
      </div>
    </Card>
  );
};

// Card avec statistique
export const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive',
  icon: Icon,
  color = 'blue',
  ...props 
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
    green: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    red: 'text-red-600 bg-red-100 dark:bg-red-900/20',
    yellow: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
    purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
    gray: 'text-gray-600 bg-gray-100 dark:bg-gray-700'
  };

  return (
    <Card hover {...props}>
      <div className="flex items-center space-x-4">
        {Icon && (
          <div className={cn(
            'p-3 rounded-lg',
            colorClasses[color]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p className={cn(
              'text-sm',
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            )}>
              {change}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

// Export des composants
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};

export default Card;