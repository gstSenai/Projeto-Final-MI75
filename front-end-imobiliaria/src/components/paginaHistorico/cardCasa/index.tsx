"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
    const [imovel, setImovel] = useState<ImovelDetalhes | null>(null);
    const [mainImage, setMainImage] = useState<string>("/imagensImovel/fotoImovel.png");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImovelDetails = async () => {
            try {
                setLoading(true);
                // Convertendo o código para número, já que a API espera um número
                const codigoNumerico = parseInt(codigo);
                const response = await request('GET', `http://localhost:9090/imovel/filtroCodigo?codigo=${codigoNumerico}`) as ImovelDetalhes;
                console.log('Dados do imóvel recebidos:', response);
                setImovel(response);

                // Tentar carregar a imagem apenas se tivermos um ID válido
                if (response?.id) {
                    try {
                        const imageUrl = `http://localhost:9090/imagens/download/imovel/${response.id}/imagem/0`;
                        const imageResponse = await fetch(imageUrl);
                        if (imageResponse.ok) {
                            const blob = await imageResponse.blob();
                            setMainImage(URL.createObjectURL(blob));
                        }
                    } catch (imageError) {
                        console.log('Erro ao carregar imagem, usando imagem padrão:', imageError);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes do imóvel:', error);
            } finally {
                setLoading(false);
            }
        };

        if (codigo) {
            fetchImovelDetails();
        }
    }, [codigo]);

    if (loading) {
        return (
            <div className="z-10">
                <div className="bg-[#DFDAD0] rounded-2xl px-5 pt-8 flex flex-col z-20 items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#702632]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="z-10">
            <div className="bg-[#DFDAD0] rounded-2xl px-5 pt-8 flex flex-col z-20">
                <Image
                    src={mainImage}
                    alt="Imagem Imóvel"
                    className="w-full md:w-full lg:w-[400px] h-[250px] object-cover rounded-2xl"
                    width={600}
                    height={400}
                    priority
                />
                <div className="flex flex-col font-medium text-base text-left py-5 space-y-3">
                    <p className="text-lg font-semibold">Código: {imovel?.codigo || codigo}</p>
                    <p>{imovel?.id_endereco?.cidade || "Não informada"}/{imovel?.id_endereco?.uf || "UF"}</p>
                    <p className="font-semibold">{imovel?.nome_propriedade || "Nome não informado"}</p>
                    <p>{imovel?.id_endereco?.rua || "Rua"}, {imovel?.id_endereco?.numero || "N/A"} - {imovel?.id_endereco?.bairro || "Bairro não informado"}</p>
                </div>
            </div>
        </div>
    );
}