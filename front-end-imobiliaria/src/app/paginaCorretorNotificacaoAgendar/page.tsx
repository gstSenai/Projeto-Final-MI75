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

interface AgendamentoPostRequestDTO {
    data: string;
    horario: string;
    idImovel: number;
    idUsuario: number;
    idCorretor: number;
    status: string;
}

export default function PaginaCorretorNotificacaoAgendar() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const fetchAgendamentos = async () => {
        try {
            setLoading(true);
            console.log('Iniciando busca de agendamentos...');
            const response = await request('GET', `http://localhost:9090/agendamento/corretor?page=${page}&size=5`) as ApiResponse;
            console.log('Resposta inicial agendamentos:', response);
            
            if (page === 0) {
                // If it's the first page, replace the entire state
                setAgendamentos(response.content);
            } else {
                // If it's not the first page, append to existing state
                setAgendamentos(prev => [...prev, ...response.content]);
            }
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
            
            // Mostrar notificação
            setNotificationMessage('Agendamento confirmado com sucesso!');
            setShowNotification(true);
            
            // Esconder notificação após 3 segundos
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
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

    const handleTimeChange = async (id: number, newTime: string) => {
        try {
            // Buscar o agendamento atual
            const agendamentoAtual = await request('GET', `http://localhost:9090/agendamento/getById/${id}`) as Agendamento;
            
            // Criar o objeto de atualização com o novo horário
            const agendamentoAtualizado: AgendamentoPostRequestDTO = {
                data: agendamentoAtual.data,
                horario: newTime + ":00" as any, // Adiciona os segundos para o formato HH:mm:ss
                idImovel: agendamentoAtual.imovelDTO.id,
                idUsuario: agendamentoAtual.usuarioDTO.id,
                idCorretor: agendamentoAtual.corretorDTO.id,
                status: agendamentoAtual.status as any
            };

            // Fazer a requisição de atualização
            await request('PUT', `http://localhost:9090/agendamento/update/${id}`, agendamentoAtualizado);
            
            // Atualizar o estado local
            setAgendamentos(prev => prev.map(ag => 
                ag.id === id ? { ...ag, horario: newTime } : ag
            ));
        } catch (error) {
            console.error('Erro ao alterar horário:', error);
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
                            {agendamentos.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 text-lg">Nenhum agendamento pendente no momento.</p>
                                </div>
                            ) : (
                                agendamentos.map(agendamento => (
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
                                        onTimeChange={handleTimeChange}
                                    />
                                ))
                            )}
                        </div>
                        
                        {hasMore && agendamentos.length > 0 && (
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

                {/* Notificação lateral */}
                <div className={`fixed top-4 right-4 transform transition-transform duration-500 ease-in-out z-50 ${
                    showNotification ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {notificationMessage}
                    </div>
                </div>
            </LoadingWrapper>
        </>
    );
}