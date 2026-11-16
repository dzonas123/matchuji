"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CartItem = {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
};

// IDs hlavních matcha produktů, po jejichž přidání se ukáže upsell popup
const MATCHA_PRODUCT_IDS = ["matcha-50g", "matcha-50g-pack3", "matcha-3pack"];

type CartContextType = {
    items: CartItem[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    showUpsell: boolean;
    setShowUpsell: (show: boolean) => void;
    addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    total: number;
    savings: number;
    count: number;
    clearCart: () => void;
    stockMap: Record<string, number>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showUpsell, setShowUpsell] = useState(false);
    const [stockMap, setStockMap] = useState<Record<string, number>>({});

    // Fetch stock from API
    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const newMap: Record<string, number> = {};
                    data.forEach((p: any) => {
                        newMap[p.id] = p.stock;
                    });
                    setStockMap(newMap);
                }
            })
            .catch(e => console.error("Failed to load stock data", e));
    }, []);

    // Load cart from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("matchuji_cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem("matchuji_cart", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
        const productStock = stockMap[newItem.id];
        if (productStock !== undefined && productStock <= 0) {
            return; // Prevent adding out of stock item
        }

        const qtyToAdd = newItem.quantity || 1;
        setItems((current) => {
            const existing = current.find((item) => item.id === newItem.id);
            if (existing) {
                return current.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + qtyToAdd }
                        : item
                );
            }
            return [...current, { ...newItem, quantity: qtyToAdd }];
        });

        // Zobraz upsell popup pokud zákazník přidal matcha (ne set)
        // a set ještě nemá v košíku a set je skladem
        if (MATCHA_PRODUCT_IDS.includes(newItem.id)) {
            setItems((current) => {
                const hasSet = current.some((i) => i.id === "matcha-metlicka");
                const chasenStock = stockMap["matcha-metlicka"];
                const isChasenAvailable = chasenStock === undefined || chasenStock > 0;
                
                if (!hasSet && isChasenAvailable) {
                    setTimeout(() => setShowUpsell(true), 400);
                }
                return current;
            });
        }

        // Meta Pixel - AddToCart event
        if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "AddToCart", {
                content_ids: [newItem.id],
                content_name: newItem.name,
                content_type: "product",
                value: newItem.price * qtyToAdd,
                currency: "CZK",
            });
        }

        setIsOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((current) => current.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems((current) =>
            current.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            }).filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const savings = items.reduce((sum, item) => {
        if (item.originalPrice && item.originalPrice > item.price) {
            return sum + (item.originalPrice - item.price) * item.quantity;
        }
        return sum;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                setIsOpen,
                showUpsell,
                setShowUpsell,
                addItem,
                removeItem,
                updateQuantity,
                total,
                savings,
                count,
                clearCart,
                stockMap, // EXPORT stockMap
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
