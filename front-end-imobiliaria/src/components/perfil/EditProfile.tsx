'use client';
import { useState, useRef } from 'react';
import { FaPhoneAlt, FaEnvelope, FaCamera } from 'react-icons/fa';

interface ProfileData {
    name: string;
    age: number;
    biography: string;
    phone: string;
    email: string;
    twoFactorEnabled: boolean;
}

export default function EditProfile() {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: 'Jéssica Vieira',
        age: 28,
        biography: 'Jéssica Vieira está focada em dar um passo importante para o futuro, sonhando em adquirir um terreno ou imóvel, para construir não apenas um lar, mas um espaço que reflita suas conquistas e ambições. Ela busca mais do que um simples lugar para morar: quer investir no seu próprio projeto de vida, com segurança e estabilidade para si e para sua família.',
        phone: '+55 (47) 9469-4250',
        email: 'jessica.vieira@gmail.com',
        twoFactorEnabled: false
    });

    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState<string>('corretora.png');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsEditing(false);
    };

    return (
        <div className="flex font-montserrat bg-[#E5E1DB] p-4 sm:p-6 rounded-2xl min-h-[400px] shadow-lg mx-auto w-[98%] sm:w-[95%] max-w-5xl">
            <form onSubmit={handleSubmit} className="w-full relative">
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
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleInputChange}
                                    className="text-lg sm:text-xl font-extrabold text-black tracking-[-1] bg-transparent border-b border-black focus:outline-none text-center w-full"
                                />
                            ) : (
                                <h2 className='text-lg sm:text-xl font-extrabold text-black tracking-[-1]'>{profileData.name}</h2>
                            )}
                            {isEditing ? (
                                <input
                                    type="number"
                                    name="age"
                                    value={profileData.age}
                                    onChange={handleInputChange}
                                    className="text-sm sm:text-base text-black bg-transparent border-b border-black focus:outline-none text-center w-full mt-1"
                                />
                            ) : (
                                <p className='text-sm sm:text-base text-black mt-1'>{profileData.age} anos</p>
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
                                name="biography"
                                value={profileData.biography}
                                onChange={handleInputChange}
                                className="text-sm sm:text-[15px] w-full bg-transparent border border-gray-300 rounded p-2 focus:outline-none focus:border-black min-h-[100px]"
                                rows={4}
                            />
                        ) : (
                            <p className='text-sm sm:text-[15px] w-full sm:w-[90%]'>{profileData.biography}</p>
                        )}

                        <div className='mt-4 sm:mt-3'>
                            <h3 className='text-base sm:text-lg font-semibold text-[#050001] text-opacity-65'>Contato</h3>
                            {isEditing ? (
                                <>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleInputChange}
                                        className="text-sm sm:text-base flex items-center w-full bg-transparent border-b border-black focus:outline-none mb-3"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        className="text-sm sm:text-base flex items-center w-full bg-transparent border-b border-black focus:outline-none"
                                    />
                                </>
                            ) : (
                                <>
                                    <p className='flex items-center text-sm sm:text-base'>
                                        <img src="/iconsSociais/whatsapp.png" alt="whatsapp" className="mr-2 w-4 sm:w-5" />
                                        {profileData.phone}
                                    </p>
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
                                    checked={profileData.twoFactorEnabled}
                                    onChange={(e) => setProfileData(prev => ({
                                        ...prev,
                                        twoFactorEnabled: e.target.checked
                                    }))}
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