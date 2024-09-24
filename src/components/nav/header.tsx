"use client"

import "./css/style.css"

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { logout } from "@/app/actions/user-actions";
import { useRouter } from "next/navigation";

interface HeaderProps {
    children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
    const authContext  = useContext(AuthContext);
    const user = authContext?.user;
    const router = useRouter();

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            router.push("/");
        }
    }

    return (
        <div className="content-nav-header">
            <header className="header-content">
                <nav className="nav-content">
                    <Link href="/" className="link-a">
                        <Image src="/logo.svg" width={80} height={50} className="w-auto hidden lg:block" alt="Logo da Plataforma The Movie"/>
                    </Link>
                    
                    {user ? ( 
                        <ul className="ul-content">
                            <Link href="/" className="link-a">Filmes</Link>
                            <Link href={`/profile/${user.id}`} className="link-a">Perfil</Link>
                            <Link href="/" className="link-a" onClick={handleLogout}>Sair</Link>
                        </ul>
                    ) : (
                        <ul className="ul-content">
                            <Link href="/" className="link-a">Filmes</Link>
                            <Link href="/signin" className="link-a">Login</Link>
                            <Link href="/signup" className="link-a">Sign-Up</Link>
                        </ul>
                    )}
                </nav>
            </header>
            <div className="buttons-header">
                {children}
            </div>
        </div>
    )
}