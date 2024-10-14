"use client";
import useAuthStore from "./hooks/useAuth";



const MyListTemplate = () => {
    const useAuth = useAuthStore();
    return (
        useAuth.isAuthenticated ? (
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

export default MyListTemplate;