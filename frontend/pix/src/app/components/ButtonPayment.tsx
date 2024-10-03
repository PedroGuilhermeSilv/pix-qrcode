"use client";
import { useState } from "react";
import { Product } from "../@types/products";

interface ButtonPaymentProps {
    children: string;
    isLoad?: boolean;
    action: (template: Product) => void | Promise<void>;
    template: Product;
}

export const ButtonPayment = ({ children, isLoad = false, action, template }: ButtonPaymentProps) => {
    const [loading, setLoading] = useState(isLoad);

    const handleLoading = async () => {
        setLoading(true);
        console.log("cheguei aqui");
        await action(template);
        setLoading(false);
    };

    return (
        <button
            type="button"
            onClick={handleLoading}
            className={`text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
        >
            {loading ? "Carregando..." : children}
        </button>
    );
};