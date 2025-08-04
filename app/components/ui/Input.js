import React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

const inputVariants = {
  variant: {
    default: 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500',
    success: 'border-green-500 dark:border-green-500 focus:border-green-500 focus:ring-green-500',
    error: 'border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500',
    warning: 'border-yellow-500 dark:border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500'
  },
  size: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  }
};

const Input = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  type = 'text',
  label,
  error,
  success,
  warning,
  hint,
  required,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  showPasswordToggle = false,
  disabled,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  
  const inputType = showPasswordToggle 
    ? (showPassword ? 'text' : 'password')
    : type;

  const currentVariant = error ? 'error' : success ? 'success' : warning ? 'warning' : variant;

  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId} 
          className={cn(
            'block text-sm font-medium mb-2 transition-colors',
            error ? 'text-red-700 dark:text-red-400' :
            success ? 'text-green-700 dark:text-green-400' :
            warning ? 'text-yellow-700 dark:text-yellow-400' :
            'text-gray-700 dark:text-gray-300'
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className={cn(
              'h-4 w-4',
              error ? 'text-red-500' :
              success ? 'text-green-500' :
              warning ? 'text-yellow-500' :
              'text-gray-400'
            )} />
          </div>
        )}

        {/* Input */}
        <input
          {...props}
          ref={ref}
          id={inputId}
          type={inputType}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            // Base styles
            'w-full rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
            'placeholder-gray-500 dark:placeholder-gray-400',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-opacity-50',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-800',
            // Variant styles
            inputVariants.variant[currentVariant],
            // Size styles
            inputVariants.size[size],
            // Icon padding
            LeftIcon && 'pl-10',
            (RightIcon || showPasswordToggle || error || success || warning) && 'pr-10',
            className
          )}
        />

        {/* Right Icons */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {/* Status Icons */}
          {error && (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
          {success && !error && (
            <Check className="h-4 w-4 text-green-500" />
          )}
          {warning && !error && !success && (
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          )}

          {/* Password Toggle */}
          {showPasswordToggle && !error && !success && !warning && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}

          {/* Custom Right Icon */}
          {RightIcon && !showPasswordToggle && !error && !success && !warning && (
            <RightIcon className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="mt-1 min-h-[1.25rem]">
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </p>
        )}
        {success && !error && (
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-1">
            <Check className="h-3 w-3" />
            <span>{success}</span>
          </p>
        )}
        {warning && !error && !success && (
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>{warning}</span>
          </p>
        )}
        {hint && !error && !success && !warning && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

// Variants pré-configurés
export const PasswordInput = ({ ...props }) => (
  <Input type="password" showPasswordToggle {...props} />
);

export const EmailInput = ({ ...props }) => (
  <Input type="email" {...props} />
);

export const NumberInput = ({ ...props }) => (
  <Input type="number" {...props} />
);

export const SearchInput = ({ ...props }) => (
  <Input type="search" {...props} />
);

export const TextArea = React.forwardRef(({
  className,
  variant = 'default',
  label,
  error,
  success,
  warning,
  hint,
  required,
  rows = 3,
  ...props
}, ref) => {
  const currentVariant = error ? 'error' : success ? 'success' : warning ? 'warning' : variant;
  const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          htmlFor={textareaId} 
          className={cn(
            'block text-sm font-medium mb-2 transition-colors',
            error ? 'text-red-700 dark:text-red-400' :
            success ? 'text-green-700 dark:text-green-400' :
            warning ? 'text-yellow-700 dark:text-yellow-400' :
            'text-gray-700 dark:text-gray-300'
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Textarea */}
      <textarea
        {...props}
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          // Base styles
          'w-full rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
          'placeholder-gray-500 dark:placeholder-gray-400',
          'transition-all duration-200 resize-vertical',
          'focus:outline-none focus:ring-2 focus:ring-opacity-50',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-800',
          'px-4 py-3',
          // Variant styles
          inputVariants.variant[currentVariant],
          className
        )}
      />

      {/* Messages */}
      <div className="mt-1 min-h-[1.25rem]">
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </p>
        )}
        {success && !error && (
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-1">
            <Check className="h-3 w-3" />
            <span>{success}</span>
          </p>
        )}
        {warning && !error && !success && (
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>{warning}</span>
          </p>
        )}
        {hint && !error && !success && !warning && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default Input;