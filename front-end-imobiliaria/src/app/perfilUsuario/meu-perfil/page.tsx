"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingWrapper } from '@/components/loading/loadingServer';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import EditProfile from '@/components/perfil/EditProfile';

export default function MeuPerfil() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const id = localStorage.getItem('id');
        if (!id) {
            router.push('/');
            return;
        }
        
        setUserId(Number(id));
        setLoading(false);
    }, [router]);

    if (loading || !userId) {
        return <div>Carregando...</div>;
    }

    return (
        <LoadingWrapper>
            <Header />
            <div className='my-20'>
                <EditProfile id={userId} />
            </div>
            <Footer />
        </LoadingWrapper>
    );
} 