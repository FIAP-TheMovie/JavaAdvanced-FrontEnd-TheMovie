"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter para redirecionamento
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/app/contexts/AuthContext"; // Remova AuthProvider daqui
import { deleteUser, getUser, updateUser } from "@/app/actions/user-actions";

import { Header } from "@/components/nav/header";
import { Voltar } from "@/components/voltar";
import { Footer } from "@/components/footer/footer";

import "../css/style.css";
import Home from "@/app/page";

interface User{
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
}

export default function Profile({ params }: { params: { id: number } }) {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { setUser } = authContext;
    const [user, setUserState] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(params.id);
                setUserState(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("Erro ao carregar os dados do usuário.");
            }
        };

        fetchUser();
    }, [params.id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserState((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        const formData = new FormData();
        formData.append("id", user.id.toString());
        formData.append("name", user.name);
        formData.append("description", user.surname);
        formData.append("actors", user.email);
        formData.append("password", user.password);

        const result = await updateUser(user.id, formData);
        if (result.success) {
            setSuccessMessage(result.message);
            setError(result.message);
        } else {
            setError(result.message);
        }
    };

    const handleDelete = async () => {
        if (!user) return;

        try {
            const result = await deleteUser(user.id);
            if (result.success) {
                setUser(null);
                router.push("/");
            } else {
                setError(result.message || "Mensagem não definida");
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
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
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {error && <div className="error-message">{error}</div>}
                    <form className="form-profile" onSubmit={handleUpdate}>
                        <Input type="hidden" name="id" value={user?.id} />
                        <Input type="text" name="name" placeholder="Nome" value={user?.name || ''} onChange={handleChange} required className="inputBox focus-visible:ring-0" />
                        <Input type="text" name="surname" placeholder="Sobrenome" value={user?.surname || ''} onChange={handleChange} required className="inputBox focus-visible:ring-0" />
                        <Input type="email" name="email" placeholder="E-mail" value={user?.email || ''} onChange={handleChange} required className="inputBox focus-visible:ring-0" />
                        <Input type="password" name="password" placeholder="Senha" onChange={handleChange} required className="inputBox focus-visible:ring-0" />

                        <div className="content-button">
                            <Button type="submit" className="buttonBox">Salvar Alterações</Button>
                            <Button type="button" className="buttonBox" onClick={handleDelete}>Excluir Conta</Button>
                        </div>
                    </form>
                </section>
                <Footer />
            </Home>
        </>
    );
}