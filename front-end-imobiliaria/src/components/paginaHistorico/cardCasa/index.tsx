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

    useEffect(() => {
        const fetchImovelDetails = async () => {
            try {
                setLoading(true);
                const response = await request('GET', `http://localhost:9090/imovel/codigo/${codigo}`) as ImovelDetalhes;
                setImovel(response);

                // Fetch main image if imovel has an ID
                if (response && response.id) {
                    try {
                        const imageResponse = await fetch(`http://localhost:9090/imagens/download/imovel/${response.id}/imagem/0`);
                        if (imageResponse.ok) {
                            const blob = await imageResponse.blob();
                            const imageUrl = URL.createObjectURL(blob);
                            setMainImage(imageUrl);
                        }
                    } catch (error) {
                        console.error('Error fetching image:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching property details:', error);
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
                    alt="Imagem Imovel"
                    className="w-full md:w-full lg:w-[400px] rounded-2xl"
                    width={600}
                    height={400}
                />
                <div className="flex flex-col font-semibold text-xl text-center py-5 gap-7">
                    <p>Código: <span>{imovel?.codigo || codigo}</span></p>
                    <p>Bairro: <span>{imovel?.id_endereco?.bairro || "Não informado"}</span></p>
                    <p>Cidade: <span>{imovel?.id_endereco?.cidade || "Não informada"}</span></p>
                </div>
            </div>
        </div>
    );
}