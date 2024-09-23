import Link from "next/link";

export function Footer(){
    return(
        <footer>
            <p>Professor: <Link href="">João Carlos</Link></p>
            <p>
                <Link href="https://github.com/FIAP-MarceloAugusto&RodrigoBatista/JavaAdvanced-FrontEnd-TheMovie">Organização no GitHub</Link>
            </p>
            <p>Desenvolvido por: <Link href="https://linkedin.com/in/marceloamellopaixao">Marcelo Augusto - RM99466</Link></p>
            <p>Desenvolvido por: <Link href="https://www.linkedin.com/in/rodrigo-freire-batista">Rodrigo Batista - RM99513</Link></p>
        </footer>
    )
}