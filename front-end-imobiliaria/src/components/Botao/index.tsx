import { Montserrat } from 'next/font/google';


// Carregando a fonte Montserrat
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface Botao {
    texto: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

export function Botao({ texto, onClick, className }: Botao) {
    return (
        <div className="flex justify-center font-montserrat max-sm:text-lg max-md:text-xl max-lg:text-xl lg:text-xl w-full leading-normal text-black hover:text-white">
            <button 
                onClick={onClick} 
                className={`bg-vermelho bg-opacity-40 hover:bg-opacity-100 transition-all duration-300 ease-in-out shrink-0 text-center rounded-[20px] h-[45px] w-full ${className ? className : ''}`}>
                {texto}
            </button>
        </div>
    );
}
