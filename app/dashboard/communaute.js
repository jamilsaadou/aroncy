'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users,
  MessageCircle,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Clock,
  Eye,
  Heart,
  Reply,
  Pin,
  Star,
  Award,
  Calendar,
  MapPin,
  Globe,
  User,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Send,
  Image,
  Paperclip,
  Smile,
  Bell,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Shield,
  BookOpen,
  Zap,
  Target
} from 'lucide-react';

// Composant Discussion Thread
const DiscussionThread = ({ thread }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(thread.liked);
  const [isBookmarked, setIsBookmarked] = useState(thread.bookmarked);
  const [likeCount, setLikeCount] = useState(thread.likes);

  const getCategoryIcon = (category) => {
    const icons = {
      'questions': HelpCircle,
      'discussions': MessageCircle,
      'tutorials': BookOpen,
      'news': Bell,
      'security': Shield,
      'tools': Target
    };
    return icons[category] || MessageCircle;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'questions': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'discussions': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'tutorials': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      'news': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
      'security': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      'tools': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Il y a moins d'une heure";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(thread.category)}`}>
                  {React.createElement(getCategoryIcon(thread.category), { className: "h-3 w-3" })}
                  <span className="capitalize">{thread.category}</span>
                </span>
                
                {thread.pinned && (
                  <div className="flex items-center space-x-1 text-orange-600">
                    <Pin className="h-4 w-4" />
                    <span className="text-xs font-medium">Épinglé</span>
                  </div>
                )}
                
                {thread.solved && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">Résolu</span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 cursor-pointer mb-2">
                {thread.title}
              </h3>

              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{thread.author}</span>
                  {thread.authorBadge && (
                    <Award className="h-3 w-3 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{timeAgo(thread.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{thread.replies} réponses</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{thread.views} vues</span>
                </div>
              </div>

              {/* Preview */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {thread.preview}
              </p>

              {/* Tags */}
              {thread.tags && thread.tags.length > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                  {thread.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' 
                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{likeCount}</span>
                  </button>

                  <Link 
                    href={`/dashboard/communaute/thread/${thread.id}`}
                    className="flex items-center space-x-1 px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Reply className="h-4 w-4" />
                    <span className="text-sm">Répondre</span>
                  </Link>

                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                      isBookmarked 
                        ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20' 
                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span className="text-sm">Sauvegarder</span>
                  </button>

                  <button className="flex items-center space-x-1 px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Partager</span>
                  </button>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Expert Spotlight
const ExpertSpotlight = ({ expert }) => (
  <div className="card p-6">
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <User className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {expert.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {expert.title}
      </p>
      <div className="flex items-center justify-center space-x-1 mb-4">
        <MapPin className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-500">{expert.location}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {expert.posts}
          </div>
          <div className="text-xs text-gray-500">Posts</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {expert.reputation}
          </div>
          <div className="text-xs text-gray-500">Points</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {expert.badges}
          </div>
          <div className="text-xs text-gray-500">Badges</div>
        </div>
      </div>
      
      <button className="btn-primary w-full py-2 text-sm">
        Voir le profil
      </button>
    </div>
  </div>
);

// Composant Stats Community
const CommunityStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {stats.map((stat, index) => (
      <div key={index} className="card p-6 text-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${stat.bgColor}`}>
          <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {stat.value}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {stat.label}
        </div>
        {stat.change && (
          <div className={`text-xs mt-1 ${stat.changeColor}`}>
            {stat.change}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default function CommunautePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);

  // Données des discussions (simulées)
  const discussions = [
    {
      id: 1,
      title: "Comment sensibiliser efficacement les employés au phishing ?",
      preview: "Bonjour la communauté ! Je cherche des conseils pour mettre en place un programme de sensibilisation efficace contre le phishing dans mon organisation...",
      author: "Marie Kouadio",
      authorBadge: true,
      category: "questions",
      createdAt: "2024-03-15T10:30:00Z",
      replies: 12,
      views: 156,
      likes: 8,
      liked: false,
      bookmarked: false,
      pinned: false,
      solved: true,
      tags: ["sensibilisation", "phishing", "formation"]
    },
    {
      id: 2,
      title: "Nouvelle réglementation cybersécurité en Côte d'Ivoire",
      preview: "Attention ! Le gouvernement ivoirien a publié de nouvelles directives concernant la cybersécurité pour les ONG. Voici ce qu'il faut savoir...",
      author: "Jean Traoré",
      authorBadge: true,
      category: "news",
      createdAt: "2024-03-14T15:45:00Z",
      replies: 8,
      views: 234,
      likes: 15,
      liked: true,
      bookmarked: true,
      pinned: true,
      solved: false,
      tags: ["réglementation", "côte-divoire", "conformité"]
    },
    {
      id: 3,
      title: "Tutoriel : Configuration sécurisée des serveurs de messagerie",
      preview: "Guide pas à pas pour sécuriser votre serveur de messagerie. Ce tutoriel couvre les aspects essentiels de la configuration sécurisée...",
      author: "Fatou Diallo",
      authorBadge: false,
      category: "tutorials",
      createdAt: "2024-03-13T09:15:00Z",
      replies: 5,
      views: 189,
      likes: 22,
      liked: false,
      bookmarked: false,
      pinned: false,
      solved: false,
      tags: ["tutoriel", "messagerie", "configuration"]
    },
    {
      id: 4,
      title: "Retour d'expérience : Gestion d'incident de sécurité",
      preview: "La semaine dernière, notre organisation a été victime d'une tentative d'intrusion. Je partage notre expérience et les leçons apprises...",
      author: "Samuel Ouattara",
      authorBadge: false,
      category: "discussions",
      createdAt: "2024-03-12T14:20:00Z",
      replies: 18,
      views: 312,
      likes: 25,
      liked: true,
      bookmarked: false,
      pinned: false,
      solved: false,
      tags: ["incident", "retour-experience", "sécurité"]
    },
    {
      id: 5,
      title: "Recommandations d'outils de monitoring gratuits",
      preview: "Je recherche des outils de monitoring de sécurité gratuits et efficaces pour une petite ONG. Quelles sont vos recommandations ?",
      author: "Aminata Camara",
      authorBadge: false,
      category: "tools",
      createdAt: "2024-03-11T11:00:00Z",
      replies: 14,
      views: 278,
      likes: 11,
      liked: false,
      bookmarked: true,
      pinned: false,
      solved: false,
      tags: ["outils", "monitoring", "gratuit"]
    }
  ];

  // Experts en vedette
  const featuredExperts = [
    {
      name: "Dr. Aissata Keita",
      title: "Expert Cybersécurité",
      location: "Bamako, Mali",
      posts: 156,
      reputation: 2840,
      badges: 12
    },
    {
      name: "Ibrahim Sankara",
      title: "Consultant RGPD",
      location: "Ouagadougou, Burkina Faso",
      posts: 89,
      reputation: 1950,
      badges: 8
    },
    {
      name: "Nana Akoto",
      title: "Architecte Sécurité",
      location: "Accra, Ghana",
      posts: 203,
      reputation: 3420,
      badges: 15
    }
  ];

  // Statistiques de la communauté
  const communityStats = [
    {
      label: "Membres actifs",
      value: "2,847",
      icon: Users,
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600",
      change: "+12% ce mois",
      changeColor: "text-green-600"
    },
    {
      label: "Discussions",
      value: "1,234",
      icon: MessageCircle,
      bgColor: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600",
      change: "+8% ce mois",
      changeColor: "text-green-600"
    },
    {
      label: "Questions résolues",
      value: "892",
      icon: CheckCircle,
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-600",
      change: "+15% ce mois",
      changeColor: "text-green-600"
    },
    {
      label: "Experts certifiés",
      value: "56",
      icon: Award,
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      iconColor: "text-orange-600",
      change: "+3 nouveaux",
      changeColor: "text-green-600"
    }
  ];

  const tabs = [
    { id: 'all', label: 'Toutes', icon: MessageCircle },
    { id: 'questions', label: 'Questions', icon: HelpCircle },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'tutorials', label: 'Tutoriels', icon: BookOpen },
    { id: 'news', label: 'Actualités', icon: Bell }
  ];

  // Filtrage des discussions
  const filteredDiscussions = discussions.filter(discussion => {
    if (searchQuery && !discussion.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeTab !== 'all' && discussion.category !== activeTab) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
        return b.views - a.views;
      case 'replies':
        return b.replies - a.replies;
      case 'likes':
        return b.likes - a.likes;
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
                Communauté
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Échangez avec des experts et partagez vos expériences en cybersécurité
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard/communaute/experts"
                className="btn-secondary flex items-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Experts</span>
              </Link>
              
              <button 
                onClick={() => setShowNewThreadModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Nouvelle discussion</span>
              </button>
            </div>
          </div>

          <CommunityStats stats={communityStats} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors flex-1 justify-center ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Search and filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Rechercher dans les discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                    <option value="replies">Plus de réponses</option>
                    <option value="likes">Plus appréciées</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {filteredDiscussions.length === 0 ? (
                <div className="card p-12 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Aucune discussion trouvée
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Soyez le premier à lancer une discussion !
                  </p>
                  <button 
                    onClick={() => setShowNewThreadModal(true)}
                    className="btn-primary"
                  >
                    Créer une discussion
                  </button>
                </div>
              ) : (
                filteredDiscussions.map((discussion) => (
                  <DiscussionThread key={discussion.id} thread={discussion} />
                ))
              )}
            </div>

            {/* Load more */}
            {filteredDiscussions.length > 0 && (
              <div className="text-center">
                <button className="btn-outline px-8 py-3">
                  Charger plus de discussions
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Experts en vedette */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Experts en vedette</span>
              </h3>
              <div className="space-y-4">
                {featuredExperts.map((expert, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {expert.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {expert.title}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{expert.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link 
                  href="/dashboard/communaute/experts"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <span>Voir tous les experts</span>
                  <ChevronUp className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Discussions populaires */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Discussions populaires</span>
              </h3>
              <div className="space-y-3">
                {discussions.slice(0, 5).map((discussion, index) => (
                  <Link 
                    key={discussion.id}
                    href={`/dashboard/communaute/thread/${discussion.id}`}
                    className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                      {discussion.title}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{discussion.replies} réponses</span>
                      <span>{discussion.views} vues</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Événements à venir */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span>Événements à venir</span>
              </h3>
              <div className="space-y-3">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Session Q&R avec experts
                  </p>
                  <p className="text-xs text-gray-500 mb-2">18 Mars 2024 • 16:00 GMT</p>
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                    S'inscrire
                  </button>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Webinaire : Tendances 2024
                  </p>
                  <p className="text-xs text-gray-500 mb-2">22 Mars 2024 • 14:00 GMT</p>
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>

            {/* Tags populaires */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tags populaires
              </h3>
              <div className="flex flex-wrap gap-2">
                {['phishing', 'rgpd', 'formation', 'incident', 'outils', 'réglementation', 'sensibilisation', 'audit'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-300 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}