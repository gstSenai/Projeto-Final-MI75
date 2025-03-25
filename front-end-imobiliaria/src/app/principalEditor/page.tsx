import { Montserrat } from 'next/font/google';
import { Botao } from '@/components/botao';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Carregando a fonte Montserrat
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export default function PaginaEditor() {
    return (
        <>
            <Header />

            <div className="font-montserrat pt-3 pb-24 lg:pt-14 lg:pb-52">
                <div className=" md:relative  mb-12 p-6">
                    <div className=" md:relative rounded-lg overflow-hidder">
                        <img
                            src="imagensPaginaEditor-Adm/cidadePaginaEditor.png"
                            alt="cidadePaginaEditor"
                            className="h-[500px] md:h-max md:w-max object-cover "
                        />
                        <div className="absolute inset-0 flex items-center">
                            <div className="justify-start text-white  md:ml-14 ">
                                <h2 className="ml-7 text-[2.15rem] font-bold mb-6">Bem-vindo à Área do Editor!</h2>
                                <p className="ml-5 text-balance font-normal text-[1.08rem] w-[55%]">
                                    Aqui você encontra todas as ferramentas necessárias para gerenciar todos os imóveis junto de ferramentas de cadastro de imóveis.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <section>
                    <h2 className='flex justify-center text-center text-4xl lg:text-4xl font-medium p-24'>Explore nossos recursos:</h2>
                    <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center  sm:items-center sm:justify-center md:justify-around ' >
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>
                            <Image src="/gerenciamentoImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-10 w-80'>Gerenciamento de Imóveis</p>
                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2' texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>
                            <Image src="/gerenciamentoProprietarios.png" alt="Cadastro de Imóveis" width={110} height={123} />
                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-10 w-80'>Gerenciamento de Proprietários</p>
                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2' texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>
                            <Image src="/cadastroImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-10 w-80'>Cadastrar Imóveis</p>
                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2' texto="Gerenciar" />
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>

    );
}
