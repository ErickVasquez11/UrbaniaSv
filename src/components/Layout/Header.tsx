import React from 'react';
import { Calendar, Building2, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hidden sm:flex">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-800">
                <span className="hidden sm:inline">Sistema de Facturación Electrónica</span>
                <span className="sm:hidden">SFE</span>
              </h1>
              <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Ministerio de Hacienda - El Salvador</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="flex items-center space-x-2 hidden sm:flex">
              <Building2 className="w-4 h-4 text-gray-500" />
              <span className="font-semibold text-gray-800">Empresa Demo SV</span>
            </div>
            <p className="text-xs lg:text-sm text-gray-600 capitalize hidden md:block">{currentDate}</p>
            <p className="text-xs text-gray-600 md:hidden">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;