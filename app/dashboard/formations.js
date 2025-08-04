'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Award,
  CheckCircle,
  Lock,
  Search,
  Filter,
  Grid,
  List,
  Download,
  Calendar,
  BarChart3,
  Shield,
  Globe,
  Zap,
  Target,
  BookMarked,
  Video,
  FileText,
  Headphones,
  ChevronRight,
  TrendingUp,
  Eye,
  Heart
} from 'lucide-react';

// Composant Formation Card
const FormationCard = ({ formation, viewMode }) => {
  const [isBookmarked, setIsBookmarked] = useState(formation.bookmarked);
  const [isEnrolled, setIsEnrolled] = useState(formation.enrolled);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Avancé': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'interactive': return Target;
      case 'document': return FileText;
      case 'audio': return Headphones;
      default: return BookOpen;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="card p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start space-x-6">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            {formation.new && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Nouveau
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer">
                  {formation.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {formation.description}
                </p>

                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{formation.enrolled_count} inscrits</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{formation.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {React.createElement(getTypeIcon(formation.type), { className: "h-4 w-4" })}
                    <span className="capitalize">{formation.type}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(formation.level)}`}>
                    {formation.level}
                  </span>
                  {formation.certificat && (
                    <span className="flex items-center space-x-1 text-sm text-purple-600 dark:text-purple-400">
                      <Award className="h-4 w-4" />
                      <span>Certificat inclus</span>
                    </span>
                  )}
                  {formation.free ? (
                    <span className="text-green-600 font-semibold">Gratuit</span>
                  ) : (
                    <span className="text-gray-900 dark:text-white font-semibold">{formation.price}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-full transition-colors ${
                    isBookmarked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                {isEnrolled ? (
                  <Link 
                    href={`/dashboard/formations/${formation.id}/continue`}
                    className="btn-primary px-6 py-2 text-sm"
                  >
                    Continuer
                  </Link>
                ) : (
                  <button 
                    onClick={() => setIsEnrolled(true)}
                    className="btn-outline px-6 py-2 text-sm"
                  >
                    S'inscrire
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-white" />
        </div>
        {formation.new && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Nouveau
          </span>
        )}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md transition-colors ${
            isBookmarked ? 'text-red-500' : 'text-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
        
        {formation.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/20">
            <div className="bg-green-500 h-1" style={{ width: `${formation.progress}%` }}></div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(formation.level)}`}>
            {formation.level}
          </span>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{formation.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer">
          {formation.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {formation.description}
        </p>

        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formation.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{formation.enrolled_count}</span>
          </div>
          <div className="flex items-center space-x-1">
            {React.createElement(getTypeIcon(formation.type), { className: "h-4 w-4" })}
            <span className="capitalize">{formation.type}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {formation.certificat && (
              <div className="flex items-center space-x-1 text-purple-600 dark:text-purple-400">
                <Award className="h-4 w-4" />
              </div>
            )}
            {formation.free ? (
              <span className="text-green-600 font-semibold">Gratuit</span>
            ) : (
              <span className="text-gray-900 dark:text-white font-semibold">{formation.price}</span>
            )}
          </div>

          {isEnrolled ? (
            <Link 
              href={`/dashboard/formations/${formation.id}/continue`}
              className="btn-primary px-4 py-2 text-sm"
            >
              Continuer
            </Link>
          ) : (
            <button 
              onClick={() => setIsEnrolled(true)}
              className="btn-outline px-4 py-2 text-sm"
            >
              S'inscrire
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Composant de filtre
const FilterSidebar = ({ filters, setFilters, isOpen, setIsOpen }) => {
  const categories = [
    'Tous',
    'Cybersécurité de base',
    'RGPD et protection des données',
    'Gestion des incidents',
    'Audit de sécurité',
    'Sensibilisation',
    'Conformité réglementaire'
  ];

  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
  const types = ['Tous', 'video', 'interactive', 'document', 'audio'];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto`}>
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtres</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Catégories */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Catégories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Niveau */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Niveau</h4>
            <div className="space-y-2">
              {levels.map((level) => (
                <label key={level} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="level"
                    value={level}
                    checked={filters.level === level}
                    onChange={(e) => setFilters({...filters, level: e.target.value})}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Type de contenu</h4>
            <div className="space-y-2">
              {types.map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={filters.type === type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {type === 'Tous' ? 'Tous' : type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Prix */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Prix</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.free}
                  onChange={(e) => setFilters({...filters, free: e.target.checked})}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Gratuit seulement</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.certificate}
                  onChange={(e) => setFilters({...filters, certificate: e.target.checked})}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Avec certificat</span>
              </label>
            </div>
          </div>

          {/* Reset filters */}
          <button
            onClick={() => setFilters({
              category: 'Tous',
              level: 'Tous',
              type: 'Tous',
              free: false,
              certificate: false,
              search: ''
            })}
            className="w-full btn-secondary text-sm py-2"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </>
  );
};

export default function FormationsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    category: 'Tous',
    level: 'Tous',
    type: 'Tous',
    free: false,
    certificate: false,
    search: ''
  });

  // Données des formations (simulées)
  const formations = [
    {
      id: 1,
      title: "Introduction à la Cybersécurité",
      description: "Apprenez les fondamentaux de la cybersécurité pour protéger votre organisation contre les menaces courantes.",
      level: "Débutant",
      duration: "3h 30min",
      rating: 4.8,
      enrolled_count: 1245,
      price: "Gratuit",
      free: true,
      certificat: true,
      type: "video",
      category: "Cybersécurité de base",
      new: true,
      progress: 0,
      enrolled: false,
      bookmarked: false
    },
    {
      id: 2,
      title: "RGPD et Protection des Données",
      description: "Maîtrisez les exigences du RGPD et apprenez à mettre en place une stratégie de protection des données personnelles.",
      level: "Intermédiaire",
      duration: "5h 15min",
      rating: 4.9,
      enrolled_count: 892,
      price: "29€",
      free: false,
      certificat: true,
      type: "interactive",
      category: "RGPD et protection des données",
      new: false,
      progress: 75,
      enrolled: true,
      bookmarked: true
    },
    {
      id: 3,
      title: "Gestion des Incidents de Sécurité",
      description: "Développez vos compétences en réponse aux incidents et apprenez à gérer efficacement les crises de cybersécurité.",
      level: "Avancé",
      duration: "4h 45min",
      rating: 4.7,
      enrolled_count: 456,
      price: "49€",
      free: false,
      certificat: true,
      type: "document",
      category: "Gestion des incidents",
      new: false,
      progress: 45,
      enrolled: true,
      bookmarked: false
    },
    {
      id: 4,
      title: "Phishing et Ingénierie Sociale",
      description: "Identifiez et prévenez les attaques de phishing et d'ingénierie sociale qui visent votre organisation.",
      level: "Débutant",
      duration: "2h 20min",
      rating: 4.6,
      enrolled_count: 1876,
      price: "Gratuit",
      free: true,
      certificat: true,
      type: "video",
      category: "Sensibilisation",
      new: false,
      progress: 100,
      enrolled: true,
      bookmarked: true
    },
    {
      id: 5,
      title: "Audit de Sécurité Informatique",
      description: "Apprenez à réaliser des audits de sécurité complets pour évaluer et améliorer la posture de sécurité de votre organisation.",
      level: "Avancé",
      duration: "6h 30min",
      rating: 4.8,
      enrolled_count: 234,
      price: "89€",
      free: false,
      certificat: true,
      type: "interactive",
      category: "Audit de sécurité",
      new: true,
      progress: 10,
      enrolled: true,
      bookmarked: false
    },
    {
      id: 6,
      title: "Sensibilisation du Personnel",
      description: "Créez des programmes de sensibilisation efficaces pour éduquer vos équipes aux bonnes pratiques de cybersécurité.",
      level: "Intermédiaire",
      duration: "3h 10min",
      rating: 4.5,
      enrolled_count: 678,
      price: "Gratuit",
      free: true,
      certificat: false,
      type: "audio",
      category: "Sensibilisation",
      new: false,
      progress: 0,
      enrolled: false,
      bookmarked: false
    }
  ];

  // Filtrage et tri des formations
  const filteredFormations = formations.filter(formation => {
    if (filters.search && !formation.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category !== 'Tous' && formation.category !== filters.category) {
      return false;
    }
    if (filters.level !== 'Tous' && formation.level !== filters.level) {
      return false;
    }
    if (filters.type !== 'Tous' && formation.type !== filters.type) {
      return false;
    }
    if (filters.free && !formation.free) {
      return false;
    }
    if (filters.certificate && !formation.certificat) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.enrolled_count - a.enrolled_count;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.new - a.new;
      case 'duration':
        return parseFloat(a.duration) - parseFloat(b.duration);
      default:
        return 0;
    }
  });

  const stats = [
    {
      label: "Formations disponibles",
      value: formations.length,
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      label: "Formations complétées",
      value: formations.filter(f => f.progress === 100).length,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      label: "Formations en cours",
      value: formations.filter(f => f.progress > 0 && f.progress < 100).length,
      icon: Play,
      color: "text-orange-600"
    },
    {
      label: "Certificats obtenus",
      value: formations.filter(f => f.progress === 100 && f.certificat).length,
      icon: Award,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <FilterSidebar 
        filters={filters} 
        setFilters={setFilters} 
        isOpen={filterOpen} 
        setIsOpen={setFilterOpen} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Formations
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Développez vos compétences en cybersécurité avec nos formations certifiantes
              </p>
            </div>
            
            <Link 
              href="/dashboard/formations/my-progress"
              className="btn-primary flex items-center space-x-2"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Mon progression</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search and controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden btn-secondary flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filtres</span>
              </button>
              
              <div className="relative flex-1 sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="input-field pl-10 pr-4 py-3 w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-2 px-3"
              >
                <option value="popular">Plus populaires</option>
                <option value="rating">Mieux notées</option>
                <option value="newest">Plus récentes</option>
                <option value="duration">Durée</option>
              </select>

              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {filteredFormations.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Aucune formation trouvée
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Essayez de modifier vos filtres de recherche
              </p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-6"
            }>
              {filteredFormations.map((formation) => (
                <FormationCard 
                  key={formation.id} 
                  formation={formation} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Load more button */}
          {filteredFormations.length > 0 && (
            <div className="text-center mt-12">
              <button className="btn-outline px-8 py-3">
                Charger plus de formations
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}