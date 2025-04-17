"use client"

import Image from 'next/image';
import { useLanguage } from '@/components/context/LanguageContext';

export default function AtualizarComponents() {
    const { translate } = useLanguage();

    return (
        <div className="sm:mb-2 md:mb-4 lg:mb-2">
            {/* Ícone de Email */}
            <Image
                className="absolute invisible md:invisible lg:visible pl-2 pt-2"
                src="/paginaInicial/simobolosCCS/simboloEmail.png"
                alt={translate('receba_atualizacoes.titulo')}
                width={158}
                height={132}
                quality={100}
            />

            <div className="flex flex-col items-center p-2">
                {/* Caixa principal */}
                <div className="bg-white flex flex-col md:flex-row items-center justify-between w-full md:max-w-[800px] h-auto md:h-[120px] rounded-[12px] p-2 md:p-3 shadow-lg">
                    {/* Texto */}
                    <div className="text-left flex-1">
                        <h2 className="font-semibold opacity-75 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] xl:text-[40px]">
                            {translate('receba_atualizacoes.titulo')}
                        </h2>
                        <p className="font-light text-base sm:text-lg md:text-xl lg:text-2xl">
                            {translate('receba_atualizacoes.subtitulo')}
                        </p>
                    </div>

                    {/* Campo de E-mail e Botão */}
                    <div className="flex flex-row items-center gap-1 mt-2 md:mt-0 w-full md:w-auto border border-gray-300 rounded-full">
                        <input
                            type="email"
                            placeholder={translate('receba_atualizacoes.email_placeholder')}
                            className="w-full md:w-[300px] p-2 outline-none rounded-l-full"
                        />
                        <button className="bg-[#702632] text-white px-4 py-2 rounded-r-full hover:bg-[#8a2f3d] transition-colors">
                            {translate('receba_atualizacoes.botao')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}