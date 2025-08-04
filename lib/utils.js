// lib/utils.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Fonction pour combiner les classes CSS conditionnellement
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Formater les dates
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('fr-FR', defaultOptions).format(new Date(date));
}

// Formater les dates relatives (il y a X temps)
export function formatRelativeDate(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) return 'À l\'instant';
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 2592000) return `Il y a ${Math.floor(diffInSeconds / 86400)} jours`;
  if (diffInSeconds < 31536000) return `Il y a ${Math.floor(diffInSeconds / 2592000)} mois`;
  return `Il y a ${Math.floor(diffInSeconds / 31536000)} ans`;
}

// Formater les nombres
export function formatNumber(number) {
  return new Intl.NumberFormat('fr-FR').format(number);
}

// Formater les pourcentages
export function formatPercent(number, decimals = 0) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number / 100);
}

// Formater la durée
export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${remainingMinutes}min`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}min`;
}

// Générer un ID unique
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Valider un email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Générer une couleur à partir d'un string
export function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

// Copier dans le presse-papier
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback pour les navigateurs plus anciens
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch (err) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

// Télécharger un fichier
export function downloadFile(data, filename, type = 'text/plain') {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// Formater la taille des fichiers
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Slugifier un texte
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Capitaliser la première lettre
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Tronquer un texte
export function truncate(text, length = 100) {
  if (text.length <= length) return text;
  return text.substr(0, length) + '...';
}

// Mélanger un tableau
export function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Grouper un tableau par clé
export function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
}

// Supprimer les doublons d'un tableau
export function unique(array, key) {
  if (!key) return [...new Set(array)];
  
  const seen = new Set();
  return array.filter(item => {
    const keyValue = item[key];
    if (seen.has(keyValue)) return false;
    seen.add(keyValue);
    return true;
  });
}

// Constantes utiles
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const COUNTRIES_WEST_AFRICA = [
  'Bénin', 'Burkina Faso', 'Cap-Vert', 'Côte d\'Ivoire', 'Gambie',
  'Ghana', 'Guinée', 'Guinée-Bissau', 'Libéria', 'Mali',
  'Mauritanie', 'Niger', 'Nigéria', 'Sénégal', 'Sierra Leone', 'Togo'
];

export const ORGANIZATION_TYPES = [
  'ONG Internationale',
  'ONG Locale',
  'Association',
  'Fondation',
  'Coopérative',
  'Entreprise Sociale',
  'Autre'
];

// ============================================
// contexts/AppContext.js

'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// Actions types
const APP_ACTIONS = {
  SET_USER: 'SET_USER',
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_SIDEBAR_OPEN: 'SET_SIDEBAR_OPEN',
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  UPDATE_USER_PROGRESS: 'UPDATE_USER_PROGRESS',
  SET_ONLINE_STATUS: 'SET_ONLINE_STATUS'
};

// État initial
const initialState = {
  user: null,
  isAuthenticated: false,
  theme: 'system', // 'light', 'dark', 'system'
  language: 'fr',
  loading: false,
  notifications: [],
  sidebarOpen: false,
  modalOpen: null,
  userProgress: {
    formations: 0,
    certificates: 0,
    resources: 0
  },
  isOnline: true
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case APP_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };

    case APP_ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };

    case APP_ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };

    case APP_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case APP_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: generateId(),
          ...action.payload,
          timestamp: new Date()
        }]
      };

    case APP_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };

    case APP_ACTIONS.SET_SIDEBAR_OPEN:
      return {
        ...state,
        sidebarOpen: action.payload
      };

    case APP_ACTIONS.SET_MODAL_OPEN:
      return {
        ...state,
        modalOpen: action.payload
      };

    case APP_ACTIONS.UPDATE_USER_PROGRESS:
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          ...action.payload
        }
      };

    case APP_ACTIONS.SET_ONLINE_STATUS:
      return {
        ...state,
        isOnline: action.payload
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    setUser: (user) => dispatch({ type: APP_ACTIONS.SET_USER, payload: user }),
    
    setTheme: (theme) => {
      dispatch({ type: APP_ACTIONS.SET_THEME, payload: theme });
      
      // Appliquer le thème
      if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Sauvegarder dans localStorage
      localStorage.setItem('theme', theme);
    },
    
    setLanguage: (language) => {
      dispatch({ type: APP_ACTIONS.SET_LANGUAGE, payload: language });
      localStorage.setItem('language', language);
    },
    
    setLoading: (loading) => dispatch({ type: APP_ACTIONS.SET_LOADING, payload: loading }),
    
    addNotification: (notification) => {
      dispatch({ type: APP_ACTIONS.ADD_NOTIFICATION, payload: notification });
      
      // Auto-supprimer après 5 secondes si pas spécifié autrement
      if (notification.autoRemove !== false) {
        setTimeout(() => {
          actions.removeNotification(notification.id);
        }, notification.duration || 5000);
      }
    },
    
    removeNotification: (id) => dispatch({ type: APP_ACTIONS.REMOVE_NOTIFICATION, payload: id }),
    
    setSidebarOpen: (open) => dispatch({ type: APP_ACTIONS.SET_SIDEBAR_OPEN, payload: open }),
    
    setModalOpen: (modal) => dispatch({ type: APP_ACTIONS.SET_MODAL_OPEN, payload: modal }),
    
    updateUserProgress: (progress) => dispatch({ type: APP_ACTIONS.UPDATE_USER_PROGRESS, payload: progress }),
    
    setOnlineStatus: (status) => dispatch({ type: APP_ACTIONS.SET_ONLINE_STATUS, payload: status }),

    // Actions composées
    login: async (credentials) => {
      actions.setLoading(true);
      try {
        // Simulation d'appel API
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        
        if (response.ok) {
          const user = await response.json();
          actions.setUser(user);
          actions.addNotification({
            type: 'success',
            title: 'Connexion réussie',
            message: `Bienvenue ${user.name} !`
          });
          return { success: true };
        } else {
          throw new Error('Identifiants invalides');
        }
      } catch (error) {
        actions.addNotification({
          type: 'error',
          title: 'Erreur de connexion',
          message: error.message
        });
        return { success: false, error: error.message };
      } finally {
        actions.setLoading(false);
      }
    },

    logout: () => {
      actions.setUser(null);
      actions.addNotification({
        type: 'info',
        title: 'Déconnexion',
        message: 'Vous avez été déconnecté avec succès'
      });
      // Nettoyer le localStorage si nécessaire
      localStorage.removeItem('authToken');
    },

    updateProfile: async (profileData) => {
      actions.setLoading(true);
      try {
        // Simulation d'appel API
        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });
        
        if (response.ok) {
          const updatedUser = await response.json();
          actions.setUser(updatedUser);
          actions.addNotification({
            type: 'success',
            title: 'Profil mis à jour',
            message: 'Vos informations ont été sauvegardées'
          });
          return { success: true };
        }
      } catch (error) {
        actions.addNotification({
          type: 'error',
          title: 'Erreur',
          message: 'Impossible de mettre à jour le profil'
        });
        return { success: false, error: error.message };
      } finally {
        actions.setLoading(false);
      }
    }
  };

  // Effets pour l'initialisation
  useEffect(() => {
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('theme') || 'system';
    actions.setTheme(savedTheme);

    // Charger la langue sauvegardée
    const savedLanguage = localStorage.getItem('language') || 'fr';
    actions.setLanguage(savedLanguage);

    // Écouter les changements de thème système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      if (state.theme === 'system') {
        actions.setTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  // Écouter le status online/offline
  useEffect(() => {
    const handleOnline = () => actions.setOnlineStatus(true);
    const handleOffline = () => actions.setOnlineStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook pour utiliser le context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Hooks spécialisés
export function useAuth() {
  const { state, actions } = useApp();
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login: actions.login,
    logout: actions.logout,
    updateProfile: actions.updateProfile
  };
}

export function useTheme() {
  const { state, actions } = useApp();
  return {
    theme: state.theme,
    setTheme: actions.setTheme
  };
}

export function useNotifications() {
  const { state, actions } = useApp();
  return {
    notifications: state.notifications,
    addNotification: actions.addNotification,
    removeNotification: actions.removeNotification
  };
}

export function useUI() {
  const { state, actions } = useApp();
  return {
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: actions.setSidebarOpen,
    modalOpen: state.modalOpen,
    setModalOpen: actions.setModalOpen,
    loading: state.loading,
    setLoading: actions.setLoading
  };
}

// Composant de notification
export function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border-l-4 ${
            notification.type === 'success' ? 'border-green-500' :
            notification.type === 'error' ? 'border-red-500' :
            notification.type === 'warning' ? 'border-yellow-500' :
            'border-blue-500'
          } animate-fade-in-up`}
        >
          <div className="flex items-start">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}