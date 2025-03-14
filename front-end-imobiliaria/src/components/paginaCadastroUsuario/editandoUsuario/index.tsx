"use client"
import { useState } from "react"
import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { FormularioEditarInput } from "../editandoUsuario/formularioEditarInput";
import { SubmitHandler, useForm } from "react-hook-form";

interface UsuarioProps {
    id: number
    nome: string
    sobrenome: string
    cpf: string
    tipo_conta: string
    telefone: string
    data_nascimento: string
    email: string
    senha: string
}


interface EditarUsuarioProps {
    selectedUsuarios: UsuarioProps[]
    onComplete?: () => void
}

export function EditarUsuario({ selectedUsuarios, onComplete }: EditarUsuarioProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<{ usuario: UsuarioProps }>();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showEditTrue, setShowEditTrue] = useState(false)
    const [lastAddedUsuarios, setLastAddedUsuarios] = useState<UsuarioProps | null>(null)
    const [showModal, setShowModal] = useState(true)
    const [showEditUsuario, setShowEditUsuario] = useState(false)
    const [showEditEndereco, setShowEditEndereco] = useState(false)
    const [usuarioId, setUsuarioId] = useState<number>();
    const [isEditar] = useState(false)

    const editarUsers = async (data: UsuarioProps) => {
        try {

            console.log("Sending address usuario:", data);

            for (const usuario of selectedUsuarios) {
                const response = await request('PUT', `http://localhost:9090/usuario/update/${usuario.id}`, data)

                if (usuario && usuario.id) {
                    setUsuarioId(usuario.id)
                    return response;
                }
            }
        } catch (error) {
            console.error("Erro ao editar usuário:", error)
            throw error
        }
    }

    const onSubmitEditusers: SubmitHandler<{ usuario: UsuarioProps }> = async (data) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            console.log("Dados recebidos para validação:", data);

            const usuarioSelecionado = selectedUsuarios[0];

            const usuarioAtualizado = {
                ...usuarioSelecionado,
                id: usuarioId || usuarioSelecionado.id,
                nome: data.usuario.nome,
                sobrenome: data.usuario.sobrenome,
                cpf: data.usuario.cpf,
                tipo_conta: data.usuario.tipo_conta,
                telefone: data.usuario.telefone,
                data_nascimento: data.usuario.data_nascimento,
                email: data.usuario.email,
                senha: data.usuario.senha,
            }

            console.log("Dados do usuário a serem enviados:", data);

            const response = await editarUsers(usuarioAtualizado);
            console.log("Resposta do servidor:", response);
            if (response) {
                setLastAddedUsuarios(response);
                setShowModal(false);
                setShowEditTrue(true);
            } else {
                console.error("Erro: Resposta inválida ao adicionar usuário.");
            }

            if (onComplete) onComplete();

            setTimeout(() => setShowEditTrue(false), 5000);
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            alert(`Erro ao editar usuário: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleCancel = () => {
        setShowModal(false)
        if (onComplete) {
            onComplete()
        }
    }

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
                            >X</button>
                        </div>

                        <div className="flex flex-col w-full overflow-y-auto max-h-[80vh] pt-5 px-10">
                            <div className="flex items-center justify-center">
                                <h1 className="text-3xl font-semibold text-vermelho mb-4">Editar Dados do Usuário</h1>
                            </div>
                            <div className="flex items-center justify-center mb-10 gap-10">
                                <button className="bg-[#DFDAD0] py-2 px-4 rounded-full text-vermelho lg:text-2xl transition-transform duration-300 hover:scale-110
                             hover:bg-vermelho hover:text-[#DFDAD0]"
                                    onClick={() => setShowEditUsuario(!showEditUsuario)}>
                                    <p className="text-xl">Dados Usuário</p>
                                </button>
                                <button className="bg-[#DFDAD0] py-2 px-4 rounded-full text-vermelho lg:text-2xl transition-transform duration-300 hover:scale-110
                             hover:bg-vermelho hover:text-[#DFDAD0]"
                                    onClick={() => setShowEditEndereco(!showEditEndereco)}>
                                    <p className="text-xl">Dados Endereço</p>
                                </button>
                            </div>

                            {showEditUsuario && (
                                <>
                                    <div>
                                        <div className="flex items-center flex-col gap-4">
                                            <div className="bg-slate-500/70 h-[14rem] w-[14rem] rounded-full"></div>
                                        </div>
                                        <div>
                                            <form className="space-y-4">
                                                {selectedUsuarios.length > 0 && (
                                                    <div>
                                                        {selectedUsuarios.map((usuario) => (
                                                            <div key={usuario.id} className="space-y-4 pt-10">
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
                                                                        />
                                                                    </div>

                                                                    <div className="w-full max-h-[80vh] overflow-y-auto">
                                                                        <label htmlFor={`cpf_${usuario.id}`} className="block text-lg">
                                                                            CPF:
                                                                        </label>
                                                                        <FormularioEditarInput
                                                                            placeholder="Ex: 000.000.000-00"
                                                                            name="usuario.cpf"
                                                                            value={usuario.cpf}
                                                                            register={register}
                                                                            required
                                                                            custumizacaoClass="w-full p-2 border border-gray-500 rounded"
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
                                                                            options={['Usuario', 'Corretor', 'Administrador', 'Editor']}
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
                                                                        />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-6">
                                        <div className="flex justify-around items-center gap-10 w-[50%]">
                                            <Botao
                                                onClick={handleCancel}
                                                texto="Cancelar"
                                            />
                                            <Botao
                                                onClick={handleSubmit(onSubmitEditusers)}
                                                texto={isEditar ? "Editando..." : "Editar"}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {showEditEndereco && (
                                <>
                                    <div>
                                        <form className="space-y-4">
                                            {selectedUsuarios.length > 0 && (
                                                <div>
                                                    {selectedUsuarios.map((usuario) => (
                                                        <div key={usuario.id} className="space-y-4 pt-10">
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
                                                                    />
                                                                </div>

                                                                <div className="w-full max-h-[80vh] overflow-y-auto">
                                                                    <label htmlFor={`cpf_${usuario.id}`} className="block text-lg">
                                                                        CPF:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder="Ex: 000.000.000-00"
                                                                        name="usuario.cpf"
                                                                        value={usuario.cpf}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
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
                                                                        options={['Usuario', 'Corretor', 'Administrador', 'Editor']}
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
                                            <Botao
                                                onClick={handleCancel}
                                                texto="Cancelar"
                                            />
                                            <Botao
                                                onClick={handleSubmit(onSubmitEditusers)}
                                                texto={isEditar ? "Editando..." : "Editar"}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div >
                </div >
            )
            }
        </>
    )
}