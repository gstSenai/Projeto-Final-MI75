"use client"

import { Inter } from 'next/font/google';
import { useState } from 'react';
import Image from 'next/image';

// Carregando a fonte Inter
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

export function comfirmarFavorito() {
    return (
        <>
            <div className='bg-[#DFDAD0]'>
                <Image
                    onClick={() => mostrarCoracao(!Trocar)}
                    src="/favoritos/coracaoVazio.png"
                    alt="Coração Vazio"
                    width={39}
                    height={31}
                    className="cursor-pointer"
                />


            </div>
        </>
    );
}