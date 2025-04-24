"use client"
import { Header } from '@/components/header';
import { LoadingWrapper } from '@/components/loading/loadingServer';
import { HistoricoAgendamentos } from '@/components/paginaHistorico/HistoricoAgendamentos';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function PaginaHistorico() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { userId: authUserId } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const urlUserId = searchParams.get('userId');
        
        // If no userId in URL or auth context, redirect to login
        if (!urlUserId && !authUserId) {
            router.push('/login');
            return;
        }

        // If userId in URL doesn't match authenticated user's ID
        if (urlUserId && authUserId && Number(urlUserId) !== authUserId) {
            console.error('User ID mismatch');
            router.push('/login');
            return;
        }

        setIsLoading(false);
    }, [searchParams, authUserId, router]);

    if (isLoading) {
        return <LoadingWrapper><div>Carregando...</div></LoadingWrapper>;
    }

    return (
        <>
            <LoadingWrapper>
                <header>
                    <Header />
                </header>
                <div className='pt-10 px-6 max-lg:px-6 lg:px-20 xl:px-16'>
                    <section>
                        <div>
                            <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Histórico de Agendamentos</h1>
                            <div className="border-t-2 border-[#702632] w-[130px] mt-1"></div>
                        </div>
                        <div className='flex-1'>
                            <HistoricoAgendamentos />
                        </div>
                    </section>
                </div>
            </LoadingWrapper>
        </>
    );
} 