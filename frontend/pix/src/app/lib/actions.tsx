"use client";
import { useEffect, useState } from 'react';
import { ResponseVerifyToken } from '../@types/login';
import { ApiService } from '../service/apiService';

export function saveSessionId(session_id: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('session_id', session_id);
    }
}

export function saveTokenAccess(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
}

export function saveInLocalStorage(key: string, value: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
}
export function desloged() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
}

export function useGetSessionId() {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedSessionId = localStorage.getItem('session_id');
            setSessionId(storedSessionId);
        }
    }, []);

    return sessionId;
}

export async function isAutenticated() {
    const apiService = new ApiService();
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await apiService.post<ResponseVerifyToken>(`${process.env.NEXT_PUBLIC_API_HOST}/auth/verify`,
                {
                    body: JSON.stringify({ token: token }),
                    headers: {
                        "Content-Type": "application/json",

                    },
                }

            );
            if (!(response.status === 200)) {
                return false;
            }
            return true;
        }
        return false;
    }
}