import Link from "next/link";


export default function Home() {
  return (
    <div>
      <Link href={'/pageUsers'} >
        Gerenciamento usuários
      </Link>
    </div>
  );
}
