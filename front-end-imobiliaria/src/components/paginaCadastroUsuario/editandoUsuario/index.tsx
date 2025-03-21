"use client"
import { useState, useEffect } from "react"
import React from "react"

import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { FormularioEditarInput } from "../editandoUsuario/formularioEditarInput"
import { type SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const EnderecoProps = z.object({
    id: z.number().optional(),
    cep: z.string().min(1, { message: "CEP é obrigatório" }),
    rua: z.string().min(1, { message: "Rua é obrigatória" }),
    tipo_residencia: z.string().min(1, { message: "Tipo de residência é obrigatório" }),
    numero_imovel: z.string().min(1, { message: "Número do imóvel é obrigatório" }),
    numero_apartamento: z.string().optional(),
    bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
    uf: z.string().min(1, { message: "UF é obrigatório" }),
})

const UsuarioProps = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
    cpf: z.string().min(11, { message: "CPF inválido (formato: 123.456.789-00)" }).max(11),
    tipo_conta: z.enum(["Usuario", "Corretor", "Administrador", "Editor"], {
        message: "Selecione um tipo de conta válido",
    }),
    telefone: z.string().min(10, { message: "Telefone inválido" }),
    data_nascimento: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    idEnderecoUsuario: z.number().optional(),
    endereco: EnderecoProps.optional(),
})

const FormSchema = z.object({
    usuario: UsuarioProps,
    endereco: EnderecoProps
})

type UsuarioData = z.infer<typeof UsuarioProps>
type EnderecoImovelProps = z.infer<typeof EnderecoProps>
type FormData = z.infer<typeof FormSchema>

interface EditarUsuarioData {
    selectedUsuarios: UsuarioData[]
    onComplete?: () => void
}

export function EditarUsuario({ selectedUsuarios, onComplete }: EditarUsuarioData) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
    })

    const {
        register: registerEndereco,
        handleSubmit: handleSubmitEndereco,
        formState: { errors: errorsEndereco },
        setValue,
    } = useForm<EnderecoImovelProps>({
        resolver: zodResolver(EnderecoProps),
        defaultValues: {
            cep: "",
            rua: "",
            tipo_residencia: "",
            numero_imovel: "",
            numero_apartamento: "",
            bairro: "",
            cidade: "",
            uf: "",
        }
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagem, setImagem] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>()
    const [showEditTrue, setShowEditTrue] = useState(false)
    const [lastAddedUsuarios, setLastAddedUsuarios] = useState<UsuarioData | null>(null)
    const [showModal, setShowModal] = useState(true)
    const [showEditUsuario, setShowEditUsuario] = useState(false)
    const [showEditEndereco, setShowEditEndereco] = useState(false)
    const [usuarioId, setUsuarioId] = useState<number>()
    const [enderecoId, setEnderecoId] = useState<number>()
    const [isEditar] = useState(false)
    const [uf, setUf] = useState<Estado | "">("")
    const [cidade, setCidade] = useState<string>("")
    const [cidades, setCidades] = useState<string[]>([])
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const estados = ["SC"]

    type Estado = "SC"

    const cidadesPorEstado: Record<Estado, string[]> = {
        SC: ["Jaraguá do Sul", "Joinville", "Corupá"],
    }

    useEffect(() => {
        if (uf && cidadesPorEstado[uf as Estado]) {
            setCidades(cidadesPorEstado[uf as Estado])
            setCidade("")
        }
    }, [uf])

    useEffect(() => {
        if (selectedUsuarios && selectedUsuarios.length > 0 && selectedUsuarios[0].endereco) {
            const endereco = selectedUsuarios[0].endereco
            setValue("cep", endereco.cep)
            setValue("rua", endereco.rua)
            setValue("tipo_residencia", endereco.tipo_residencia)
            setValue("numero_imovel", endereco.numero_imovel)
            setValue("numero_apartamento", endereco.numero_apartamento || "")
            setValue("bairro", endereco.bairro)
            setValue("cidade", endereco.cidade)
            setValue("uf", endereco.uf)
        }
    }, [selectedUsuarios, setValue])

    const handleUfChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        if (event.target instanceof HTMLSelectElement) {
            setUf(event.target.value as Estado)
        } else if (event.target instanceof HTMLInputElement) {
            setCidade(event.target.value)
        }
    }

    const editarUsers = async (data: Partial<UsuarioData>, imagem: File | null) => {
        try {
            console.log("📤 Enviando dados para atualização:", data)

            const formData = new FormData()

            formData.append("usuario", JSON.stringify(data))

            if (imagem) {
                formData.append("imagem", imagem)
            }

            const response = await fetch(`http://localhost:9090/usuario/update/${data.id}`, {
                method: "PUT",
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            const responseData = await response.json()
            console.log("✅ Usuário atualizado com sucesso:", responseData)

            return responseData
        } catch (error) {
            console.error("❌ Erro ao editar usuário:", error)
            throw error
        }
    }

    const editarEndereco = async (data: EnderecoImovelProps) => {
        try {
            console.log("📤 Enviando endereço do usuário:", data)

            for (const usuario of selectedUsuarios) {
                if (!usuario.idEnderecoUsuario) {
                    console.warn("⚠️ Usuário sem endereço cadastrado:", usuario)
                    continue
                }

                const enderecoAtualizado = {
                    id: usuario.idEnderecoUsuario,
                    cep: data.cep,
                    rua: data.rua,
                    tipo_residencia: data.tipo_residencia,
                    numero_imovel: data.numero_imovel,
                    numero_apartamento: data.numero_apartamento,
                    bairro: data.bairro,
                    cidade: data.cidade,
                    uf: data.uf,
                }

                const response = await request(
                    "PUT",
                    `http://localhost:9090/enderecoUsuario/update/${usuario.idEnderecoUsuario}`,
                    enderecoAtualizado,
                )
                console.log("✅ Endereço atualizado com sucesso:", response)
                return response
            }
        } catch (error) {
            console.error("❌ Erro ao editar endereço:", error)
            throw error
        }
    }

    const onSubmitEditUsers: SubmitHandler<{ usuario: UsuarioData }> = async (data) => {
        if (isSubmitting) return

        try {
            setIsSubmitting(true)

            console.log("Dados recebidos para validação:", data)

            const { usuario } = data

            const usuarioSelecionadoId = selectedUsuarios[0].id
            const usuarioSelecionadoEndereco = selectedUsuarios[0].idEnderecoUsuario

            const usuarioAtualizado = {
                ...usuario,
                id: usuarioId || usuarioSelecionadoId,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                cpf: usuario.cpf,
                tipo_conta: usuario.tipo_conta,
                telefone: usuario.telefone,
                data_nascimento: usuario.data_nascimento,
                email: usuario.email,
                senha: usuario.senha,
                imagem_usuario: "psdad.jpg",
                idEnderecoUsuario: usuarioSelecionadoEndereco,
            }

            console.log("Dados do usuário a serem enviados:", usuarioAtualizado)

            const response = await editarUsers(usuarioAtualizado, imagem || null)
            console.log("Resposta do servidor:", response)
            if (response) {
                setLastAddedUsuarios(response[0])
                setShowModal(false)
                setShowEditTrue(true)
            } else {
                console.error("Erro: Resposta inválida ao adicionar usuário.")
            }

            if (onComplete) onComplete()

            setTimeout(() => setShowEditTrue(false), 5000)
        } catch (error) {
            console.error("Erro ao editar usuário:", error)
            alert(`Erro ao editar usuário: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const onSubmitEditUsersEndereco: SubmitHandler<EnderecoImovelProps> = async (data) => {
        if (isSubmitting) return

        try {
            setIsSubmitting(true)

            console.log("Dados recebidos para validação:", data)

            const usuarioSelecionado = selectedUsuarios[0]

            if (!usuarioSelecionado?.idEnderecoUsuario) {
                throw new Error("Usuário não possui endereço cadastrado")
            }

            const endereco = {
                ...data,
                id: usuarioSelecionado.idEnderecoUsuario,
            }

            console.log("Dados do endereço a serem enviados:", endereco)

            const response = await editarEndereco(endereco)
            console.log("Resposta do servidor:", response)
            if (response) {
                setShowModal(false)
                setShowEditTrue(true)
            } else {
                console.error("Erro: Resposta inválida ao atualizar endereço.")
            }

            if (onComplete) onComplete()

            setTimeout(() => setShowEditTrue(false), 5000)
        } catch (error) {
            console.error("Erro ao editar endereço:", error)
            alert(`Erro ao editar endereço: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const refreshData = () => {
        setRefreshTrigger((atualizar) => atualizar + 1)
    }

    const handleEditarUsuarioDados = () => {
        setShowEditUsuario(!showEditUsuario)
        setShowEditEndereco(false)
        if (showEditUsuario) {
            refreshData()
        }
    }

    const handleEditarUsuarioEndereco = () => {
        setShowEditEndereco(!showEditEndereco)
        setShowEditUsuario(false)
        if (showEditEndereco) {
            refreshData()
        }
    }

    const handleCancel = () => {
        setShowModal(false)
        if (onComplete) {
            onComplete()
        }
    }

    const handleClick = () => {
        console.log("Botão clicado!");
        handleSubmit(onSubmitEditUsers)();
    };

    useEffect(() => {
        if (selectedUsuarios && selectedUsuarios.length > 0) {
            console.log("Dados do usuário:", selectedUsuarios)
            console.log("Dados do endereço:", selectedUsuarios[0].idEnderecoUsuario)
            console.log(errors)
        }
    }, [selectedUsuarios, errors])


    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-8 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-3xl w-full">
                        <div className="flex justify-start w-1/12">
                            <button
                                className="bg-[#DFDAD0] py-2 px-4 rounded-full text-vermelho lg:text-2xl transition-transform duration-300 hover:scale-110
                             hover:bg-vermelho hover:text-[#DFDAD0]"
                                onClick={handleCancel}
                            >
                                X
                            </button>
                        </div>

                        <div className="flex flex-col w-full overflow-y-auto max-h-[80vh] pt-5 px-10">
                            <div className="flex items-center justify-center mb-10 gap-10">
                                <button
                                    className="bg-[#DFDAD0] py-2 px-4 rounded-full text-vermelho lg:text-2xl transition-transform duration-300 hover:scale-110
                             hover:bg-vermelho hover:text-[#DFDAD0]"
                                    onClick={handleEditarUsuarioDados}
                                >
                                    <p className="text-xl">Dados Usuário</p>
                                </button>
                                <button
                                    className="bg-[#DFDAD0] py-2 px-4 rounded-full text-vermelho lg:text-2xl transition-transform duration-300 hover:scale-110
                             hover:bg-vermelho hover:text-[#DFDAD0]"
                                    onClick={handleEditarUsuarioEndereco}
                                >
                                    <p className="text-xl">Dados Endereço</p>
                                </button>
                            </div>

                            {showEditUsuario && (
                                <>
                                    <div className="flex items-center justify-center">
                                        <h1 className="text-3xl font-semibold text-vermelho mb-4">Editar Dados do Usuário</h1>
                                    </div>
                                    <div>
                                        <div>
                                            <form className="space-y-4">
                                                {selectedUsuarios.length > 0 && (
                                                    <div>
                                                        {selectedUsuarios.map((usuario) => (
                                                            <React.Fragment key={usuario.id}>
                                                                <div className="space-y-4 pt-10">
                                                                    <div className="flex flex-col gap-4">
                                                                        <div className="w-full">
                                                                            <label htmlFor={`nome_${usuario.id}`} className="block text-lg">
                                                                                Nome:
                                                                            </label>
                                                                            <FormularioEditarInput
                                                                                placeholder="Ex: Caio"
                                                                                name="usuario.nome"
                                                                                value={usuario.nome}
                                                                                register={register}
                                                                                required
                                                                                custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                                errors={errors?.usuario?.nome}
                                                                            />
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label htmlFor={`sobrenome_${usuario.id}`} className="block text-lg">
                                                                                Sobrenome:
                                                                            </label>
                                                                            <FormularioEditarInput
                                                                                placeholder="Ex: Souza"
                                                                                name="usuario.sobrenome"
                                                                                value={usuario.sobrenome}
                                                                                register={register}
                                                                                required
                                                                                custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                                errors={errors?.usuario?.nome}
                                                                            />
                                                                        </div>

                                                                        <div className="w-full max-h-[80vh] overflow-y-auto">
                                                                            <label htmlFor={`cpf_${usuario.id}`} className="block text-lg">
                                                                                CPF:
                                                                            </label>
                                                                            <FormularioEditarInput
                                                                                mask="999.999.999-99"
                                                                                placeholder="Ex: 000.000.000-00"
                                                                                name="usuario.cpf"
                                                                                value={usuario.cpf}
                                                                                register={register}
                                                                                required
                                                                                custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                                errors={errors?.usuario?.cpf}
                                                                            />
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label htmlFor={`tipo_conta_${usuario.id}`} className="block text-lg">
                                                                                Tipo da Conta:
                                                                            </label>

                                                                            <FormularioEditarInput
                                                                                placeholder=""
                                                                                name="usuario.tipo_conta"
                                                                                value={usuario.tipo_conta}
                                                                                register={register}
                                                                                required
                                                                                custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                                options={["Usuario", "Corretor", "Administrador", "Editor"]}
                                                                                errors={errors?.usuario?.tipo_conta}
                                                                            />
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label htmlFor={`telefone_${usuario.id}`} className="block text-lg">
                                                                                Telefone:
                                                                            </label>

                                                                            <FormularioEditarInput
                                                                                placeholder="(00) 0000-0000"
                                                                                name="usuario.telefone"
                                                                                value={usuario.telefone}
                                                                                register={register}
                                                                                required
                                                                                custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                                errors={errors?.usuario?.telefone}
                                                                            />
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label htmlFor={`data_nascimento_${usuario.id}`} className="block text-lg">
                                                                                Data de Nascimento:
                                                                            </label>

                                                                            <FormularioEditarInput
                                                                                placeholder="Ex: 22/02/2005"
                                                                                name="usuario.data_nascimento"
                                                                                value={usuario.data_nascimento}
                                                                                register={register}
                                                                                required
                                                                                custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                                errors={errors?.usuario?.data_nascimento}
                                                                            />
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label htmlFor={`email_${usuario.id}`} className="block text-lg">
                                                                                E-mail:
                                                                            </label>

                                                                            <FormularioEditarInput
                                                                                placeholder="Ex: caio@gmail.com"
                                                                                name="usuario.email"
                                                                                value={usuario.email}
                                                                                register={register}
                                                                                required
                                                                                custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                                errors={errors?.usuario?.email}
                                                                            />
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label htmlFor={`senha_${usuario.id}`} className="block text-lg">
                                                                                Senha:
                                                                            </label>

                                                                            <FormularioEditarInput
                                                                                placeholder=""
                                                                                name="usuario.senha"
                                                                                value={usuario.senha}
                                                                                register={register}
                                                                                required
                                                                                custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                                errors={errors?.usuario?.senha}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-6">
                                        <div className="flex justify-around items-center gap-10 w-[50%]">
                                            <Botao onClick={handleCancel} texto="Cancelar" />
                                            <Botao
                                                onClick={handleClick}
                                                texto={isEditar ? "Editando..." : "Editar"}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {showEditEndereco && (
                                <>
                                    <div className="flex items-center justify-center">
                                        <h1 className="text-3xl font-semibold text-vermelho mb-4">Editar Dados do Endereço</h1>
                                    </div>
                                    <div>
                                        <form onSubmit={handleSubmitEndereco(onSubmitEditUsersEndereco)} className="space-y-4">
                                            {selectedUsuarios.length > 0 && (
                                                <div>
                                                    {selectedUsuarios.map((usuario) => (
                                                        <div key={usuario.id} className="space-y-4 pt-10">
                                                            <div className="flex flex-col gap-4">
                                                                <div className="w-full">
                                                                    <label htmlFor={`cep_${usuario.id}`} className="block text-lg">
                                                                        CEP:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder="00000-000:"
                                                                        name="cep"
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`uf_${usuario.id}`} className="block text-lg">
                                                                        UF:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder="UF:"
                                                                        name="uf"
                                                                        register={registerEndereco}
                                                                        onChange={handleUfChange}
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        options={estados}
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`cidade_${usuario.id}`} className="block text-lg">
                                                                        Cidade:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder="Cidade:"
                                                                        name="cidade"
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        options={cidadesPorEstado.SC}
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`rua_${usuario.id}`} className="block text-lg">
                                                                        Rua:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="rua"
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`bairro_${usuario.id}`} className="block text-lg">
                                                                        Bairro:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="bairro"
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`tipo_residencia_${usuario.id}`} className="block text-lg">
                                                                        Tipo de Residência:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="tipo_residencia"
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        options={["Casa", "Apartamento"]}
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`numero_imovel_${usuario.id}`} className="block text-lg">
                                                                        Número do Imovel:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder="Ex: 009:"
                                                                        name="numero_imovel"
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`numero_apartamento_${usuario.id}`} className="block text-lg">
                                                                        Número Apartamento (Caso tenha):
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder="Ex: 009:"
                                                                        name="numero_apartamento"
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                    <div className="flex justify-end pt-6">
                                        <div className="flex justify-around items-center gap-10 w-[50%]">
                                            <Botao onClick={handleCancel} texto="Cancelar" />
                                            <Botao
                                                onClick={() => handleSubmitEndereco(onSubmitEditUsersEndereco)}
                                                texto={isEditar ? "Editando..." : "Editar"}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


