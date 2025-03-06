"use client";

import { Montserrat } from 'next/font/google';
import { useState } from 'react';
import Botao from '@/components/Botao';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export function PesquisaPaginaInicial() {
    const [modo, setModo] = useState('comprar');
    return (
        <div className={`${montserrat.className} bg-[#702632] pr-6 pl-6 pt-6 rounded-3xl w-[320px]`}>
            <div className='flex text-lg justify-between'>
                <button
                    className={`p-2 px-6 rounded-md ${modo === 'comprar' ? 'bg-[#DFDAD0] font-medium text-black' : 'text-white font-bold'}`}
                    onClick={() => setModo('comprar')}
                >Comprar</button>
                <button
                    className={`p-2 px-6 rounded-md ${modo === 'alugar' ? 'bg-[#DFDAD0] font-medium text-black' : 'text-white font-bold'}`}
                    onClick={() => setModo('alugar')}
                >Aluguel</button>
            </div>
            <div className='bg-[#702632] w-0 xl:w-[800px] rounded-3xl'>
                <div className='flex flex-col lg:flex-row 2xl:flex-row'>
                    <div>
                        <p>Código:</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Localização:</p>
                        <input type="text"  />
                    </div>
                </div>
                <div>
                    <input type="text" />
                </div>
            </div>
        </div>
    );
}

//DFDAD0