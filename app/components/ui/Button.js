import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = {
  variant: {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5',
    secondary: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    link: 'text-blue-600 underline-offset-4 hover:underline'
  },
  size: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
    xl: 'h-14 px-10 text-xl',
    icon: 'h-10 w-10'
  }
};

const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
        'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        // Variant styles
        buttonVariants.variant[variant],
        // Size styles
        buttonVariants.size[size],
        className
      )}
      ref={ref}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// Variants pré-configurés pour faciliter l'usage
export const PrimaryButton = ({ children, ...props }) => (
  <Button variant="primary" {...props}>{children}</Button>
);

export const SecondaryButton = ({ children, ...props }) => (
  <Button variant="secondary" {...props}>{children}</Button>
);

export const OutlineButton = ({ children, ...props }) => (
  <Button variant="outline" {...props}>{children}</Button>
);

export const GhostButton = ({ children, ...props }) => (
  <Button variant="ghost" {...props}>{children}</Button>
);

export const DestructiveButton = ({ children, ...props }) => (
  <Button variant="destructive" {...props}>{children}</Button>
);

export const SuccessButton = ({ children, ...props }) => (
  <Button variant="success" {...props}>{children}</Button>
);

export const WarningButton = ({ children, ...props }) => (
  <Button variant="warning" {...props}>{children}</Button>
);

export const LinkButton = ({ children, ...props }) => (
  <Button variant="link" {...props}>{children}</Button>
);

export const IconButton = ({ children, ...props }) => (
  <Button variant="ghost" size="icon" {...props}>{children}</Button>
);

export default Button;