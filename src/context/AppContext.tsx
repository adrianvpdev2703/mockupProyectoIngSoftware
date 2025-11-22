import React, { createContext, useContext, useState, type ReactNode } from "react";

// Definición de Tipos (TypeScript)
export interface Producto {
    id: number;
    sku: string;
    nombre: string;
    precio: number;
    stock: number;
    categoria: string;
    lote: string;
}

export interface CartItem extends Producto {
    cantidad: number;
}

export interface Venta {
    id: number;
    fecha: string;
    items: CartItem[];
    total: number;
    vendedor: string;
}

interface AppContextType {
    productos: Producto[];
    ventas: Venta[];
    carrito: CartItem[];
    agregarAlCarrito: (producto: Producto) => void;
    removerDelCarrito: (id: number) => void;
    procesarVenta: () => void;
    setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    // Datos simulados para "El Tornillo Feliz"
    const [productos, setProductos] = useState<Producto[]>([
        { id: 1, sku: "FER-001", nombre: "Taladro Percutor Bosch", precio: 120.5, stock: 15, categoria: "Herramientas", lote: "L-2025-A" },
        { id: 2, sku: "CONST-055", nombre: "Cemento Camba 50kg", precio: 8.0, stock: 500, categoria: "Construcción", lote: "L-2025-B" },
        { id: 3, sku: "ELEC-102", nombre: "Cable #12 Rollo 100m", precio: 45.0, stock: 8, categoria: "Electricidad", lote: "L-2024-C" },
        { id: 4, sku: "PINT-009", nombre: "Pintura Latex Blanca 18L", precio: 60.0, stock: 20, categoria: "Pinturas", lote: "L-2025-A" },
    ]);

    const [ventas, setVentas] = useState<Venta[]>([]);
    const [carrito, setCarrito] = useState<CartItem[]>([]);

    const agregarAlCarrito = (producto: Producto) => {
        setCarrito(prev => {
            const existe = prev.find(item => item.id === producto.id);
            if (existe) {
                return prev.map(item => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const removerDelCarrito = (id: number) => {
        setCarrito(prev => prev.filter(item => item.id !== id));
    };

    const procesarVenta = () => {
        if (carrito.length === 0) return;

        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        const nuevaVenta: Venta = {
            id: Date.now(),
            fecha: new Date().toLocaleString(),
            items: carrito,
            total: total,
            vendedor: "Vendedor Turno Mañana",
        };

        // Actualizar stock (descontar productos)
        setProductos(prevProductos =>
            prevProductos.map(prod => {
                const itemVendido = carrito.find(c => c.id === prod.id);
                return itemVendido ? { ...prod, stock: prod.stock - itemVendido.cantidad } : prod;
            }),
        );

        setVentas([nuevaVenta, ...ventas]);
        setCarrito([]);
        alert("✅ Venta registrada correctamente en SIGIFEM");
    };

    return (
        <AppContext.Provider
            value={{
                productos,
                setProductos,
                ventas,
                carrito,
                agregarAlCarrito,
                removerDelCarrito,
                procesarVenta,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp debe usarse dentro de un AppProvider");
    return context;
};
