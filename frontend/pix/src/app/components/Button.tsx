"use client";
import { useState } from "react";

interface ButtonProps {
    children: string;
    isLoad?: boolean;
    action: () => void | Promise<void>;
}

export const Button = <T,>({ children, isLoad = false, action }: ButtonProps) => {
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
            className={`text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
        >
            {loading ? "Carregando..." : children}
        </button>
    );
};