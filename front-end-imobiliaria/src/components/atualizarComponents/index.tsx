import Image from 'next/image';

export default function AtualizarComponents() {
    return (
        <div>

            {/* Ícone de Email */}
            <Image
                className="absolute invisible md:invisible lg:visible pl-4 pt-4"
                src="/simboloEmail.png"
                alt="Imóveis Alugados"
                width={158}
                height={132}
                quality={100}
            />


            <div className="flex flex-col items-center p-4">


                {/* Caixa principal */}
                <div className="bg-white flex flex-col md:flex-row items-center justify-between w-full max-w-[1125px] h-auto md:h-[252px] rounded-[30px] p-6 md:p-10 shadow-lg">
                    {/* Texto */}
                    <div className="text-left flex-1">
                        <h2 className="font-semibold opacity-75 text-[24px] sm:text-[30px] md:text-[40px] lg:text-[50px]">
                            Receba Atualizações
                        </h2>
                        <p className="font-light text-lg sm:text-xl md:text-2xl lg:text-3xl">
                            Inscreva-se para receber as últimas informações
                        </p>
                    </div>

                    {/* Campo de E-mail e Botão */}
                    <div className="flex flex-row items-center gap-3 mt-4 md:mt-0 w-full md:w-auto border border-gray-300 rounded-full">
                        <input
                            className="rounded-full p-3 w-full md:w-64 xl:w-[320px] bg-white text-black  outline-none focus:ring-2 focus:ring-gray-400 text-[10px] sm:text-[10px] md:text-[14px] lg:text-xl font-light"
                            type="email"
                            placeholder="Escreva seu E-mail"
                        />
                        <button className="bg-[#6A2525] text-white px-5 py-3 rounded-full hover:bg-[#541D1D] transition-all w-full md:w-auto font-light text-base ">
                            Inscreva-se
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
