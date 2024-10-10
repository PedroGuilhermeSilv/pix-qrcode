"use client";
import { useEffect, useState } from "react";
import { isAutenticated } from "../lib/actions";

export default function MyList() {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAutenticated();
            setIsAuthorized(authStatus!);
        };

        checkAuth();
    }, []);
    return (
        isAuthorized ? (
            <div>
                <h1>My List</h1>
            </div>
        ) : (
            <div>
                <h1>Not authenticated</h1>
            </div>
        )
    );
}