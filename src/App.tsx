import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Inventario from "./pages/Inventario";
import Ventas from "./pages/Ventas";
import Reportes from "./pages/Reportes"; // <--- Importar Reportes

// Dashboard simple (Se mantiene igual o puedes mejorarlo)
const Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <h3 className="text-gray-500 font-medium mb-1">Ingresos Diarios</h3>
            <p className="text-3xl font-bold text-gray-800">$1,250.00</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 font-medium mb-1">Ventas Totales</h3>
            <p className="text-3xl font-bold text-gray-800">45</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
            <h3 className="text-gray-500 font-medium mb-1">Alertas de Stock</h3>
            <p className="text-3xl font-bold text-gray-800">3</p>
        </div>
    </div>
);

function App() {
    return (
        <AppProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/inventario" element={<Inventario />} />
                        <Route path="/ventas" element={<Ventas />} />
                        <Route path="/reportes" element={<Reportes />} /> {/* <--- Nueva Ruta */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Layout>
            </Router>
        </AppProvider>
    );
}

export default App;
