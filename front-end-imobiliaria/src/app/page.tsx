import Link from "next/link";


export default function Home() {
  return (
    <div>
      <Link href={'/formUsuario'} >
        Formulario Cadastro
      </Link>
    </div>
  );
}
