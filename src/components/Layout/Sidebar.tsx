import React from 'react';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  Archive, 
  FileText, 
  Shield, 
  Settings, 
  UserCog,
  LogOut,
  Receipt,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange, isOpen, onToggle }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'sales', icon: ShoppingCart, label: 'Ventas', roles: ['admin', 'cashier'] },
    { id: 'clients', icon: Users, label: 'Clientes', roles: ['admin', 'cashier'] },
    { id: 'products', icon: Package, label: 'Productos', roles: ['admin', 'cashier'] },
    { id: 'inventory', icon: Archive, label: 'Inventario', roles: ['admin', 'cashier'] },
    { id: 'invoicing-history', icon: FileText, label: 'Historial facturación', roles: ['admin', 'cashier'] },
    { id: 'dte', icon: Receipt, label: 'DTE', roles: ['admin', 'cashier'] },
    { id: 'permissions', icon: Shield, label: 'Permisos', roles: ['admin'] },
    { id: 'user-management', icon: UserCog, label: 'Administrar usuarios', roles: ['admin'] },
    { id: 'configuration', icon: Settings, label: 'Configuración', roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-700 text-white min-h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onToggle}
            className="p-2 text-white hover:bg-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
      {/* User Profile */}
        <div className="p-4 lg:p-6 border-b border-slate-600">
        <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm lg:text-base">
            UA
          </div>
          <div>
              <p className="font-semibold text-sm lg:text-base">Usuario</p>
              <p className="text-xs lg:text-sm text-slate-300">
              {user?.role === 'admin' ? 'Administrador' : 'Cajero'}
            </p>
              <p className="text-xs text-slate-400 hidden lg:block">
              {user?.role === 'admin' ? 'Administrador' : 'Cajero'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
        <nav className="flex-1 py-2 lg:py-4">
        {filteredMenuItems.map(item => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          
          return (
            <button
              key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onToggle(); // Close mobile menu after selection
                }}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-600 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
                <span className="text-sm lg:text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
        <div className="p-3 lg:p-4 border-t border-slate-600">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-2 py-3 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors rounded"
        >
          <LogOut className="w-5 h-5" />
            <span className="text-sm lg:text-base">Cerrar Sesión</span>
        </button>
      </div>
      </div>
    </>
  );
};

export default Sidebar;