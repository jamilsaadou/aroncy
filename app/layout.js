import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-ARONCY - Plateforme de Cybersécurité pour ONG',
  description: 'Alliance Régionale des ONG pour la Cybersécurité en Afrique de l\'Ouest. Formation, ressources et communauté dédiées à la cybersécurité.',
  keywords: 'cybersécurité, ONG, Afrique de l\'Ouest, formation, sécurité informatique',
  authors: [{ name: 'E-ARONCY Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'E-ARONCY - Plateforme de Cybersécurité pour ONG',
    description: 'Renforcez la cybersécurité de votre ONG avec notre plateforme collaborative',
    type: 'website',
    locale: 'fr_FR',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {children}
        </div>
      </body>
    </html>
  )
}