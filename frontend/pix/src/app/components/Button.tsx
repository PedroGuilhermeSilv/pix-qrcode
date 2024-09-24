"use client";
import React, { useState } from "react";

interface ButtonProps {
    children: string;
    isLoad?: boolean;
    generateQrCode: () => void | Promise<void>;

}


export const Button: React.FC<ButtonProps> = ({ children, isLoad = false, generateQrCode }) => {
    const [loading, setLoading] = useState(isLoad);

    const handleLoading = async () => {
        setLoading(true);
        await generateQrCode();
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