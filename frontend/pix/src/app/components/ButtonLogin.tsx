"use client";
import { useState } from "react";
import { UserLoginInput } from "../@types/user";

interface ButtonLoginProps {
    children: string;
    action: (user: UserLoginInput) => void | Promise<void>;
    user: UserLoginInput;
}

export const ButtonLogin = ({ action, children, user }: ButtonLoginProps) => {
    const [loading, setLoading] = useState(false);

    const handleLoading = async () => {
        setLoading(true);
        await action(user);
        setLoading(false);
    };

    return (
        <button
            type="button"
            onClick={handleLoading}
            className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
        >
            {loading ? "Carregando..." : children}
        </button>
    );
};