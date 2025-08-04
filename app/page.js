'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Users, 
  BookOpen, 
  Award,
  ArrowRight,
  Play,
  Globe,
  Lock,
  Zap
} from 'lucide-react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Renforcez la Cybersécurité de votre ONG",
      subtitle: "Plateforme collaborative pour les ONG en Afrique de l'Ouest",
      description: "Accédez à des formations, ressources et outils pratiques pour protéger votre organisation contre les cybermenaces.",
      image: "/api/placeholder/800/600",
      cta: "Découvrir la plateforme",
      background: "from-blue-600 via-purple-600 to-cyan-600"
    },
    {
      id: 2,
      title: "Formation en Cybersécurité",
      subtitle: "Apprenez avec des experts certifiés",
      description: "Modules interactifs, certifications numériques et webinaires avec des spécialistes en cybersécurité.",
      image: "/api/placeholder/800/600",
      cta: "Commencer une formation",
      background: "from-emerald-600 via-teal-600 to-green-600"
    },
    {
      id: 3,
      title: "Communauté & Support",
      subtitle: "Échangez avec d'autres professionnels",
      description: "Forums de discussion, sessions Q&R avec experts et partage d'expériences entre ONG.",
      image: "/api/placeholder/800/600", 
      cta: "Rejoindre la communauté",
      background: "from-orange-600 via-red-600 to-pink-600"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Protection contre les attaques DDoS, chiffrement SSL/TLS et authentification forte",
      color: "text-blue-500"
    },
    {
      icon: BookOpen,
      title: "Base de Connaissances",
      description: "Articles, guides pratiques et modèles de plans de cybersécurité",
      color: "text-green-500"
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Réseau d'ONG partageant bonnes pratiques et retours d'expérience",
      color: "text-purple-500"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Attestations numériques et badges de compétences reconnues",
      color: "text-orange-500"
    }
  ];

  const stats = [
    { number: "500+", label: "ONG Partenaires", icon: Users },
    { number: "50+", label: "Formations", icon: BookOpen },
    { number: "15+", label: "Pays Couverts", icon: Globe },
    { number: "99.9%", label: "Disponibilité", icon: Zap }
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                E-ARONCY
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="/formations" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Formations
              </Link>
              <Link href="/ressources" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Ressources
              </Link>
              <Link href="/communaute" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Communauté
              </Link>
              <Link href="/reglementation" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Réglementation
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                Connexion
              </Link>
              <Link 
                href="/auth/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.background} opacity-90`} />
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                <div className={`text-white transform transition-all duration-1000 delay-300 ${
                  index === currentSlide && isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                }`}>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl mb-4 text-blue-100">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg mb-8 text-blue-50 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center space-x-2">
                      <span>{slide.cta}</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center space-x-2">
                      <Play className="h-5 w-5" />
                      <span>Voir la démo</span>
                    </button>
                  </div>
                </div>
                
                <div className={`transform transition-all duration-1000 delay-500 ${
                  index === currentSlide && isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm transform rotate-6"></div>
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                      <div className="space-y-4">
                        <div className="h-4 bg-white/30 rounded animate-pulse"></div>
                        <div className="h-4 bg-white/20 rounded animate-pulse delay-100"></div>
                        <div className="h-4 bg-white/25 rounded animate-pulse delay-200"></div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="h-20 bg-white/20 rounded-lg animate-pulse delay-300"></div>
                          <div className="h-20 bg-white/20 rounded-lg animate-pulse delay-400"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pourquoi choisir E-ARONCY ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Une plateforme complète dédiée au renforcement de la cybersécurité des ONG en Afrique de l'Ouest
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à sécuriser votre organisation ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez plus de 500 ONG qui font confiance à E-ARONCY pour leur cybersécurité
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Commencer gratuitement
            </Link>
            <Link 
              href="/demo"
              className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all duration-300"
            >
              Demander une démo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">E-ARONCY</span>
              </div>
              <p className="text-gray-400">
                Alliance Régionale des ONG pour la Cybersécurité en Afrique de l'Ouest
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Plateforme</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/formations" className="hover:text-white transition-colors">Formations</Link></li>
                <li><Link href="/ressources" className="hover:text-white transition-colors">Ressources</Link></li>
                <li><Link href="/communaute" className="hover:text-white transition-colors">Communauté</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/aide" className="hover:text-white transition-colors">Centre d'aide</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/conditions" className="hover:text-white transition-colors">Conditions</Link></li>
                <li><Link href="/securite" className="hover:text-white transition-colors">Sécurité</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 E-ARONCY. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}