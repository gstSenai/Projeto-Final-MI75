import PaginaImovel from '@/components/paginaImoveis';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LoadingWrapper } from '@/components/loading/loadingServer';

export default function PaginaImoveis() {
    return (
        <LoadingWrapper>
            <Header />
            <PaginaImovel />
            <div className='mt-[10rem]'>
                <Footer />
            </div>
        </LoadingWrapper>
    );
}