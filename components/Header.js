import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="hover:opacity-80 transition duration-300">
              <img 
                src="/logo.png" 
                alt="Pá-chego Fretes - Fretes Rápidos e Mudanças" 
                className="h-12 w-auto"
              />
            </a>
          </div>
          
          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className="text-gray-300 hover:text-white font-medium transition duration-300"
            >
              Início
            </a>
            <a 
              href="/calculadora" 
              className="text-gray-300 hover:text-white font-medium transition duration-300"
            >
              🧮 Calculadora
            </a>
            <a 
              href="https://pachego.com.br/orcar-frete/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white font-medium transition duration-300"
            >
              Orçamento
            </a>
          </nav>
          
          {/* Botões de Ação */}
          <div className="flex items-center space-x-4">
            {/* Botão WhatsApp */}
            <a 
              href="https://api.whatsapp.com/send?phone=5562991103510&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20um%20or%C3%A7amento%20de%20frete!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center text-green-400 hover:text-green-300 font-medium transition duration-300 min-h-[24px]"
            >
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Falar via WhatsApp
            </a>
            
            {/* Botão Orçamento */}
            <a 
              href="https://pachego.com.br/orcar-frete/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-sm hover:shadow-md"
            >
              Orçamento Rápido
            </a>
          </div>
          
          {/* Menu Mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="/" 
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </a>
              <a 
                href="/calculadora" 
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                🧮 Calculadora
              </a>
              <a 
                href="https://pachego.com.br/orcar-frete/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Orçamento
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}