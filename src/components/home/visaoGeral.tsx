import "./css/visaoGeral.css";

import { Search } from "@/components/home/search";
import { AdicionarMovie } from "@/components/home/adicionar-movie";
import { AllMovies } from "./all-movies";

export function VisaoGeral() {
  return (
    <div>
      <div className="buttons-visaoGeral">
        <Search />
        <AdicionarMovie />
      </div>
      <section>
        <AllMovies />
      </section>
    </div>
  );
}
