import React, { useState } from 'react';
import { Users, Plus, Edit2, X, Mail, Phone, FileText, MapPin, Save } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useToast } from '../../contexts/ToastContext';
import { Client } from '../../types';

const ClientsModule: React.FC = () => {
  const { clients, addClient, updateClient } = useData();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dui: '',
    nit: '',
    nrc: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingClient) {
      updateClient(editingClient.id, formData);
      addToast({
        type: 'success',
        title: 'Cliente actualizado',
        message: `${formData.name} ha sido actualizado exitosamente`
      });
    } else {
      addClient(formData);
      addToast({
        type: 'success',
        title: 'Cliente agregado',
        message: `${formData.name} ha sido agregado exitosamente`
      });
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      dui: '',
      nit: '',
      nrc: '',
      address: ''
    });
    setShowForm(false);
    setEditingClient(null);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      dui: client.dui,
      nit: client.nit,
      nrc: client.nrc,
      address: client.address
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dui: '',
      nit: '',
      nrc: '',
      address: ''
    });
    setShowForm(false);
    setEditingClient(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 lg:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-4 lg:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                    {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
                  </h3>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="w-5 h-5 text-gray-600" />
                    <h4 className="text-base lg:text-lg font-semibold text-gray-800">Información Personal</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>Nombre *</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Nombre completo del cliente"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email *</span>
                        </span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="correo@ejemplo.com"
                        required
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Teléfono</span>
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="2234-5678"
                      />
                    </div>
                  </div>
                </div>

                {/* Tax Information Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <h4 className="text-base lg:text-lg font-semibold text-gray-800">Información Tributaria</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        DUI
                      </label>
                      <input
                        type="text"
                        value={formData.dui}
                        onChange={(e) => setFormData({...formData, dui: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="12345678-9"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NIT
                      </label>
                      <input
                        type="text"
                        value={formData.nit}
                        onChange={(e) => setFormData({...formData, nit: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="0614-120589-101-2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NRC
                      </label>
                      <input
                        type="text"
                        value={formData.nrc}
                        onChange={(e) => setFormData({...formData, nrc: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="123456-7"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <h4 className="text-base lg:text-lg font-semibold text-gray-800">Dirección</h4>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección completa
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      rows={3}
                      placeholder="Dirección completa del cliente"
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center justify-center space-x-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingClient ? 'Actualizar' : 'Crear Cliente'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto -mx-4 lg:mx-0">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Email
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Teléfono
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  DUI
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIT
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  NRC
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-3 lg:px-6 py-4 text-xs lg:text-sm font-medium text-gray-900">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-gray-500 sm:hidden">{client.email}</p>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500 hidden sm:table-cell">
                    {client.email}
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500 hidden md:table-cell">
                    {client.phone}
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500 hidden lg:table-cell">
                    {client.dui}
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500">
                    {client.nit}
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500 hidden lg:table-cell">
                    {client.nrc}
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500">
                    <button
                      onClick={() => handleEdit(client)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientsModule;