"use client";
import { useState } from "react";
import { Product } from "../@types/products";

interface ButtonProps {
    children: string;
    isLoad?: boolean;
    action: (template?: Product) => void | Promise<void>;
    template?: Product;
    styled: string;
}

export const Button = ({ children, isLoad = false, action, styled }: ButtonProps) => {
    const [loading, setLoading] = useState(isLoad);

    const handleLoading = async () => {
        setLoading(true);
        await action();
        setLoading(false);
    };

    return (
        <button
            type="button"
            onClick={handleLoading}
            className={`${styled} ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
        >
            {loading ? "Carregando..." : children}
        </button>
    );
};