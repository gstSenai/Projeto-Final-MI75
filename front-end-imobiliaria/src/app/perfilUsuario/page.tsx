'use client';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

export default function PerfilUsuario() {
    return (
        <div className="flex font-montserrat bg-[#B1ACA2] p-6 rounded-2xl h-[400px] -lg shadow-lg max-w-2x1 mx-auto w-[70%]">
            <div className='flex items-center justify-around gap-4'>
                <div className='flex flex-col items-center text-center w-[30%]'>
                    <img
                        src="corretora.png"
                        alt="Foto do usuário"
                        className='w-32 h-32 rounded-full object-cover  border-black'
                    />
                    <div className='mt-5'>
                        <h2 className='text-xl font-extrabold text-black tracking-[-1]'>Jéssica Vieira</h2>
                        <p className='text-black'>28 anos</p>
                    </div>
                </div>

                <div className='flex flex-col w-[75%]'>
                    <h3 className='text-lg font-semibold text-[#050001] text-opacity-65'>Biografia</h3>
                    <p className='text-black text-[15px] w-[90%]'>
                        Jéssica Vieira está focada em dar um passo importante para o futuro, sonhando em adquirir um terreno ou imóvel, para construir não apenas um lar, mas um espaço que reflita suas conquistas e ambições. Ela busca mais do que um simples lugar para morar: quer investir no seu próprio projeto de vida, com segurança e estabilidade para si e para sua família.
                    </p>

                    <div className='mt-3'>
                        <h3 className='text-lg font-semibold text-[#050001] text-opacity-65'>Contato</h3>
                        <p className='flex items-center'>
                            <img src="/iconsSociais/whatsapp.png" alt="whatsapp" className="mr-2 w-5" /> +55 (47) 9469-4250
                        </p>
                        <p className="flex">
                            <img src="/iconsSociais/Email.png" alt="email" className="mr-2 w-5 h-4 mt-1" />
                            <a href="mailto:jessica.vieira@gmail.com.br" className="text-blue-600 underline">
                                jessica.vieira@gmail.com
                            </a>
                        </p>
                    </div>

                    <div className='mt-3'>
                        <h3 className='text-lg font-semibold text-[#050001] text-opacity-65'>Segurança</h3>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Autenticação de 2FA
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}