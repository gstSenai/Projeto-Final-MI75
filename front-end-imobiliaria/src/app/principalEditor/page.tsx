import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700', '800'],
    display: 'swap',
});

import Botao from '@/components/Botao';
import Image from 'next/image';

export default function PaginaEditor() {
    return (
        <div className=" md:bg-[#DFDAD0] min-h-screen flex flex-col items-center font-montserrat">
            <div className=" md:relative  mb-12 p-6">
                <div className="w-full md:relative rounded-lg overflow-hidden ">
                        <img
                            src="/cidadePaginaEditor.png"
                            alt="cidadePaginaEditor"
                            className="h-[500px] md:w-max object-cover "
                        />
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="justify-start text-white  md:ml-14 ">
                            <h2 className="ml-7 text-[40px] font-bold mb-6">Bem-vindo à Área do Editor!</h2>
                            <p className="ml-5 text-balance font-normal text-[17px] w-[55%]">
                                Aqui você encontra todas as ferramentas necessárias para gerenciar todos os imóveis junto de ferramentas de cadastro de imóveis.</p>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <h2 className='flex justify-center text-center text-5xl lg:text-6xl font-medium p-24'>Explore nossos recursos:</h2>
                <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center  sm:items-center sm:justify-center md:justify-around ' >
                    <div className='flex flex-col items-center w-80  py-10 md:py-10 2xl:py-0'>
                        <Image src="/gerenciamentoImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                        <p className='text-4xl font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Gerenciamento de Imóveis</p>
                        <Botao texto="Gerenciar" />
                    </div>
                    <div className='flex flex-col items-center w-80 py-10 md:py-10 2xl:py-0'>
                        <Image src="/gerenciamentoProprietarios.png" alt="Cadastro de Imóveis" width={110} height={123} />
                        <p className='text-4xl  font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Gerenciamento de Proprietários</p>
                        <Botao texto="Gerenciar" />
                    </div>
                    <div className='flex flex-col items-center w-80 py-10 md:py-10 2xl:py-0'>
                        <Image src="/cadastroImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                        <p className='text-4xl  font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Cadastrar Imóveis</p>
                        <Botao texto="Gerenciar" />
                    </div>
                </div>
            </section>
        </div>


    );


}

//sm: md: lg: 2xl: