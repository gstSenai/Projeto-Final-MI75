import { Header } from "@/components/header";
import { InputProcurarUsuario } from "@/components/paginaCadastroUsuario/adicionandoUsuario/inputProcurarUsuario";
// import Tabela from "@/components/tabela/index";
import Tabela from "@/components/paginaCadastroUsuario/tabelaUsuario";
import { Montserrat } from "next/font/google";
import { Footer } from "@/components/footer";

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
            <div className="min-h-screen bg-[#DFDAD0] 2xl:px-20 xl:px-20 lg:px-10 px-10 pt-14">
                <div className="font-inter justify-between max-lg:justify-center ">
                    <div className="flex flex-col max-lg:justify-center">
                        <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Gerenciamento de Proprietários</p>

                        <hr className="mt-4 mb-20 w-40 h-1 rounded-2xl bg-[#702632] "></hr>

                        <InputProcurarUsuario />
                    </div>
                </div>

                <Tabela />
            </div>
        </>
    )
}