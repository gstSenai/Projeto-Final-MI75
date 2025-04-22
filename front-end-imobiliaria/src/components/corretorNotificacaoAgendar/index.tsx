"use client"

interface CardHorarioAgendarProps {
    id: number;
    data: string;
    horario: string;
    tipoImovel: string;
    cidade: string;
    codigoImovel: string;
    nomeUsuario: string;
    status: string;
    onConfirm: (id: number) => void;
    onCancel: (id: number) => void;
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
    onConfirm,
    onCancel
}: CardHorarioAgendarProps) {
    return (
        <div className="pt-12 grid justify-center md:justify-center lg:justify-normal ">
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
                <div className="flex flex-col md:flex-row gap-3">
                    <button
                        onClick={() => onConfirm(id)}
                        className="bg-[#27AE60] hover:brightness-110 transition text-white rounded-lg px-6 py-2"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={() => onCancel(id)}
                        className="bg-[#702632] hover:brightness-110 transition text-white rounded-lg px-6 py-2"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}