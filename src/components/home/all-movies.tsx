import { getMovies } from "@/app/actions/movie-actions";
import Image from "next/image";
import Link from "next/link";

interface Movie {
    id: number;
    name: string;
    description: string;
    actors: string;
    photo: string;
    user_id: number;
}

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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
                {movies.map((movie: Movie) => (
                    <div className="boxMovie" key={movie.id}>
                        <Link href={"/movies/" + movie.id} className="card-box">
                            <div className="boxImageMovie">
                                <Image src={movie.photo} alt={movie.name} width={280} height={350} className="card-image"/>
                            </div>
                            <h2>{movie.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}