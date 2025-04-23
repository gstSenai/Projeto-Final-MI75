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
    id_endereco: {
        bairro: string;
        cidade: string;
    };
    imagens: string[];
}

export function CardCasa({ codigo }: CardCasaProps) {
    const [imovel, setImovel] = useState<ImovelDetalhes | null>(null);
    const [mainImage, setMainImage] = useState<string>("/imagensImovel/fotoImovel.png");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImovelDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching property details for code:', codigo);

                // Get the token from localStorage
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error('Não autorizado: Token não encontrado');
                }

                const response = await request('GET', `/api/imovel/codigo/${codigo}`, undefined, {
                    'Authorization': `Bearer ${token}`
                }) as ImovelDetalhes;

                console.log('Property details response:', response);
                
                if (!response) {
                    throw new Error('Nenhum dado recebido do servidor');
                }

                if (!response.id_endereco) {
                    throw new Error('Dados do imóvel incompletos');
                }
                
                setImovel(response);

                // Fetch main image if imovel has an ID
                if (response && response.id) {
                    try {
                        console.log('Fetching image for property ID:', response.id);
                        const imageResponse = await fetch(`/api/imagens/download/imovel/${response.id}/imagem/0`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        console.log('Image response status:', imageResponse.status);
                        
                        if (imageResponse.ok) {
                            const blob = await imageResponse.blob();
                            const imageUrl = URL.createObjectURL(blob);
                            setMainImage(imageUrl);
                            console.log('Image loaded successfully');
                        } else {
                            console.log('Failed to load image, status:', imageResponse.status);
                            // Don't throw error for image loading failure, just keep default image
                        }
                    } catch (error) {
                        console.error('Error fetching image:', error);
                        // Don't set error state for image loading failure
                    }
                }
            } catch (error) {
                console.error('Error fetching property details:', error);
                setError(error instanceof Error ? error.message : 'Erro ao carregar os detalhes do imóvel');
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
                    <p className="mt-4 text-sm text-gray-600">Carregando detalhes do imóvel...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="z-10">
                <div className="bg-[#DFDAD0] rounded-2xl px-5 pt-8 flex flex-col z-20 items-center justify-center min-h-[400px]">
                    <p className="text-red-600 text-center">{error}</p>
                    <p className="mt-2 text-sm">Código do imóvel: {codigo}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="z-10">
            <div className="bg-[#DFDAD0] rounded-2xl px-5 pt-8 flex flex-col z-20">
                <Image
                    src={mainImage}
                    alt="Imagem Imovel"
                    className="w-full md:w-full lg:w-[400px] rounded-2xl"
                    width={600}
                    height={400}
                />
                <div className="flex flex-col font-semibold text-xl text-center py-5 gap-7">
                    <p>Código: <span className="font-normal">{imovel?.codigo || codigo}</span></p>
                    <p>Bairro: <span className="font-normal">{imovel?.id_endereco?.bairro || "Não informado"}</span></p>
                    <p>Cidade: <span className="font-normal">{imovel?.id_endereco?.cidade || "Não informada"}</span></p>
                </div>
            </div>
        </div>
    );
}