"use client"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LoadingWrapper } from '@/components/loading/loadingServer';
import { CorretorNotificacaoAgendar } from '@/components/corretorNotificacaoAgendar';
import { Montserrat } from 'next/font/google';
import { useEffect, useState } from 'react';
import request from '@/routes/request';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '800'],
    display: 'swap',
});

interface Agendamento {
    id: number;
    data: string;
    horario: string;
    status: string;
    imovel: {
        codigo: string;
        id_endereco: {
            bairro: string;
            cidade: string;
        };
    };
    usuario: {
        nome: string;
        sobrenome: string;
    };
}

interface ApiResponse {
    content: Agendamento[];       // Lista de agendamentos
    last: boolean;                // Se é a última página
    totalElements: number;        // Total de elementos em todas as páginas
    totalPages: number;           // Total de páginas
    size: number;                 // Tamanho da página
    number: number;               // Número da página atual
}

export default function PaginaCorretorNotificacaoAgendar() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchAgendamentos = async () => {
        try {
            setLoading(true);
            const response = await request('GET', `http://localhost:9090/agendamento/corretor?page=${page}&size=5`) as ApiResponse;
            setAgendamentos(prev => [...prev, ...response.content]);
            setHasMore(!response.last);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgendamentos();
    }, [page]);

    const handleConfirm = async (id: number) => {
        try {
            await request('PUT', `http://localhost:9090/agendamento/confirmar/${id}`);
            setAgendamentos(prev => prev.filter(ag => ag.id !== id));
        } catch (error) {
            console.error('Erro ao confirmar agendamento:', error);
        }
    };

    const handleCancel = async (id: number) => {
        try {
            await request('PUT', `http://localhost:9090/agendamento/cancelar/${id}`);
            setAgendamentos(prev => prev.filter(ag => ag.id !== id));
        } catch (error) {
            console.error('Erro ao cancelar agendamento:', error);
        }
    };

    const loadMore = () => {
        if (hasMore) {
            setPage(prev => prev + 1);
        }
    };

    return (
        <>
            <LoadingWrapper>
                <header>
                    <Header />
                </header>
                <div className={`${montserrat.className} pt-10 px-6 max-lg:px-6 lg:px-20 xl:px-16`}>
                    <section className='py-10'>
                        <div>
                            <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Notificações Agendamentos</h1>
                            <div className="border-t-2 border-[#702632] w-[130px] mt-1"></div>
                        </div>

                        <div className='flex flex-col pt-8'>
                            {agendamentos.map(agendamento => (
                                <CorretorNotificacaoAgendar 
                                    key={agendamento.id}
                                    id={agendamento.id}
                                    data={agendamento.data}
                                    horario={agendamento.horario}
                                    bairro={agendamento.imovel?.id_endereco?.bairro || 'N/A'}
                                    cidade={agendamento.imovel?.id_endereco?.cidade || 'N/A'}
                                    codigoImovel={agendamento.imovel?.codigo || 'N/A'}
                                    nomeUsuario={`${agendamento.usuario?.nome || ''} ${agendamento.usuario?.sobrenome || ''}`}
                                    status={agendamento.status || 'PENDENTE'}
                                    onConfirm={handleConfirm}
                                    onCancel={handleCancel}
                                />
                            ))}
                        </div>
                        
                        {hasMore && (
                            <div className="flex justify-center py-10">
                                <button 
                                    onClick={loadMore}
                                    className='bg-[#702632] hover:brightness-110 transition text-white rounded-lg px-6 py-2'
                                    disabled={loading}
                                >
                                    {loading ? 'Carregando...' : 'Ver mais'}
                                </button>
                            </div>
                        )}
                    </section>
                </div>
                <footer>
                    <Footer />
                </footer>
            </LoadingWrapper>
        </>
    );
}