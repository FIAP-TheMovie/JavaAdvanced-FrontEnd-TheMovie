import "./css/style.css"

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Header() {
    return (
        <header className="header-content">
                <nav className="nav-content">
                    <Link href="/" className="link-a">
                        <Image src="/logo.svg" width={80} height={50} className="w-auto hidden lg:block" alt="Logo da Plataforma The Movie"/>
                    </Link>
                    <Link href="/" className="link-a">Filmes</Link>
                    <ul className="ul-content">
                        <Link href="/login" className="link-a">Login</Link>
                        <Link href="/signup" className="link-a">Sign-Up</Link>
                        <ModeToggle />
                    </ul>
                </nav>
        </header>
    )
}