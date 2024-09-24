import Link from "next/link";

import "@/app/css/button-voltar.css";

export function Voltar(){
    return (
        <>
            <Link href="/" className="button-voltar">Voltar</Link>
        </>
    )
}