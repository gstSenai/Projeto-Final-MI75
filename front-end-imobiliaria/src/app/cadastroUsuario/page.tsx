import { Header } from "@/components/header";
import { Montserrat } from "next/font/google";
import TabelaUsuario from "@/components/paginaCadastroUsuario/tabelaUsuario";

// Carregando a fonte Montserrat
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export default function CadastroUsuario() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#DFDAD0] font-montserrat">
                <div className="2xl:px-20 xl:px-20 lg:px-10 px-10 pt-14">
                    <div className="font-inter justify-between max-lg:justify-center">
                        <div className="flex flex-col max-lg:justify-center">
                            <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Gerenciamento de Usuários</p>

                            <hr className="mt-4 mb-20 w-40 h-1 rounded-2xl bg-vermelho "></hr>

                            <TabelaUsuario />
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </>
    )
}