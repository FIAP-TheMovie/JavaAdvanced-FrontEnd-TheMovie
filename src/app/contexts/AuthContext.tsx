"use client"

import { createContext, useState } from "react";


export const AuthContext = createContext({ user: null as User | null, setUser: (user: any) => { } })

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null as User | null)

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}