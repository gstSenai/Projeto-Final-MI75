"use client"

interface CardHorarioAgendarProps {
    horario: string;
    bairro: string;
    horarios: string;
    cidade: string;
    codigo: string;
}

export function CorretorNotificacaoAgendar({ horario, bairro, horarios, cidade, codigo }: CardHorarioAgendarProps) {
    return (
        <div className="bg-[#F4F1EA] w-[177px] sm:w-[177px] md:w-full px-4 py-6 sm:px-4 sm:py-6 md:px-6 md:py-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-10">
            {/* Horário inicial */}
            <div className="text-base md:text-lg lg:text-xl  font-medium text-center sm:text-center md:text-right xl:text-right">
                {horario}
            </div>

            {/* Bairro */}
            <div className="text-base md:text-lg lg:text-xl font-medium text-center sm:text-center md:text-right xl:text-right">
                {bairro}
            </div>

            {/* Informações de horário, cidade e código */}
            <div className="text-xs md:text-sm lg:text-base flex flex-col text-center sm:text-center md:text-right xl:text-right">
                <span>{horarios}</span>
                <span className="uppercase">{cidade}</span>
                <span>Cód: {codigo}</span>
            </div>

            {/* Botões */}
            <div className="flex flex-col md:flex-row gap-3">
                <button className="bg-[#27AE60] hover:brightness-110 transition text-white rounded-lg  px-6 py-2 ">Confirmar</button>
                <button className="bg-[#702632] hover:brightness-110 transition text-white rounded-lg  px-6 py-2 ">Cancelar</button>
            </div>
        </div>
    );
}
