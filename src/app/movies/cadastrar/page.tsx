/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Home from "@/app/page";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Voltar } from "@/components/voltar";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { createMovie, getMovie } from "@/app/actions/movie-actions"; // Função que cria o filme
import { AuthContext } from "@/app/contexts/AuthContext";

import "../css/id.css";
import Image from "next/image";

interface Movie {
    name: string;
    description: string;
    actors: string;
    photo?: File;
    user_id: number;
}

interface CreateMovieResult {
    success: boolean;
    message?: string;
}

export default function Cadastrar() {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const user = authContext.user;
    const [movie, setMovie] = useState();

    const handleCreate = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        const form = e.target; // Captura o formulário
        const data = new FormData(form); // Cria um FormData a partir do formulário

        const result = await createMovie(user., data); // Chama a função createUser

        if (result.success) {
            // Lógica após o sucesso, como redirecionar ou mostrar uma mensagem
            console.log("Filme cadastrado com sucesso!");
            router.push("/")
        } else {
            // Lógica para lidar com erro, como mostrar uma mensagem
            console.error("Erro ao cadastrar filme:", result);
        }
    };

    return (
        <>
            <Home>
                <Header>
                    <Voltar />
                </Header>
                <section>
                    <form className="form-movie-cadastro" onSubmit={handleCreate}>
                        <div className="form-content-cadastro">
                            <div className="form-input-cadastro">
                                <Input type="text" name="name" placeholder="Nome do Filme" required className="inputBox focus-visible:ring-0" />
                                <Input type="text" name="description" placeholder="Descrição" required className="inputBox focus-visible:ring-0" />
                                <Input type="text" name="actors" placeholder="Atores"  required className="inputBox focus-visible:ring-0" />
                            </div>
                        </div>
                        <div className="content-button-cadastro">
                            <Button type="submit" className="buttonBox">Cadastrar Filme</Button>
                        </div>
                    </form>
                </section>
                <Footer />
            </Home>
        </>
    );
}