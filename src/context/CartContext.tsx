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
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showUpsell, setShowUpsell] = useState(false);

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
        // a set ještě nemá v košíku
        if (MATCHA_PRODUCT_IDS.includes(newItem.id)) {
            setItems((current) => {
                const hasSet = current.some((i) => i.id === "matcha-metlicka");
                if (!hasSet) {
                    setTimeout(() => setShowUpsell(true), 400);
                }
                return current;
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
