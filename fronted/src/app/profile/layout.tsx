import React from 'react'
import Link from 'next/link'
import { TrophyIcon, GamepadIcon } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800 border-b border-purple-600">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link href="/admin" className="text-2xl sm:text-3xl font-bold text-purple-400 mb-4 sm:mb-0">
              Panel de Administración 
            </Link>
            <nav className="flex space-x-4">
              <Link
                href="/admin/tournaments"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                <TrophyIcon className="w-5 h-5 mr-1" />
                Torneos
              </Link>
              <Link
                href="/admin/games"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                <GamepadIcon className="w-5 h-5 mr-1" />
                Juegos
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
