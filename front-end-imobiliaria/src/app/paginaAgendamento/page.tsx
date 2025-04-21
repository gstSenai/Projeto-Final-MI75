"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Montserrat } from "next/font/google"
import Calendario from "@/components/calendario/index"
import { FormularioInput } from "@/components/calendario/selecaoHorario"
import { useForm } from "react-hook-form"
import { useEffect, useState, useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Botao } from "@/components/botao/index"
import request from "@/routes/request"
import { z } from "zod"
import { LoadingWrapper } from "@/components/loading/loadingServer"
import { useRouter } from "next/navigation"

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

interface AgendamentoResponse {
  horario: string
}

const AgendamentoSchema = z.object({
  corretor: z.object({
    id: z.number(),
    nome: z.string(),
    sobrenome: z.string(),
  }),
  horario: z.string().min(1, "Selecione um horário"),
  data: z.string().min(1, "Selecione uma data"),
})

type AgendamentoFormData = z.infer<typeof AgendamentoSchema>

interface PaginaAgendamentoProps {
  imovelId: number

  
}



export default function PaginaAgendamento({ imovelId }: PaginaAgendamentoProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<AgendamentoFormData>({
    resolver: zodResolver(AgendamentoSchema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const [agendamentoSucesso, setAgendamentoSucesso] = useState(false)
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([])
  const [corretores, setCorretores] = useState<UserProps[]>([])
  const [dataSelecionada, setDataSelecionada] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const verificarHorariosOcupados = useCallback(
    async (data: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await request(
                "GET", 
                `http://localhost:9090/agendamento/imovel/${imovelId}/data/${data}`
            );
            
            if (!response) {
                throw new Error("Resposta vazia do servidor");
            }
            
            if (Array.isArray(response)) {
                const horariosOcupados = response.map((a: any) => a.horario);
                setHorariosOcupados(horariosOcupados);
                
                if (horariosOcupados.length === 6) {
                    setError("Todos os horários estão ocupados nesta data. Por favor, selecione outra data.");
                }
            } else {
                throw new Error("Formato de resposta inesperado");
            }
        } catch (error: any) {
            console.error("Erro ao verificar horários:", error);
            setError(error.message || "Não foi possível carregar os horários. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    },
    [imovelId]
);

  useEffect(() => {
    if (dataSelecionada) {
      verificarHorariosOcupados(dataSelecionada)
    }
  }, [dataSelecionada, verificarHorariosOcupados])


  const handleAgendarVisita = async (data: AgendamentoFormData) => {
    if (!dataSelecionada || !data.horario || !data.corretor.id) {
      setError("Preencha todos os campos obrigatórios");
      setIsLoading(false);
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      // Converter data de "17 Abril" para formato ISO (yyyy-MM-dd)
      const [day, monthName] = dataSelecionada.split(' ');
      const monthMap: Record<string, string> = {
        'Janeiro': '01', 'Fevereiro': '02', 'Março': '03', 'Abril': '04',
        'Maio': '05', 'Junho': '06', 'Julho': '07', 'Agosto': '08',
        'Setembro': '09', 'Outubro': '10', 'Novembro': '11', 'Dezembro': '12'
      };
      const month = monthMap[monthName];
      const year = new Date().getFullYear();
      const formattedDate = `${year}-${month}-${day.padStart(2, '0')}`;
  
      // Criar payload no formato esperado pelo backend
      const agendamentoData = {
        data: formattedDate,
        horario: data.horario + ":00", // Adiciona segundos
        id_Imovel: { id: imovelId },
        id_Corretor: { id: data.corretor.id }
      };
  
      const response = await request("POST", "http://localhost:9090/agendamento/create", agendamentoData);
  
      if (response && response.id) {
        setAgendamentoSucesso(true);
        verificarHorariosOcupados(dataSelecionada);
      } else {
        setError("Erro ao processar o agendamento.");
      }
    } catch (error: any) {
      console.error("Erro ao agendar visita:", error);
      setError(error.response?.data?.message || "Não foi possível agendar a visita. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };


  
  const getCorretores = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await request("GET", "http://localhost:9090/usuario/corretores");
      if (Array.isArray(response)) {
        setCorretores(
          response.map((user: any) => ({
            id: user.id,
            nome: user.nome || user.username || "",
            sobrenome: user.sobrenome || "",
          })),
        );
      } else {
        setError("Formato de resposta inesperado ao buscar corretores");
      }
    } catch (error) {
      console.error("Erro ao buscar corretores:", error);
      setError("Erro ao carregar lista de corretores. Tente recarregar a página.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCorretores()
  }, [getCorretores])

  const handleDateChange = (date: string) => {
    if (!isLoading) {
      setDataSelecionada(date)
      setValue("data", date)
    }
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
              <Calendario onDateChange={handleDateChange} />
              <div className="pt-20 sm:pt-20 md:pt-0 sm:px-1 md:px-5 lg:px-10">
                <h2 className="center md:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl font-bold text-center text-[#702632]">
                  Escolha a data, o horário e o corretor para agendar sua visita!
                </h2>
                <form
                  onSubmit={handleSubmit(handleAgendarVisita)}
                  className="flex flex-col items-center gap-8 mt-6 mx-8 lg:mx-10 xl:mx-16 2xl:mx-32"
                >
                  <div className="w-full">
                    <FormularioInput
                      placeholder="Corretores:"
                      name="corretor"
                      interName="Corretor"
                      control={control}
                      customizacaoClass="w-full p-2 border bg-white text-black border-gray-500 rounded"
                      required
                      options={corretores}
                      optionLabel={(corretor) => `${corretor.nome} ${corretor.sobrenome}`}
                      optionValue={(corretor) => corretor.id.toString()}
                    />
                    {errors.corretor && <p className="text-red-500 text-sm mt-1">Selecione um corretor</p>}
                  </div>

                  <div className="w-full">
                    <FormularioInput
                      placeholder="Horários:"
                      name="horario"
                      interName="Horário"
                      register={register}
                      customizacaoClass="w-full p-2 bg-white text-black border border-gray-500 rounded"
                      required
                      disabled={!dataSelecionada}
                      options={["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"].filter(
                        (horario) => !horariosOcupados.includes(horario),
                      )}
                    />
                    {errors.horario && <p className="text-red-500 text-sm mt-1">Selecione um horário</p>}
                    {dataSelecionada &&
                      ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"].filter(
                        (horario) => !horariosOcupados.includes(horario),
                      ).length === 0 && (
                        <p className="text-amber-600 text-sm mt-1">
                          Não há horários disponíveis nesta data. Por favor, selecione outra data.
                        </p>
                      )}
                  </div>

                  <input type="hidden" {...register("data")} />

                  {error && <div className="text-red-500 text-center mt-4">{error}</div>}

                  <Botao
                    className="xl:w-[60%] 2xl:w-[50%] h-14 bg-vermelho"
                    texto={isLoading ? "Processando..." : "Agendar visita"}
                    type="submit"
                    disabled={agendamentoSucesso || isLoading || !dataSelecionada}
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
