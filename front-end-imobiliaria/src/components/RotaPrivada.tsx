import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';

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
  const tipoConta = localStorage.getItem('tipo_conta');

  if (tipoConta && userAutorizado.includes(tipoConta)) {
    return <>{children}</>;
  }

  return (
    <div className={`${montserrat.className} min-h-screen bg-[#DFDAD0] flex items-center justify-center`}>
      <div className="relative flex h-[600px] w-full max-w-4xl rounded-[20px] mx-auto overflow-hidden">
        <Image
          src="/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png"
          alt="Fundo da página de acesso negado"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-50"
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