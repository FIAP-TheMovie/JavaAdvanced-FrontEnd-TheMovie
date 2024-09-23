import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./css/search.css"

export function Search() {
  return (
    <div className="search-link">
      <Input id="search" placeholder="Buscar Filmes..." className="search-input focus-visible:ring-0 focus-visible:ring-0"/>
      <Button className="search-button">
        <Image src={"/icons/search.svg"} alt="Ícone de Pesquisa" width={20} height={20} />
      </Button>
    </div>
  );
}
