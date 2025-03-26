import { Montserrat } from 'next/font/google';
import Link from 'next/link';


// Carregando a fonte Inter
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});

export default function PaginaEditor() {
    return (
        <div className={`flex gap-14 text-2xl font-montserrat`}>
            <Link href="./login">Login</Link>
            <Link href="./cadastro">Cadastro</Link> 
        </div>
    );
}
