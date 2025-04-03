import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from "react"
import request from "@/routes/request"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface BarraStatusProps {
    id: number;  // Nome da interface também em PascalCase
    quantQuartos: number;
    quantBanheiro: number;
    quantGaragem: number;
    quantSuite: number;
    quantpiscina: boolean;
}

// Nome do componente alterado para PascalCase
export function BarraStatusImovel({id}: {id : number}) {
    const [isLoading, setIsLoading] = useState(false)
    const [barraStatus, setBarraStatus] = useState<BarraStatusProps | null>(null)


    const getBarraStatus = async () => {
        setIsLoading(true);
        try {
            const response = await request("GET", `http://localhost:9090/usuario/getById/${id}`);
            console.log("Resposta da API:", response);
            setBarraStatus(response);
        } catch (error) {
            console.error("Erro ao buscar corretor:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("ID recebido:", id);
        getBarraStatus();
    }, [id]);



    
    return (
        <>
            <div className='flex flex-row gap-[38px]'>

                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/imagensImovel/imagemDormitorio.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{barraStatus.quantQuartos}</p>

                </div>


                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/imagensImovel/imagemBanheiro.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{barraStatus.quantBanheiro}</p>
                </div>


                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/iconsImoveis/iconGaragem.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{barraStatus.quantGaragem}</p>
                </div>


                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/imagensImovel/imagemSuite.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{barraStatus.quantSuite}</p>
                </div>


                <div className='flex flex-col items-center gap-2'>
                    <Image
                        className='' src="/iconsImoveis/iconPraia.png"
                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                    />
                    <p className='text-xs'>{barraStatus.quantpiscina}</p>
                </div>
            </div>




        </>
    )
}