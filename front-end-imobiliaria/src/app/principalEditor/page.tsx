import { Montserrat } from 'next/font/google';


// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import Botao from '@/components/Botao';
import Image from 'next/image';

export default function PaginaEditor() {
    return (

        <div className={`${montserrat.className}`}>
            <main>
                <div className='relative flex justify-center content-center'>
                    <Image src="/cidadePaginaEditor.png" alt="cidade da Pagina do Editor" width={1810} height={811} />
                    <div className="absolute top-72 left-40 text-white p-8 rounded-lg">
                        <h1 className='text-[70px] font-bold'>Bem- vindo à Área do Editor!</h1>
                        <div className="border-t-8 border-[#702632] w-96"></div>
                        <p className='text-[30px] font-normal '>Aqui você encontra todas as ferramentas necessárias para gerenciar todos
                            os imóveis junto de ferramentas de cadastro de imóveis</p>
                    </div>
                </div>
                <h2 className='flex justify-center text-[60px] font-medium p-24'>Explore nossos recursos:</h2>
            </main>
            <section className='flex justify-around'>
                <div className='flex flex-col items-center w-80'>
                    <Image src="/gerenciamentoImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                    <p className='text-[36px] font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Gerenciamento de Imóveis</p>
                    <Botao texto="Gerenciar" />
                </div>
                <div className='flex flex-col items-center w-80'>
                    <Image src="/gerenciamentoProprietarios.png" alt="Cadastro de Imóveis" width={110} height={123} />
                    <p className='text-[36px] font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Gerenciamento de Proprietários</p>
                    <Botao texto="Gerenciar" />
                </div>
                <div className='flex flex-col items-center w-80'>
                    <Image src="/cadastroImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                    <p className='text-[36px] font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Cadastrar Imóveis</p>
                    <Botao texto="Gerenciar" />
                </div>
            </section>
        </div>


    );


}