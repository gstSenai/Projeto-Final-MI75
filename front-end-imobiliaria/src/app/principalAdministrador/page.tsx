import { Montserrat } from 'next/font/google';
import { Footer } from '@/components/footer';


// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import { Botao } from '@/components/botao';
import Image from 'next/image';
import { Header } from '@/components/header';

export default function PaginaAdministrador() {
    return (
        <>
            <Header />

            <div className="relative mb-6 md:mb-12 p-6">
                <div className="relative rounded-lg overflow-hidder">
                    <img
                        src="/imagensPaginaEditor-Adm/montanhaPaginaAdministrador.png"
                        alt="cidadePaginaEditor"
                        className="h-[500px] md:h-max md:w-max object-cover rounded-lg "
                    />
                    <div className="absolute inset-0 flex items-center">
                        <div className="flex flex-col items-center md:items-start text-white  md:ml-14 ">
                            <h2 className="mx-16 md:ml-7 text-[1.5rem] lg:text-[3.5rem] text-center font-bold mb-4">Bem-vindo à Área do Administrador!</h2>
                            <hr className="bg-[#702632] flex border-none h-1 w-56 md:ml-5 md:w-[30%]" />
                            <p className="ml-5 text-balance font-normal text-[1.08rem] md:text-[1.20rem] lg:text-[1.35rem] w-[55%] mt-10">
                                Aqui você encontra todas as ferramentas necessárias para gerenciar todos os imóveis, usuários, cadastro de imóveis e Relatórios e Análises de dados.</p>
                        </div>
                    </div>
                </div>
            </div>


            <section className='mb-32'>
                <h2 className='flex justify-center text-center text-[1.45rem] lg:text-4xl font-semibold p-20'>Explore nossos recursos:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 place-items-center lg:gap-20 gap-10">
                    <div className="flex flex-col items-center py-6 w-64">
                        <Image src="/imagensPaginaEditor-Adm/gerenciamentoUsuarios.png" alt="Cadastrar Imóveis" width={100} height={100} />
                        <p className=" text-xl lg:text-2xl font-medium opacity-75 text-center leading-tight pt-4 pb-2 w-72">
                        Gerenciamento de Usúarios
                        </p>
                        <Botao className="w-2/3 md:w-56 h-8" texto="Gerenciar" />
                    </div>

                    <div className="flex flex-col items-center py-6 w-64">
                        <Image src="/gerenciamentoProprietarios.png" alt="Gerenciamento de Proprietários" width={100} height={100} />
                        <p className="text-xl lg:text-2xl font-medium opacity-75 text-center leading-tight pt-4 pb-2 w-72">
                            Gerenciamento de Proprietários
                        </p>
                        <Botao className="w-2/3 md:w-56 h-8" texto="Gerenciar" />
                    </div>
                    <div className="flex flex-col items-center py-6 w-64">
                        <Image src="/gerenciamentoImoveis.png" alt="Gerenciamento de Imóveis" width={100} height={100} />
                        <p className="text-xl lg:text-2xl font-medium opacity-75 text-center leading-tight py-6 w-72">
                            Gerenciamento de Imóveis
                        </p>
                        <Botao className="w-2/3 md:w-56 h-8" texto="Gerenciar" />
                    </div>
                    <div className="flex flex-col items-center py-6 w-64">
                        <Image src="/gerenciamentoProprietarios.png" alt="Gerenciamento de Proprietários" width={100} height={100} />
                        <p className="text-xl lg:text-2xl font-medium opacity-75 text-center leading-tight pt-6 pb-6 w-72">
                            Relatórios e Análises
                        </p>
                        <Botao className="w-2/3 md:w-56 h-8" texto="Gerenciar" />
                    </div>
                    
                </div>
            </section>
            <Footer />
        </>
        
    );


}
