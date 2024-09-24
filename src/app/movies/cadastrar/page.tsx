/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Home from "@/app/page";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Voltar } from "@/components/voltar";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { createMovie } from "@/app/actions/movie-actions"; // Função que cria o filme
import { AuthContext } from "@/app/contexts/AuthContext";

import "../css/id.css";
import Image from "next/image";

interface Movie {
    name: string;
    description: string;
    actors: string;
    photo?: File;
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
    const [movie, setMovie] = useState<Movie>({
        name: '',
        description: '',
        actors: '',
        photo: undefined,
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (files && files.length > 0) {
            setMovie((prev) => ({ ...prev, photo: files[0] })); // Atualiza a foto
        } else {
            setMovie((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        const form = e.target; // Captura o formulário
        const data = new FormData(form); // Cria um FormData a partir do formulário

        const result = await createMovie(user?.id, data); // Chama a função createUser

        if (result.success) {
            // Lógica após o sucesso, como redirecionar ou mostrar uma mensagem
            console.log("Usuário cadastrado com sucesso!");
        } else {
            // Lógica para lidar com erro, como mostrar uma mensagem
            console.error("Erro ao cadastrar usuário:", result);
        }
    };

    return (
        <>
            <Home>
                <Header>
                    <Voltar />
                </Header>
                <section>
                    {error && <div className="error-message">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <form className="form-movie" onSubmit={handleCreate}>
                        <div className="form-content">
                            <div className="form-input">
                                <Input type="text" name="name" placeholder="Nome do Filme" value={movie.name} onChange={handleChange} required className="inputBox focus-visible:ring-0" />
                                <Input type="text" name="description" placeholder="Descrição" value={movie.description} onChange={handleChange} required className="inputBox focus-visible:ring-0" />
                                <Input type="text" name="actors" placeholder="Atores" value={movie.actors} onChange={handleChange} required className="inputBox focus-visible:ring-0" />
                            </div>
                            <div className="form-image">
                                {movie.photo && (
                                    <Image src={URL.createObjectURL(movie.photo)} alt={movie.name} className="img-profile" width={346} height={519} />
                                )}
                                <label htmlFor="photo" className="upload-icon">
                                    <Image src="/icons/upload.svg" alt="Upload da Imagem do Filme" width={50} height={50} />
                                </label>
                                <Input type="file" name="photo" id="photo" accept="image/*" onChange={handleChange} className="inputBox inputFile focus-visible:ring-0" />
                            </div>
                        </div>
                        <div className="content-button">
                            <Button type="submit" className="buttonBox">Cadastrar Filme</Button>
                        </div>
                    </form>
                </section>
                <Footer />
            </Home>
        </>
    );
}