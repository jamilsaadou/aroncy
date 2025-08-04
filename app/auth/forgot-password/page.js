'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Mail, 
  ArrowLeft, 
  CheckCircle,
  AlertCircle,
  Send
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('L\'adresse email est requise');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Format d\'email invalide');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler l'envoi d'email
      setIsEmailSent(true);
    } catch (error) {
      setError('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Logique de renvoi d'email
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center animate-fade-in-up">
              {/* Logo et icône de succès */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-2xl">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Email envoyé !
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>. 
                Vérifiez votre boîte de réception et suivez les instructions.
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Prochaines étapes :
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>1. Vérifiez votre boîte de réception</li>
                    <li>2. Cliquez sur le lien de réinitialisation</li>
                    <li>3. Créez un nouveau mot de passe</li>
                    <li>4. Connectez-vous avec vos nouveaux identifiants</li>
                  </ul>
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="btn-secondary"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                        <span>Envoi...</span>
                      </div>
                    ) : (
                      'Renvoyer l\'email'
                    )}
                  </button>
                  
                  <Link href="/auth/login" className="btn-primary">
                    Retour à la connexion
                  </Link>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Vous ne recevez pas d'email ? Vérifiez votre dossier spam ou{' '}
                  <Link href="/contact" className="text-blue-600 hover:text-blue-500">
                    contactez le support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Partie droite - Information */}
        <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            <div className="animate-fade-in-right">
              <h3 className="text-4xl font-bold mb-6">
                Sécurité renforcée
              </h3>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                Nous protégeons votre compte avec des mesures de sécurité avancées 
                et un processus de réinitialisation sécurisé.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <span className="text-lg">Liens de réinitialisation sécurisés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="text-lg">Notification par email</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="text-lg">Vérification d'identité</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {/* Partie gauche - Formulaire */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="animate-fade-in-down">
            {/* Logo et titre */}
            <div className="text-center">
              <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">E-ARONCY</span>
              </Link>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Mot de passe oublié ?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Entrez votre adresse email pour recevoir un lien de réinitialisation
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <form className="animate-fade-in space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Envoyer le lien</span>
                </>
              )}
            </button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour à la connexion</span>
              </Link>
            </div>
          </form>

          {/* Aide */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Besoin d'aide ?{' '}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Contactez notre support
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Partie droite - Illustration et informations */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="animate-fade-in-right">
            <h3 className="text-4xl font-bold mb-6">
              Récupération sécurisée
            </h3>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Notre processus de récupération de mot de passe est conçu pour 
              protéger votre compte tout en vous permettant de retrouver l'accès rapidement.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Shield className="h-6 w-6" />
                </div>
                <span className="text-lg">Processus de vérification sécurisé</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <span className="text-lg">Lien de réinitialisation temporaire</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <span className="text-lg">Accès restauré en quelques minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-pulse-slow delay-500"></div>
      </div>
    </div>
  );
}