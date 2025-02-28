'use client';

import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function PerfilUsuario() {
    return (
        <div className="flex bg-[#B1ACA2] p-6 rounded h-[300px] -lg shadow-lg gap-10 max-w-2x1 mx-auto w-[70%]">
            <div className='flex flex-col items-center text-center w-[50%]'>
                <img
                    src="/images/user.jpg"
                    alt="Foto do usuário"
                    className='w-24 h-24 rounded-full object-cover border-2 border-black'
                />
                <div className='mt-7 '>
                    <h2 className='text-xl font-bold text-black'>Jéssica Vieira</h2>
                    <p className='text-gray-700'>28 anos</p>
                </div>
            </div>

            <div className='flex flex-col mr-80'>
                <h3 className='text-lg font-semibold text-black'>Biografia</h3>
                <p className='text-gray-700 text-[15px]'>
                Jéssica Vieira está focada em dar um passo importante para o futuro, sonhando em adquirir um terreno ou imóvel, para construir não apenas um lar, mas um espaço que reflita suas conquistas e ambições. Ela busca mais do que um simples lugar para morar: quer investir no seu próprio projeto de vida, com segurança e estabilidade para si e para sua família.
                </p>

                <div className='t-4'>
                    <h3 className='text-lg font-semibold text-black'>Contato</h3>
                    <p className='flex items-center text-gray-700'>
                        <FaPhoneAlt className="mr-2 text-black" /> +55 (47) 9469-4250
                    </p>
                    <p className="flex items-ceter text-gray-700">
                        <FaEnvelope className="mr-2 text-black" />
                        <a href="mailto:jessica.vieira@gmail.com.br" className="text-blue-600 underline">
                            jessica.vieria@gmail.com
                        </a>
                    </p>
                </div>

                <div className='mt-4'>
                    <h3 className='text-lg font-semibold text-black'>Segurança</h3>
                    <label className="flex items-center text-gray-700">
                        <input type="checkbox" className="mr-2" /> Autenticação de 2FA
                    </label>
                </div>
            </div>

        </div>

    );
}