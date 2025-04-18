"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RotaImovel() {
    const router = useRouter();

    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            router.push('/paginaImoveis/imovel');
        } else {
            router.push('/');
        }
    }, [router]);

    return null;
} 