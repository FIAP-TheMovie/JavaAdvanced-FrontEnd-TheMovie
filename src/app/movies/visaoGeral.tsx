
import { AllMovies } from "@/components/home/all-movies";
import { Header } from "@/components/nav/header";
import ButtonsContent from "@/components/buttons-content";
import { Footer } from "@/components/footer/footer";

import "@/app/movies/css/visaoGeral.css";


export function VisaoGeral() {

  return (
    <>
      <Header>
          <ButtonsContent />
      </Header>
      <div className="visaoGeral">
        <section className="all-movies">
          <AllMovies />
        </section>
      </div>
      <Footer />
    </>
  );
}
