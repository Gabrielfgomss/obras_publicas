import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Portal de Obras - Acompanhamento de Obras Publicas',
  description: 'Consulte o andamento de obras publicas: status de execucao, atualizacoes de campo, localizacao e cronograma.',
}

export const viewport: Viewport = {
  themeColor: '#1a5276',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">{children}</body>
    </html>
  )
}
