"use client"
import { useState, useEffect } from "react"
import React from "react"

import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { FormularioEditarInput } from "../editandoUsuario/formularioEditarInput"
import { FormularioImagemEdit } from "../editandoUsuario/formularioImagemEdit"
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const EnderecoProps = z.object({
    id: z.number().optional(),
    cep: z.string().min(1, { message: "CEP é obrigatório" }),
    rua: z.string().min(1, { message: "Rua é obrigatória" }),
    tipo_residencia: z.string().min(1, { message: "Tipo de residência é obrigatório" }),
    numero_imovel: z.coerce.number().min(1, { message: "Número do imóvel é obrigatório" }),
    numero_apartamento: z.coerce.number().optional(),
    bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
    uf: z.string().min(1, { message: "UF é obrigatório" }),
})

const UsuarioProps = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
    cpf: z.string().min(11, { message: "CPF inválido (formato: 123.456.789-00)" }).max(11),
    tipo_conta: z.string().min(1, {
        message: "Selecione um tipo de conta válido",
    }),
    telefone: z.string().min(10, { message: "Telefone inválido" }),
    data_nascimento: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    idEnderecoUsuario: z.number().optional(),
    endereco: EnderecoProps.optional(),
    imagem_usuario: z.string().optional(),
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
        defaultValues: selectedUsuarios?.[0] ? {
            usuario: {
                nome: selectedUsuarios[0].nome,
                sobrenome: selectedUsuarios[0].sobrenome,
                cpf: selectedUsuarios[0].cpf,
                tipo_conta: selectedUsuarios[0].tipo_conta,
                telefone: selectedUsuarios[0].telefone,
                data_nascimento: selectedUsuarios[0].data_nascimento,
                email: selectedUsuarios[0].email,
                senha: selectedUsuarios[0].senha,
                idEnderecoUsuario: selectedUsuarios[0].idEnderecoUsuario,
            },
            endereco: {
                cep: selectedUsuarios[0].endereco?.cep?.toString() || "",
                rua: selectedUsuarios[0].endereco?.rua || "",
                tipo_residencia: selectedUsuarios[0].endereco?.tipo_residencia || "",
                numero_imovel: selectedUsuarios[0].endereco?.numero_imovel || 0,
                numero_apartamento: selectedUsuarios[0].endereco?.numero_apartamento || 0,
                bairro: selectedUsuarios[0].endereco?.bairro || "",
                cidade: selectedUsuarios[0].endereco?.cidade || "",
                uf: selectedUsuarios[0].endereco?.uf || "",
            }
        } : undefined
    })

    const {
        register: registerEndereco,
        handleSubmit: handleSubmitEndereco,
        formState: { errors: errorsEndereco },
    } = useForm<EnderecoImovelProps>({
        resolver: zodResolver(EnderecoProps),
        defaultValues: selectedUsuarios?.[0]?.endereco ? {
            cep: selectedUsuarios[0].endereco.cep,
            rua: selectedUsuarios[0].endereco.rua,
            tipo_residencia: selectedUsuarios[0].endereco.tipo_residencia,
            numero_imovel: selectedUsuarios[0].endereco.numero_imovel,
            numero_apartamento: selectedUsuarios[0].endereco.numero_apartamento,
            bairro: selectedUsuarios[0].endereco.bairro,
            cidade: selectedUsuarios[0].endereco.cidade,
            uf: selectedUsuarios[0].endereco.uf,
        } : undefined,
        mode: "onChange"
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagem, setImagem] = useState<File | null>(null)
    const [showEditTrue, setShowEditTrue] = useState(false)
    const [lastAddedUsuarios, setLastAddedUsuarios] = useState<UsuarioData | null>(null)
    const [showModal, setShowModal] = useState(true)
    const [showEditUsuario, setShowEditUsuario] = useState(false)
    const [showEditEndereco, setShowEditEndereco] = useState(false)
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
            console.log("📤 Iniciando edição de endereço")
            console.log("Dados recebidos:", data)

            if (!selectedUsuarios || selectedUsuarios.length === 0) {
                throw new Error("Array de usuários selecionados está vazio")
            }

            const usuario = selectedUsuarios[0]
            console.log("Usuário encontrado:", usuario)

            if (!usuario.endereco?.id) {
                throw new Error("Usuário não possui endereço cadastrado")
            }

            const endereco = {
                cep: data.cep,
                rua: data.rua,
                tipo_residencia: data.tipo_residencia,
                bairro: data.bairro,
                cidade: data.cidade,
                uf: data.uf,
                numero_imovel: Number(data.numero_imovel),
                numero_apartamento: data.numero_apartamento ? Number(data.numero_apartamento) : undefined
            }

            console.log("Endereço formatado:", endereco)
            console.log("ID do endereço para atualização:", usuario.endereco.id)

            const response = await request(
                "PUT",
                `http://localhost:9090/enderecoUsuario/update/${usuario.endereco.id}`,
                endereco
            )

            console.log("✅ Endereço atualizado com sucesso:", response)
            return response

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
                id: usuarioSelecionadoId,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                cpf: usuario.cpf,
                tipo_conta: usuario.tipo_conta,
                telefone: usuario.telefone,
                data_nascimento: usuario.data_nascimento,
                email: usuario.email,
                senha: usuario.senha,
                imagem_usuario: selectedUsuarios[0].imagem_usuario,
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
            console.log("Array de usuários selecionados:", selectedUsuarios)

            if (!selectedUsuarios || selectedUsuarios.length === 0) {
                throw new Error("Nenhum usuário selecionado")
            }

            const usuarioSelecionado = selectedUsuarios[0]
            console.log("Usuário selecionado:", usuarioSelecionado)

            if (!usuarioSelecionado.endereco?.id) {
                alert("Este usuário não possui endereço cadastrado. Por favor, cadastre um endereço primeiro.")
                return
            }

            const endereco = {
                cep: data.cep,
                rua: data.rua,
                tipo_residencia: data.tipo_residencia,
                bairro: data.bairro,
                cidade: data.cidade,
                uf: data.uf,
                numero_imovel: Number(data.numero_imovel),
                numero_apartamento: data.numero_apartamento ? Number(data.numero_apartamento) : undefined
            }

            console.log("Dados do endereço a serem enviados:", endereco)
            console.log("ID do endereço do usuário:", usuarioSelecionado.endereco.id)

            const response = await request(
                "PUT",
                `http://localhost:9090/enderecoUsuario/update/${usuarioSelecionado.endereco.id}`,
                endereco
            )

            console.log("Resposta do servidor:", response)
            if (response) {
                setShowModal(false)
                setShowEditTrue(true)
                if (onComplete) onComplete()
            } else {
                throw new Error("Resposta inválida ao atualizar endereço")
            }

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
                                                                <FormularioImagemEdit
                                                                    handleImageUpload={setImagem}
                                                                    imagemAtual={usuario.imagem_usuario}
                                                                />
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
                                                                                errors={errors?.usuario?.sobrenome}
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
                                                                        value={selectedUsuarios[0].endereco?.cep}
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errorsEndereco?.cep}
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
                                                                        value={selectedUsuarios[0].endereco?.uf}
                                                                        register={registerEndereco}
                                                                        onChange={handleUfChange}
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        options={estados}
                                                                        errors={errorsEndereco?.uf}
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
                                                                        value={selectedUsuarios[0].endereco?.cidade}
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        options={cidadesPorEstado.SC}
                                                                        errors={errorsEndereco?.cidade}
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
                                                                        value={selectedUsuarios[0].endereco?.rua}
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        errors={errorsEndereco?.rua}
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
                                                                        value={selectedUsuarios[0].endereco?.bairro}
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        errors={errorsEndereco?.bairro}
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
                                                                        value={selectedUsuarios[0].endereco?.tipo_residencia}
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        options={["Casa", "Apartamento"]}
                                                                        errors={errorsEndereco?.tipo_residencia}
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
                                                                        value={selectedUsuarios[0].endereco?.numero_imovel}
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        errors={errorsEndereco?.numero_imovel}
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
                                                                        value={selectedUsuarios[0].endereco?.numero_apartamento}
                                                                        register={registerEndereco}
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        errors={errorsEndereco?.numero_apartamento}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-end pt-6">
                                                                <div className="flex justify-around items-center gap-10 w-[50%]">
                                                                    <Botao onClick={handleCancel} texto="Cancelar" />
                                                                    <Botao
                                                                        type="submit"
                                                                        texto={isEditar ? "Editando..." : "Editar"}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </form>
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


