"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { EnderecoSection } from "@/components/paginaCadastroImovel/formulario/endereco-section"
import { DadosImovelSection } from "@/components/paginaCadastroImovel/formulario/dados-imovel-section"
import { Botao } from "@/components/botao"
import { useState } from "react"
import { useRouter } from "next/navigation"

const ImovelProps = z.object({
    id: z.number().optional(),
    codigo: z.coerce.number().optional(),
    nome_propriedade: z.string().min(1, { message: "Nome da propriedade é obrigatório" }),
    tipo_transacao: z.string().min(1, { message: "Tipo de transação é obrigatório" }),
    valor_venda: z.coerce.number().min(1, { message: "Valor de venda é obrigatório" }),
    tipo_imovel: z.string().min(1, { message: "Tipo de imóvel é obrigatório" }),
    status_imovel: z.string().min(1, { message: "Status do imóvel é obrigatório" }),
    valor_promocional: z.coerce.number().min(1, { message: "Valor promocional é obrigatório" }),
    test_destaque: z.string().optional(),
    test_visibilidade: z.string().optional(),
    destaque: z.boolean().default(false),
    visibilidade: z.boolean().default(false),
    valor_iptu: z.coerce.number().min(1, { message: "Valor do IPTU é obrigatório" }),
    condominio: z.coerce.number().min(1, { message: "Valor do condomínio é obrigatório" }),
    area_construida: z.coerce.number().min(1, { message: "Área construída é obrigatória" }),
    area_terreno: z.coerce.number().min(1, { message: "Área do terreno é obrigatória" }),
    descricao: z.string().optional(),
})

const ImovelCaracteristicas = z.object({
    id: z.number().optional(),
    numero_quartos: z.coerce.number().min(1, { message: "Número de quartos é obrigatório" }),
    numero_banheiros: z.coerce.number().min(1, { message: "Número de banheiros é obrigatório" }),
    numero_suites: z.coerce.number().min(1, { message: "Número de suítes é obrigatório" }),
    numero_vagas: z.coerce.number().min(1, { message: "Número de vagas é obrigatório" }),
    test_piscina: z.string().optional(),
    piscina: z.boolean().default(false),
    numero_salas: z.coerce.number().min(1, { message: "Número de salas é obrigatório" }),
})

const EnderecoImovelProps = z.object({
    id: z.number().optional(),
    cep: z.string().min(1, { message: "CEP é obrigatório" }),
    rua: z.string().min(1, { message: "Rua é obrigatória" }),
    numero: z.string().min(1, { message: "Número é obrigatório" }),
    bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
    uf: z.string().min(1, { message: "UF é obrigatória" }),
    complemento: z.string().optional(),
})

const FormSchema = z.object({
    imovel: ImovelProps,
    imovelCaracteristicas: ImovelCaracteristicas,
    endereco: EnderecoImovelProps
})

type FormData = z.infer<typeof FormSchema>

export default function CadastroImovel() {
    const router = useRouter();
    const [images, setImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            imovel: {
                tipo_imovel: "",
                codigo: 0,
                tipo_transacao: "",
                test_destaque: "",
                status_imovel: "",
                test_visibilidade: "",
                destaque: false,
                visibilidade: false
            },
            imovelCaracteristicas: {
                test_piscina: "",
                piscina: false
            },
            endereco: {
                uf: ""
            }
        },
    });

    const handleImagesChange = (files: File[]) => {
        setImages(files);
    };

    const onSubmitImovel = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Primeiro, enviar o endereço
            const enderecoResponse = await fetch('http://localhost:3001/endereco/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data.endereco),
            });

            if (!enderecoResponse.ok) {
                throw new Error('Erro ao salvar endereço');
            }

            const enderecoData = await enderecoResponse.json();

            // Depois, enviar as características do imóvel
            const caracteristicasResponse = await fetch('http://localhost:3001/imovelCaracteristicas/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data.imovelCaracteristicas),
            });

            if (!caracteristicasResponse.ok) {
                throw new Error('Erro ao salvar características do imóvel');
            }

            const caracteristicasData = await caracteristicasResponse.json();

            // Por fim, enviar os dados do imóvel
            const imovelData = {
                ...data.imovel,
                endereco_id: enderecoData.id,
                caracteristicas_id: caracteristicasData.id,
            };

            const imovelResponse = await fetch('http://localhost:3001/imovel/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(imovelData),
            });

            if (!imovelResponse.ok) {
                throw new Error('Erro ao salvar imóvel');
            }

            // Se houver imagens, enviá-las
            if (images.length > 0) {
                const formData = new FormData();
                images.forEach((image, index) => {
                    formData.append(`imagens`, image);
                });

                const imagensResponse = await fetch('http://localhost:3001/imovel/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!imagensResponse.ok) {
                    throw new Error('Erro ao fazer upload das imagens');
                }
            }

            // Se tudo der certo, redirecionar para a página de imóveis
            router.push('/imoveis');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            setError(error instanceof Error ? error.message : 'Erro ao salvar o imóvel');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit(onSubmitImovel)}>
                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                <EnderecoSection register={register} errors={errors} setValue={setValue} />

                <DadosImovelSection
                    register={register}
                    errors={errors}
                    onImagesChange={handleImagesChange}
                />

                <div className="flex items-center gap-16 mt-10 mb-20">
                    <div className="flex max-sm:gap-12 max-lg:gap-36 gap-[40rem] w-full">
                        <Botao 
                            className="max-lg:text-base bg-vermelho h-10" 
                            onClick={() => window.history.back()} 
                            texto="Cancelar"
                            disabled={isSubmitting}
                        />
                        <Botao 
                            className="max-lg:text-base bg-vermelho h-10" 
                            type="submit"
                            texto={isSubmitting ? "Salvando..." : "Salvar cadastro"}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}