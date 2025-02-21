import { Header } from "@/components/header"
import { CadastroEscrito, ListaDeCadastros } from "@/components/CadastroEscrito";

import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

export default function CadastroImovel() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#DFDAD0] 2xl:px-20 xl:px-20 lg:px-10 px-10 pt-14">
                <div className={`${inter.className} flex justify-between max-lg:justify-center `}>
                    <div className="flex flex-row items-center max-lg:justify-center">
                        <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Cadastrar imóvel</p>
                        <p className="text-3xl font-semibold lg:hidden">Cadastro</p>
                    </div>
                    <div className="flex flex-row items-center max-lg:hidden">
                        <p className="text-[#702632] text-lg xl:text-2xl">Voltar ao menu</p>
                    </div>
                </div>

                <ListaDeCadastros textos={["ID do Imóvel: [Gerado automaticamente]",
                    "Telefone: telefone do Proprietário/Imobiliária",
                    "Dono: Nome do Proprietário/Imobiliária",
                    "Email: Email do Proprietário/Imobiliária"]} />

                <hr className="mt-16 mb-4 w-full h-2 rounded-2xl bg-[#702632] max-lg:h-3 max-lg:mt-10"></hr>

                <div className={`${inter.className} flex justify-between max-lg:justify-center `}>
                    <div className="flex flex-row items-center max-lg:justify-center">
                        <p className="text-2xl xl:text-4xl font-semibold my-10 max-lg:hidden">Endereço:</p>
                    </div>
                </div>

                <div className="flex 2xl:gap-16">
                    <form action="text" className="flex items-center max-lg:justify-center gap-6 lg:pr-24 xl:pr-28 xl:py-4 2xl:w-[700px] 2xl:py-6 pl-4 py-3.5
                             bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent 
                             max-lg:p-0">
                        <img src="/imagensForms/canetaEditar.png" alt="" />
                        <input type="text" placeholder="Rua:" name="rua" className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl xl:text-xl 2xl:text-xl whitespace-nowrap max-lg:text-black" />
                    </form>
                    <form action="text" className="flex items-center max-lg:justify-center gap-6 lg:pr-24 xl:pr-28 xl:py-4 2xl:w-[700px] 2xl:py-6 pl-4 py-3.5
                             bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent 
                             max-lg:p-0">
                        <img src="/imagensForms/canetaEditar.png" alt="" />
                        <input type="text" placeholder="Cep:" name="cep" className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl xl:text-xl 2xl:text-xl whitespace-nowrap max-lg:text-black" />
                    </form>
                    <form action="text" className="flex max-lg:justify-center gap-6 lg:pr-24 xl:pr-28 xl:py-4 2xl:w-[700px] 2xl:py-6 pl-4 py-3.5
                             bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent 
                             max-lg:p-0">
                        <img src="/imagensForms/canetaEditar.png" alt="" />
                        <input type="text" placeholder="Número:" name="numero" className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl xl:text-xl 2xl:text-xl whitespace-nowrap max-lg:text-black" />
                    </form>
                </div>
            </div>
        </>
    );
}