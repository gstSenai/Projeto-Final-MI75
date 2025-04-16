"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PerfilUsuarioRedirect() {
    const router = useRouter();

    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            router.push(`/perfilUsuario/${id}`);
        } else {
            router.push('/');
        }
    }, [router]);

    return null;
} 