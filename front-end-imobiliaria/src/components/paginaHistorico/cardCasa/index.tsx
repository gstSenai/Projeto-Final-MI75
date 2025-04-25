"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import request from "@/routes/request";

interface CardCasaProps {
    codigo: string;
}

interface ImovelDetalhes {
    id: number;
    codigo: string;
    nome_propriedade: string;
    id_endereco: {
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        uf: string;
    };
    imagens: string[];
}

export function CardCasa({ codigo }: CardCasaProps) {
    const router = useRouter();
    const [imovel, setImovel] = useState<ImovelDetalhes | null>(null);
    const [mainImage, setMainImage] = useState<string>("/imagensImovel/fotoImovel.png");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        let imageUrl: string;

        const fetchImovelDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!codigo || isNaN(parseInt(codigo))) {
                    throw new Error("Código do imóvel inválido");
                }

                const codigoNumero = parseInt(codigo);
                const response = await request(
                    'GET', 
                    `http://localhost:9090/imovel/filtroCodigo?codigo=${codigoNumero}`,
                    undefined,
                    {},
                    controller.signal
                ) as ImovelDetalhes;

                if (!response) {
                    throw new Error("Imóvel não encontrado");
                }

                console.log('Detalhes do imóvel recebidos:', response);
                setImovel(response);

                if (response.id) {
                    try {
                        const imageResponse = await fetch(
                            `http://localhost:9090/imagens/download/imovel/${response.id}/imagem/0`,
                            { signal: controller.signal }
                        );

                        if (imageResponse.ok) {
                            const blob = await imageResponse.blob();
                            imageUrl = URL.createObjectURL(blob);
                            setMainImage(imageUrl);
                        } else {
                            console.log('Imagem não encontrada, usando imagem padrão');
                        }
                    } catch (error) {
                        if (error instanceof Error && error.name !== 'AbortError') {
                            console.error('Erro ao carregar imagem:', error);
                        }
                    }
                }
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Erro ao buscar detalhes do imóvel:', error);
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        if (codigo) {
            fetchImovelDetails();
        }

        return () => {
            controller.abort();
            // Limpar URL da imagem ao desmontar
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [codigo]);

    if (loading) {
        return (
            <div className="z-10">
                <div className="bg-[#DFDAD0] rounded-2xl px-5 pt-8 flex flex-col z-20 items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#702632]"></div>
                    <p className="mt-4 text-gray-600">Carregando informações do imóvel...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="z-10">
                <div className="bg-[#DFDAD0] rounded-2xl px-5 pt-8 flex flex-col z-20 items-center justify-center min-h-[400px]">
                    <div className="text-red-600 text-center">
                        <p className="font-semibold">Erro ao carregar imóvel</p>
                        <p className="mt-2">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const endereco = imovel?.id_endereco;
    const enderecoCompleto = endereco
        ? `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}`
        : "Endereço não informado";
    const localizacao = endereco
        ? `${endereco.cidade}/${endereco.uf}`
        : "Localização não informada";

    return (
        <div className="z-10">
            <div className="bg-[#DFDAD0] rounded-2xl px-5 pt-8 flex flex-col z-20">
                <div className="relative">
                    <Image
                        src={mainImage}
                        alt={`Imagem do imóvel ${imovel?.codigo || codigo}`}
                        className="w-full md:w-full lg:w-[400px] h-[250px] object-cover rounded-2xl"
                        width={600}
                        height={400}
                        priority
                        onError={() => setMainImage("/imagensImovel/fotoImovel.png")}
                    />
                </div>
                <div className="flex flex-col font-medium text-base text-left py-5 space-y-3">
                    <p className="text-lg font-semibold">Código: {imovel?.codigo || codigo}</p>
                    <p>{localizacao}</p>
                    <p className="font-semibold">{imovel?.nome_propriedade || "Nome não informado"}</p>
                    <p>{enderecoCompleto}</p>
                    <button
                        onClick={() => router.push(`/paginaImoveis/imovelDetalhes?id=${imovel?.id}`)}
                        className="bg-[#702632] hover:brightness-110 transition text-white rounded-lg px-6 py-2 mt-4"
                    >
                        Ver Detalhes
                    </button>
                </div>
            </div>
        </div>
    );
}