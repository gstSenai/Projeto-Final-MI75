'use client'
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
import { RelacaoImovel } from "./relacaoImovel"

const ImovelProps = z.object({
    id: z.number().optional(),
    codigo: z.coerce.number().optional(),
    nome_propriedade: z.string().min(1, { message: "Nome da propriedade é obrigatório" }),
    tipo_transacao: z.string().min(1, { message: "Tipo de transação é obrigatório" }),
    valor_venda: z.string()
        .min(1, { message: "Valor de venda é obrigatório" })
        .regex(/^\d{1,3}(\.\d{3})*,\d{2}$/, { message: "Formato de valor inválido" })
        .transform((valor) => parseFloat(valor.replace(/\./g, '').replace(',', '.'))),
    tipo_imovel: z.string().min(1, { message: "Tipo de imóvel é obrigatório" }),
    status_imovel: z.string().min(1, { message: "Status do imóvel é obrigatório" }),
    valor_promocional: z.string()
        .min(1, { message: "Valor promocional é obrigatório" })
        .regex(/^\d{1,3}(\.\d{3})*,\d{2}$/, { message: "Formato de valor inválido" })
        .transform((valor) => parseFloat(valor.replace(/\./g, '').replace(',', '.'))),
    test_destaque: z.string().min(1, { message: "Destaque é obrigatório" }).optional(),
    test_visibilidade: z.string().min(1, { message: "Visibilidade é obrigatória" }).optional(),
    destaque: z.boolean().default(false),
    visibilidade: z.boolean().default(false),
    valor_iptu: z.string()
        .min(1, { message: "Valor do IPTU é obrigatório" })
        .regex(/^\d{1,3}(\.\d{3})*,\d{2}$/, { message: "Formato de valor inválido" })
        .transform((valor) => parseFloat(valor.replace(/\./g, '').replace(',', '.'))),
    condominio: z.string()
        .min(1, { message: "Valor do condomínio é obrigatório" })
        .regex(/^\d{1,3}(\.\d{3})*,\d{2}$/, { message: "Formato de valor inválido" })
        .transform((valor) => parseFloat(valor.replace(/\./g, '').replace(',', '.'))),
    area_construida: z.string()
        .min(1, { message: "Área construída é obrigatória" })
        .regex(/^\d{1,3}(\.\d{3})*,\d{2}$/, { message: "Formato de área inválido" })
        .transform((valor) => parseFloat(valor.replace(/\./g, '').replace(',', '.'))),
    area_terreno: z.string()
        .min(1, { message: "Área do terreno é obrigatória" })
        .regex(/^\d{1,3}(\.\d{3})*,\d{2}$/, { message: "Formato de área inválido" })
        .transform((valor) => parseFloat(valor.replace(/\./g, '').replace(',', '.'))),
    descricao: z.string().optional(),
})

const ImovelCaracteristicas = z.object({
    id: z.number().optional(),
    numero_quartos: z.coerce.number().min(0, { message: "Número de quartos é obrigatório" }),
    numero_banheiros: z.coerce.number().min(0, { message: "Número de banheiros é obrigatório" }),
    numero_suites: z.coerce.number().min(0, { message: "Número de suítes é obrigatório" }),
    numero_vagas: z.coerce.number().min(0, { message: "Número de vagas é obrigatório" }),
    test_piscina: z.string().optional(),
    piscina: z.boolean().default(false),
    numero_salas: z.coerce.number().min(0, { message: "Número de salas é obrigatório" }),
})

const EnderecoImovelProps = z.object({
    id: z.number().optional(),
    cep: z.string()
        .min(9, { message: "CEP inválido" })
        .regex(/^\d{5}-\d{3}$/, { message: "Formato de CEP inválido. Use o formato XXXXX-XXX" })
        .transform((cep) => cep.replace(/\D/g, '')),
    rua: z.string().min(1, { message: "Rua é obrigatória" }),
    numero: z.string().min(1, { message: "Número é obrigatório" }),
    bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
    uf: z.string().min(1, { message: "UF é obrigatória" }),
    complemento: z.string().optional(),
})

const ProprietarioProps = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
    cpf: z.string()
        .min(1, { message: "CPF é obrigatório" })
        .transform((cpf) => cpf.replace(/\D/g, '')),
    telefone: z.string()
        .min(1, { message: "Telefone é obrigatório" })
        .transform((tel) => tel.replace(/\D/g, '')),
    celular: z.string()
        .min(1, { message: "Celular é obrigatório" })
        .transform((cel) => cel.replace(/\D/g, '')),
    data_nascimento: z.string()
        .min(1, { message: "Data de nascimento é obrigatória" })
        .transform((data) => {
            const [dia, mes, ano] = data.split('/').map(Number);
            return new Date(ano, mes - 1, dia);
        }),
    email: z.string().email({ message: "E-mail inválido" }),
    enderecoProprietario: z.object({
        id: z.number().optional(),
        cep: z.string().min(8, { message: "CEP inválido" }),
        rua: z.string().min(1, { message: "Rua inválida" }),
        tipo_residencia: z.string().min(1, { message: "Tipo de residência inválido" }),
        numero_imovel: z.coerce.number().min(1, { message: "Número do imóvel inválido" }),
        numero_apartamento: z.coerce.number().min(1, { message: "Número do apartamento inválido" }).optional(),
        bairro: z.string().min(1, { message: "Bairro inválido" }),
        cidade: z.string().min(1, { message: "Cidade inválida" }),
        uf: z.string().min(2, { message: "UF inválida" }),
    }).optional(),
})

const UsuarioProps = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
    tipo_conta: z.string().min(1, { message: "Selecione um tipo de conta válido" }),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    ativo: z.boolean().optional(),
})

const FormSchema = z.object({
    imovel: ImovelProps,
    imovelCaracteristicas: ImovelCaracteristicas,
    endereco: EnderecoImovelProps,
    proprietarios: ProprietarioProps,
    usuario: UsuarioProps
})

type ImovelProps = z.infer<typeof ImovelProps>
type ImovelCaracteristicas = z.infer<typeof ImovelCaracteristicas>
type EnderecoImovelProps = z.infer<typeof EnderecoImovelProps>
type ProprietarioProps = z.infer<typeof ProprietarioProps>
type UsuarioProps = z.infer<typeof UsuarioProps>
type FormData = z.infer<typeof FormSchema>

export type { FormData }

interface InputDadosImovelProps {
    onComplete?: () => void;
    onClose: () => void;
    isOpen: boolean;
}

export function Formulario({ isOpen, onClose, onComplete }: InputDadosImovelProps) {
    const { register, handleSubmit, formState: { errors }, setValue, reset, trigger, getValues } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            imovel: {
                nome_propriedade: "",
                tipo_imovel: "",
                codigo: 0,
                tipo_transacao: "",
                test_destaque: "",
                status_imovel: "",
                test_visibilidade: "",
                destaque: undefined,
                visibilidade: undefined,
            },
            imovelCaracteristicas: {
                test_piscina: "",
                piscina: false,
                numero_salas: 0,
                numero_quartos: 0,
                numero_banheiros: 0,
                numero_suites: 0,
                numero_vagas: 0,
            },
            endereco: {
                uf: ""
            }
        },
    })
    const [currentStep, setCurrentStep] = useState(1);
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [lastAddedImovel, setLastAddedImovel] = useState<ImovelProps | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [images, setImages] = useState<File[]>([])
    const [adicionadoComSucesso, setAdicionadoComSucesso] = useState(false)
    const [adicionarAberto, setAdicionarAberto] = useState(true)
    const [proprietarioAdicionado, setProprietarioAdicionado] = useState(false)
    const [usuarioAdicionado, setUsuarioAdicionado] = useState(false)
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

    const handleNext = async () => {
        if (currentStep < 4) {
            let isValid = false;

            if (currentStep === 1) {
                isValid = await trigger('endereco');
                if (!isValid) {
                    setErrorMessage("Por favor, preencha todos os campos do endereço corretamente");
                    setShowErrorModal(true);
                    return;
                }
            }

            if (currentStep === 2) {
                const values = getValues();
                if (values.imovel) {
                    const campos = ['valor_venda', 'valor_promocional', 'valor_iptu', 'condominio', 'area_construida', 'area_terreno'] as const;
                    campos.forEach(campo => {
                        const valor = values.imovel[campo];
                        if (valor && !String(valor).includes(',')) {
                            setValue(`imovel.${campo}`, `${valor},00`);
                        }
                    });
                }

                isValid = await trigger(['imovel', 'imovel.tipo_transacao', 'imovel.tipo_imovel',
                    'imovel.test_visibilidade', 'imovel.test_destaque', 'imovel.area_construida', 'imovel.area_terreno']);
                if (!isValid) {
                    setErrorMessage("Por favor, preencha todos os campos de tipo de transação corretamente");
                    setShowErrorModal(true);
                    return;
                }
            }

            if (currentStep === 3) {
                isValid = await trigger(['imovel', 'imovelCaracteristicas']);
                if (!isValid) {
                    setErrorMessage("Por favor, preencha todos os campos obrigatórios");
                    setShowErrorModal(true);
                    setErrorMessage("Por favor, selecione o tipo de transação e o tipo de imóvel");
                    const formData = getValues();
                    const camposFaltantes = [];

                    if (!formData.imovel.tipo_transacao) camposFaltantes.push("tipo de transação");
                    if (!formData.imovel.tipo_imovel) camposFaltantes.push("tipo de imóvel");
                    if (!formData.imovel.test_destaque) camposFaltantes.push("destaque");
                    if (!formData.imovel.test_visibilidade) camposFaltantes.push("visibilidade");;

                    if (camposFaltantes.length > 0) {
                        setErrorMessage(`Por favor, preencha os seguintes campos: ${camposFaltantes.join(", ")}`);
                        setShowErrorModal(true);
                        return;
                    }
                }
            }

            if (currentStep === 4) {
                if (!proprietarioAdicionado || !usuarioAdicionado) {
                    const camposFaltantes = [];
                    if (!proprietarioAdicionado) camposFaltantes.push("proprietário");
                    if (!usuarioAdicionado) camposFaltantes.push("usuário");
                    
                    setErrorMessage(`Por favor, adicione um ${camposFaltantes.join(" e um ")} antes de salvar`);
                    setShowErrorModal(true);
                    return;
                }
            }

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
        reset();
        setImages([]);
        setShowErrorModal(false);
        setLastAddedImovel(null);
        onClose();
    };


    const onSubmitImovel = async (data: {
        imovel: ImovelProps; imovelCaracteristicas: ImovelCaracteristicas;
        endereco: EnderecoImovelProps;
        proprietarios: ProprietarioProps
        usuario: UsuarioProps
    }) => {
        if (isSubmitting) return;

        try {
            if (!proprietarioAdicionado || !usuarioAdicionado) {
                const camposFaltantes = [];
                if (!proprietarioAdicionado) camposFaltantes.push("proprietário");
                if (!usuarioAdicionado) camposFaltantes.push("usuário");
                
                setErrorMessage(`Por favor, adicione um ${camposFaltantes.join(" e um ")} antes de salvar`);
                setShowErrorModal(true);
                return;
            }

            if (Object.keys(errors).length > 0) {
                if (errors.endereco) {
                    setErrorMessage("Por favor, preencha todos os campos do endereço corretamente");
                    setShowErrorModal(true);
                    setCurrentStep(1);
                    return;
                }
                if (errors.imovel?.tipo_transacao || errors.imovel?.tipo_imovel) {
                    setErrorMessage("Por favor, selecione o tipo de transação e o tipo de imóvel");
                    setShowErrorModal(true);
                    setCurrentStep(2);
                    return;
                }
                if (errors.imovel || errors.imovelCaracteristicas) {
                    setErrorMessage("Por favor, preencha todos os campos obrigatórios");
                    setShowErrorModal(true);
                    setCurrentStep(3);
                    return;
                }
                if (errors.proprietarios || errors.usuario) {
                    setErrorMessage("Por favor, preencha todos os campos obrigatórios");
                    setShowErrorModal(true);
                    setCurrentStep(4);
                    return;
                }
            }

            setIsSubmitting(true);

            const { imovel, endereco, imovelCaracteristicas, proprietarios, usuario } = data;

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
                id_proprietario: proprietarios,
                id_usuario: usuario
            };

            const response = await addImovel(immobileData);

            if (response && response.id) {
                if (images.length > 0) {
                    await uploadImages(response.id);
                } else {
                    console.log("Nenhuma imagem selecionada para upload");
                }

                console.log("Imóvel criado com sucesso:", response);
                setLastAddedImovel(response);
                setAdicionadoComSucesso(true);
                setAdicionarAberto(false);

                setTimeout(() => {
                    reset();
                    setCurrentStep(1);
                    setImages([]);
                    onClose();
                }, 5000);

            } else {
                setAdicionadoComSucesso(false);
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
                setShowErrorModal(false)
                setLastAddedImovel(null)
            }
            if (onComplete) {
                onComplete();
            }
        }
    }

    if (!isOpen) return null;

    return (
        <>                   
         {adicionarAberto && (
            <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
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

                                    <div className="flex gap-10 mt-4">
                                        <Botao
                                            className="bg-vermelho h-10 max-sm:w-[80%] max-md:w-[60%] w-[49%] lg:w-[50%]"
                                            texto="Cancelar"
                                            onClick={handleCancel}
                                        />
                                        <Botao
                                            className="bg-vermelho h-10 max-sm:w-[80%] max-md:w-[60%] w-[49%] lg:w-[50%]"
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
                                            className="bg-vermelho max-sm:w-[80%] max-md:w-[60%] w-[49%] lg:w-[50%]"
                                            texto="Voltar"
                                            onClick={handleBack}
                                        />
                                        <Botao
                                            className="bg-vermelho h-10 max-sm:w-[80%] max-md:w-[60%] w-[49%] lg:w-[50%]"
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
                                            className="bg-vermelho max-sm:w-[80%] max-md:w-[60%] w-[49%] lg:w-[50%]"
                                            texto="Voltar"
                                            onClick={handleBack}
                                        />
                                        <Botao
                                            className="bg-vermelho h-10 max-sm:w-[80%] max-md:w-[60%] w-[49%] lg:w-[50%]"
                                            texto="Próximo"
                                            onClick={handleNext}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 4 && (
                                <motion.div
                                    key="dados"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    <RelacaoImovel
                                        register={register}
                                        errors={errors}
                                        setValue={setValue}
                                        onProprietarioAdicionado={() => setProprietarioAdicionado(true)}
                                        onUsuarioAdicionado={() => setUsuarioAdicionado(true)}
                                    />
                                    <div className="flex justify-end gap-4 mt-4">
                                        <Botao
                                            className="bg-vermelho h-10 max-sm:w-[80%] max-md:w-[60%] w-[49%] lg:w-[50%]"
                                            texto="Voltar"
                                            onClick={handleBack}
                                        />
                                        <Botao
                                            className="bg-vermelho h-10 max-sm:w-[80%] max-md:w-[60%] w-[49%] lg:w-[50%]"
                                            texto="Salvar"
                                            type="submit"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                </div>
            </div>
        )}

            <AnimatePresence>
                {adicionadoComSucesso && lastAddedImovel && (
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

                {showErrorModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
                    >
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-vermelho">Campos Inválidos</h2>
                                <button
                                    className="bg-[#DFDAD0] px-3 py-1 rounded-full text-vermelho hover:bg-vermelho hover:text-[#DFDAD0] transition-colors"
                                    onClick={() => setShowErrorModal(false)}
                                >
                                    X
                                </button>
                            </div>
                            <p className="text-gray-700 text-lg mb-4">{errorMessage}</p>
                            <div className="flex justify-end">
                                <Botao
                                    className="bg-vermelho lg:w-1/3 h-10"
                                    texto="OK"
                                    onClick={() => setShowErrorModal(false)}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

