'use client';
import { useState, useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaPhoneAlt, FaEnvelope, FaCamera } from 'react-icons/fa';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
})

type UsuarioData = z.infer<typeof UsuarioProps>

interface EditProfileProps {
    id: number;
}

export default function EditProfile({ id }: EditProfileProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UsuarioData>({
        resolver: zodResolver(UsuarioProps)
    });

    const [profileData, setProfileData] = useState<UsuarioData>({
        username: '',
        tipo_conta: '',
        biografia: '',
        email: '',
        password: '',
        imagem_usuario: '',
        twoFactorEnabled: false
    });

    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState<string>('corretora.png');
    const [imagem, setImagem] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [editadoComSucesso, setEditadoComSucesso] = useState(false);
    const [erroAoEditar, setErroAoEditar] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');

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
                twoFactorEnabled: data.twoFactorEnabled || false
            }
            
            setProfileData(dadosFormatados)
            // Preenche os valores do formulário
            Object.entries(dadosFormatados).forEach(([key, value]) => {
                setValue(key as keyof UsuarioData, value);
            });
            
            if (data.imagem_usuario) {
                setProfileImage(data.imagem_usuario)
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error)
        }
    }

    const onSubmit = async (data: UsuarioData) => {
        try {
            const formData = new FormData();
            const usuarioData = {
                ...data,
                id: id,
                ativo: true,
                password: data.password
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

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagem(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex font-montserrat bg-[#E5E1DB] p-4 sm:p-6 rounded-2xl min-h-[400px] shadow-lg mx-auto w-[98%] sm:w-[95%] max-w-5xl">
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
                <div className='flex flex-col md:flex-row items-start md:items-center justify-around gap-6 md:gap-4'>
                    <div className='flex flex-col items-center text-center w-full md:w-[30%] mb-6 md:mb-0 mt-8 sm:mt-0'>
                        <div className="relative cursor-pointer group" onClick={handleImageClick}>
                            <img
                                src={profileImage}
                                alt="Foto do usuário"
                                className='w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-black transition-opacity group-hover:opacity-80'
                            />
                            <button
                                type="button"
                                className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-100 transition-colors"
                            >
                                <FaCamera className="text-gray-600 text-sm sm:text-base" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
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
                                <input
                                    type="text"
                                    {...register("username")}
                                    className="text-lg sm:text-xl font-extrabold text-black tracking-[-1] bg-transparent border-b border-black focus:outline-none text-center w-full"
                                />
                            ) : (
                                <h2 className='text-lg sm:text-xl font-extrabold text-black tracking-[-1]'>{profileData.username}</h2>
                            )}
                            {isEditing ? (
                                <input
                                    type="text"
                                    {...register("tipo_conta")}
                                    className="text-sm sm:text-base text-black bg-transparent border-b border-black focus:outline-none text-center w-full mt-1"
                                />
                            ) : (
                                <p className='text-sm sm:text-base text-black mt-1'>{profileData.tipo_conta}</p>
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
                                    <input
                                        type="email"
                                        {...register("email")}
                                        className="text-sm sm:text-base flex items-center w-full bg-transparent border-b border-black focus:outline-none"
                                    />
                                </>
                            ) : (
                                <>
                                    <p className="flex text-sm sm:text-base mt-2">
                                        <img src="/iconsSociais/Email.png" alt="email" className="mr-2 w-4 sm:w-5 h-3 sm:h-4 mt-1" />
                                        <a href={`mailto:${profileData.email}`} className="text-blue-600 underline">
                                            {profileData.email}
                                        </a>
                                    </p>
                                </>
                            )}
                        </div>

                        <div className='mt-4 sm:mt-3'>
                            <h3 className='text-base sm:text-lg font-semibold text-[#050001] text-opacity-65'>Segurança</h3>
                            <label className="flex items-center text-sm sm:text-base">
                                <input
                                    type="checkbox"
                                    {...register("twoFactorEnabled")}
                                    className="mr-2"
                                />
                                Autenticação de 2FA
                            </label>
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
    );
} 