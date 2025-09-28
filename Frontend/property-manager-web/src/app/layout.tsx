import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PropertyManager - Gestión de Propiedades',
  description: 'Sistema de gestión de propiedades inmobiliarias con diseño moderno y funcionalidades avanzadas',
  keywords: 'propiedades, inmobiliaria, casa, apartamento, venta, alquiler',
  authors: [{ name: 'PropertyManager Team' }],
  openGraph: {
    title: 'PropertyManager - Encuentra tu hogar perfecto',
    description: 'Descubre propiedades excepcionales con nuestra plataforma inteligente',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-gray-50`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}