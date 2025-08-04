'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Grid,
  List,
  Star,
  Calendar,
  User,
  Tag,
  ExternalLink,
  BookMarked,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Globe,
  Lock,
  Users,
  TrendingUp,
  Clock,
  Heart,
  Share2,
  Bookmark,
  ChevronRight,
  FileCheck,
  BookOpen,
  Tool,
  Video,
  Headphones,
  Image,
  Archive
} from 'lucide-react';

// Composant Resource Card
const ResourceCard = ({ resource, viewMode }) => {
  const [isBookmarked, setIsBookmarked] = useState(resource.bookmarked);
  const [isDownloaded, setIsDownloaded] = useState(resource.downloaded);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return FileText;
      case 'guide': return BookOpen;
      case 'template': return FileCheck;
      case 'checklist': return CheckCircle;
      case 'tool': return Tool;
      case 'video': return Video;
      case 'infographic': return Image;
      case 'document': return Archive;
      default: return FileText;
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      'article': 'Article',
      'guide': 'Guide pratique',
      'template': 'Modèle',
      'checklist': 'Liste de contrôle',
      'tool': 'Outil',
      'video': 'Vidéo',
      'infographic': 'Infographie',
      'document': 'Document'
    };
    return labels[type] || 'Ressource';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Sécurité de base': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'RGPD': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'Incidents': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      'Conformité': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      'Sensibilisation': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      'Outils': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    // Simulate download
    console.log(`Downloading ${resource.title}`);
  };

  if (viewMode === 'list') {
    return (
      <div className="card p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              {React.createElement(getTypeIcon(resource.type), {
                className: "h-8 w-8 text-white"
              })}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                    {resource.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {getTypeLabel(resource.type)}
                  </span>
                  {resource.new && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Nouveau
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{resource.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{resource.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{resource.views} vues</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{resource.downloads} téléchargements</span>
                  </div>
                  {resource.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{resource.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-full transition-colors ${
                      isBookmarked 
                        ? 'text-blue-500 hover:text-blue-600' 
                        : 'text-gray-400 hover:text-blue-500'
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <Link 
                    href={`/dashboard/ressources/${resource.id}`}
                    className="btn-secondary px-4 py-2 text-sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Link>
                  
                  {resource.downloadable && (
                    <button 
                      onClick={handleDownload}
                      className={`btn-primary px-4 py-2 text-sm ${isDownloaded ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isDownloaded ? 'Téléchargé' : 'Télécharger'}
                    </button>
                  )}
                </div>
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
          {React.createElement(getTypeIcon(resource.type), {
            className: "h-12 w-12 text-white"
          })}
        </div>
        
        {resource.new && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Nouveau
          </span>
        )}
        
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full bg-white/20 backdrop-blur-md transition-colors ${
              isBookmarked ? 'text-blue-300' : 'text-white hover:text-blue-300'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:text-gray-300 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
            {resource.category}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {getTypeLabel(resource.type)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer line-clamp-2">
          {resource.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {resource.description}
        </p>

        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{resource.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{resource.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{resource.views}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-gray-500">
              <Download className="h-4 w-4" />
              <span>{resource.downloads}</span>
            </div>
            {resource.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-gray-600 dark:text-gray-400">{resource.rating}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Link 
              href={`/dashboard/ressources/${resource.id}`}
              className="btn-secondary px-3 py-1 text-sm"
            >
              Voir
            </Link>
            
            {resource.downloadable && (
              <button 
                onClick={handleDownload}
                className={`btn-primary px-3 py-1 text-sm ${isDownloaded ? 'bg-green-500 hover:bg-green-600' : ''}`}
              >
                {isDownloaded ? 'Téléchargé' : 'Télécharger'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Featured Resource
const FeaturedResource = ({ resource }) => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 p-8 text-white">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative z-10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium mb-4">
            Ressource mise en avant
          </span>
          <h2 className="text-3xl font-bold mb-4">{resource.title}</h2>
          <p className="text-blue-100 text-lg mb-6 leading-relaxed">
            {resource.description}
          </p>
          <div className="flex items-center space-x-6 mb-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{resource.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>{resource.views} vues</span>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>{resource.downloads} téléchargements</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href={`/dashboard/ressources/${resource.id}`}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Consulter maintenant
            </Link>
            {resource.downloadable && (
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                Télécharger
              </button>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0 ml-8">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
            {React.createElement(getTypeIcon(resource.type), {
              className: "h-16 w-16 text-white"
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function RessourcesPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    category: 'Toutes',
    type: 'Tous',
    search: ''
  });

  // Données des ressources (simulées)  
  const resources = [
    {
      id: 1,
      title: "Guide complet de la cybersécurité pour ONG",
      description: "Un guide exhaustif couvrant tous les aspects de la cybersécurité spécialement conçu pour les organisations non gouvernementales.",
      type: "guide",
      category: "Sécurité de base",
      author: "Dr. Marie Kouadio",
      date: "15 Mars 2024",
      views: 2341,
      downloads: 892,
      rating: 4.9,
      downloadable: true,
      new: true,
      bookmarked: false,
      downloaded: false
    },
    {
      id: 2,
      title: "Checklist de conformité RGPD",
      description: "Liste de contrôle complète pour s'assurer de la conformité de votre organisation avec le Règlement Général sur la Protection des Données.",
      type: "checklist",
      category: "RGPD",
      author: "Sophie Diallo",
      date: "12 Mars 2024",
      views: 1876,
      downloads: 654,
      rating: 4.8,
      downloadable: true,
      new: false,
      bookmarked: true,
      downloaded: true
    },
    {
      id: 3,
      title: "Modèle de plan de réponse aux incidents",
      description: "Modèle personnalisable pour créer un plan de réponse aux incidents de cybersécurité adapté à votre organisation.",
      type: "template",
      category: "Incidents",
      author: "Jean-Baptiste Traoré",
      date: "10 Mars 2024",
      views: 1432,
      downloads: 423,
      rating: 4.7,
      downloadable: true,
      new: false,
      bookmarked: false,
      downloaded: false
    },
    {
      id: 4,
      title: "Outil d'évaluation des risques cybersécurité",
      description: "Outil interactif pour évaluer et cartographier les risques de cybersécurité de votre organisation.",
      type: "tool",
      category: "Outils",
      author: "Fatou Camara",
      date: "8 Mars 2024",
      views: 2156,
      downloads: 567,
      rating: 4.6,
      downloadable: false,
      new: true,
      bookmarked: true,
      downloaded: false
    },
    {
      id: 5,
      title: "Infographie: Les 10 menaces cyber les plus courantes",
      description: "Visualisation claire et informative des principales menaces cybersécurité auxquelles font face les ONG.",
      type: "infographic",
      category: "Sensibilisation",
      author: "Design Team E-ARONCY",
      date: "5 Mars 2024",
      views: 3421,
      downloads: 1234,
      rating: 4.5,
      downloadable: true,
      new: false,
      bookmarked: false,
      downloaded: false
    },
    {
      id: 6,
      title: "Webinaire: Tendances cybersécurité 2024",
      description: "Enregistrement du webinaire sur les principales tendances et évolutions en matière de cybersécurité pour cette année.",
      type: "video",
      category: "Sensibilisation",
      author: "Experts E-ARONCY",
      date: "1 Mars 2024",
      views: 4567,
      downloads: 0,
      rating: 4.8,
      downloadable: false,
      new: false,
      bookmarked: true,
      downloaded: false
    }
  ];

  // Ressource mise en avant
  const featuredResource = {
    id: 'featured',
    title: "Stratégie de Cybersécurité 2024 pour ONG",
    description: "Le guide de référence pour développer une stratégie de cybersécurité complète et efficace, spécialement conçu pour les organisations non gouvernementales opérant en Afrique de l'Ouest.",
    type: "guide",
    author: "Équipe E-ARONCY",
    views: "5.2k",
    downloads: "2.1k",
    downloadable: true
  };

  const tabs = [
    { id: 'all', label: 'Toutes les ressources', count: resources.length },
    { id: 'articles', label: 'Articles', count: resources.filter(r => r.type === 'article').length },
    { id: 'guides', label: 'Guides', count: resources.filter(r => r.type === 'guide').length },
    { id: 'templates', label: 'Modèles', count: resources.filter(r => r.type === 'template').length },
    { id: 'tools', label: 'Outils', count: resources.filter(r => r.type === 'tool').length }
  ];

  const stats = [
    {
      label: "Ressources disponibles",
      value: resources.length,
      icon: FileText,
      color: "text-blue-600"
    },
    {
      label: "Téléchargements ce mois",
      value: "2.4k",
      icon: Download,
      color: "text-green-600"
    },
    {
      label: "Nouvelles ressources",
      value: resources.filter(r => r.new).length,
      icon: TrendingUp,
      color: "text-orange-600"
    },
    {
      label: "Ressources sauvegardées",
      value: resources.filter(r => r.bookmarked).length,
      icon: Bookmark,
      color: "text-purple-600"
    }
  ];

  // Filtrage des ressources
  const filteredResources = resources.filter(resource => {
    if (filters.search && !resource.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (activeTab !== 'all') {
      const typeMap = {
        'articles': 'article',
        'guides': 'guide', 
        'templates': 'template',
        'tools': 'tool'
      };
      if (resource.type !== typeMap[activeTab]) {
        return false;
      }
    }
    if (filters.category !== 'Toutes' && resource.category !== filters.category) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'popular':
        return b.views - a.views;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'downloads':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Ressources
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Accédez à notre bibliothèque complète de guides, outils et ressources
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard/ressources/contribute"
                className="btn-secondary flex items-center space-x-2"
              >
                <FileText className="h-5 w-5" />
                <span>Contribuer</span>
              </Link>
              
              <Link 
                href="/dashboard/ressources/my-library"
                className="btn-primary flex items-center space-x-2"
              >
                <BookMarked className="h-5 w-5" />
                <span>Ma bibliothèque</span>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Featured Resource */}
        <FeaturedResource resource={featuredResource} />

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Search and controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher des ressources..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="input-field pl-10 pr-4 py-3 w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field py-2 px-3"
            >
              <option value="recent">Plus récentes</option>
              <option value="popular">Plus populaires</option>
              <option value="rating">Mieux notées</option>
              <option value="downloads">Plus téléchargées</option>
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

        {/* Resources Grid/List */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucune ressource trouvée
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {filteredResources.map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Load more button */}
        {filteredResources.length > 0 && (
          <div className="text-center">
            <button className="btn-outline px-8 py-3">
              Charger plus de ressources
            </button>
          </div>
        )}
      </div>
    </div>
  );
}