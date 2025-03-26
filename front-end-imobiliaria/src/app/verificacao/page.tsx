"use client";
import { Montserrat } from 'next/font/google';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700','800'],
    display: 'swap',
});

export default function Verificacao() {
    const router = useRouter();
    const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
    const [tempo, setTempo] = useState(300); // 5 minutos
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tempo > 0) {
            const timer = setTimeout(() => setTempo(tempo - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [tempo]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const novoCodigo = [...codigo];
        novoCodigo[index] = value;
        setCodigo(novoCodigo);
        setErro("");

        if (value !== "" && index < 5) {
            const inputElement = document.getElementById(`input-${index + 1}`) as HTMLInputElement;
            if (inputElement) {
                inputElement.focus();
            }
        }
    };

    const formatarTempo = (segundos: number) => {
        const min = Math.floor(segundos / 60);
        const seg = segundos % 60;
        return `${min}:${seg < 10 ? "0" + seg : seg}`;
    };

    const reenviarCodigo = async () => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setTempo(300);
            setErro("");
        } catch (error) {
            console.error("Erro ao reenviar o código:", error);
            setErro("Erro ao reenviar o código. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const verificarCodigo = async () => {
        const codigoCompleto = codigo.join("");
        if (codigoCompleto.length !== 6) {
            setErro("Por favor, preencha todos os campos");
            return;
        }

        try {
            setLoading(true);
            // Aqui você implementaria a verificação do código com a API
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação
            router.push("/dashboard"); // Redireciona após verificação bem-sucedida
        } catch (error) {
            console.error("Erro ao verificar o código:", error);
            setErro("Código inválido. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${montserrat.className} flex items-center justify-center min-h-screen max-w-full bg-[url('/icon2FA/imgFundo.png')] bg-cover bg-center`}>
            <div className="flex flex-col bg-[#DFDAD0] shadow-lg rounded-lg p-8 w-[800px] h-[400px] text-center items-center">
                <h2 className="text-3xl font-semibold text-[#702632] pb-9 pt-4">
                    Autenticação de duas etapas
                </h2>
                <p className="text-black mb-4 w-96">
                    Digite o código enviado para o seu e-mail (e******@gmail.com). Não compartilhe este código com ninguém.
                </p>
                <div className="flex justify-center gap-2 mb-4">
                    {codigo.map((num, index) => (
                        <input
                            key={index}
                            id={`input-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={num}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="w-12 h-12 text-xl text-center bg-transparent border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label={`Dígito ${index + 1} do código`}
                        />
                    ))}
                </div>
                {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}
                <p className="text-black text-sm">
                    {tempo > 0 ? (
                        `Reenviar código em ${formatarTempo(tempo)}`
                    ) : (
                        <button 
                            onClick={reenviarCodigo}
                            disabled={loading}
                            className="text-[#702632] hover:underline disabled:opacity-50"
                        >
                            {loading ? "Enviando..." : "Enviar código novamente"}
                        </button>
                    )}
                </p>
                <button 
                    onClick={verificarCodigo}
                    disabled={loading || codigo.join("").length !== 6}
                     className="bg-[#702632] hover:bg-[#993a49] text-white font-bold py-2 px-4 rounded-xl mt-4 w-44"
                >
                    {loading ? "Verificando..." : "CONFIRMAR"}
                </button>
                <button 
                    onClick={() => router.back()}
                    className="text-[#702632] hover:underline mt-2 text-[12px] font-semibold"
                >
                    VOLTAR
                </button>
            </div>
        </div>
    );
}
