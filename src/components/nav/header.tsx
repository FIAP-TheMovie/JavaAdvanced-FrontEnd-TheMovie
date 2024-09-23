"use client"

import "./css/style.css"

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useState } from "react";

export function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    return (
        <header className="header-content">
                <nav className="nav-content">
                    <Link href="/" className="link-a">
                        <Image src="/logo.svg" width={80} height={50} className="w-auto hidden lg:block" alt="Logo da Plataforma The Movie"/>
                    </Link>
                    {isLoggedIn ? (
                            <>
                                <ul className="ul-content">
                                    <Link href="/movies" className="link-a">Filmes</Link>
                                    <Link href="/profile" className="link-a">Perfil</Link>
                                    <Link href="/login" className="link-a" onClick={handleLogout}>Sair</Link>
                                    <ModeToggle />
                                </ul>
                            </>
                        ) : (
                            <>
                                <Link href="/" className="link-a">Filmes</Link>
                                <ul className="ul-content">
                                    <Link href="/login" className="link-a" onClick={handleLogin}>Login</Link>
                                    <Link href="/signup" className="link-a">Sign-Up</Link>
                                    <ModeToggle />
                                </ul>
                            </>
                        )}
                    
                </nav>
        </header>
    )
}