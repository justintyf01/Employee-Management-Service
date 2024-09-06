"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useCheckJwtQuery } from "@/api/auth-api";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { data, error, isLoading } = useCheckJwtQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (!isLoading && !data && error) {
            setIsAuthenticated(false);
            router.push("/");
        } else {
            if (pathname === "/") {
                router.push("/dashboard");
            }
            setIsAuthenticated(true);
        }
    }, [data, error, isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
