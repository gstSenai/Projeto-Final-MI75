import { Montserrat } from 'next/font/google';


// Carregando a fonte Montserrat
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface Botao {
    texto: string
}


export function Botao({ texto }: Botao) {

    return (
        <>
            <div className="font-montserrat max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-2xl 2xl:text-3xl w-full leading-normal text-black hover:text-white">
                <button className="bg-[#702632] bg-opacity-40 hover:bg-opacity-100 transition-all duration-300 ease-in-out shrink-0 text-center rounded-[20px] lg:h-[50px] lg:w-[100%]">
                    {texto}
                </button>
            </div>
        </>


    )


}

