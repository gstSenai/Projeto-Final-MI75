"use client";
import { Montserrat } from 'next/font/google';


// Carregando a fonte Montserrat
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface Botao {
    texto: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}



export function Botao({ texto, onClick = () => {} }: Botao) {

    

    return (
        <>
            <div className="font-montserrat max-sm:text-lg max-md:text-xl max-lg:text-xl lg:text-xl xl:text-2xl w-full leading-normal text-black hover:text-white flex justify-center">
                <button 
                    onClick={onClick} 
                    className="bg-[#702632] bg-opacity-40 hover:bg-opacity-100 transition-all duration-300 ease-in-out shrink-0 text-center rounded-[20px] h-[50px] w-[50%] md:w-[50%] lg:w-[75%] xl:w-full"
                >
                    {texto}
                </button>
            </div>
        </>
    );
}