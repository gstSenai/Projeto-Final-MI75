import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

interface CadastroEscritoProps {
    texto: string;
}

export function CadastroEscrito({ texto }: CadastroEscritoProps) {
    return (
        <>
            <div className="flex justify-start max-lg:justify-center lg:pr-20 xl:pr-28 xl:py-4 2xl:pr-64 2xl:py-6 pl-4 py-3.5
                             bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent 
                             max-lg:p-0">
                <p className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl
                 whitespace-nowrap max-lg:text-black">{texto}</p>
            </div>
        </>
    );
}

interface ListaDeCadastrosProps {
    textos: string[];
}

export function ListaDeCadastros({ textos }: ListaDeCadastrosProps) {
    return (
        <>
            <div className="pt-20">
                <div className="flex justify-between sm:gap-4 xl:gap-4 gap-10 max-lg:flex-col max-lg:items-center max-lg:gap-4">
                    {[0, 1].map((colunaIndex) => (
                        <div key={colunaIndex} className="flex flex-col sm:gap-10 md:gap-12 lg:gap-6 xl:gap-4 gap-4">
                            {textos.slice(colunaIndex * 2, colunaIndex * 2 + 2).map((texto, index) => (
                                <CadastroEscrito key={index} texto={texto} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}