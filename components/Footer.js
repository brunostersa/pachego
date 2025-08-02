export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Informações da Empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4">CIR Gráfica</h3>
            <p className="text-gray-300 mb-4">
              Especialistas em embalagens e sacolas personalizadas, comunicação visual e brindes personalizados.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>✓ Mais de 10 anos de experiência</p>
              <p>✓ Equipamentos de última geração</p>
              <p>✓ Atendimento personalizado</p>
            </div>
          </div>
          
          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-6 text-gray-300">
              <div className="flex items-start min-h-[28px]">
                <svg className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p>Av. Vereador José Monteiro, N1814<br />Setor Negrão de Lima, Goiânia - GO</p>
              </div>

              <div className="flex items-start min-h-[28px]">
                <svg className="w-5 h-5 mr-3 mt-1 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <a href="https://api.whatsapp.com/send?phone=556232021150&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition duration-300">
                  Falar via WhatsApp
                </a>
              </div>
              <div className="flex items-start min-h-[28px]">
                <svg className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p>atendimento@cirgrafica.com.br</p>
              </div>
            </div>
          </div>
          
          {/* Horário de Funcionamento */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horário de Funcionamento</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Segunda a Sexta:</span>
                <span>8h às 18h</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado:</span>
                <span>8h às 12h</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span>Fechado</span>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href="https://www.cirgrafica.com.br/orcamento-rapido"
                className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CIR Gráfica. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">
            Criado por{' '}
            <a 
              href="https://customerhub.com.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition duration-300 font-medium"
            >
              CustomerHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}