import Link from "next/link";

export function Footer(){
    return(
        <footer>
            <div>
                <Link href="https://github.com/FIAP-MarceloAugusto&RodrigoBatista/JavaAdvanced-FrontEnd-TheMovie" target="_blank">Organização no GitHub</Link>
            </div>
            
            <div>
                <h2>Desenvolvedores da Plataforma TheMovie:</h2>
                <Link href="https://linkedin.com/in/marceloamellopaixao" target="_blank">Marcelo Augusto - RM99466</Link><br />
                <Link href="https://linkedin.com/in/rodrigo-freire-batista" target="_blank">Rodrigo Batista - RM99513</Link>
            </div>
            
            <div>
                <h2>Professor de Java Advanced:</h2>
                <Link href="#" target="_blank">João Carlos</Link>
            </div>
        </footer>
    )
}