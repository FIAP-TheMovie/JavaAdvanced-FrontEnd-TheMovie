import "./css/style.css"

import Link from "next/link";

export function Footer(){
    return(
        <footer>

            <div className="footerBox">
                <h2>Desenvolvedores da Plataforma TheMovie:</h2>
                <p>
                <Link href="https://linkedin.com/in/marceloamellopaixao" target="_blank">Marcelo Augusto - RM99466 </Link>
                |
                <Link href="https://linkedin.com/in/rodrigo-freire-batista" target="_blank"> Rodrigo Batista - RM99513</Link>
                </p>
            </div>
            <div className="footerBox">
                <Link href="https://github.com/FIAP-TheMovie" target="_blank">Organização no GitHub</Link>
            </div>
            <div className="footerBox">
                <Link href="#" target="_blank">Professor de Java Advanced: João Carlos</Link>
            </div>
        </footer>
    )
}