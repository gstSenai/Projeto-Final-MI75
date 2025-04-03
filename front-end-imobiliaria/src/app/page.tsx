import { Montserrat } from 'next/font/google';
import PaginaInicial from './PaginaInicial/page';


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});

export default function PaginaEditor() {
    return (
            <PaginaInicial/>
    );
}
