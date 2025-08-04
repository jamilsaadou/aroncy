'use client';

import { useState, useEffect } from 'react';
import { 
  User,
  Settings,
  Shield,
  Bell,
  Globe,
  Eye,
  EyeOff,
  Camera,
  Save,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Lock,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Key,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Download,
  Upload,
  Database,
  Zap,
  CreditCard,
  LogOut,
  UserX,
  FileText,
  ToggleLeft,
  ToggleRight,
  Palette,
  Languages,
  Clock,
  Volume2,
  VolumeX
} from 'lucide-react';

// Composant Section Header
const SectionHeader = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 mb-6">
    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        {description}
      </p>
    </div>
  </div>
);

// Composant Toggle Switch
const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
  <button
    onClick={() => !disabled && onChange(!enabled)}
    disabled={disabled}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled 
        ? 'bg-blue-600' 
        : 'bg-gray-200 dark:bg-gray-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// Composant Setting Item
const SettingItem = ({ icon: Icon, title, description, children, danger = false }) => (
  <div className="flex items-start justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <div className="flex items-start space-x-3 flex-1">
      <Icon className={`h-5 w-5 mt-0.5 ${danger ? 'text-red-500' : 'text-gray-500'}`} />
      <div className="flex-1">
        <h3 className={`font-medium ${danger ? 'text-red-900 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-sm mt-1 ${danger ? 'text-red-600 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}>
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="ml-4">
      {children}
    </div>
  </div>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(false);

  // États des paramètres
  const [profileData, setProfileData] = useState({
    firstName: 'Marie',
    lastName: 'Kouadio',
    email: 'marie.kouadio@ong-espoir.org',
    phone: '+225 07 12 34 56 78',
    organization: 'ONG Espoir',
    position: 'Directrice IT',
    country: 'Côte d\'Ivoire',
    city: 'Abidjan',
    bio: 'Spécialiste en cybersécurité avec 8 ans d\'expérience dans le secteur des ONG.'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: 30,
    trustedDevices: [
      { id: 1, name: 'MacBook Pro', lastUsed: '2024-03-15', current: true },
      { id: 2, name: 'iPhone 12', lastUsed: '2024-03-14', current: false },
      { id: 3, name: 'Chrome Windows', lastUsed: '2024-03-10', current: false }
    ]
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      newCourses: true,
      communityUpdates: true,
      securityAlerts: true,
      weeklyDigest: false,
      marketingEmails: false
    },
    pushNotifications: {
      inAppNotifications: true,
      browserNotifications: false,
      mobileNotifications: true
    },
    frequency: 'daily'
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'system',
    language: 'fr',
    timezone: 'Africa/Abidjan',
    dateFormat: 'DD/MM/YYYY',
    soundEffects: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showActivity: true,
    shareProgress: false,
    dataCollection: true,
    thirdPartySharing: false
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'privacy', label: 'Confidentialité', icon: Eye },
    { id: 'account', label: 'Compte', icon: Settings }
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUnsavedChanges(false);
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setUnsavedChanges(true);
    
    switch (section) {
      case 'profile':
        setProfileData(prev => ({ ...prev, [field]: value }));
        break;
      case 'security':
        setSecuritySettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotificationSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'appearance':
        setAppearanceSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'privacy':
        setPrivacySettings(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  const handleNestedChange = (section, category, field, value) => {
    setUnsavedChanges(true);
    
    switch (section) {
      case 'notifications':
        setNotificationSettings(prev => ({
          ...prev,
          [category]: { ...prev[category], [field]: value }
        }));
        break;
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      <SectionHeader 
        icon={User}
        title="Informations personnelles"
        description="Gérez vos informations de profil et vos préférences personnelles"
      />

      <div className="card p-6">
        {/* Photo de profil */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white shadow-lg rounded-full p-2 border border-gray-200">
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Photo de profil</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Cliquez pour changer votre photo de profil
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary text-sm px-3 py-1">
                Changer
              </button>
              <button className="text-red-600 hover:text-red-700 text-sm px-3 py-1">
                Supprimer
              </button>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prénom
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Organisation
            </label>
            <input
              type="text"
              value={profileData.organization}
              onChange={(e) => handleInputChange('profile', 'organization', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Poste
            </label>
            <input
              type="text"
              value={profileData.position}
              onChange={(e) => handleInputChange('profile', 'position', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pays
            </label>
            <select
              value={profileData.country}
              onChange={(e) => handleInputChange('profile', 'country', e.target.value)}
              className="input-field"
            >
              <option value="Côte d'Ivoire">Côte d'Ivoire</option>
              <option value="Sénégal">Sénégal</option>
              <option value="Ghana">Ghana</option>
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ville
            </label>
            <input
              type="text"
              value={profileData.city}
              onChange={(e) => handleInputChange('profile', 'city', e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Biographie
          </label>
          <textarea
            rows={4}
            value={profileData.bio}
            onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
            className="input-field"
            placeholder="Parlez-nous de vous et de votre expérience..."
          />
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      <SectionHeader 
        icon={Shield}
        title="Sécurité du compte"
        description="Protégez votre compte avec des mesures de sécurité avancées"
      />

      {/* Changement de mot de passe */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Changer le mot de passe
        </h3>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input-field pr-10"
                placeholder="Votre mot de passe actuel"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="input-field pr-10"
                placeholder="Nouveau mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input-field pr-10"
                placeholder="Confirmer le nouveau mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button className="btn-primary">
            Changer le mot de passe
          </button>
        </div>
      </div>

      {/* Authentification à deux facteurs */}
      <div className="card p-6">
        <div className="space-y-4">
          <SettingItem
            icon={Key}
            title="Authentification à deux facteurs (2FA)"
            description="Ajoutez une couche de sécurité supplémentaire à votre compte"
          >
            <div className="flex items-center space-x-3">
              <ToggleSwitch
                enabled={securitySettings.twoFactorEnabled}
                onChange={(value) => handleInputChange('security', 'twoFactorEnabled', value)}
              />
              {securitySettings.twoFactorEnabled && (
                <button className="btn-secondary text-sm px-3 py-1">
                  Configurer
                </button>
              )}
            </div>
          </SettingItem>

          <SettingItem
            icon={Bell}
            title="Notifications de connexion"
            description="Recevez des alertes lors de nouvelles connexions à votre compte"
          >
            <ToggleSwitch
              enabled={securitySettings.loginNotifications}
              onChange={(value) => handleInputChange('security', 'loginNotifications', value)}
            />
          </SettingItem>

          <SettingItem
            icon={Clock}
            title="Délai d'expiration de session"
            description="Durée avant déconnexion automatique en cas d'inactivité"
          >
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="input-field py-2 px-3 w-32"
            >
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={60}>1 heure</option>
              <option value={120}>2 heures</option>
            </select>
          </SettingItem>
        </div>
      </div>

      {/* Appareils de confiance */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Appareils de confiance
        </h3>
        
        <div className="space-y-4">
          {securitySettings.trustedDevices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>{device.name}</span>
                    {device.current && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Actuel
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dernière utilisation: {device.lastUsed}
                  </p>
                </div>
              </div>
              {!device.current && (
                <button className="text-red-600 hover:text-red-700 text-sm">
                  Supprimer
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      <SectionHeader 
        icon={Bell}
        title="Préférences de notification"
        description="Contrôlez quand et comment vous souhaitez être notifié"
      />

      {/* Notifications email */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Notifications par email
        </h3>
        
        <div className="space-y-4">
          <SettingItem
            icon={BookOpen}
            title="Nouvelles formations"
            description="Soyez informé des nouvelles formations disponibles"
          >
            <ToggleSwitch
              enabled={notificationSettings.emailNotifications.newCourses}
              onChange={(value) => handleNestedChange('notifications', 'emailNotifications', 'newCourses', value)}
            />
          </SettingItem>

          <SettingItem
            icon={Users}
            title="Mises à jour de la communauté"
            description="Nouvelles discussions, réponses à vos messages"
          >
            <ToggleSwitch
              enabled={notificationSettings.emailNotifications.communityUpdates}
              onChange={(value) => handleNestedChange('notifications', 'emailNotifications', 'communityUpdates', value)}
            />
          </SettingItem>

          <SettingItem
            icon={Shield}
            title="Alertes de sécurité"
            description="Notifications importantes concernant la sécurité"
          >
            <ToggleSwitch
              enabled={notificationSettings.emailNotifications.securityAlerts}
              onChange={(value) => handleNestedChange('notifications', 'emailNotifications', 'securityAlerts', value)}
            />
          </SettingItem>

          <SettingItem
            icon={FileText}
            title="Résumé hebdomadaire"
            description="Résumé de vos activités et progrès chaque semaine"
          >
            <ToggleSwitch
              enabled={notificationSettings.emailNotifications.weeklyDigest}
              onChange={(value) => handleNestedChange('notifications', 'emailNotifications', 'weeklyDigest', value)}
            />
          </SettingItem>

          <SettingItem
            icon={Mail}
            title="Emails marketing"
            description="Offres spéciales, nouveautés et conseils"
          >
            <ToggleSwitch
              enabled={notificationSettings.emailNotifications.marketingEmails}
              onChange={(value) => handleNestedChange('notifications', 'emailNotifications', 'marketingEmails', value)}
            />
          </SettingItem>
        </div>
      </div>

      {/* Notifications push */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Notifications push
        </h3>
        
        <div className="space-y-4">
          <SettingItem
            icon={Monitor}
            title="Notifications dans l'application"
            description="Notifications affichées dans l'interface de l'application"
          >
            <ToggleSwitch
              enabled={notificationSettings.pushNotifications.inAppNotifications}
              onChange={(value) => handleNestedChange('notifications', 'pushNotifications', 'inAppNotifications', value)}
            />
          </SettingItem>

          <SettingItem
            icon={Globe}
            title="Notifications navigateur"
            description="Notifications du navigateur web même quand l'application est fermée"
          >
            <ToggleSwitch
              enabled={notificationSettings.pushNotifications.browserNotifications}
              onChange={(value) => handleNestedChange('notifications', 'pushNotifications', 'browserNotifications', value)}
            />
          </SettingItem>

          <SettingItem
            icon={Smartphone}
            title="Notifications mobiles"
            description="Notifications sur votre appareil mobile"
          >
            <ToggleSwitch
              enabled={notificationSettings.pushNotifications.mobileNotifications}
              onChange={(value) => handleNestedChange('notifications', 'pushNotifications', 'mobileNotifications', value)}
            />
          </SettingItem>
        </div>
      </div>

      {/* Fréquence */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Fréquence des notifications
        </h3>
        
        <div className="space-y-3">
          {[
            { value: 'realtime', label: 'Temps réel', description: 'Recevez les notifications immédiatement' },
            { value: 'daily', label: 'Quotidien', description: 'Un résumé quotidien des notifications' },
            { value: 'weekly', label: 'Hebdomadaire', description: 'Un résumé hebdomadaire' }
          ].map((option) => (
            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="frequency"
                value={option.value}
                checked={notificationSettings.frequency === option.value}
                onChange={(e) => handleInputChange('notifications', 'frequency', e.target.value)}
                className="mt-1 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-8">
      <SectionHeader 
        icon={Palette}
        title="Apparence et langue"
        description="Personnalisez l'interface selon vos préférences"
      />

      <div className="card p-6">
        <div className="space-y-6">
          <SettingItem
            icon={Moon}
            title="Thème"
            description="Choisissez entre le mode clair, sombre ou automatique"
          >
            <select
              value={appearanceSettings.theme}
              onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
              className="input-field py-2 px-3 w-40"
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="system">Automatique</option>
            </select>
          </SettingItem>

          <SettingItem
            icon={Languages}
            title="Langue"
            description="Langue d'affichage de l'interface"
          >
            <select
              value={appearanceSettings.language}
              onChange={(e) => handleInputChange('appearance', 'language', e.target.value)}
              className="input-field py-2 px-3 w-40"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </SettingItem>

          <SettingItem
            icon={Globe}
            title="Fuseau horaire"
            description="Fuseau horaire pour l'affichage des dates et heures"
          >
            <select
              value={appearanceSettings.timezone}
              onChange={(e) => handleInputChange('appearance', 'timezone', e.target.value)}
              className="input-field py-2 px-3"
            >
              <option value="Africa/Abidjan">GMT (Abidjan)</option>
              <option value="Africa/Dakar">GMT (Dakar)</option>
              <option value="Africa/Accra">GMT (Accra)</option>
              <option value="Africa/Lagos">WAT (Lagos)</option>
            </select>
          </SettingItem>

          <SettingItem
            icon={Calendar}
            title="Format de date"
            description="Format d'affichage des dates"
          >
            <select
              value={appearanceSettings.dateFormat}
              onChange={(e) => handleInputChange('appearance', 'dateFormat', e.target.value)}
              className="input-field py-2 px-3 w-40"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </SettingItem>

          <SettingItem
            icon={Volume2}
            title="Effets sonores"
            description="Sons de notification et de feedback"
          >
            <ToggleSwitch
              enabled={appearanceSettings.soundEffects}
              onChange={(value) => handleInputChange('appearance', 'soundEffects', value)}
            />
          </SettingItem>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-8">
      <SectionHeader 
        icon={Eye}
        title="Confidentialité et données"
        description="Contrôlez vos données personnelles et votre visibilité"
      />

      <div className="card p-6">
        <div className="space-y-4">
          <SettingItem
            icon={User}
            title="Visibilité du profil"
            description="Qui peut voir votre profil public"
          >
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
              className="input-field py-2 px-3 w-40"
            >
              <option value="public">Public</option>
              <option value="community">Communauté seulement</option>
              <option value="private">Privé</option>
            </select>
          </SettingItem>

          <SettingItem
            icon={Zap}
            title="Afficher l'activité"
            description="Permettre aux autres de voir votre activité récente"
          >
            <ToggleSwitch
              enabled={privacySettings.showActivity}
              onChange={(value) => handleInputChange('privacy', 'showActivity', value)}
            />
          </SettingItem>

          <SettingItem
            icon={Award}
            title="Partager les progrès"
            description="Partager automatiquement vos certificats et accomplissements"
          >
            <ToggleSwitch
              enabled={privacySettings.shareProgress}
              onChange={(value) => handleInputChange('privacy', 'shareProgress', value)}
            />
          </SettingItem>

          <SettingItem
            icon={Database}
            title="Collection de données"
            description="Autoriser la collecte de données d'usage pour améliorer l'expérience"
          >
            <ToggleSwitch
              enabled={privacySettings.dataCollection}
              onChange={(value) => handleInputChange('privacy', 'dataCollection', value)}
            />
          </SettingItem>

          <SettingItem
            icon={Building}
            title="Partage avec des tiers"
            description="Partager des données anonymisées avec des partenaires"
          >
            <ToggleSwitch
              enabled={privacySettings.thirdPartySharing}
              onChange={(value) => handleInputChange('privacy', 'thirdPartySharing', value)}
            />
          </SettingItem>
        </div>
      </div>

      {/* Gestion des données */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Gestion des données
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Exporter mes données</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Téléchargez une copie de toutes vos données
                </p>
              </div>
            </div>
            <button className="btn-secondary">Exporter</button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
            <div className="flex items-center space-x-3">
              <Trash2 className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900 dark:text-red-400">Supprimer mes données</p>
                <p className="text-sm text-red-600 dark:text-red-300">
                  Suppression permanente et irréversible de toutes vos données
                </p>
              </div>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-8">
      <SectionHeader 
        icon={Settings}
        title="Paramètres du compte"
        description="Gérez votre abonnement et vos paramètres de compte"
      />

      {/* Informations d'abonnement */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Abonnement
        </h3>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Plan Gratuit</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Accès aux fonctionnalités de base
            </p>
          </div>
          <button className="btn-primary">Passer au Premium</button>
        </div>
      </div>

      {/* Actions dangereuses */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-6">
          Zone de danger
        </h3>
        
        <div className="space-y-4">
          <SettingItem
            icon={LogOut}
            title="Déconnecter tous les appareils"
            description="Forcer la déconnexion sur tous les appareils connectés"
            danger={true}
          >
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
              Déconnecter tout
            </button>
          </SettingItem>

          <SettingItem
            icon={UserX}
            title="Désactiver le compte"
            description="Désactiver temporairement votre compte"
            danger={true}
          >
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
              Désactiver
            </button>
          </SettingItem>

          <SettingItem
            icon={Trash2}
            title="Supprimer le compte"
            description="Supprimer définitivement votre compte et toutes vos données"
            danger={true}
          >
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
              Supprimer
            </button>
          </SettingItem>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'security': return renderSecurityTab();
      case 'notifications': return renderNotificationsTab();
      case 'appearance': return renderAppearanceTab();
      case 'privacy': return renderPrivacyTab();
      case 'account': return renderAccountTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Paramètres
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez votre compte et vos préférences
              </p>
            </div>
            
            {unsavedChanges && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Modifications non sauvegardées</span>
                </div>
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="btn-primary flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sauvegarde...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Sauvegarder</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec onglets */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}