"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Montserrat } from "next/font/google"
import Calendario from "@/components/Calendario"
import { FormularioInput } from "@/components/Calendario/selecaoHorario"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { z } from "zod"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
})


interface UserProps {
  id: number
  nome: string
  sobrenome: string
}

const AgendamentoProps = z.object({
  id: z.number().optional(),
  data: z.date(),
  horario: z.date(),
  id_Imovel: z.object({
    id: z.number().optional(),
    codigo: z.coerce.number().optional(),
    nome_propriedade: z.string().min(1, { message: "Nome da propriedade é obrigatório" }),
    tipo_transacao: z.string().min(1, { message: "Tipo de transação é obrigatório" }),
    valor_venda: z.coerce.number().min(1, { message: "Valor de venda é obrigatório" }),
    tipo_imovel: z.string().min(1, { message: "Tipo de imóvel é obrigatório" }),
    status_imovel: z.string().min(1, { message: "Status do imóvel é obrigatório" }),
    valor_promocional: z.coerce.number().min(1, { message: "Valor promocional é obrigatório" }),
    test_destaque: z.string().optional(),
    test_visibilidade: z.string().optional(),
    destaque: z.boolean().default(false),
    visibilidade: z.boolean().default(false),
    valor_iptu: z.coerce.number().min(1, { message: "Valor do IPTU é obrigatório" }),
    condominio: z.coerce.number().min(1, { message: "Valor do condomínio é obrigatório" }),
    area_construida: z.coerce.number().min(1, { message: "Área construída é obrigatória" }),
    area_terreno: z.coerce.number().min(1, { message: "Área do terreno é obrigatória" }),
    descricao: z.string().optional(),
  }),
  id_Usuario: z.object({
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
  }),
  id_Corretor: z.object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
    cpf: z.string().min(11, { message: "CPF inválido (formato: 123.456.789-00)" }).max(11),
    tipo_conta: z.string().min(1, {message: "Insira um Corretor"}),
    telefone: z.string().min(10, { message: "Telefone inválido" }),
    data_nascimento: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    idEnderecoUsuario: z.number().optional(),
  }),
})

type agendamentoProps = z.infer<typeof AgendamentoProps>





export default function PaginaAgendamento() {
  const {
    register, handleSubmit, watch, formState: { errors }, } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [agendamentoSucesso, setAgendamentoSucesso] = useState(false);
  const [imovelId] = useState(1);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())


  const addAgendamento = async (data: agendamentoProps) => {
    try {
      console.log("Sending address data:", data);

      if (!data.data || !data.horario || !data.id_Imovel || !data.id_Usuario || !data.id_Corretor) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos');
      }

      const imovelAgendamento = {
        ...data,
        id_Usuario: data.id_Usuario,
        id_Corretor: data.id_Corretor,
        id_Imovel: data.id_Imovel,
      }

      const response = await request("POST", "http://localhost:9090/agendamento/create", imovelAgendamento);

      if (response && response.id) {
        return response;
      }

      console.error("Resposta do servidor:", response);
      throw new Error(`Falha ao criar o endereço: ${response.status}`);
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
      throw error;
    }
  };

  const verificarHorariosOcupados = async (data: Date) => {
    try {
      const response = await request(
        "GET",
        `http://localhost:9090/agendamento/imovel/${imovelId}/data/${data.toISOString()}`
      );
      setHorariosOcupados(response.map((a: any) => a.horario));
    } catch (error) {
      console.error("Erro ao verificar horários ocupados:", error);
    }
  };

  // Chame esta função quando a data for alterada
  useEffect(() => {
    if (selectedDate) {
      verificarHorariosOcupados(selectedDate);
    }
  }, [selectedDate]);


  const handleAgendarVisita = async () => {
    if (!selectedDate || !watch('Corretores.disponivel') || !watch('Horario.dia')) {
      alert('Por favor, selecione uma data, horário e corretor');
      return;
    }

    const agendamentoData: AgendamentoData = {
      corretor: watch('corretores.disponivel'),
      horario: watch('horario.dia'),
      data: selectedDate,
      imovelId: imovelId
    };

    try {
      setIsLoading(true);
      await request("POST", "http://localhost:9090/agendamento", agendamentoData);
      setAgendamentoSucesso(true);

    } catch (error) {
      console.error("Erro ao agendar visita:", error);
      alert('Erro ao agendar visita. Horário pode já estar ocupado.');
    } finally {
      setIsLoading(false);
    }
  }


  const getUsuario = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const response = await request("GET", "http://localhost:9090/usuario/corretores")


      if (Array.isArray(response)) {
        setUsuarios(response) // Agora armazenamos diretamente como um array
      } else {
        console.error("Resposta da API inesperada:", response)
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    } finally {
      setIsLoading(false)
    }
  }





  useEffect(() => {
    getUsuario()
  }, []) // Executa apenas uma vez ao montar o componente


  const onSubmit = (data: any) => {
    console.log(data)
  }



  return (
    <>
      <header>
        <Header />
      </header>
      <Image
        className="absolute opacity-[7%] mt-auto xl:mt-[40%] ml-auto xl:ml-[2.5%] -z-10 invisible sm:invisible md:invisible lg:visible"
        src="/formularios/logoGrande.png"
        alt="Gerenciamento de Imóveis"
        width={686}
        height={722}
      />
      <div className={`${montserrat.className} max-lg:px-4 px-20 py-12 sm:py-12 md:py-10 lg:py-14 xl:py-20`}>
        <section>
          <div>
            <div className="flex justify-between items-center pb-6 md:pb-10 lg:pb-14 xl:pb-16 2xl:pb-24">
              <div>
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">Agendamentos</h1>
                <div className="border-t-2 border-[#702632] w-[220px] md:w-[220px] 2xl:w-[220px] mt-6"></div>
              </div>
              <div>
                <Image
                  className="relative invisible lg:visible"
                  src="/formularios/logoPequena.png"
                  alt="Gerenciamento de Imóveis"
                  width={88}
                  height={90}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pb-36 lg:pb-40 xl:pb-44 2xl:pb-56">
              <Calendario />
              <div className="pt-20 sm:pt-20 md:pt-0 sm:px-1 md:px-5 lg:px-10">
                <h2 className="center md:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl font-bold text-center text-[#702632]">
                  Escolha a data, o horário e o corretor para agendar sua visita!
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-8 mt-6 mx-8 lg:mx-10 xl:mx-16 2xl:mx-32">

                  <FormularioInput
                    placeholder="Corretores:"
                    name="corretores.disponivel"
                    interName="Corretor"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    options={usuarios?.map(({ nome, sobrenome }) => `${nome} ${sobrenome}`) || []}
                  />

                  <FormularioInput
                    placeholder="Horários:"
                    name="horario.dia"
                    interName="Horário"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    options={["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"]
                      .filter(horario => !horariosOcupados.includes(horario))}
                  />


                  <Botao
                    className="xl:w-[60%] 2xl:w-[50%]"
                    texto="Agendar visita"
                    onClick={handleAgendarVisita}
                    disabled={agendamentoSucesso}

                  />  {agendamentoSucesso && (
                    <div className="text-green-600 text-center mt-4">
                      Visita agendada com sucesso! Este horário não estará mais disponível.
                    </div>
                  )}



                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  )
}















