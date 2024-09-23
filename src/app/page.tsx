import { Header } from "@/components/nav/header";
import { VisaoGeral } from "@/components/home/visaoGeral";
import "./css/style.css"
// import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <main className="content-visao-geral">
          <Header />
          <VisaoGeral />
          {/* <Footer /> */}
    </main>

  );
}
