'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Mail, 
  Lock, 
  User,
  Building,
  MapPin,
  ArrowRight,
  Check,
  AlertCircle,
  Google,
  Github,
  Linkedin
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    // Étape 1 - Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Étape 2 - Informations organisation
    organizationName: '',
    organizationType: '',
    country: '',
    role: '',
    
    // Étape 3 - Préférences
    acceptTerms: false,
    acceptNewsletter: false
  });

  const organizationTypes = [
    'ONG Internationale',
    'ONG Locale',
    'Association',
    'Fondation',
    'Coopérative',
    'Entreprise Sociale',
    'Autre'
  ];

  const countries = [
    'Bénin', 'Burkina Faso', 'Cap-Vert', 'Côte d\'Ivoire', 'Gambie',
    'Ghana', 'Guinée', 'Guinée-Bissau', 'Libéria', 'Mali',
    'Mauritanie', 'Niger', 'Nigéria', 'Sénégal', 'Sierra Leone', 'Togo'
  ];

  const roles = [
    'Directeur/Directrice',
    'Responsable IT',
    'Chef de projet',
    'Formateur/Formatrice',
    'Coordinateur/Coordinatrice',
    'Administrateur système',
    'Autre'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
      if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
      if (!formData.email) {
        newErrors.email = 'L\'email est requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Format d\'email invalide';
      }
      if (!formData.password) {
        newErrors.password = 'Le mot de passe est requis';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }
    
    if (step === 2) {
      if (!formData.organizationName) newErrors.organizationName = 'Le nom de l\'organisation est requis';
      if (!formData.organizationType) newErrors.organizationType = 'Le type d\'organisation est requis';
      if (!formData.country) newErrors.country = 'Le pays est requis';
      if (!formData.role) newErrors.role = 'Le rôle est requis';
    }
    
    if (step === 3) {
      if (!formData.acceptTerms) newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsLoading(true);
    
    try {
      // Simulation d'une API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirection vers la page de confirmation
      router.push('/auth/verify-email');
    } catch (error) {
      setErrors({ submit: 'Erreur lors de la création du compte. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/verify-email');
    }, 1500);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 1) return { text: 'Très faible', color: 'bg-red-500' };
    if (strength === 2) return { text: 'Faible', color: 'bg-orange-500' };
    if (strength === 3) return { text: 'Moyen', color: 'bg-yellow-500' };
    if (strength === 4) return { text: 'Fort', color: 'bg-green-500' };
    return { text: 'Très fort', color: 'bg-green-600' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {/* Partie gauche - Formulaire */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8">
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
                Créer votre compte
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Rejoignez la communauté E-ARONCY pour renforcer votre cybersécurité
              </p>
            </div>

            {/* Progress bar */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {currentStep > step ? <Check className="h-4 w-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connexion sociale (étape 1 seulement) */}
          {currentStep === 1 && (
            <div className="animate-fade-in space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleSocialRegister('google')}
                  disabled={isLoading}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
                >
                  <Google className="h-5 w-5 text-red-500" />
                </button>
                <button
                  onClick={() => handleSocialRegister('linkedin')}
                  disabled={isLoading}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
                >
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleSocialRegister('github')}
                  disabled={isLoading}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
                >
                  <Github className="h-5 w-5 text-gray-900 dark:text-white" />
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                    ou créez votre compte
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Formulaire d'inscription */}
          <form className="animate-fade-in space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700 dark:text-red-400 text-sm">{errors.submit}</span>
              </div>
            )}

            {/* Étape 1 - Informations personnelles */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prénom
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`input-field pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="Votre prénom"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="Votre mot de passe"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthText().color}`}
                            style={{ width: `${(getPasswordStrength() / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{getPasswordStrengthText().text}</span>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`input-field pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Confirmer le mot de passe"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}

            {/* Étape 2 - Informations organisation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom de l'organisation
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="organizationName"
                      type="text"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className={`input-field pl-10 ${errors.organizationName ? 'border-red-500' : ''}`}
                      placeholder="Nom de votre organisation"
                    />
                  </div>
                  {errors.organizationName && (
                    <p className="mt-1 text-sm text-red-600">{errors.organizationName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type d'organisation
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    className={`input-field ${errors.organizationType ? 'border-red-500' : ''}`}
                  >
                    <option value="">Sélectionner le type</option>
                    {organizationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.organizationType && (
                    <p className="mt-1 text-sm text-red-600">{errors.organizationType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pays
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`input-field pl-10 ${errors.country ? 'border-red-500' : ''}`}
                    >
                      <option value="">Sélectionner le pays</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Votre rôle
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`input-field ${errors.role ? 'border-red-500' : ''}`}
                  >
                    <option value="">Sélectionner votre rôle</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                  )}
                </div>
              </div>
            )}

            {/* Étape 3 - Préférences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Récapitulatif de votre inscription
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nom :</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>Email :</strong> {formData.email}</p>
                    <p><strong>Organisation :</strong> {formData.organizationName}</p>
                    <p><strong>Type :</strong> {formData.organizationType}</p>
                    <p><strong>Pays :</strong> {formData.country}</p>
                    <p><strong>Rôle :</strong> {formData.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-gray-700 dark:text-gray-300">
                      J'accepte les{' '}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                        conditions d'utilisation
                      </Link>{' '}
                      et la{' '}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                        politique de confidentialité
                      </Link>
                    </label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-600">{errors.acceptTerms}</p>
                  )}

                  <div className="flex items-start space-x-3">
                    <input
                      id="acceptNewsletter"
                      name="acceptNewsletter"
                      type="checkbox"
                      checked={formData.acceptNewsletter}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="acceptNewsletter" className="text-sm text-gray-700 dark:text-gray-300">
                      Je souhaite recevoir les actualités et conseils en cybersécurité par email
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn-secondary flex-1"
                >
                  Précédent
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <span>Suivant</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Création...</span>
                    </>
                  ) : (
                    <>
                      <span>Créer mon compte</span>
                      <Check className="h-5 w-5" />
                    </>
                  )}
                </button>
              )}
            </div>

            {currentStep === 1 && (
              <div className="text-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Déjà un compte ?{' '}
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    Se connecter
                  </Link>
                </span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Partie droite - Informations */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="animate-fade-in-left">
            <h3 className="text-4xl font-bold mb-6">
              Rejoignez E-ARONCY
            </h3>
            <p className="text-xl mb-8 text-green-100 leading-relaxed">
              Plus de 500 organisations nous font confiance pour sécuriser leurs systèmes informatiques.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Formation certifiante</h4>
                  <p className="text-green-100">Obtenez des certifications reconnues en cybersécurité</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Communauté active</h4>
                  <p className="text-green-100">Échangez avec des experts et autres professionnels</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Support dédié</h4>
                  <p className="text-green-100">Assistance technique et accompagnement personnalisé</p>
                </div>
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