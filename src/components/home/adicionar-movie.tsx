import Link from "next/link";
import "./css/adicionarMovie.css"
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

export function AdicionarMovie() {
    const { user } = useContext(AuthContext) || {};

    if (!user) {
        return null;
    }

    return (
        <>
            <Link href={`/movies/${user.id}`} className="button-adc-filme">Adicionar Filme</Link>
        </>
    )
}