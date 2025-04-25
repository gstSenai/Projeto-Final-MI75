"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Notification } from '../Notification';

interface CardHorarioAgendarProps {
    id: number;
    data: string;
    horario: string;
    tipoImovel: string;
    cidade: string;
    codigoImovel: string;
    nomeUsuario: string;
    status: string;
    imovelId: number;
    onConfirm: (id: number) => void;
    onCancel: (id: number) => void;
    onTimeChange?: (id: number, newTime: string) => void;
}

export function CorretorNotificacaoAgendar({
    id,
    data,
    horario,
    tipoImovel,
    cidade,
    codigoImovel,
    nomeUsuario,
    status,
    imovelId,
    onConfirm,
    onCancel,
    onTimeChange
}: CardHorarioAgendarProps) {
    const router = useRouter();
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [newTime, setNewTime] = useState(horario);
    const [timeError, setTimeError] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleTimeChange = () => {
        // Validar o formato do horário (HH:MM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(newTime)) {
            setTimeError('Por favor, insira um horário válido no formato HH:MM');
            return;
        }
        
        if (onTimeChange && newTime !== horario) {
            onTimeChange(id, newTime);
            setShowTimeModal(false);
            setTimeError('');
            setNotificationMessage('Horário alterado com sucesso!');
            setShowNotification(true);
        }
    };

    const handleVerImovel = () => {
        localStorage.setItem('currentImovelId', imovelId.toString());
        router.push('/paginaImoveis/imovelDetalhes');
    };

    const handleConfirm = () => {
        onConfirm(id);
        setNotificationMessage('Agendamento confirmado com sucesso!');
        setShowNotification(true);
    };

    const handleCancel = () => {
        onCancel(id);
        setNotificationMessage('Agendamento cancelado com sucesso!');
        setShowNotification(true);
    };

    return (
        <div className="pt-12 grid justify-center md:justify-center lg:justify-normal">
            {showNotification && (
                <Notification 
                    message={notificationMessage}
                    type="success"
                    duration={3000}
                    onClose={() => setShowNotification(false)}
                />
            )}
            
            <div className="bg-[#F4F1EA] w-full px-10 py-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-4">
                {/* Data e Horário */}
                <div className="text-base md:text-md lg:text-lg font-medium text-center md:text-left">
                    <div>{data}</div>
                    <div>{horario}</div>
                </div>

                {/* Localização */}
                <div className="text-base md:text-md lg:text-lg font-medium text-center md:text-left">
                    <div>{tipoImovel}</div>
                    <div className="uppercase">{cidade}</div>
                </div>

                {/* Informações adicionais */}
                <div className="text-xs md:text-sm lg:text-base flex flex-col text-center md:text-left">
                    <span>Cód: {codigoImovel}</span>
                    <span>Cliente: {nomeUsuario}</span>
                    <span className={`px-2 py-1 rounded-full text-center text-white ${status === 'CONFIRMADO' ? 'bg-green-500' :
                            status === 'CANCELADO' ? 'bg-red-500' :
                                'bg-yellow-500'
                        }`}>
                        {status === 'CONFIRMADO' ? 'Confirmado' :
                            status === 'CANCELADO' ? 'Cancelado' :
                                'Pendente'}
                    </span>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-2">
                    <button
                        onClick={handleVerImovel}
                        className="bg-[#702632] hover:brightness-110 transition text-white rounded-lg px-6 py-2"
                    >
                        Ver Detalhes
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-[#27AE60] hover:brightness-110 transition text-white rounded-lg px-6 py-2"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={() => setShowTimeModal(true)}
                        className="bg-[#702632] hover:brightness-110 transition text-white rounded-lg px-6 py-2"
                    >
                        Alterar Horário
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-[#702632] hover:brightness-110 transition text-white rounded-lg px-6 py-2"
                    >
                        Cancelar
                    </button>
                </div>
            </div>

            {/* Modal para alterar horário */}
            {showTimeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Alterar Horário</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Digite o novo horário (HH:MM):
                            </label>
                            <input
                                type="text"
                                value={newTime}
                                onChange={(e) => {
                                    setNewTime(e.target.value);
                                    setTimeError('');
                                }}
                                placeholder="Ex: 14:30"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {timeError && (
                                <p className="text-red-500 text-sm mt-1">{timeError}</p>
                            )}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowTimeModal(false);
                                    setTimeError('');
                                }}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleTimeChange}
                                className="bg-[#702632] hover:brightness-110 text-white px-4 py-2 rounded"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}