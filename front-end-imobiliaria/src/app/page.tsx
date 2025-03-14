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
        <div className={`${montserrat.className} pt-3 pb-24 lg:pt-14 lg:pb-52`}>
            <Link href="./PoliticaPrivacidade">PoliticaPrivacidade</Link>
            <Link href="./TermosUso">TermosUso</Link>

        </div>


    );


}

//sm: md: lg: 2xl: