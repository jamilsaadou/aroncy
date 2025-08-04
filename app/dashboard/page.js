'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell,
  Search,
  Settings,
  User,
  Shield,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Lock,
  Download,
  Eye,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';

// Composant Sidebar
const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { 
      name: 'Tableau de bord', 
      icon: BarChart3, 
      href: '/dashboard', 
      current: true 
    },
    { 
      name: 'Formations', 
      icon: BookOpen, 
      href: '/dashboard/formations',
      badge: '3'
    },
    { 
      name: 'Ressources', 
      icon: Shield, 
      href: '/dashboard/ressources' 
    },
    { 
      name: 'Communauté', 
      icon: Users, 
      href: '/dashboard/communaute',
      badge: '12'
    },
    { 
      name: 'Réglementation', 
      icon: Globe, 
      href: '/dashboard/reglementation' 
    },
    { 
      name: 'Certifications', 
      icon: Award, 
      href: '/dashboard/certifications' 
    },
    { 
      name: 'Sécurité', 
      icon: Lock, 
      href: '/dashboard/securite' 
    },
    { 
      name: 'Paramètres', 
      icon: Settings, 
      href: '/dashboard/settings' 
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } border-r border-gray-200 dark:border-gray-700`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">E-ARONCY</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                item.current
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Jean Kouassi
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                ONG Espoir
              </p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Composant Stats Card
const StatsCard = ({ title, value, change, icon: Icon, color, trend }) => (
  <div className="card p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {change && (
          <p className={`text-sm flex items-center space-x-1 ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`h-4 w-4 ${trend === 'down' ? 'transform rotate-180' : ''}`} />
            <span>{change}</span>
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

// Composant Activity Item
const ActivityItem = ({ type, title, time, status }) => {
  const getIcon = () => {
    switch (type) {
      case 'formation': return <BookOpen className="h-4 w-4" />;
      case 'certificate': return <Award className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'pending': return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
      default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
      <div className={`p-2 rounded-lg ${getStatusColor()}`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </div>
  );
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const stats = [
    {
      title: "Formations complétées",
      value: "12",
      change: "+2 ce mois",
      icon: BookOpen,
      color: "bg-blue-500",
      trend: "up"
    },
    {
      title: "Certifications obtenues",
      value: "3",
      change: "+1 récente",
      icon: Award,
      color: "bg-green-500",
      trend: "up"
    },
    {
      title: "Score de sécurité",
      value: "85%",
      change: "+5% ce mois",
      icon: Shield,
      color: "bg-purple-500",
      trend: "up"
    },
    {
      title: "Alertes actives",
      value: "2",
      change: "-3 résolues",
      icon: AlertTriangle,
      color: "bg-orange-500",
      trend: "down"
    }
  ];

  const recentActivities = [
    {
      type: "formation",
      title: "Formation 'Phishing et ingénierie sociale' terminée",
      time: "il y a 2 heures",
      status: "completed"
    },
    {
      type: "certificate",
      title: "Certificat de cybersécurité de base obtenu",
      time: "il y a 1 jour",
      status: "completed"
    },
    {
      type: "security",
      title: "Scan de sécurité programmé",
      time: "il y a 3 jours",
      status: "in-progress"
    },
    {
      type: "formation",
      title: "Nouveau module 'RGPD' disponible",
      time: "il y a 5 jours",
      status: "pending"
    }
  ];

  const upcomingEvents = [
    {
      title: "Webinaire: Tendances 2024 en cybersécurité",
      date: "15 Mars 2024",
      time: "14:00 GMT",
      participants: "250+"
    },
    {
      title: "Session Q&R avec experts",
      date: "18 Mars 2024", 
      time: "16:00 GMT",
      participants: "50+"
    },
    {
      title: "Formation avancée: Audit de sécurité",
      date: "22 Mars 2024",
      time: "10:00 GMT",
      participants: "30+"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tableau de bord
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bonjour Jean, voici un aperçu de vos activités
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="input-field pl-10 pr-4 py-2 w-64"
                />
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>

              {/* User menu */}
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <StatsCard {...stat} />
              </div>
            ))}
          </div>

          {/* Charts and Activities Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Chart */}
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Progression des formations
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir tout
                </button>
              </div>
              
              {/* Simplified chart representation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cybersécurité de base
                  </span>
                  <span className="text-sm text-gray-500">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    RGPD et protection des données
                  </span>
                  <span className="text-sm text-gray-500">75%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Gestion des incidents
                  </span>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Audit de sécurité avancé
                  </span>
                  <span className="text-sm text-gray-500">10%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>

            {/* Security Score */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Score de sécurité
              </h3>
              
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset="37.68"
                    className="text-purple-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">85%</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Authentification</span>
                  <span className="text-green-600 font-medium">Excellent</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Chiffrement</span>
                  <span className="text-green-600 font-medium">Bon</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Mises à jour</span>
                  <span className="text-yellow-600 font-medium">Moyen</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Sauvegarde</span>
                  <span className="text-red-600 font-medium">À améliorer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activities and Events Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Activités récentes
                </h3>
                <Link 
                  href="/dashboard/activities"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Voir tout
                </Link>
              </div>
              
              <div className="space-y-2">
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Événements à venir
                </h3>
                <Link 
                  href="/dashboard/events"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Voir tout
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{event.participants}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Actions rapides
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group">
                <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-500">
                  Nouvelle formation
                </span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group">
                <Download className="h-5 w-5 text-gray-400 group-hover:text-green-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-green-500">
                  Télécharger ressource
                </span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group">
                <Users className="h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-500">
                  Rejoindre discussion
                </span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 group">
                <Eye className="h-5 w-5 text-gray-400 group-hover:text-orange-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-orange-500">
                  Voir rapport
                </span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}