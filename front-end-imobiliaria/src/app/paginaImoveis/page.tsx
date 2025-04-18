import { LoadingWrapper } from '@/components/loading/loadingServer';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import PaginaImovel from '@/components/paginaImoveis';
export default function PaginaImoveis() {

    return (
        <LoadingWrapper>
            <Header />
            <div className='my-20'>
                <PaginaImovel />
            </div>
            <Footer />
        </LoadingWrapper>
    );
} 