


import { getMovies } from "@/app/actions/movie-actions";
import Image from "next/image";
import Link from "next/link";

export async function AllMovies(){

    let movies = [];
    try {
        movies = await getMovies();
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os filmes:", error);
    }

    if (!Array.isArray(movies)) {
        return <p>Não há filmes disponíveis no momento!</p>;
    }

    if (movies.length === 0) {
        return <p>Não há filmes disponíveis no momento!</p>;
    }

    return (
        <div className="card-movie">
            {movies.map((movie: Movie) => (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
                    <Link href={"/movies/" + movie.id} className="card-box">
                    <Image src={movie.photo} alt="Naruto" width={280} height={350} className="card-image"/>
                        <h2>{movie.name}</h2>
                    </Link>
                </div>
            ))}
            
        </div>
    )
}