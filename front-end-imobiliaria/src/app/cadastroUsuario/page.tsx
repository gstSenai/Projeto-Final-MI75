import { Header } from "@/components/header";
import { Montserrat } from "next/font/google";
import TabelaUsuario from "@/components/paginaCadastroUsuario/tabelaUsuario";
import { Footer } from "@/components/footer";
import { LoadingWrapper } from "@/components/loading/loadingServer";
// Carregando a fonte Montserrat
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export default function CadastroUsuario() {
    return (
        <LoadingWrapper>
            <Header />

            <div className="flex flex-col min-h-screen">
                <div className={`flex-grow bg-[#DFDAD0] ${montserrat.className}`}>
                    <div className="2xl:px-20 xl:px-20 lg:px-10 px-10 pt-14">
                        <div className="font-inter">
                            <div className="flex flex-col max-lg:justify-center">
                                <p className="text-2xl xl:text-3xl font-semibold">Gerenciamento de Usuários</p>
                                <hr className="mt-4 mb-20 w-40 h-1 rounded-2xl bg-vermelho"></hr>
                                <TabelaUsuario />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </LoadingWrapper>
    );
}
