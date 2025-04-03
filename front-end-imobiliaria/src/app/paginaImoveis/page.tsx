import PaginaImovel from '@/components/paginaImoveis';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PaginaImoveis() {
    return (
        <>
        <div>
            <Header/>
        </div>
        <div>
            <PaginaImovel/>
        </div>
        <div className='mt-[10rem]'>
            <Footer/>
        </div>
        </>
    );
}