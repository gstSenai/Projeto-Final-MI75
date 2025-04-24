'use client';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import request from '@/routes/request';
import { useRouter } from 'next/navigation';
import { Botao } from '@/components/botao/index';

const UsuarioProps = z.object({
    id: z.number().optional(),
    username: z.string().min(1, { message: "O nome é obrigatório" }),
    tipo_conta: z.string().min(1, {
        message: "Selecione um tipo de conta válido",
    }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(1, { message: "A senha é obrigatória" }),
    imagem_usuario: z.string().optional(),
    biografia: z.string().optional(),
    twoFactorEnabled: z.boolean().optional(),
    telefone: z.string().optional(),
})

type UsuarioData = z.infer<typeof UsuarioProps>

interface EditProfileProps {
    id: number;
}

interface Agendamento {
    id: number;
    data: string;
    horario: string;
    imovel: {
        codigo: string;
    };
    corretor: {
        nome: string;
        sobrenome: string;
    };
}

export default function EditProfile({ id }: EditProfileProps) {
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm<UsuarioData>({
        resolver: zodResolver(UsuarioProps)
    });

    const [profileData, setProfileData] = useState<UsuarioData>({
        username: '',
        tipo_conta: '',
        biografia: '',
        email: '',
        password: '',
        imagem_usuario: '',
        twoFactorEnabled: false,
        telefone: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [imagem, setImagem] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [, setEditadoComSucesso] = useState(false);
    const [, setErroAoEditar] = useState(false);
    const [, setMensagemErro] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [loadingAgendamentos, setLoadingAgendamentos] = useState(true);

    const getUserPorId = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:9090/usuario/getById/${id}`)
            const data = await response.json()

            const dadosFormatados = {
                username: data.username || '',
                tipo_conta: data.tipo_conta || '',
                biografia: data.biografia || '',
                email: data.email || '',
                password: data.password || '',
                imagem_usuario: data.imagem_usuario || '',
                twoFactorEnabled: data.twoFactorEnabled || false,
                telefone: data.telefone || ''
            }

            setProfileData(dadosFormatados)
            Object.entries(dadosFormatados).forEach(([key, value]) => {
                setValue(key as keyof UsuarioData, value);
            });

            if (data.imagem_usuario) {
                setImagem(data.imagem_usuario)
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error)
        }
    }

    const onSubmit = async (data: UsuarioData) => {
        try {
            setProfileData(data);

            const formData = new FormData();
            const usuarioData = {
                ...data,
                id: id,
                ativo: true,
                password: data.password,
                telefone: data.telefone || ''
            };

            formData.append("usuario", JSON.stringify(usuarioData));

            if (imagem) {
                formData.append("imagem", imagem);
            }

            const response = await fetch(`http://localhost:9090/usuario/update/${id}`, {
                method: "PUT",
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("✅ Usuário atualizado com sucesso:", responseData);
            setIsEditing(false);
            setEditadoComSucesso(true);
            setTimeout(() => {
                setEditadoComSucesso(false);
            }, 5000);
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            setErroAoEditar(true);
            setMensagemErro("Erro ao editar perfil. Tente novamente.");
            setTimeout(() => {
                setErroAoEditar(false);
            }, 5000);
        }
    };

    useEffect(() => {
        getUserPorId(id)
    }, [id])

    useEffect(() => {
        if (profileData.imagem_usuario && profileData.imagem_usuario.trim() !== '') {
            const fetchImage = async () => {
                try {
                    // Verifica se é uma URL do Google
                    if (profileData.imagem_usuario.startsWith('http')) {
                        setImagePreview(profileData.imagem_usuario);
                    } else {
                        const fileName = profileData.imagem_usuario.split('/').pop();
                        if (!fileName) {
                            console.error("Nome do arquivo não encontrado na URL");
                            return;
                        }

                        const response = await fetch(`http://localhost:9090/usuario/imagem/${fileName}`);
                        if (response.ok) {
                            const blob = await response.blob();
                            const imageUrl = URL.createObjectURL(blob);
                            setImagePreview(imageUrl);
                        }
                    }
                } catch (error) {
                    console.error("Erro ao carregar imagem:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchImage();
        } else {
            setIsLoading(false);
        }
    }, [profileData.imagem_usuario]);



    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagem(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    setImagePreview(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex font-montserrat bg-[#E5E1DB] p-4 sm:p-6 rounded-2xl min-h-[400px] shadow-lg mx-auto w-[98%] sm:w-[95%] max-w-5xl">
                <div className='flex items-center w-full'>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
                        {!isEditing && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="sm:hidden text-sm text-[#702632] font-medium absolute top-0 right-2 hover:border-b-2 hover:border-[#702632]"
                            >
                                Editar perfil
                            </button>
                        )}
                        <div className='flex flex-col md:flex-row items-start md:items-center justify-around gap-6 md:gap-4 w-full'>
                            <div className='flex flex-col items-center text-center w-full md:w-[30%] mb-6 md:mb-0 mt-8 sm:mt-0'>
                                <div className="relative cursor-pointer group" onClick={handleImageClick}>
                                    {isLoading ? (
                                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
                                        </div>
                                    ) : imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Foto do perfil"
                                            className="w-32 h-32 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">Adicionar foto</span>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-100 transition-colors"
                                    >
                                        <FaCamera className="text-gray-600 text-sm sm:text-base" />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 rounded-full transition-all group-hover:bg-opacity-20">
                                        <span className="text-white text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity">
                                            Alterar foto
                                        </span>
                                    </div>
                                </div>
                                <div className='mt-4 w-full px-2'>
                                    {isEditing ? (
                                        <>
                                            <p className='text-sm sm:text-base text-gray-600 mb-2'>{profileData.tipo_conta}</p>
                                            <input
                                                type="text"
                                                {...register("username")}
                                                className="text-lg sm:text-xl font-extrabold text-black tracking-[-1] bg-transparent border-b border-black focus:outline-none text-center w-full"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <p className='text-sm sm:text-base text-gray-600 mb-2'>{profileData.tipo_conta}</p>
                                            <h2 className='text-lg sm:text-xl font-extrabold text-black tracking-[-1]'>{profileData.username}</h2>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className='flex flex-col w-full md:w-[70%] px-2 sm:px-0'>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className='text-base sm:text-lg font-semibold text-[#050001] text-opacity-65'>Biografia</h3>
                                    {!isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="hidden sm:block text-base text-[#702632] font-medium relative hover:border-b-2 hover:border-[#702632]"
                                        >
                                            Editar perfil
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <textarea
                                        {...register("biografia")}
                                        className="text-sm sm:text-[15px] w-full bg-transparent border border-gray-300 rounded p-2 focus:outline-none focus:border-black min-h-[100px]"
                                        rows={4}
                                    />
                                ) : (
                                    <p className='text-sm sm:text-[15px] w-full sm:w-[90%]'>{profileData.biografia}</p>
                                )}

                                <div className='mt-4 sm:mt-3'>
                                    <h3 className='text-base sm:text-lg font-semibold text-[#050001] text-opacity-65'>Contato</h3>
                                    {isEditing ? (
                                        <>
                                            <div className="flex items-center mt-2">
                                                <Image src="/iconsSociais/whatsapp.png" alt="whatsapp" className="mr-2 w-4 sm:w-5 h-3 sm:h-4" width={100} height={100} />
                                                <input
                                                    type="tel"
                                                    {...register("telefone")}
                                                    placeholder="(00) 00000-0000"
                                                    className="text-sm sm:text-base flex items-center w-full bg-transparent border-b border-black focus:outline-none"
                                                />
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <Image src="/iconsSociais/Email.png" alt="email" className="mr-2 w-4 sm:w-5 h-3 sm:h-4" width={100} height={100} />
                                                <input
                                                    type="email"
                                                    {...register("email")}
                                                    className="text-sm sm:text-base flex items-center w-full bg-transparent border-b border-black focus:outline-none"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="flex text-sm sm:text-base mt-2">
                                                <Image src="/iconsSociais/whatsapp.png" alt="whatsapp" className="mr-2 w-4 sm:w-5 h-3 sm:h-4 mt-1" width={100} height={100} />
                                                {profileData.telefone ? (
                                                    <a href={`https://wa.me/${profileData.telefone.replace(/\D/g, '')}`} className="text-green-600 underline">
                                                        {profileData.telefone}
                                                    </a>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsEditing(true)}
                                                        className="text-black underline hover:text-blue-600"
                                                    >
                                                        Adicionar telefone
                                                    </button>
                                                )}
                                            </p>
                                            <p className="flex text-sm sm:text-base mt-2">
                                                <Image src="/iconsSociais/Email.png" alt="email" className="mr-2 w-4 sm:w-5 h-3 sm:h-4 mt-1" width={100} height={100} />
                                                <a href={`mailto:${profileData.email}`} className="text-blue-600 underline">
                                                    {profileData.email}
                                                </a>
                                            </p>
                                        </>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="mt-6 sm:mt-4 flex gap-2">
                                        <button
                                            type="submit"
                                            className="bg-[#702632] text-white px-3 py-1.5 rounded text-sm hover:opacity-80 transition"
                                        >
                                            Salvar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="border border-[#702632] text-[#702632] px-3 py-1.5 rounded text-sm hover:bg-[#702632] hover:text-white transition"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex font-montserrat bg-[#E5E1DB] p-4 sm:p-6 rounded-2xl shadow-lg mx-auto w-[98%] sm:w-[95%] max-w-5xl">
                <div className="w-full">
                    <h2 className="text-lg sm:text-xl font-bold text-[#702632] mb-4">Meus Agendamentos</h2>
                    <Botao className='w-full bg-vermelho h-10 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push(`/paginaHistorico?userId=${id}`)} texto="Histórico da Agenda" />
                    <div className='mt-4'>
                        <Botao className='w-full bg-vermelho h-10 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push(`/paginaAgendaCorretor?userId=${id}`)} texto="Agenda" />
                    </div>
                </div>
            </div>
        </div>
    );
} 