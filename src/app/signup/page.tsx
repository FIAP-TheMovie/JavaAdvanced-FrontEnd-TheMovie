"use client"

import "./css/style.css"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createUser } from "../actions/user-actions";
import { useRouter } from "next/navigation";

const initialState = {
    name: "",
    surname: "",
    email: "",
    password: "",
    success: false,
    message: "",
}

export default function SignUp() {
    const [state, formAction] = useFormState(createUser, initialState);
    const router = useRouter()

    const handleCreate = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        const form = e.target; // Captura o formulário
        const data = new FormData(form); // Cria um FormData a partir do formulário

        const result = await createUser(null, data); // Chama a função createUser

        if (result.success) {
            // Lógica após o sucesso, como redirecionar ou mostrar uma mensagem
            console.log("Usuário cadastrado com sucesso!");
        } else {
            // Lógica para lidar com erro, como mostrar uma mensagem
            console.error("Erro ao cadastrar usuário:", result);
        }
    };

    const handleSignin = () =>{
        router.push('/signin');
    }

    return (
        <main className="main-signup">
            <div className="content-signup">
                <Link href="/">
                    <Image src="/logo.svg" width={80} height={50} alt="Logo da Plataforma The Movie" className="image-signup" />
                </Link>
                <section>
                    <div className="textBox">
                        <h2 className="title-signup">Digite os seus dados abaixo para continuar</h2>
                        <p className="paragraph-signup">Entre no TheMovie com a sua conta. 
                            Se você não tiver conta, precisará criar uma.
                        </p>
                    </div>
                    <form className="form-signup" onSubmit={handleCreate}>
                        <Input type="text" name="name" placeholder="Nome" required className="inputBox focus-visible:ring-0" />
                        <Input type="text" name="surname" placeholder="Sobrenome" required className="inputBox focus-visible:ring-0" />
                        <Input type="email" name="email" placeholder="E-mail" required className="inputBox focus-visible:ring-0" />
                        <Input type="password" name="password" placeholder="Senha" required className="inputBox focus-visible:ring-0" />

                        <div className="content-button">
                            <Button type="submit" className="buttonBox" onClick={handleSignin}>Salvar e Continuar</Button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}