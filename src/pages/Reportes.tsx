import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { BarChart3, TrendingUp, DollarSign, PieChart, AlertCircle, FileText } from "lucide-react";

const Reportes = () => {
    const { ventas, productos } = useApp();
    const [activeTab, setActiveTab] = useState<"operativo" | "financiero">("operativo");

    // --- CÁLCULOS EN TIEMPO REAL (Contexto) ---
    const totalVentas = ventas.reduce((acc, v) => acc + v.total, 0);
    const productosBajoStock = productos.filter(p => p.stock < 10).length;
    const valorInventario = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);

    // --- DATOS ESTÁTICOS DEL DOCUMENTO (Simulación Financiera) ---
    // Basado en la tabla "Estado de Resultados (Semestral)" del documento [cite: 216]
    const estadoResultados = [
        { concepto: "Ingresos Operativos", monto: 166000, color: "bg-blue-500" },
        { concepto: "Costos y Gastos", monto: 138000, color: "bg-red-400" },
        { concepto: "Utilidad Antes de Imp.", monto: 26000, color: "bg-green-400" },
        { concepto: "Utilidad Neta", monto: 19500, color: "bg-green-600" },
    ];

    // Basado en "Balance General" [cite: 215]
    const balanceGeneral = {
        activos: 212500,
        pasivos: 50000, // Pasivos Corrientes + Préstamo + Intereses
        patrimonio: 162500, // Capital + Resultados Acumulados
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Reportes y Finanzas</h2>
                    <p className="text-gray-500">Análisis de rendimiento y estados financieros</p>
                </div>

                {/* Selector de Pestañas */}
                <div className="bg-white p-1 rounded-lg border border-gray-200 flex">
                    <button
                        onClick={() => setActiveTab("operativo")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                            activeTab === "operativo" ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Operativo (Tiempo Real)
                    </button>
                    <button
                        onClick={() => setActiveTab("financiero")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                            activeTab === "financiero" ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Contable (Mensual)
                    </button>
                </div>
            </div>

            {activeTab === "operativo" ? (
                /* --- VISTA OPERATIVA --- */
                <div className="space-y-6">
                    {/* KPIs Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <DollarSign size={24} />
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12% vs ayer</span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Ventas Totales (Sesión)</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">${totalVentas.toFixed(2)}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <BarChart3 size={24} />
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Valor del Inventario</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">${valorInventario.toFixed(2)}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                    <AlertCircle size={24} />
                                </div>
                                {productosBajoStock > 0 && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Acción requerida</span>}
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Alertas de Stock</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{productosBajoStock} Productos</p>
                        </div>
                    </div>

                    {/* Tabla de Últimas Ventas */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">Registro de Ventas Recientes</h3>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">ID Venta</th>
                                    <th className="px-6 py-3">Fecha</th>
                                    <th className="px-6 py-3">Vendedor</th>
                                    <th className="px-6 py-3 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {ventas.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                            No hay ventas registradas en esta sesión.
                                        </td>
                                    </tr>
                                ) : (
                                    ventas.map(venta => (
                                        <tr key={venta.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 font-mono">#{venta.id.toString().slice(-6)}</td>
                                            <td className="px-6 py-3 text-gray-600">{venta.fecha}</td>
                                            <td className="px-6 py-3">{venta.vendedor}</td>
                                            <td className="px-6 py-3 text-right font-bold text-green-600">${venta.total.toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* --- VISTA FINANCIERA (Basada en el DOC) --- */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Estado de Resultados */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-800 flex items-center">
                                <FileText className="mr-2 text-blue-600" size={20} /> Estado de Resultados
                            </h3>
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Semestral Proyectado</span>
                        </div>

                        <div className="space-y-4">
                            {estadoResultados.map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">{item.concepto}</span>
                                        <span className="font-bold text-gray-800">${item.monto.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full ${item.color}`}
                                            style={{ width: `${(item.monto / 200000) * 100}%` }} // Escala simulada
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500 text-center">
                            Datos basados en proyección semestral con cliente adicional (SIGIFEM).
                        </div>
                    </div>

                    {/* Balance General Simplificado */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-800 flex items-center">
                                <PieChart className="mr-2 text-purple-600" size={20} /> Balance General
                            </h3>
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Al 2025</span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center space-y-6">
                            {/* Activos */}
                            <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex-1">
                                    <p className="text-sm text-green-600 font-semibold mb-1">Total Activos</p>
                                    <p className="text-2xl font-bold text-gray-800">${balanceGeneral.activos.toLocaleString()}</p>
                                </div>
                                <TrendingUp className="text-green-500" size={32} />
                            </div>

                            <div className="flex gap-4">
                                {/* Pasivos */}
                                <div className="flex-1 p-4 bg-red-50 rounded-lg border border-red-100">
                                    <p className="text-sm text-red-600 font-semibold mb-1">Pasivos</p>
                                    <p className="text-xl font-bold text-gray-800">${balanceGeneral.pasivos.toLocaleString()}</p>
                                </div>
                                {/* Patrimonio */}
                                <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <p className="text-sm text-blue-600 font-semibold mb-1">Patrimonio</p>
                                    <p className="text-xl font-bold text-gray-800">${balanceGeneral.patrimonio.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Gráfico de Barra simple Activo = Pasivo + Patrimonio */}
                            <div className="pt-4">
                                <p className="text-xs text-center text-gray-400 mb-2">Ecuación Contable Fundamental</p>
                                <div className="flex h-4 w-full rounded-full overflow-hidden">
                                    <div className="bg-red-400" style={{ width: `${(balanceGeneral.pasivos / balanceGeneral.activos) * 100}%` }} title="Pasivos"></div>
                                    <div className="bg-blue-500" style={{ width: `${(balanceGeneral.patrimonio / balanceGeneral.activos) * 100}%` }} title="Patrimonio"></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Pasivos ({Math.round((balanceGeneral.pasivos / balanceGeneral.activos) * 100)}%)</span>
                                    <span>Patrimonio ({Math.round((balanceGeneral.patrimonio / balanceGeneral.activos) * 100)}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reportes;
