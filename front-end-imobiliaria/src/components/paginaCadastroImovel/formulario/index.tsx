"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EnderecoSection } from "../formulario/endereco-section"
import { DadosImovelSection } from "./dados-imovel-section"
import request from "@/routes/request"
import { Botao } from "@/components/botao"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { TipoImovelTransacao } from "./tiposTransacao"

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

type ImovelProps = z.infer<typeof ImovelProps>
type ImovelCaracteristicas = z.infer<typeof ImovelCaracteristicas>
type EnderecoImovelProps = z.infer<typeof EnderecoImovelProps>
type FormData = z.infer<typeof FormSchema>

interface InputDadosImovelProps {
    onComplete?: () => void;
    onClose: () => void;
    isOpen: boolean;
}

export function Formulario({ isOpen, onClose, onComplete }: InputDadosImovelProps) {
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
    })
    const [currentStep, setCurrentStep] = useState(1);
    const [showModal, setShowModal] = useState(false)
    const [lastAddedImovel, setLastAddedImovel] = useState<ImovelProps | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [images, setImages] = useState<File[]>([])
    const codigosGerados = new Set<number>();

    const handleImagesChange = (files: File[]) => {
        setImages(files);
    };

    const uploadImages = async (imovelId: number) => {
        try {
            console.log(`Iniciando upload de ${images.length} imagens para o imóvel ${imovelId}`);

            const formData = new FormData();
            images.forEach((imagem, index) => {
                formData.append('arquivos', imagem);
                console.log(`Adicionando imagem ${index + 1}: ${imagem.name}`);
            });

            const response = await fetch(`http://localhost:9090/imagens/imovel/${imovelId}`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro na resposta do upload:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorText
                });
                throw new Error(`Falha no upload das imagens: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Upload realizado com sucesso:', data);
            return data;
        } catch (error) {
            console.error("Erro detalhado ao fazer upload das imagens:", error);
            throw error;
        }
    };

    const addEndereco = async (data: EnderecoImovelProps) => {
        try {
            console.log("Sending address data:", data);

            if (!data.cep || !data.rua || !data.numero || !data.bairro || !data.cidade || !data.uf) {
                throw new Error('Todos os campos obrigatórios devem ser preenchidos');
            }

            const response = await request("POST", "http://localhost:9090/endereco/create", data);

            if (response && response.id) {
                return response;
            }

            console.error("Resposta do servidor:", response);
            throw new Error(`Falha ao criar o endereço: ${response.status}`);
        } catch (error) {
            console.error("Erro ao adicionar endereço:", error);
            throw error;
        }
    };

    const addImovel = async (data: ImovelProps) => {
        try {

            console.log("Sending address data:", data);

            const response = await request("POST", "http://localhost:9090/imovel/create", data)
            return response
        } catch (error) {
            console.error("Erro ao adicionar imóvel:", error)
            throw error
        }
    }

    const addCaracteristicasImovel = async (data: ImovelCaracteristicas) => {
        try {
            console.log("Carac Imovel", data)

            const response = await request("POST", "http://localhost:9090/caracteristicaImovel/create", data)

            return response
        } catch (error) {
            console.error("Erro ao adicionar imóvel:", error)
            throw error
        }
    }

    const deleteImovel = async (imoveId: number): Promise<void> => {
        try {
            await request('DELETE', `http://localhost:9090/imovel/delete/${imoveId}`)
        } catch (error) {
            console.error("Erro ao deletar imóvel:", error)
            throw error;
        }
    }

    const gerarCodigoAleatorio = () => {
        let codigo: number;
        do {
            codigo = Math.floor(Math.random() * 50000) + 1;
        } while (codigosGerados.has(codigo));

        codigosGerados.add(codigo);
        return codigo;
    }

    const onSubmitImovel = async (data: {
        imovel: ImovelProps; imovelCaracteristicas: ImovelCaracteristicas;
        endereco: EnderecoImovelProps
    }) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            const { imovel, endereco, imovelCaracteristicas } = data;

            const responseCaracImovel = await addCaracteristicasImovel(imovelCaracteristicas)
            const responseEndereco = await addEndereco(endereco);

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

            const response = await addImovel(immobileData);

            if (response && response.id) {
                if (images.length > 0) {
                    await uploadImages(response.id);
                } else {
                    console.log("Nenhuma imagem selecionada para upload");
                }

                console.log("Imóvel criado com sucesso:", response);
            } else {
                throw new Error("Erro ao criar imóvel, id não retornado.");
            }

            if (onComplete) onComplete();

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert(`Erro ao salvar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmitDelete = async () => {
        if (lastAddedImovel) {
            if (lastAddedImovel.id) {
                await deleteImovel(lastAddedImovel.id)
                setShowModal(false)
                setLastAddedImovel(null)
            }
            if (onComplete) {
                onComplete();
            }
        }
    }

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
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
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

                    <form onSubmit={handleSubmit(onSubmitImovel)}>
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
                                    <TipoImovelTransacao
                                        register={register}
                                        errors={errors}
                                    />
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

            <AnimatePresence>
                {showModal && lastAddedImovel && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed bottom-10 left-0 z-50"
                    >
                        <div className="bg-vermelho w-72 flex gap-1 p-3 rounded-tr-lg rounded-br-lg text-white shadow-lg">
                            <p className="text-center">Adicionado com Sucesso!</p>
                            <button onClick={onSubmitDelete} className="underline hover:text-gray-200">
                                Desfazer
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
