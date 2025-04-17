"use client";

import Image from "next/image";

export function CardCasa() {
    return (
        <div className="z-10">
            <div className="bg-[#DFDAD0] rounded-2xl px-5 pt-8 flex flex-col z-20">
                <Image
                    src="/imagensImovel/fotoImovel.png"
                    alt="Imagem Imovel"
                    className="w-full md:w-full lg:w-[400px] rounded-2xl"
                    width={600}
                    height={400}
                />
                <div className="flex flex-col font-semibold text-xl text-center py-5 gap-7">
                    <p>Código: <span>7653</span></p>
                    <p>Bairro: <span>Amizade</span></p>
                    <p>Cidade: <span>Jaraguá do Sul</span></p>
                </div>
            </div>
        </div>
    );
}