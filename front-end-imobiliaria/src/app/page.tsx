import { Montserrat } from 'next/font/google';


// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import Botao from '@/components/Botao';
import Image from 'next/image';
import Link from 'next/link';

export default function PaginaEditor() {
    return (
    <div>
    <Link href="./sobreNos">Sobre nós</Link>     
    </div>

    );


}

//sm: md: lg: 2xl: