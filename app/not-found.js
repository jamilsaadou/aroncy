import Link from 'next/link';
import { Shield, ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
            <Shield className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
            Page non trouvée
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="btn-primary flex items-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Retour à l'accueil</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Page précédente</span>
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Vous cherchez quelque chose de spécifique ?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/dashboard/formations"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
              >
                Formations
              </Link>
              <Link 
                href="/dashboard/ressources"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
              >
                Ressources
              </Link>
              <Link 
                href="/dashboard/communaute"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
              >
                Communauté
              </Link>
              <Link 
                href="/dashboard/reglementation"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
              >
                Réglementation
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full animate-pulse-slow opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full animate-pulse-slow delay-1000 opacity-50"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-full animate-pulse-slow delay-500 opacity-50"></div>
      </div>
    </div>
  );
}