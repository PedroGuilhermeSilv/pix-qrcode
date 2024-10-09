"use client";
import { useEffect, useState } from 'react';

export function saveSessionId(session_id: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('session_id', session_id);
    }
}

export function saveTokenAccess(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token_access', token);
    }
}

export function saveInLocalStorage(key: string, value: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
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