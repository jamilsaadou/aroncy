'use client';

import Link from 'next/link';
import { 
  Shield,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowUp,
  ExternalLink,
  Globe,
  Users,
  BookOpen,
  Award,
  Heart,
  ChevronRight
} from 'lucide-react';

export default function Footer({ variant = 'default' }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Formations', href: '/dashboard/formations' },
      { label: 'Ressources', href: '/dashboard/ressources' },
      { label: 'Communauté', href: '/dashboard/communaute' },
      { label: 'Réglementation', href: '/dashboard/reglementation' },
      { label: 'Certifications', href: '/dashboard/certifications' }
    ],
    support: [
      { label: 'Centre d\'aide', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Guides de démarrage', href: '/getting-started' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' }
    ],
    organization: [
      { label: 'À propos', href: '/about' },
      { label: 'Notre mission', href: '/mission' },
      { label: 'Équipe', href: '/team' },
      { label: 'Partenaires', href: '/partners' },
      { label: 'Carrières', href: '/careers' }
    ],
    legal: [
      { label: 'Conditions d\'utilisation', href: '/terms' },
      { label: 'Politique de confidentialité', href: '/privacy' },
      { label: 'Politique de cookies', href: '/cookies' },
      { label: 'Mentions légales', href: '/legal' },
      { label: 'Sécurité', href: '/security' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/earoncy', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/earoncy', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/earoncy', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/earoncy', label: 'YouTube' },
    { icon: Instagram, href: 'https://instagram.com/earoncy', label: 'Instagram' }
  ];

  const countries = [
    'Bénin', 'Burkina Faso', 'Cap-Vert', 'Côte d\'Ivoire', 'Gambie',
    'Ghana', 'Guinée', 'Guinée-Bissau', 'Libéria', 'Mali',
    'Mauritanie', 'Niger', 'Nigéria', 'Sénégal', 'Sierra Leone', 'Togo'
  ];

  const stats = [
    { icon: Users, value: '2,847', label: 'Membres actifs' },
    { icon: BookOpen, value: '156', label: 'Formations' },
    { icon: Award, value: '892', label: 'Certificats délivrés' },
    { icon: Globe, value: '16', label: 'Pays couverts' }
  ];

  if (variant === 'minimal') {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">E-ARONCY</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Conditions
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            
            <p className="text-sm text-gray-400 mt-4 md:mt-0">
              © {currentYear} E-ARONCY. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Statistiques */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">E-ARONCY en chiffres</h3>
            <p className="text-gray-400">
              Notre impact sur la cybersécurité en Afrique de l'Ouest
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Restez informé des dernières actualités
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Recevez notre newsletter mensuelle avec les dernières formations, ressources 
            et actualités en cybersécurité pour les ONG.
          </p>
          
          <form className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              S'abonner
            </button>
          </form>
          
          <p className="text-blue-100 text-sm mt-4">
            Pas de spam. Désabonnement possible à tout moment.
          </p>
        </div>
      </div>

      {/* Liens principaux */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo et description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold">E-ARONCY</span>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Alliance Régionale des ONG pour la Cybersécurité en Afrique de l'Ouest. 
                Nous œuvrons pour renforcer la sécurité numérique des organisations 
                à but non lucratif à travers la formation, les ressources et la collaboration.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span>contact@e-aroncy.org</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span>+225 07 12 34 56 78</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>Abidjan, Côte d'Ivoire</span>
                </div>
              </div>
            </div>

            {/* Plateforme */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Plateforme</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organisation */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Organisation</h4>
              <ul className="space-y-3">
                {footerLinks.organization.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pays couverts */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <h4 className="text-lg font-semibold mb-6 text-center">Pays couverts</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {countries.map((country, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors cursor-default"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Réseaux sociaux et mentions légales */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-gray-400 text-sm">Suivez-nous:</span>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              {footerLinks.legal.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} E-ARONCY (Alliance Régionale des ONG pour la Cybersécurité). 
              Tous droits réservés.
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Heart className="h-4 w-4 text-red-400" />
                <span>Fait avec passion pour la cybersécurité</span>
              </div>
              
              <button
                onClick={scrollToTop}
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                aria-label="Retour en haut"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}