"use client"

import { AuthContext } from "@/app/contexts/AuthContext";
import { AdicionarMovie } from "./home/adicionar-movie";
import { Search } from "./home/search";
import { useContext } from "react";



export default function ButtonsContent() {
    const authContext  = useContext(AuthContext);
    const user = authContext?.user;
    
    return(
        <div className="buttons-header">
            {user ? (
                <>
                    <Search />
                    <AdicionarMovie />
                </>
            ) : (
                <Search />
            )}
        </div>
    )
}