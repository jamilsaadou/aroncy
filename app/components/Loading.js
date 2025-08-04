'use client';

import { 
  Shield,
  Loader2,
  BookOpen,
  Users,
  FileText,
  Globe,
  Award,
  Settings,
  BarChart3
} from 'lucide-react';

// Spinner de base
export function Spinner({ 
  size = 'md', 
  color = 'blue',
  className = '' 
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    gray: 'text-gray-600',
    white: 'text-white'
  };

  return (
    <Loader2 
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`} 
    />
  );
}

// Loading simple avec texte
export function LoadingText({ 
  text = 'Chargement...', 
  size = 'md',
  color = 'blue' 
}) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Spinner size={size} color={color} />
      <span className={`text-${color}-600 ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}`}>
        {text}
      </span>
    </div>
  );
}

// Loading en plein écran
export function LoadingScreen({ 
  message = 'Chargement en cours...',
  submessage = '',
  showLogo = true 
}) {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        {showLogo && (
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
              <Shield className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {message}
          </h2>
          
          {submessage && (
            <p className="text-gray-600 dark:text-gray-400">
              {submessage}
            </p>
          )}
        </div>
        
        {/* Barre de progression animée */}
        <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" 
               style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
}

// Skeleton loader pour cartes
export function SkeletonCard() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton loader pour liste
export function SkeletonList({ items = 5 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 animate-pulse">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}

// Skeleton loader pour table
export function SkeletonTable({ rows = 5, columns = 4 }) {
  return (
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="flex space-x-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading pour boutons
export function ButtonLoading({ 
  children, 
  loading = false, 
  loadingText = 'Chargement...',
  disabled = false,
  className = '',
  ...props 
}) {
  return (
    <button
      disabled={loading || disabled}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <Spinner size="sm" color="white" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

// Loading overlay pour containers
export function LoadingOverlay({ 
  loading = false, 
  message = 'Chargement...',
  children,
  blur = true 
}) {
  return (
    <div className="relative">
      <div className={loading && blur ? 'blur-sm pointer-events-none' : ''}>
        {children}
      </div>
      
      {loading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-10">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-2 text-gray-600 dark:text-gray-400">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Loading avec progression
export function LoadingProgress({ 
  progress = 0, 
  message = 'Chargement...',
  showPercentage = true 
}) {
  return (
    <div className="text-center">
      <div className="mb-4">
        <Spinner size="lg" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {message}
      </h3>
      
      <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mx-auto mb-2">
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
      
      {showPercentage && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(progress)}%
        </p>
      )}
    </div>
  );
}

// Loading spécifique par section
export function DashboardLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="space-y-6">
          <SkeletonCard />
          <SkeletonList items={3} />
        </div>
      </div>
    </div>
  );
}

export function FormationsLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="card p-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Formations grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="card overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading avec points animés
export function LoadingDots({ 
  color = 'blue',
  size = 'md' 
}) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    gray: 'bg-gray-600'
  };

  return (
    <div className="flex space-x-1">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}></div>
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`} style={{ animationDelay: '0.1s' }}></div>
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
}

// Exemples d'utilisation
export function LoadingExamples() {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Exemples de composants de chargement</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Spinners */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Spinners</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Spinner size="sm" />
              <span>Small</span>
            </div>
            <div className="flex items-center space-x-4">
              <Spinner size="md" />
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-4">
              <Spinner size="lg" />
              <span>Large</span>
            </div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Loading Text</h3>
          <div className="space-y-4">
            <LoadingText text="Chargement..." />
            <LoadingText text="Sauvegarde..." color="green" />
            <LoadingText text="Suppression..." color="red" />
          </div>
        </div>
        
        {/* Loading Dots */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Loading Dots</h3>
          <div className="space-y-4">
            <LoadingDots />
            <LoadingDots color="green" size="lg" />
            <LoadingDots color="purple" size="sm" />
          </div>
        </div>
        
        {/* Progress */}
        <div className="card p-6 lg:col-span-3">
          <h3 className="font-semibold mb-4">Loading Progress</h3>
          <LoadingProgress progress={65} message="Téléchargement en cours..." />
        </div>
        
        {/* Skeleton */}
        <div className="card p-6 lg:col-span-3">
          <h3 className="font-semibold mb-4">Skeleton Loading</h3>
          <SkeletonList items={3} />
        </div>
      </div>
    </div>
  );
}