import { Shield } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo animé */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl animate-pulse">
            <Shield className="h-16 w-16 text-white animate-pulse" />
          </div>
        </div>
        
        {/* Titre */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          E-ARONCY
        </h2>
        
        {/* Message de chargement */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Chargement en cours...
        </p>
        
        {/* Spinner principal */}
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        </div>
        
        {/* Barre de progression animée */}
        <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mx-auto mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" 
               style={{ width: '60%' }}></div>
        </div>
        
        {/* Points de chargement */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Message d'aide */}
        <p className="text-xs text-gray-400 mt-8">
          Renforcer la cybersécurité des ONG en Afrique de l'Ouest
        </p>
      </div>
    </div>
  );
}