import PaginaInicial from './paginaInicial/page';

// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import Botao from '@/components/Botao';
import Image from 'next/image';
import Link from 'next/link'
import Agendamento from './agendamentosUser/page'

export default function PaginaEditor() {
    return (
        <div>
           <Link href="./perfilUsuario">Perfil</Link>
           <Link href="./agendamentosUser">Agendamentos</Link>
        </div>


    );


}

//sm: md: lg: 2xl:
export default function footer() {

export default function PaginaEditor() {
    return (
            <PaginaInicial/>
    );
}
