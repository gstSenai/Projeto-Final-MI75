import Image from 'next/image';

export default function AtualizarComponents() {
    return (
        <div className="mb-8"> {/* Adicionado margin-bottom para evitar sobreposição com o footer */}
            {/* Ícone de Email */}
            <Image
                className="absolute invisible md:invisible lg:visible pl-4 pt-4"
                src="/paginaInicial/simobolosCCS/simboloEmail.png"
                alt="Imóveis Alugados"
                width={158}
                height={132}
                quality={100}
            />

            <div className="flex flex-col items-center p-4">
                {/* Caixa principal */}
                <div className="bg-white flex flex-col md:flex-row items-center justify-between w-full md:max-w-[1125px] h-auto md:h-[200px] rounded-[30px] p-4 md:p-6 shadow-lg">
                    {/* Texto */}
                    <div className="text-left flex-1">
                        <h2 className="font-semibold opacity-75 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] xl:text-[40px]">
                            Receba Atualizações
                        </h2>
                        <p className="font-light text-base sm:text-lg md:text-xl lg:text-2xl">
                            Inscreva-se para receber as últimas informações
                        </p>
                    </div>

                    {/* Campo de E-mail e Botão */}
                    <div className="flex flex-row items-center gap-3 mt-4 md:mt-0 w-full md:w-auto border border-gray-300 rounded-full">
                        <input
                            className="rounded-full p-2 sm:p-3 w-full md:w-48 xl:w-[280px] bg-white text-black  text-[10px] sm:text-[12px] md:text-[14px] lg:text-lg font-light outline-none "
                            type="email"
                            placeholder="Escreva seu E-mail"
                        />
                        <button className="bg-[#6A2525] border-8 border-[#6A2525] text-white px-4 py-2 sm:px-5 sm:py-3 rounded-full hover:bg-[#541D1D] hover:border-[#541D1D] transition-all w-full md:w-auto font-light text-sm sm:text-base">
                            Inscreva-se
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}