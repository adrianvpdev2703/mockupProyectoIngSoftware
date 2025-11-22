import React, { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Package, FileText, LogOut } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SidebarItem = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
    <Link
        to={to}
        className={`flex items-center p-3 mb-2 rounded-lg transition-colors ${active ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"}`}
    >
        <Icon size={20} className="mr-3" />
        <span className="font-medium">{label}</span>
    </Link>
);

const Layout = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg z-10">
                <div className="p-6 border-b border-gray-100 flex items-center justify-center flex-col">
                    {/* Logo Simulado */}
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-white font-bold text-xl">SC</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">SIGIFEM</h1>
                    <p className="text-xs text-gray-500">Stark Codex</p>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Módulos</div>
                    <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" active={location.pathname === "/"} />
                    <SidebarItem to="/inventario" icon={Package} label="Bodega & Stock" active={location.pathname === "/inventario"} />
                    <SidebarItem to="/ventas" icon={ShoppingCart} label="Punto de Venta" active={location.pathname === "/ventas"} />
                    <SidebarItem to="/reportes" icon={FileText} label="Reportes" active={location.pathname === "/reportes"} />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center text-red-500 hover:bg-red-50 p-2 rounded-lg w-full transition-colors">
                        <LogOut size={18} className="mr-2" />
                        <span className="text-sm font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-0">
                    <h2 className="font-semibold text-gray-700">Ferretería El Tornillo Feliz - Sucursal Norte</h2>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-800">Adrián Vaca</p>
                            <p className="text-xs text-gray-500">Gerente de Desarrollo</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">AV</div>
                    </div>
                </header>
                <div className="p-8 max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    );
};

export default Layout;
