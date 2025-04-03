import { Montserrat } from 'next/font/google';
import Image from 'next/image';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface BarraStatusProps {  // Nome da interface também em PascalCase
    quantQuartos: number;
    quantBanheiro: number;
    quantGaragem: number;
    quantSuite: number;
    quantpiscina: number;
}

// Nome do componente alterado para PascalCase
export function BarraStatusImovel({
    quantQuartos,
    quantBanheiro,
    quantGaragem,
    quantSuite,
    quantpiscina,
}: BarraStatusProps) {
    return (
        <>
            <div className='flex flex-row gap-[38px]'>

                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/imagensImovel/imagemDormitorio.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{quantQuartos}</p>

                </div>


                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/imagensImovel/imagemBanheiro.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{quantBanheiro}</p>
                </div>


                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/iconsImoveis/iconGaragem.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{quantGaragem}</p>
                </div>


                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/imagensImovel/imagemSuite.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{quantSuite}</p>
                </div>


                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/iconsImoveis/iconPraia.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{quantpiscina}</p>
                </div>
            </div>




        </>
    )
}