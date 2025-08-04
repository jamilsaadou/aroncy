'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Globe,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  ExternalLink,
  FileText,
  Scale,
  Shield,
  Building,
  MapPin,
  Clock,
  TrendingUp,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronRight,
  Bell,
  Star,
  Flag,
  Book,
  Gavel,
  Users,
  Target,
  Zap,
  Award
} from 'lucide-react';

// Composant Country Card
const CountryCard = ({ country, isSelected, onClick }) => (
  <button
    onClick={() => onClick(country)}
    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
      isSelected 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
    } card hover:shadow-md`}
  >
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
        <Flag className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {country.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {country.regulations.length} réglementations
        </p>
        {country.lastUpdate && (
          <p className="text-xs text-gray-500">
            Mis à jour {country.lastUpdate}
          </p>
        )}
      </div>
      <div className="flex flex-col items-end space-y-1">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          country.compliance === 'high' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
            : country.compliance === 'medium'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
        }`}>
          {country.compliance === 'high' ? 'Conformité élevée' : 
           country.compliance === 'medium' ? 'Conformité moyenne' : 'Conformité faible'}
        </div>
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  </button>
);

// Composant Regulation Item
const RegulationItem = ({ regulation, isExpanded, onToggle }) => {
  const [isBookmarked, setIsBookmarked] = useState(regulation.bookmarked);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'draft': return <Info className="h-5 w-5 text-blue-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      'active': 'En vigueur',
      'pending': 'En attente',
      'draft': 'Projet',
      'expired': 'Expiré'
    };
    return labels[status] || 'Inconnu';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {getStatusIcon(regulation.status)}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {regulation.title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(regulation.priority)}`}>
                Priorité {regulation.priority === 'high' ? 'élevée' : regulation.priority === 'medium' ? 'moyenne' : 'faible'}
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Effective depuis {regulation.effectiveDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Building className="h-4 w-4" />
                <span>{regulation.authority}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Scale className="h-4 w-4" />
                <span>{getStatusLabel(regulation.status)}</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {regulation.description}
            </p>

            {regulation.keyPoints && regulation.keyPoints.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Points clés :</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {regulation.keyPoints.slice(0, isExpanded ? undefined : 2).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                {regulation.keyPoints.length > 2 && (
                  <button
                    onClick={onToggle}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 flex items-center space-x-1"
                  >
                    <span>{isExpanded ? 'Voir moins' : `Voir ${regulation.keyPoints.length - 2} points supplémentaires`}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            )}

            {isExpanded && regulation.compliance && (
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span>Exigences de conformité :</span>
                </h4>
                <div className="space-y-2">
                  {regulation.compliance.map((req, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isExpanded && regulation.penalties && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>Sanctions en cas de non-conformité :</span>
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {regulation.penalties}
                </p>
              </div>
            )}

            {regulation.tags && regulation.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {regulation.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-300' 
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

            <button 
              onClick={onToggle}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm">{isExpanded ? 'Voir moins' : 'Voir plus'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {regulation.documentUrl && (
              <Link 
                href={regulation.documentUrl}
                target="_blank"
                className="btn-secondary px-4 py-2 text-sm flex items-center space-x-1"
              >
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
              </Link>
            )}
            
            <Link 
              href={`/dashboard/reglementation/regulation/${regulation.id}`}
              className="btn-primary px-4 py-2 text-sm"
            >
              Voir le détail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Summary Stats
const SummaryStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {stats.map((stat, index) => (
      <div key={index} className="card p-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${stat.bgColor}`}>
            <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
            {stat.change && (
              <p className={`text-xs ${stat.changeColor}`}>
                {stat.change}
              </p>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function ReglementationPage() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedRegulations, setExpandedRegulations] = useState(new Set());

  // Données des pays et réglementations (simulées)
  const countries = [
    {
      id: 'ci',
      name: 'Côte d\'Ivoire',
      compliance: 'high',
      lastUpdate: 'il y a 2 jours',
      regulations: [
        {
          id: 'ci-1',
          title: 'Loi sur la Protection des Données Personnelles',
          description: 'Réglementation sur la collecte, le traitement et la protection des données personnelles en Côte d\'Ivoire.',
          status: 'active',
          priority: 'high',
          effectiveDate: 'Janvier 2023',
          authority: 'ARTCI',
          keyPoints: [
            'Obligation de déclaration des traitements de données',
            'Consentement explicite requis pour la collecte',
            'Droit à l\'oubli et portabilité des données',
            'Notification obligatoire des violations de données',
            'Désignation d\'un délégué à la protection des données'
          ],
          compliance: [
            'Tenir un registre des traitements',
            'Mettre en place des mesures de sécurité appropriées',
            'Former le personnel sur la protection des données',
            'Effectuer des analyses d\'impact si nécessaire'
          ],
          penalties: 'Amendes pouvant aller jusqu\'à 50 millions FCFA et emprisonnement jusqu\'à 2 ans',
          tags: ['données-personnelles', 'rgpd', 'conformité'],
          documentUrl: '/documents/ci-protection-donnees.pdf',
          bookmarked: false
        },
        {
          id: 'ci-2',
          title: 'Directive sur la Cybersécurité des Infrastructures Critiques',
          description: 'Mesures de sécurité obligatoires pour les infrastructures critiques du secteur public et privé.',
          status: 'active',
          priority: 'high',
          effectiveDate: 'Mars 2023',
          authority: 'ANSSI-CI',
          keyPoints: [
            'Évaluation obligatoire des risques cyber',
            'Plan de continuité d\'activité requis',
            'Déclaration des incidents de sécurité',
            'Audit de sécurité annuel obligatoire'
          ],
          compliance: [
            'Implémenter un système de gestion de la sécurité',
            'Effectuer des tests de pénétration réguliers',
            'Maintenir un centre opérationnel de sécurité',
            'Former le personnel aux bonnes pratiques'
          ],
          penalties: 'Sanctions administratives et amendes jusqu\'à 100 millions FCFA',
          tags: ['cybersécurité', 'infrastructures', 'continuité'],
          documentUrl: '/documents/ci-cyber-infrastructures.pdf',
          bookmarked: true
        }
      ]
    },
    {
      id: 'sn',
      name: 'Sénégal',
      compliance: 'high',
      lastUpdate: 'il y a 1 semaine',
      regulations: [
        {
          id: 'sn-1',
          title: 'Loi relative aux Données à Caractère Personnel',
          description: 'Cadre juridique pour la protection des données personnelles au Sénégal, aligné sur les standards internationaux.',
          status: 'active',
          priority: 'high',
          effectiveDate: 'Septembre 2022',
          authority: 'CDP (Commission des Données Personnelles)',
          keyPoints: [
            'Autorisation préalable pour certains traitements',
            'Droits renforcés des personnes concernées',
            'Transferts internationaux encadrés',
            'Sanctions pénales et administratives'
          ],
          compliance: [
            'Déclaration des traitements auprès de la CDP',
            'Mise en place de mesures de sécurité',
            'Information transparente des personnes',
            'Tenue d\'un registre des activités de traitement'
          ],
          penalties: 'Amendes de 10 à 100 millions FCFA selon la gravité',
          tags: ['données-personnelles', 'protection', 'cdp'],
          documentUrl: '/documents/sn-donnees-personnelles.pdf',
          bookmarked: false
        }
      ]
    },
    {
      id: 'gh',
      name: 'Ghana',
      compliance: 'medium',
      lastUpdate: 'il y a 2 semaines',
      regulations: [
        {
          id: 'gh-1',
          title: 'Data Protection Act 2012',
          description: 'Loi ghanéenne sur la protection des données, révisée pour inclure les nouvelles technologies.',
          status: 'active',
          priority: 'medium',
          effectiveDate: 'Décembre 2012 (révisée 2023)',
          authority: 'Data Protection Commission',
          keyPoints: [
            'Enregistrement obligatoire des contrôleurs de données',
            'Principes de protection des données',
            'Droits des personnes concernées',
            'Transferts transfrontaliers réglementés'
          ],
          compliance: [
            'S\'enregistrer auprès de la DPC',
            'Implémenter des politiques de protection',
            'Effectuer des évaluations d\'impact',
            'Notifier les violations dans les 72h'
          ],
          penalties: 'Amendes jusqu\'à 250 000 GHS et sanctions administratives',
          tags: ['data-protection', 'dpc', 'enregistrement'],
          documentUrl: '/documents/gh-data-protection.pdf',
          bookmarked: true
        }
      ]
    },
    {
      id: 'ng',
      name: 'Nigeria',
      compliance: 'high',
      lastUpdate: 'il y a 3 jours',
      regulations: [
        {
          id: 'ng-1',
          title: 'Nigeria Data Protection Regulation (NDPR)',
          description: 'Réglementation complète sur la protection des données personnelles au Nigeria.',
          status: 'active',
          priority: 'high',
          effectiveDate: 'Mai 2019',
          authority: 'NITDA',
          keyPoints: [
            'Application extraterritoriale',
            'Audit de conformité obligatoire',
            'Désignation d\'un Data Protection Officer',
            'Notification des violations dans les 72h'
          ],
          compliance: [
            'Effectuer un audit de conformité annuel',
            'Désigner un DPO certifié',
            'Implémenter la protection dès la conception',
            'Maintenir des registres de traitement détaillés'
          ],
          penalties: 'Amendes jusqu\'à 10 millions NGN ou 2% du chiffre d\'affaires',
          tags: ['ndpr', 'nitda', 'audit', 'dpo'],
          documentUrl: '/documents/ng-ndpr.pdf',
          bookmarked: false
        }
      ]
    }
  ];

  // Statistiques générales
  const summaryStats = [
    {
      label: "Pays couverts",
      value: countries.length,
      icon: Globe,
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600",
      change: "+2 ce trimestre",
      changeColor: "text-green-600"
    },
    {
      label: "Réglementations actives",
      value: countries.reduce((sum, country) => sum + country.regulations.filter(r => r.status === 'active').length, 0),
      icon: Scale,
      bgColor: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600",
      change: "+5 ce mois",
      changeColor: "text-green-600"
    },
    {
      label: "Mises à jour récentes",
      value: 12,
      icon: TrendingUp,
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-600",
      change: "Cette semaine",
      changeColor: "text-blue-600"
    },
    {
      label: "Réglementations sauvegardées",
      value: countries.reduce((sum, country) => sum + country.regulations.filter(r => r.bookmarked).length, 0),
      icon: Bookmark,
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      iconColor: "text-orange-600"
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes les catégories' },
    { id: 'data-protection', label: 'Protection des données' },
    { id: 'cybersecurity', label: 'Cybersécurité' },
    { id: 'infrastructure', label: 'Infrastructures' },
    { id: 'compliance', label: 'Conformité' }
  ];

  const statuses = [
    { id: 'all', label: 'Tous les statuts' },
    { id: 'active', label: 'En vigueur' },
    { id: 'pending', label: 'En attente' },
    { id: 'draft', label: 'Projet' }
  ];

  const toggleExpanded = (regulationId) => {
    setExpandedRegulations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(regulationId)) {
        newSet.delete(regulationId);
      } else {
        newSet.add(regulationId);
      }
      return newSet;
    });
  };

  // Obtenir toutes les réglementations pour le filtrage
  const allRegulations = selectedCountry 
    ? selectedCountry.regulations 
    : countries.flatMap(country => country.regulations.map(reg => ({ ...reg, country: country.name })));

  // Filtrage des réglementations
  const filteredRegulations = allRegulations.filter(regulation => {
    if (searchQuery && !regulation.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !regulation.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedStatus !== 'all' && regulation.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    // Sélectionner la Côte d'Ivoire par défaut
    if (countries.length > 0 && !selectedCountry) {
      setSelectedCountry(countries[0]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Réglementation
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Restez informé des réglementations en cybersécurité et protection des données
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard/reglementation/alerts"
                className="btn-secondary flex items-center space-x-2"
              >
                <Bell className="h-5 w-5" />
                <span>Alertes</span>
              </Link>
              
              <Link 
                href="/dashboard/reglementation/compliance-check"
                className="btn-primary flex items-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Vérifier la conformité</span>
              </Link>
            </div>
          </div>

          <SummaryStats stats={summaryStats} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Liste des pays */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-500" />
                <span>Pays</span>
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCountry(null)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    !selectedCountry 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Toutes les réglementations</span>
                    <span className="text-sm text-gray-500">
                      {countries.reduce((sum, country) => sum + country.regulations.length, 0)}
                    </span>
                  </div>
                </button>
                
                {countries.map((country) => (
                  <CountryCard
                    key={country.id}
                    country={country}
                    isSelected={selectedCountry?.id === country.id}
                    onClick={setSelectedCountry}
                  />
                ))}
              </div>
            </div>

            {/* Réglementations récentes */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Récemment mises à jour</span>
              </h3>
              
              <div className="space-y-3">
                {countries.slice(0, 3).map((country) => (
                  <div key={country.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {country.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {country.lastUpdate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Liens utiles */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Liens utiles
              </h3>
              
              <div className="space-y-3">
                <Link 
                  href="/dashboard/reglementation/guides"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Book className="h-4 w-4" />
                  <span>Guides de conformité</span>
                </Link>
                <Link 
                  href="/dashboard/reglementation/templates"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FileText className="h-4 w-4" />
                  <span>Modèles de documents</span>
                </Link>
                <Link 
                  href="/dashboard/reglementation/experts"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Users className="h-4 w-4" />
                  <span>Consultez nos experts</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and filters */}
            <div className="card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Rechercher une réglementation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10 pr-4 py-3 w-full"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="input-field py-2 px-3"
                  >
                    {statuses.map(status => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Header du contenu */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedCountry 
                    ? `Réglementations - ${selectedCountry.name}` 
                    : 'Toutes les réglementations'
                  }
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {filteredRegulations.length} réglementation{filteredRegulations.length > 1 ? 's' : ''} trouvée{filteredRegulations.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Liste des réglementations */}
            <div className="space-y-6">
              {filteredRegulations.length === 0 ? (
                <div className="card p-12 text-center">
                  <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Aucune réglementation trouvée
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Essayez de modifier vos critères de recherche
                  </p>
                </div>
              ) : (
                filteredRegulations.map((regulation) => (
                  <RegulationItem
                    key={regulation.id}
                    regulation={regulation}
                    isExpanded={expandedRegulations.has(regulation.id)}
                    onToggle={() => toggleExpanded(regulation.id)}
                  />
                ))
              )}
            </div>

            {/* Load more */}
            {filteredRegulations.length > 0 && (
              <div className="text-center">
                <button className="btn-outline px-8 py-3">
                  Charger plus de réglementations
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}