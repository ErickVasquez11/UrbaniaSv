import React from 'react';
import { X, Download, Printer as Print, Building2 } from 'lucide-react';

interface SalesPDFProps {
  sale: any;
  onClose: () => void;
}

const SalesPDF: React.FC<SalesPDFProps> = ({ sale, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    element.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihGQUNUVVJBIERFTU8pIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmCjAwMDAwMDAwMDkgMDAwMDAgbgowMDAwMDAwMDU4IDAwMDAwIG4KMDAwMDAwMDExNSAwMDAwMCBuCjAwMDAwMDAyNDUgMDAwMDAgbgowMDAwMDAwMzA3IDAwMDAwIG4KdHJhaWxlcgo8PC9TaXplIDYvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgo0MDIKJSVFT0Y=';
    element.download = `factura-${sale.invoiceNumber}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 lg:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] lg:max-h-[90vh] overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 lg:p-4 border-b space-y-2 sm:space-y-0">
          <h3 className="text-base lg:text-lg font-semibold">Factura - {sale.invoiceNumber}</h3>
          <div className="flex items-center space-x-2 lg:space-x-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1 lg:space-x-2 bg-blue-600 text-white px-2 lg:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs lg:text-sm flex-1 sm:flex-none justify-center"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 lg:space-x-2 bg-green-600 text-white px-2 lg:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs lg:text-sm flex-1 sm:flex-none justify-center"
            >
              <Print className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
              <span className="sm:hidden">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-3 lg:p-6 overflow-y-auto max-h-[calc(95vh-100px)] lg:max-h-[calc(90vh-80px)]">
          <div className="bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Official DTE Header */}
            <div className="border-2 border-gray-800 p-2 lg:p-4 mb-4 lg:mb-6">
              <div className="text-center mb-4">
                <h1 className="text-sm lg:text-lg font-bold text-gray-800 mb-1">DOCUMENTO TRIBUTARIO ELECTRÓNICO</h1>
                <h2 className="text-xs lg:text-base font-bold text-gray-800">COMPROBANTE DE CRÉDITO FISCAL</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 text-xs">
                <div>
                  <p><strong>Código de Generación:</strong> {sale.generationCode || 'A1DC304-C374-8901-ABC0-12345678912'}</p>
                  <p><strong>Número de Control:</strong> DTE-01-00000001-000000000000001</p>
                  <p><strong>Sello de recepción:</strong> MH-DTE-2024-001</p>
                </div>
                <div className="flex justify-center items-center order-last lg:order-none">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 border border-gray-400 flex items-center justify-center">
                    <span className="text-xs">QR CODE</span>
                  </div>
                </div>
                <div className="lg:text-right">
                  <p><strong>Modelo de facturación:</strong> Previo</p>
                  <p><strong>Tipo de transmisión:</strong> Normal</p>
                  <p><strong>Fecha y Hora de Generación:</strong> {sale.date.toLocaleDateString()} {sale.date.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>

            {/* Emisor y Receptor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6 text-xs">
              <div>
                <div className="border border-gray-400 p-2 lg:p-3">
                  <h3 className="font-bold text-center mb-2">EMISOR</h3>
                  <p><strong>Nombre o razón social:</strong> EMPRESA DEMO SV SOCIEDAD ANÓNIMA</p>
                  <p><strong>NIT:</strong> 0614-120589-101-2</p>
                  <p><strong>NRC:</strong> 123456-7</p>
                  <p><strong>Actividad económica:</strong> Comercio y Reparación</p>
                  <p><strong>Dirección:</strong> Col. 5 de Noviembre, San Salvador</p>
                  <p><strong>Número de teléfono:</strong> 2222-2222</p>
                  <p><strong>Correo electrónico:</strong> empresa@demo.com.sv</p>
                  <p><strong>Nombre comercial:</strong></p>
                  <p><strong>Tipo de establecimiento:</strong> Casa Matriz</p>
                </div>
              </div>
              
              <div>
                <div className="border border-gray-400 p-2 lg:p-3">
                  <h3 className="font-bold text-center mb-2">RECEPTOR</h3>
                  <p><strong>Nombre o razón social:</strong> {sale.client?.name?.toUpperCase()}</p>
                  <p><strong>NIT:</strong> {sale.client?.nit}</p>
                  <p><strong>NRC:</strong> {sale.client?.nrc}</p>
                  <p><strong>Actividad económica:</strong> Actividades de Contabilidad</p>
                  <p><strong>Dirección:</strong> {sale.client?.address}</p>
                  <p><strong>Correo electrónico:</strong> {sale.client?.email}</p>
                  <p><strong>Número comercial:</strong></p>
                </div>
              </div>
            </div>

            {/* Tabla de Items */}
            <div className="mb-4 lg:mb-6 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-800 text-xs min-w-[800px]">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-800 px-1 lg:px-2 py-1 text-center font-bold">N°</th>
                    <th className="border border-gray-800 px-1 lg:px-2 py-1 text-center font-bold">Cantidad</th>
                    <th className="border border-gray-800 px-1 lg:px-2 py-1 text-center font-bold">Unidad</th>
                    <th className="border border-gray-800 px-1 lg:px-2 py-1 text-center font-bold">Descripción</th>
                    <th className="border border-gray-800 px-1 lg:px-2 py-1 text-center font-bold">Precio Unitario</th>
                    <th className="border border-gray-800 px-1 lg:px-2 py-1 text-center font-bold">Descuentos</th>
                    <th className="border border-gray-800 px-1 lg:px-2 py-1 text-center font-bold">No Sujetas</th>
                    <th className="border border-gray-800 px-1 lg:px-2 py-1 text-center font-bold">Exentas</th>
                    <th className="border border-gray-800 px-1 lg:px-2 py-1 text-center font-bold">Gravadas</th>
                  </tr>
                </thead>
                <tbody>
                  {sale.items.map((item: any, index: number) => (
                    <tr key={item.id}>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1 text-center">{index + 1}</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1 text-center">{item.quantity}</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1 text-center">UNIDAD</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1">{item.productName}</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">$0.00</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">$0.00</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">$0.00</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                  {/* Empty rows to fill space */}
                  {Array.from({ length: Math.max(0, 5 - sale.items.length) }).map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1 text-center">&nbsp;</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1">&nbsp;</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1">&nbsp;</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1">&nbsp;</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1">&nbsp;</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1">&nbsp;</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1">&nbsp;</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1">&nbsp;</td>
                      <td className="border border-gray-800 px-1 lg:px-2 py-1">&nbsp;</td>
                    </tr>
                  ))}
                  
                  {/* Summary rows */}
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right font-bold">Suma Total de Operaciones:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right font-bold">${sale.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right">Monto global Desc., Rebajas y otros conceptos:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">$0.00</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right">Monto global Desc., Rebajas y otros conceptos:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">$0.00</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right">Sub-Total:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">${sale.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right">IVA 13%:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">${sale.tax.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right">Sub-Total:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">${(sale.subtotal + sale.tax).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right">IVA Percibido:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">$0.00</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right">IVA Retenido:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">$0.00</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right">Retención Renta:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right">$0.00</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right font-bold">Monto Total de la Operación:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right font-bold">${sale.total.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right font-bold">Total en Letras:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right font-bold">${sale.total.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={8} className="border border-gray-800 px-1 lg:px-2 py-1 text-right font-bold">Valor a Pagar:</td>
                    <td className="border border-gray-800 px-1 lg:px-2 py-1 text-right font-bold">${sale.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 text-xs">
              <div className="border border-gray-400 p-2 lg:p-3">
                <p><strong>Valor en Letras:</strong> Doscientos sesenta y dos 06/100 dólares</p>
                <p><strong>Observaciones:</strong></p>
              </div>
              
              <div className="border border-gray-400 p-2 lg:p-3">
                <p><strong>Condiciones de la Operación:</strong> Contado</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4 text-xs">
              <div>
                <p><strong>Responsable por parte del emisor:</strong> Juan Pérez</p>
                <p><strong>N° de Documento:</strong> 44444444-3</p>
              </div>
              
              <div>
                <p><strong>Responsable por parte del Receptor:</strong> Martín Martínez</p>
                <p><strong>N° de Documento:</strong> 33333333-4</p>
              </div>
            </div>
            
            <div className="text-center mt-4 text-xs">
              <p>Página 1 de 1</p>
            </div>
            
            {/* Company Info Footer */}
            <div className="mt-4 lg:mt-6 text-center text-xs border-t pt-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">EMPRESA DEMO SV</span>
              </div>
              <p>Sistema de Facturación Electrónica - Ministerio de Hacienda El Salvador</p>
              <p className="text-gray-500">Documento generado electrónicamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPDF;