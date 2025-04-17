"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Montserrat } from "next/font/google"
import Calendario from "@/components/Calendario/index"
import { useForm } from "react-hook-form"
import { useEffect, useState, useCallback } from "react"

import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { LoadingWrapper } from "@/components/loading/loadingServer"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
})

interface UserProps {
  id: number
  username: string
}

interface AgendamentoPostRequestDTO {
  data: string;
  horario: string;
  idImovel: number;
  idCorretor: number;
  idUsuario: number;
}

interface AgendamentoGetResponseDTO {
  id: number;
  data: string;
  horario: string;
  idImovel: number;
  idCorretor: number;
  idUsuario: number;
}

interface UserResponseDTO {
  id: number;
  username: string;
  cpf: string;
  tipo_conta: string;
  telefone: string;
  data_nascimento: string;
  email: string;
  senha: string;
  idEnderecoUsuario?: number;
}

interface FormularioInputProps {
  placeholder: string;
  name: string;
  interName: string;
  register: any;
  customizacaoClass: string;
  required?: boolean;
  options: Array<string | { id: number; username: string; tipo_conta?: string }>;
}

const FormularioInput = ({ 
  placeholder, 
  name, 
  interName, 
  register, 
  customizacaoClass, 
  required, 
  options 
}: FormularioInputProps) => {
  return (
    <select
      {...register(name)}
      className={customizacaoClass}
      required={required}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option 
          key={index} 
          value={typeof option === 'string' ? option : option.id}
        >
          {typeof option === 'string' ? option : option.username}
        </option>
      ))}
    </select>
  );
};

export default function PaginaAgendamento() {
  const {
    register, handleSubmit, watch, setValue
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [agendamentoSucesso, setAgendamentoSucesso] = useState(false);
  const [imovelId] = useState(1);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [usuarios, setUsuarios] = useState<UserProps[]>([]);
  const [dataSelecionada,] = useState<Date>(new Date());

  const verificarHorariosOcupados = useCallback(async (data: Date) => {
    try {
      const formattedDate = data.toISOString().split('T')[0];
      const response = await request(
        "GET",
        `http://localhost:9090/agendamento/getAll`
      ) as AgendamentoGetResponseDTO[];

      const ocupados = response
        .filter(agendamento => 
          agendamento.data === formattedDate &&
          agendamento.idImovel === imovelId
        )
        .map(agendamento => agendamento.horario);

      setHorariosOcupados(ocupados);
    } catch (error) {
      console.error("Erro ao verificar horários ocupados:", error);
    }
  }, [imovelId]);

  useEffect(() => {
    verificarHorariosOcupados(dataSelecionada);
  }, [verificarHorariosOcupados, dataSelecionada]);

  const handleAgendarVisita = async () => {
    const corretorId = watch('id_Corretor');
    const horario = watch('horario');
    
    if (!corretorId || !horario) {
      alert('Por favor, selecione uma data, horário e corretor');
      return;
    }

    setIsLoading(true);
    try {
      const selectedDate = new Date();
      const agendamentoData: AgendamentoPostRequestDTO = {
        data: selectedDate.toISOString().split('T')[0],
        horario: horario,
        idImovel: imovelId,
        idCorretor: parseInt(corretorId),
        idUsuario: 1
      };

      const response = await request(
        "POST", 
        "http://localhost:9090/agendamento/create", 
        agendamentoData
      );

      if (response) {
        setAgendamentoSucesso(true);
        await verificarHorariosOcupados(selectedDate);
      }
    } catch (error) {
      console.error("Erro ao agendar visita:", error);
      alert('Erro ao agendar visita. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  const getUsuario = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await request("GET", "http://localhost:9090/usuario/corretores") as UserResponseDTO[];

      if (Array.isArray(response)) {
        setUsuarios(response.map(user => ({
          id: user.id,
          username: user.username,
          tipo_conta: user.tipo_conta
        })));
      } else {
        console.error("Resposta da API inesperada:", response);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    getUsuario();
  }, [getUsuario]);

  const onSubmit = (data: unknown) => {
    console.log(data)
  }

  return (
    <LoadingWrapper>
      <Header />
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
                    name="id_Corretor"
                    interName="Corretor"
                    register={register}
                    customizacaoClass="w-full p-2 border bg-white text-black border-gray-500 rounded"
                    required
                    options={usuarios}
                  />

                  <FormularioInput
                    placeholder="Horários:"
                    name="horario"
                    interName="Horário"
                    register={register}
                    customizacaoClass="w-full p-2 bg-white text-black border border-gray-500 rounded"
                    required
                    options={["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"]
                      .filter(horario => !horariosOcupados.includes(horario))}
                  />

                  <Botao
                    className="xl:w-[60%] 2xl:w-[50%] bg-vermelho"
                    texto="Agendar visita"
                    onClick={handleAgendarVisita}
                    disabled={agendamentoSucesso}
                  />
                  {agendamentoSucesso && (
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
      <Footer />
    </LoadingWrapper>
  )
}















