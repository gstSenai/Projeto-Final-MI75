'use client';

import { LoadingWrapper } from './loading/loadingServer';
import { ReactNode, useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '800'],
  display: 'swap',
});

interface RotaPrivadaProps {
  children: ReactNode;
  userAutorizado: string[];
}

export default function RotaPrivada({ children, userAutorizado }: RotaPrivadaProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const tipoConta = localStorage.getItem('tipo_conta');
      console.log('Tipo de conta atual:', tipoConta);
      console.log('Tipos autorizados:', userAutorizado);

      if (!tipoConta) {
        console.log('Nenhum tipo de conta encontrado, redirecionando para login');
        router.push('/login');
        return;
      }

      // Normalize both the user type and authorized types to lowercase
      const tipoContaNormalizado = tipoConta.toLowerCase();
      const tiposAutorizadosNormalizados = userAutorizado.map(tipo => tipo.toLowerCase());
      
      console.log('Tipo de conta normalizado:', tipoContaNormalizado);
      console.log('Tipos autorizados normalizados:', tiposAutorizadosNormalizados);
      
      const autorizado = tiposAutorizadosNormalizados.includes(tipoContaNormalizado);
      console.log('Usuário está autorizado?', autorizado);
      
      setIsAuthorized(autorizado);
    } catch (error) {
      console.error('Erro ao verificar autorização:', error);
      setIsAuthorized(false);
    }
  }, [userAutorizado, router]);

  if (isAuthorized === null) {
    return <LoadingWrapper><div>Carregando...</div></LoadingWrapper>;
  }

  if (isAuthorized) {
    return <LoadingWrapper>{children}</LoadingWrapper>;
  }

  return (
    <div className={`${montserrat.className} min-h-screen bg-[#DFDAD0] flex items-center justify-center`}>
      <div className="relative flex h-[600px] w-full max-w-4xl rounded-[20px] mx-auto overflow-hidden">
        <Image
          src="/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png"
          alt="Fundo da página de acesso negado"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
          className="brightness-50 object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 gap-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-center">
            <div className="flex flex-col">
              <span className="text-red-400">403</span>
            </div>
            Acesso <span className="text-red-400">Negado</span>
          </h1>
          <p className="text-xl lg:text-2xl text-center max-w-2xl opacity-90">
            Você não tem permissão para acessar esta página.
          </p>
          <a
            href="/"
            className="mt-8 bg-[#6d2431] hover:bg-[#8a2c3d] text-white font-medium py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Voltar para a página inicial
          </a>
        </div>
      </div>
    </div>
  );
}