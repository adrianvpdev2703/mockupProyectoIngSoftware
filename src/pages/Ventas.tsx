/* eslint-disable react-hooks/purity */
import React from "react";
import { useApp } from "../context/AppContext";
import { ShoppingCart, Trash2, CreditCard, PlusCircle } from "lucide-react";

const Ventas = () => {
    const { productos, carrito, agregarAlCarrito, removerDelCarrito, procesarVenta } = useApp();
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-9rem)]">
            {/* Izquierda: Catálogo Grid */}
            <div className="flex-1 overflow-y-auto pr-2">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Catálogo de Productos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {productos.map(prod => (
                        <div key={prod.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col h-full">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">{prod.categoria}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${prod.stock > 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}>
                                    {prod.stock > 0 ? `${prod.stock} en stock` : "Agotado"}
                                </span>
                            </div>

                            <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{prod.nombre}</h3>
                            <p className="text-sm text-gray-400 mb-4 font-mono">{prod.sku}</p>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                <span className="text-2xl font-bold text-gray-900">${prod.precio.toFixed(2)}</span>
                                <button
                                    onClick={() => agregarAlCarrito(prod)}
                                    disabled={prod.stock === 0}
                                    className={`p-2 rounded-lg transition-colors ${
                                        prod.stock > 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    <PlusCircle size={24} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Derecha: Ticket / Carrito */}
            <div className="w-full lg:w-96 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-full">
                <div className="p-5 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center">
                        <ShoppingCart className="mr-2 text-blue-600" size={20} /> Ticket de Venta
                    </h3>
                    <span className="text-xs font-mono text-gray-400">#{Date.now().toString().slice(-6)}</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {carrito.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                            <ShoppingCart size={48} className="mb-2" />
                            <p>Carrito vacío</p>
                        </div>
                    ) : (
                        carrito.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg group">
                                <div className="flex-1">
                                    <p className="font-medium text-sm text-gray-800 line-clamp-1">{item.nombre}</p>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <span className="font-bold mr-1">{item.cantidad}</span> x ${item.precio.toFixed(2)}
                                    </div>
                                </div>
                                <div className="text-right pl-2">
                                    <p className="font-bold text-gray-800 mb-1">${(item.cantidad * item.precio).toFixed(2)}</p>
                                    <button onClick={() => removerDelCarrito(item.id)} className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>Impuestos (13%)</span>
                            <span>${(total * 0.13).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-900 font-bold text-xl pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>${(total * 1.13).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={procesarVenta}
                        disabled={carrito.length === 0}
                        className={`w-full py-3.5 rounded-xl font-bold flex justify-center items-center shadow-lg transition-all transform active:scale-95 ${
                            carrito.length > 0 ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200" : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        }`}
                    >
                        <CreditCard className="mr-2" size={20} /> Cobrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ventas;
