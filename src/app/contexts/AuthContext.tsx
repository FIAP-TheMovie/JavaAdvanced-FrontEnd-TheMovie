"use client"

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // Certifique-se de que a biblioteca está instalada

interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Supondo que você armazena o token aqui
        if (token) {
            try {
                const decoded: User = jwtDecode(token); // Decodifica o token
                setUser(decoded); // Define o usuário diretamente a partir do token decodificado
            } catch (error) {
                console.error("Token decoding failed:", error);
                setUser(null); // Limpa o usuário se houver erro
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};