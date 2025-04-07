"use client"

import { useState } from 'react';
import Image from 'next/image';

export function Favoritar() {
    const [Trocar, setTrocar] = useState(false);
    
    const mostrarCoracao = (value: boolean) => {
        setTrocar(value);
    };
    
    return (
        <>
            <div className='bg-[#DFDAD0]'>
                <Image
                    onClick={() => mostrarCoracao(!Trocar)}
                    src={Trocar ? "/favoritos/coracaoCheio.png" : "/favoritos/coracaoVazio.png"}
                    alt={Trocar ? "Coração Cheio" : "Coração Vazio"}
                    width={39}
                    height={31}
                    className="cursor-pointer"
                />
            </div>
        </>
    );
}