'use client';

import { useEffect } from 'react';
import { Shield, RefreshCw, AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log l'erreur pour le monitoring
    console.error('Erreur application:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo avec état d'erreur */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-2xl animate-pulse">
            <AlertTriangle className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* Message d'erreur */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Oups ! Une erreur s'est produite
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Nous sommes désolés, mais quelque chose s'est mal passé. 
            Notre équipe a été notifiée de ce problème.
          </p>
          
          {/* Détails de l'erreur en mode développement */}
          {process.env.NODE_ENV === 'development' && error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">
                Détails de l'erreur (mode développement) :
              </h3>
              <pre className="text-xs text-red-700 dark:text-red-400 overflow-auto">
                {error.message}
              </pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="btn-primary flex items-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Réessayer</span>
            </button>
            
            <Link 
              href="/"
              className="btn-secondary flex items-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Retour à l'accueil</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Si le problème persiste, vous pouvez :
            </p>
            
            <div className="space-y-2">
              <Link 
                href="/contact"
                className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
              >
                → Contacter le support technique
              </Link>
              <Link 
                href="/help"
                className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
              >
                → Consulter le centre d'aide
              </Link>
              <a 
                href="mailto:support@e-aroncy.org"
                className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
              >
                → Envoyer un email : support@e-aroncy.org
              </a>
            </div>
          </div>
        </div>

        {/* Code d'erreur pour le support */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400">
            Code d'erreur : {Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}