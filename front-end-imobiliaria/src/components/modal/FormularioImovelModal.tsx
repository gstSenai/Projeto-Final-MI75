"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Botao } from "@/components/botao"
import { EnderecoSection } from "@/components/paginaCadastroImovel/formulario/endereco-section"
import { DadosImovelSection } from "@/components/paginaCadastroImovel/formulario/dados-imovel-section"
import { tipo_transacao } from "@/components/paginaCadastroImovel/formulario/tiposTransacao"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import request from "@/routes/request"

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

interface FormularioImovelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export function FormularioImovelModal({ isOpen, onClose, onComplete }: FormularioImovelModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<FormData>>({});
    const [images, setImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const codigosGerados = new Set<number>();

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

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCancel = () => {
        setCurrentStep(1);
        setFormData({});
        onClose();
    };

    const handleImagesChange = (files: File[]) => {
        setImages(files);
    };

    const gerarCodigoAleatorio = () => {
        let codigo: number;
        do {
            codigo = Math.floor(Math.random() * 50000) + 1;
        } while (codigosGerados.has(codigo));
        
        codigosGerados.add(codigo);
        return codigo;
    }

    const addEndereco = async (data: typeof EnderecoImovelProps._type) => {
        try {
            if (!data.cep || !data.rua || !data.numero || !data.bairro || !data.cidade || !data.uf) {
                throw new Error('Todos os campos obrigatórios devem ser preenchidos');
            }

            console.log("Enviando dados do endereço:", data);
            const response = await request("POST", "http://localhost:9090/endereco/create", data);

            if (!response) {
                throw new Error("Resposta vazia do servidor");
            }

            if (response && response.id) {
                console.log("Endereço criado com sucesso:", response);
                return response;
            }

            throw new Error(`Falha ao criar o endereço: ${response.status}`);
        } catch (error) {
            console.error("Erro detalhado ao adicionar endereço:", error);
            throw error;
        }
    };

    const addImovel = async (data: typeof ImovelProps._type) => {
        try {
            console.log("Enviando dados do imóvel:", data);
            const response = await request("POST", "http://localhost:9090/imovel/create", data);
            
            if (!response) {
                throw new Error("Resposta vazia do servidor");
            }

            console.log("Resposta do servidor:", response);
            return response;
        } catch (error) {
            console.error("Erro detalhado ao adicionar imóvel:", error);
            throw error;
        }
    }

    const addCaracteristicasImovel = async (data: typeof ImovelCaracteristicas._type) => {
        try {
            console.log("Enviando características do imóvel:", data);
            const response = await request("POST", "http://localhost:9090/caracteristicaImovel/create", data);
            
            if (!response) {
                throw new Error("Resposta vazia do servidor");
            }

            console.log("Resposta do servidor:", response);
            return response;
        } catch (error) {
            console.error("Erro detalhado ao adicionar características do imóvel:", error);
            throw error;
        }
    }

    const uploadImages = async (imovelId: number) => {
        if (images.length === 0) return;

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });

        try {
            console.log("Enviando imagens para o imóvel:", imovelId);
            const response = await request("POST", `http://localhost:9090/imovel/upload/${imovelId}`, formData, {
                'Content-Type': 'multipart/form-data'
            });
            
            if (!response) {
                throw new Error("Resposta vazia do servidor");
            }

            console.log("Upload de imagens concluído:", response);
        } catch (error) {
            console.error("Erro detalhado ao fazer upload das imagens:", error);
            throw error;
        }
    };

    const onSubmit = async (data: FormData) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            console.log("Iniciando processo de salvamento...");

            const { imovel, endereco, imovelCaracteristicas } = data;

            console.log("Dados do formulário:", { imovel, endereco, imovelCaracteristicas });

            const responseCaracImovel = await addCaracteristicasImovel(imovelCaracteristicas);
            console.log("Características do imóvel salvas:", responseCaracImovel);

            const responseEndereco = await addEndereco(endereco);
            console.log("Endereço salvo:", responseEndereco);

            const immobileData = {
                id: imovel.id,
                codigo: gerarCodigoAleatorio(),
                nome_propriedade: imovel.nome_propriedade,
                tipo_transacao: imovel.tipo_transacao,
                valor_venda: imovel.valor_venda || 0,
                tipo_imovel: imovel.tipo_imovel,
                status_imovel: imovel.status_imovel,
                valor_promocional: imovel.valor_promocional || 0,
                destaque: imovel.test_destaque === "Sim",
                visibilidade: imovel.test_visibilidade === "Público",
                valor_iptu: imovel.valor_iptu || 0,
                condominio: imovel.condominio || 0,
                area_construida: imovel.area_construida || 0,
                area_terreno: imovel.area_terreno || 0,
                descricao: imovel.descricao || "",
                id_endereco: responseEndereco,
                id_caracteristicasImovel: responseCaracImovel,
            };

            console.log("Dados do imóvel a serem enviados:", immobileData);
            const response = await addImovel(immobileData);

            if (response && response.id) {
                if (images.length > 0) {
                    await uploadImages(response.id);
                }

                console.log("Imóvel criado com sucesso:", response);
                onComplete();
                onClose();
            } else {
                throw new Error("Erro ao criar imóvel, id não retornado.");
            }

        } catch (error) {
            console.error("Erro detalhado ao salvar:", error);
            alert(`Erro ao salvar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-vermelho">
                        {currentStep === 1 ? "Endereço do Imóvel" : 
                         currentStep === 2 ? "Tipo de Transação" : 
                         "Dados do Imóvel"}
                    </h2>
                    <button
                        className="bg-[#DFDAD0] px-3 py-1 rounded-full text-vermelho hover:bg-vermelho hover:text-[#DFDAD0] transition-colors"
                        onClick={handleCancel}
                    >
                        X
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="endereco"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <EnderecoSection register={register} errors={errors} setValue={setValue} />
                                <div className="flex justify-end gap-4 mt-4">
                                    <Botao
                                        className="bg-vermelho h-10"
                                        texto="Cancelar"
                                        onClick={handleCancel}
                                    />
                                    <Botao
                                        className="bg-vermelho h-10"
                                        texto="Próximo"
                                        onClick={handleNext}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="transacao"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                {tipo_transacao({ register, errors })}
                                <div className="flex justify-end gap-4 mt-4">
                                    <Botao
                                        className="bg-vermelho h-10"
                                        texto="Voltar"
                                        onClick={handleBack}
                                    />
                                    <Botao
                                        className="bg-vermelho h-10"
                                        texto="Próximo"
                                        onClick={handleNext}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="dados"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <DadosImovelSection
                                    register={register}
                                    errors={errors}
                                    onImagesChange={handleImagesChange}
                                />
                                <div className="flex justify-end gap-4 mt-4">
                                    <Botao
                                        className="bg-vermelho h-10"
                                        texto="Voltar"
                                        onClick={handleBack}
                                    />
                                    <Botao
                                        className="bg-vermelho h-10"
                                        texto="Salvar"
                                        type="submit"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </div>
    );
} 