import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Montserrat } from 'next/font/google';


// Carregando a fonte Inter
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});


import Image from "next/image";

const equipe = [
  {
    nome: "Paula Bein",
    creci: "12345-6",
    telefone: "+55 (41) 98765-4321",
    email: "paula.bein@hav.com.br",
    imagem: "/iconsPaginaCorretores/corretor1.png",
  },
  {
    nome: "Gustavo Costa",
    creci: "98765-6",
    telefone: "+55 (47) 98765-5432",
    email: "gustavo.costa@hav.com.br",
    imagem: "/iconsPaginaCorretores/corretor2.png",
  },
  {
    nome: "André Silva",
    creci: "45612-7",
    telefone: "+55 (42) 98234-4567",
    email: "andre.silva@hav.com.br",
    imagem: "/iconsPaginaCorretores/corretor3.png",
  },
  {
    nome: "Lucas Oliveira",
    creci: "65432-7",
    telefone: "+55 (49) 99234-5678",
    email: "lucas.oliveira@hav.com.br",
    imagem: "/iconsPaginaCorretores/corretor4.png",
  },
];

export default function Equipe() {
  return (
    <>
      <Header />

      <div className={`bg-[#DFDAD0] p-8 rounded-lg shadow-lg text-center ${montserrat.className}`}>

        <div className="p-2 max-w-5xl mx-auto">

          <h2 className="ml-3 text-xl font-bold text-gray-800 text-left mb-10 border-b-2 border-[#702632] pb-2 w-32">
            Corretores
          </h2>


          <div className="relative w-[100%] h-[20%] mb-4 mx-auto">
            <Image
              src="/iconsPaginaCorretores/corretores.png"
              alt="Equipe de corretores"
              className="rounded-lg"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className='border-b border-[#000000] pb-2 w-2/4 mx-auto opacity-30 mb-8'></div>
        <h2 className="text-2xl font-light uppercase tracking-wider">
          Equipe <span className="block text-lg font-bold">HAV</span>
        </h2>
        <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
          Na HAV Imobiliária, nossa equipe é mais do que uma força de vendas, somos profissionais dedicados a entender as necessidades de cada cliente, oferecendo um atendimento personalizado e soluções inteligentes para transformar seus projetos em realidade. Juntos, buscamos sempre o melhor para você!
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  mt-16">
          {equipe.map((corretor, index) => (
            <div key={index} className="flex flex-col items-center">

              <div className="w-52 h-64 relative rounded-lg overflow-hidden">
                <Image
                  src={corretor.imagem}
                  alt={corretor.nome}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              <div className='text-left ml-4'>
                <h3 className="mt-4">{corretor.nome}</h3>
                <p className="mt-2">CRECI: {corretor.creci}</p>
                <div className='flex gap-3 mt-2'>
                  <Image src="/iconsPaginaCorretores/iconTelefone.png" alt="Telefone" width={20} height={20} className="w-5 h-5" />
                  <p className="">{corretor.telefone}</p>
                </div>
                <div className='flex gap-4 mt-2 mb-20'>
                  <Image src="/iconsPaginaCorretores/iconEmail.png" alt="Telefone" width={20} height={20} className="w-5 h-5" />
                  <p className="">{corretor.email}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}