import Image from 'next/image';

export default function AtualizarComponents() {
    return (
        <div className="sm:mb-2 md:mb-4 lg:mb-2">
            {/* Ícone de Email */}
            <Image
                className="absolute invisible md:invisible lg:visible pl-2 pt-2"
                src="/paginaInicial/simobolosCCS/simboloEmail.png"
                alt="Imóveis Alugados"
                width={80}
                height={60}
                quality={100}
            />

            <div className="flex flex-col items-center p-2">
                {/* Caixa principal */}
                <div className="bg-white flex flex-col md:flex-row items-center justify-between w-full md:max-w-[800px] h-auto md:h-[120px] rounded-[12px] p-2 md:p-3 shadow-lg">
                    {/* Texto */}
                    <div className="text-left flex-1">
                        <h2 className="font-semibold opacity-75 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                            Receba Atualizações
                        </h2>
                        <p className="font-light text-[10px] sm:text-xs md:text-sm lg:text-base">
                            Inscreva-se para receber as últimas informações
                        </p>
                    </div>

                    {/* Campo de E-mail e Botão */}
                    <div className="flex flex-row items-center gap-1 mt-2 md:mt-0 w-full md:w-auto border border-gray-300 rounded-full">
                        <input
                            className="rounded-full p-1.5 w-full md:w-36 xl:w-[180px] bg-white text-black text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-light outline-none"
                            type="email"
                            placeholder="Escreva seu E-mail"
                        />
                        <button className="bg-[#6A2525] border-2 border-[#6A2525] text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full hover:bg-[#541D1D] hover:border-[#541D1D] transition-all w-full md:w-auto font-light text-[9px] sm:text-[10px]">
                            Inscreva-se
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}