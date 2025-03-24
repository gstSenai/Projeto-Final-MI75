"use client";
import { Montserrat } from 'next/font/google';
import { useState, useEffect } from "react";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700','800'],
    display: 'swap',
});

export default function Verificacao() {
    const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
    const [tempo, setTempo] = useState(300); // 5 minutos

    useEffect(() => {
        if (tempo > 0) {
            const timer = setTimeout(() => setTempo(tempo - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [tempo]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const novoCodigo = [...codigo];
        novoCodigo[index] = value;
        setCodigo(novoCodigo);

        if (value !== "" && index < 5) {
            document.getElementById(`input-${index + 1}`).focus();
        }
    };

    const formatarTempo = (segundos) => {
        const min = Math.floor(segundos / 60);
        const seg = segundos % 60;
        return `${min}:${seg < 10 ? "0" + seg : seg}`;
    };

    return (
        <div className="font-montserrat flex items-center justify-center min-h-screen  max-w-full bg-[url('/icon2FA/imgFundo.png')] bg-cover bg-center">
            <div className="flex flex-col bg-[#DFDAD0] shadow-lg rounded-lg p-8 w-[800px] h-[400px] text-center items-center">
                <h2 className="text-3xl font-semibold text-[#702632] pb-9 pt-4">
                    Autenticação de duas etapas
                </h2>
                <p className="text-black mb-4 w-96 ">
                    Digite o código enviado para o seu e-mail (e******@gmail.com). Não compartilhe este código com ninguém.        </p>
                <div className="flex justify-center gap-2 mb-4">
                    {codigo.map((num, index) => (
                        <input
                            key={index}
                            id={`input-${index}`}
                            type="text"
                            maxLength="1"
                            value={num}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="w-12 h-12 text-xl text-center bg-transparent border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    ))}
                </div>
                <p className="text-black text-sm">
                    {tempo > 0 ? (
                        `Reenviar código em ${formatarTempo(tempo)}`
                    ) : (
                        <button className="text-[#702632] hover:underline">
                            Enviar código novamente
                        </button>
                    )}
                </p>
                <button className="bg-[#702632] hover:bg-[#993a49] text-white font-bold py-2 px-4 rounded-xl mt-4 w-44 ">
                    CONFIRMAR
                </button>
                <button className="text-[#702632] hover:underline mt-2 text-[12px] font-semibold ">VOLTAR</button>
            </div>
        </div>
    );
}
