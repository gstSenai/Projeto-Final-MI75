import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface BotaoProps {
    texto: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean; 
    type?: "button" | "submit" | "reset";
}

export function Botao({ texto, onClick, className, type = "button" }: BotaoProps) {
    return (
        <div className="flex justify-center max-sm:text-lg max-md:text-xl max-lg:text-xl lg:text-xl w-full leading-normal text-black hover:text-white">
            <button
                type={type}
                onClick={onClick}
                className={`${montserrat} ${className} 
                bg-opacity-50 hover:bg-opacity-100 transition-all
                 duration-300 ease-in-out shrink-0 text-center 
                 rounded-[20px] w-full ${className || ''}`}
            >
                {texto}
            </button>
        </div>
    );
}
