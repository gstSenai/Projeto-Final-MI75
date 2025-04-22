"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Montserrat } from 'next/font/google'
import Calendario from "@/components/calendario/index"
import { FormularioInput } from "@/components/Calendario/selecaoHorario"
import { useForm } from "react-hook-form"
import { useEffect, useState, useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Botao } from "@/components/botao/index"
import request from "@/routes/request"
import { z } from "zod"
import { LoadingWrapper } from "@/components/loading/loadingServer"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/context/AuthContext"

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

export default function PaginaAgendamento() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { userId, isAuthenticated } = useAuth()
  const [imovelId, setImovelId] = useState<number | null>(null)

  useEffect(() => {
    const checkAuthAndSetup = async () => {
      console.log("=== Verificando autenticação e configuração inicial ===")
      
      // Primeiro verifica autenticação
      if (!isAuthenticated) {
        console.log("Usuário não autenticado, verificando localStorage...")
        const token = localStorage.getItem('token')
        if (!token) {
          console.log("Token não encontrado, redirecionando para login")
          router.push('/login')
          return
        }
      }

      // Depois trata o ID do imóvel
      const urlImovelId = searchParams.get('imovelId')
      const storedImovelId = localStorage.getItem('currentImovelId')
      
      console.log("IDs encontrados:", {
        urlImovelId,
        storedImovelId
      })

      if (!urlImovelId && !storedImovelId) {
        console.error('ID do imóvel não encontrado')
        router.push('/PaginaInicial')
        return
      }

      // Prioriza o ID da URL, mas usa o do localStorage se necessário
      const finalImovelId = urlImovelId || storedImovelId
      setImovelId(Number(finalImovelId))
      
      // Atualiza o localStorage com o ID atual
      if (finalImovelId) {
        localStorage.setItem('currentImovelId', finalImovelId)
      }

      console.log("Configuração concluída:", {
        imovelId: finalImovelId,
        isAuthenticated
      })
    }

    checkAuthAndSetup()
  }, [searchParams, router, isAuthenticated])

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
      if (!imovelId) {
        console.error('ID do imóvel não disponível para verificar horários')
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        console.log(`Verificando horários para imóvel ${imovelId} na data ${data}`)
        
        const response = await request(
          "GET", 
          `http://localhost:9090/agendamento/imovel/${imovelId}/data/${data}`
        )
        
        if (Array.isArray(response)) {
          const horariosOcupados = response.map((a: any) => a.horario.substring(0, 5))
          console.log("Horários ocupados encontrados:", horariosOcupados)
          setHorariosOcupados(horariosOcupados)
          
          if (horariosOcupados.length === 6) {
            setError("Todos os horários estão ocupados nesta data. Por favor, selecione outra data.")
          }
        } else {
          throw new Error("Formato de resposta inesperado")
        }
      } catch (error: any) {
        console.error("Erro ao verificar horários:", error)
        setError(error.message || "Não foi possível carregar os horários. Tente novamente.")
      } finally {
        setIsLoading(false)
      }
    },
    [imovelId]
  )

  const handleAgendarVisita = async (data: AgendamentoFormData) => {
    console.log("=== Iniciando agendamento ===")
    console.log("Dados do formulário:", data)
    console.log("Data selecionada:", dataSelecionada)
    console.log("ID do usuário:", userId)
    console.log("ID do imóvel:", imovelId)
    console.log("Autenticado:", isAuthenticated)
    console.log("Corretor selecionado:", data.corretor)
    console.log("Horário selecionado:", data.horario)

    // Validações detalhadas
    const validacoes = {
      data: Boolean(dataSelecionada),
      horario: Boolean(data.horario),
      corretor: Boolean(data.corretor?.id),
      usuario: Boolean(userId),
      imovel: Boolean(imovelId),
      dataValida: dataSelecionada?.match(/^\d{4}-\d{2}-\d{2}$/),
      horarioValido: data.horario?.match(/^\d{1,2}:\d{2}$/),
      idCorretorNumerico: typeof data.corretor?.id === 'number',
      idUsuarioNumerico: typeof userId === 'number',
      idImovelNumerico: typeof imovelId === 'number'
    }

    console.log("Validações:", validacoes)

    if (!isAuthenticated) {
      console.log("Erro: Usuário não autenticado")
      setError("Você precisa estar logado para fazer um agendamento.")
      router.push('/login')
      return
    }

    if (Object.values(validacoes).some(v => !v)) {
      console.log("Falha nas validações:", 
        Object.entries(validacoes)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
      )
      setError("Preencha todos os campos obrigatórios corretamente")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const [hours, minutes] = data.horario.split(':')
      console.log("Horário antes da formatação:", { hours, minutes })
      
      // Garante que a hora tenha dois dígitos
      const formattedHours = hours.padStart(2, '0')
      console.log("Horário após formatação:", formattedHours)
      
      // Garante que todos os IDs sejam números
      const idImovel = Number(imovelId)
      const idUsuario = Number(userId)
      const idCorretor = Number(data.corretor.id)

      // Validação adicional dos IDs
      if (isNaN(idImovel) || isNaN(idUsuario) || isNaN(idCorretor)) {
        throw new Error("IDs inválidos detectados")
      }
      
      const agendamentoData = {
        data: dataSelecionada,
        horario: `${formattedHours}:${minutes}:00`,
        idImovel: idImovel,
        idUsuario: idUsuario,
        idCorretor: idCorretor,
        status: "PENDENTE"
      }

      console.log("=== Dados do agendamento ===")
      console.log("Payload completo:", JSON.stringify(agendamentoData, null, 2))
      console.log("Tipos dos campos:", {
        data: typeof agendamentoData.data,
        horario: typeof agendamentoData.horario,
        idImovel: typeof agendamentoData.idImovel,
        idUsuario: typeof agendamentoData.idUsuario,
        idCorretor: typeof agendamentoData.idCorretor,
        status: typeof agendamentoData.status
      })
      console.log("Valores numéricos:", {
        idImovel: agendamentoData.idImovel,
        idUsuario: agendamentoData.idUsuario,
        idCorretor: agendamentoData.idCorretor
      })

      console.log("Enviando requisição para criar agendamento...")
      console.log("URL:", "http://localhost:9090/agendamento/create")
      console.log("Método:", "POST")
      console.log("Headers:", {
        'Content-Type': 'application/json'
      })

      const response = await request("POST", "http://localhost:9090/agendamento/create", agendamentoData)
      console.log("Resposta do servidor:", response)

      if (response) {
        console.log("Agendamento realizado com sucesso!")
        setAgendamentoSucesso(true)
        verificarHorariosOcupados(dataSelecionada)
      } else {
        console.error("Resposta vazia do servidor")
        throw new Error("Erro ao criar agendamento: resposta vazia do servidor")
      }
    } catch (error: any) {
      console.error("=== Erro detalhado ===")
      console.error("Mensagem de erro:", error.message)
      console.error("Stack trace:", error.stack)
      if (error.response) {
        console.error("Detalhes da resposta do servidor:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        })
      }
      setError(
        error.message || 
        "Não foi possível agendar a visita. Verifique se todos os campos estão preenchidos corretamente."
      )
    } finally {
      setIsLoading(false)
    }
  }
  
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
      console.log("Data selecionada:", date); // Para debug
      setDataSelecionada(date);
      setValue("data", date);
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