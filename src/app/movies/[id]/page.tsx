/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Home from "@/app/page";
import Image from "next/image";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Voltar } from "@/components/voltar";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { deleteMovie, getMovie, updateMovie, uploadPhoto } from "@/app/actions/movie-actions";
import { AuthContext } from "@/app/contexts/AuthContext";

import "../css/id.css"

interface Movie {
    id: number;
    name: string;
    description: string;
    actors: string;
    photo: any;
    user_id: number;
}

export default function Movies({ params }: { params: { id: number } }) {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { setUser } = authContext;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movieData = await getMovie(params.id);
                setMovie(movieData);
            } catch (error) {
                console.error("Error fetching movie:", error);
                setError("Erro ao carregar os dados do filme.");
            }
        };

        fetchMovie();
    }, [params.id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (files) {
            // Se for um arquivo, atualiza a foto
            setMovie((prev) => (prev ? { ...prev, photo: files[0] } : null));
        } else {
            setMovie((prev) => (prev ? { ...prev, [name]: value } : null));
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!movie) return;

        const formData = new FormData();
        formData.append("id", movie.id.toString());
        formData.append("name", movie.name);
        formData.append("description", movie.description);
        formData.append("actors", movie.actors);

        // Atualiza o filme sem a foto
        const updateResult = await updateMovie(movie.id, formData);
        if (updateResult.success) {
            setSuccessMessage("Filme atualizado com sucesso!");
            setError(null);

            // Agora faz o upload da foto se houver uma nova
            if (movie.photo instanceof File) {
                const uploadResult = await uploadPhoto(movie.id, formData);
                if (uploadResult.success) {
                    setSuccessMessage("Foto upload com sucesso!");
                } else {
                    setError(uploadResult.message);
                }
            }
        } else {
            setError(updateResult.message || "Mensagem não definida");
        }

        const result = await updateMovie(movie.id, formData);
        if (result.success) {
            setSuccessMessage("Filme atualizado com sucesso!");
            setError(null);
        } else {
            setError(result.message || "Mensagem não definida");
        }
    };

    const handleDelete = async () => {
        if (!movie) return;

        try {
            const result = await deleteMovie(movie.id);
            if (result.success) {
                setUser(null);
                router.push("/");
            } else {
                setError(result.message || "Mensagem não definida");
            }
        } catch (error) {
            console.error("Failed to delete movie:", error);
            setError("Erro ao excluir o filme: " + (error || "Erro desconhecido"));
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
                    {movie && (
                        <form className="form-movie" onSubmit={handleUpdate}>
                            <div className="form-content">
                                <div className="form-input">
                                    <Input type="hidden" name="id" value={movie.id} />
                                    <Input type="text" name="name" placeholder="Nome do Filme" value={movie.name} onChange={handleChange} required className="inputBox focus-visible:ring-0" />
                                    <Input type="text" name="description" placeholder="Descrição" value={movie.description} onChange={handleChange} required className="inputBox focus-visible:ring-0" />
                                    <Input type="text" name="actors" placeholder="Atores" value={movie.actors} onChange={handleChange} required className="inputBox focus-visible:ring-0" />
                                    <Input type="hidden" name="user_id" value={movie.user_id} />
                                </div>
                                <div className="form-image">
                                    <Image src={movie.photo} alt={movie.name} className="img-profile" width={346} height={519} />
                                    <label htmlFor="photo" className="upload-icon">
                                        <Image src="/icons/upload.svg" alt="Upload da Imagem do Filme" width={50} height={50} />
                                    </label>
                                    <Input type="file" name="photo" id="photo" accept="image/*" onChange={handleChange} className="inputBox inputFile focus-visible:ring-0" />
                                </div>
                            </div>
                            <div className="content-button">
                                <Button type="submit" className="buttonBox">Salvar Alterações</Button>
                                <Button type="button" className="buttonBox" onClick={handleDelete}>Excluir Filme</Button>
                            </div>
                        </form>
                    )}
                </section>
                <Footer />
            </Home>
        </>
    );
}