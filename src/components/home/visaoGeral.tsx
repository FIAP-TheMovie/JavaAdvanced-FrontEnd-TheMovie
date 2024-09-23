import "./css/visaoGeral.css";

import { Search } from "@/components/home/search";
// import { AdicionarMovie } from "@/components/home/adicionar-movie";
import { AllMovies } from "./all-movies";

export function VisaoGeral() {

  return (
    <div className="visaoGeral">
      <div className="buttons-visaoGeral">
        <Search />
      </div>
      <section className="all-movies">
        <AllMovies />
      </section>
    </div>
  );
}
