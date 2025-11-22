import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Search, AlertTriangle, PackagePlus, Tag } from "lucide-react";

const Inventario = () => {
    const { productos } = useApp();
    const [busqueda, setBusqueda] = useState("");

    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.sku.toLowerCase().includes(busqueda.toLowerCase()));

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Inventario General</h2>
                    <p className="text-gray-500">Gestión de stock y lotes de productos</p>
                </div>
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center shadow hover:bg-blue-700 transition-all">
                    <PackagePlus size={20} className="mr-2" /> Nuevo Producto
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por código SKU, nombre o categoría..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                            <tr>
                                <th className="p-4">SKU / Lote</th>
                                <th className="p-4">Producto</th>
                                <th className="p-4">Categoría</th>
                                <th className="p-4 text-right">Precio Unit.</th>
                                <th className="p-4 text-center">Stock Actual</th>
                                <th className="p-4 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtrados.map(prod => (
                                <tr key={prod.id} className="hover:bg-blue-50 transition-colors group">
                                    <td className="p-4">
                                        <div className="font-mono text-sm font-bold text-gray-700">{prod.sku}</div>
                                        <div className="text-xs text-gray-400 flex items-center mt-1">
                                            <Tag size={10} className="mr-1" /> {prod.lote}
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{prod.nombre}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold">{prod.categoria}</span>
                                    </td>
                                    <td className="p-4 text-right font-medium text-gray-700">${prod.precio.toFixed(2)}</td>
                                    <td className="p-4 text-center font-bold text-lg">{prod.stock}</td>
                                    <td className="p-4 text-center">
                                        {prod.stock < 10 ? (
                                            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                <AlertTriangle size={12} className="mr-1" /> Bajo Stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Disponible
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtrados.length === 0 && <div className="p-10 text-center text-gray-400">No se encontraron productos con ese criterio.</div>}
            </div>
        </div>
    );
};

export default Inventario;
