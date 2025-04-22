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

interface Usuario {
    id: number;
    username: string;
    email: string;
    tipo_conta: string;
    sobrenome: string | null;
    ativo: boolean;
}

interface Imovel {
    id: number;
    codigo: number;
    nome_propriedade: string;
    tipo_transacao: string;
    tipo_imovel: string;
    status_imovel: string;
    valor_venda: number;
    valor_promocional: number;
    destaque: string;
    visibilidade: boolean;
    valor_iptu: number;
    condominio: number;
    area_construida: number;
    area_terreno: number;
    descricao: string;
}

interface Agendamento {
    id: number;
    data: string;
    horario: string;
    status: string;
    usuarioDTO: Usuario;
    imovelDTO: Imovel;
    corretorDTO: {
        id: number;
        username: string;
    };
}

interface ApiResponse {
    content: Agendamento[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export default function PaginaCorretorNotificacaoAgendar() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchAgendamentos = async () => {
        try {
            setLoading(true);
            console.log('Buscando agendamentos, página:', page);
            const response = await request('GET', `http://localhost:9090/agendamento/corretor?page=${page}&size=5`) as ApiResponse;
            console.log('Resposta inicial agendamentos:', response);
            
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
                                    tipoImovel={agendamento.imovelDTO.tipo_imovel}
                                    cidade={agendamento.imovelDTO.nome_propriedade}
                                    codigoImovel={String(agendamento.imovelDTO.codigo)}
                                    nomeUsuario={agendamento.usuarioDTO.username}
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