import { ReactNode } from "react";
import { VisaoGeral } from "@/app/movies/visaoGeral";

import "./css/style.css"

interface HomeProps {
  children?: ReactNode;
}

export default function Home({ children }: HomeProps) {
  return (
    <main className="content-visao-geral">
          {children}
    </main>

  );
}

Home.defaultProps = {
  children: <VisaoGeral />,
};
