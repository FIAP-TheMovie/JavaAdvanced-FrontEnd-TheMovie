"use client"

import "./css/style.css"

import { login } from "@/app/actions/user-actions"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation" 
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const initialState = {
    email: "",
    success: false,
    message: "",
}

export default function SignIn() {
    const [formData, setFormData] = useState(initialState);
    const router = useRouter()
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target); // Captura os dados do formulário
        const result = await login(null, data); // Chama a função de login

        if (result && result.success) {
            router.push("/"); // Redireciona em caso de sucesso
        } else {
            setFormData({
                ...formData,
                message: result?.message || "Erro ao fazer login."
            });
        }
    };

    const handleSignUp = () => {
        router.push("/signup")
    }

    return (
        <main className="main-signin">
            <div className="content-signin">
                <Link href="/">
                    <Image src="/logo.svg" width={80} height={50} alt="Logo da Plataforma The Movie" className="image-signin"/>
                </Link>
                <section>
                    <div className="textBox">
                        <h2 className="title-signin">Digite os seus dados abaixo para continuar</h2>
                        <p className="paragraph-signin">Entre no TheMovie com a sua conta. 
                            Se você não tiver conta, precisará criar uma.
                        </p>
                    </div>
                    <form className="form-signin" onSubmit={handleSubmit}>
                        <Input type="email" name="email" placeholder="Email" required className="inputBox focus-visible:ring-0" onChange={handleChange} />
                        <Input type="password" name="password" placeholder="Senha" required className="inputBox focus-visible:ring-0" onChange={handleChange} />
                        <div className="content-button">
                            <Button type="submit" className="buttonBox">Login</Button>
                            <Button type="button" className="buttonBox" onClick={handleSignUp}>Sign-Up</Button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}