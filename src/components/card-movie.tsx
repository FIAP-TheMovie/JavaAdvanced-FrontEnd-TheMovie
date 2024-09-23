import Link from "next/link";
import "../app/css/cardMovie.css"
import Image from "next/image";
import { getMovie } from "@/app/actions/movie-actions";

export async function CardMovie({ params }: { params: { id: string } }) {
    const movie = await getMovie(params.id);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
      <Link href={"/movies/" + movie.id} className="card-box">
        <Image src={movie.photo} alt={movie.name} width={280} height={350} className="card-image"/>
        <h2>{movie.name}</h2>
      </Link>
    </div>
    
  );
}
