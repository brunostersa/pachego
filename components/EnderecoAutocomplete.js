import { useState, useEffect, useRef } from 'react'
import { buscarLugares } from '../data/cidades-setores'

const EnderecoAutocomplete = ({ 
  value, 
  onChange, 
  placeholder, 
  label, 
  onPlaceSelect,
  className = ""
}) => {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)

  // Buscar endereços usando base de dados local
  const buscarEnderecos = (query) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    
    // Simular delay para melhor UX
    setTimeout(() => {
      const resultados = buscarLugares(query)
      setSuggestions(resultados)
      setIsLoading(false)
    }, 150)
  }

  const handleInputChange = (e) => {
    const query = e.target.value
    onChange(query)
    buscarEnderecos(query)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion.endereco)
    setShowSuggestions(false)
    if (onPlaceSelect) {
      onPlaceSelect(suggestion)
    }
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = (e) => {
    // Delay para permitir clique na sugestão
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false)
      }
    }, 200)
  }

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  {suggestion.tipo === 'setor' ? (
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs">📍</span>
                    </div>
                  ) : suggestion.tipo === 'cidade' ? (
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">🏙️</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">🏠</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{suggestion.nome}</p>
                  <p className="text-xs text-gray-500">{suggestion.endereco}</p>
                  <p className="text-xs text-blue-600 capitalize">{suggestion.tipo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensagem quando não há sugestões */}
      {showSuggestions && suggestions.length === 0 && value.length >= 3 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4">
          <p className="text-sm text-gray-500 text-center">
            Nenhum endereço encontrado. Digite um endereço mais específico.
          </p>
        </div>
      )}
    </div>
  )
}

export default EnderecoAutocomplete
