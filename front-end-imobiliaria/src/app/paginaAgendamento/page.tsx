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
  id_Corretor: z.object({
    id: z.number(),
    nome: z.string(),
    sobrenome: z.string(),
  }),
  horario: z.string().min(1, "Selecione um horário"),
  data: z.string().min(1, "Selecione uma data"),
})

type AgendamentoFormData = z.infer<typeof AgendamentoSchema>

export default function PaginaAgendamento() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AgendamentoFormData>({
    resolver: zodResolver(AgendamentoSchema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const [agendamentoSucesso, setAgendamentoSucesso] = useState(false)
  const [imovelId] = useState(1)
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([])
  const [usuarios, setUsuarios] = useState<UserProps[]>([])
  const [dataSelecionada, setDataSelecionada] = useState<string>("")

  const verificarHorariosOcupados = useCallback(async (data: string) => {
    try {
      const response = await request(
        "GET",
        `http://localhost:9090/agendamento/imovel/${imovelId}/data/${data}`
      )
      setHorariosOcupados((response as AgendamentoResponse[]).map((a) => a.horario))
    } catch (error) {
      console.error("Erro ao verificar horários ocupados:", error)
    }
  }, [imovelId])

  useEffect(() => {
    if (dataSelecionada) {
      verificarHorariosOcupados(dataSelecionada)
    }
  }, [dataSelecionada, verificarHorariosOcupados])

  const handleAgendarVisita = async (data: AgendamentoFormData) => {
    setIsLoading(true)
    try {
      const agendamentoData = {
        id_Corretor: data.id_Corretor,
        horario: data.horario,
        data: dataSelecionada,
        id_Imovel: imovelId
      }
      await request("POST", "http://localhost:9090/agendamento", agendamentoData)
      setAgendamentoSucesso(true)
      // Atualiza lista de horários ocupados
      verificarHorariosOcupados(dataSelecionada)
    } catch (error) {
      console.error("Erro ao agendar visita:", error)
      alert('Erro ao agendar visita. Horário pode já estar ocupado.')
    } finally {
      setIsLoading(false)
    }
  }

  const getUsuario = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await request("GET", "http://localhost:9090/usuario/corretores")
      if (Array.isArray(response)) {
        setUsuarios(response)
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getUsuario()
  }, [getUsuario])

  const handleDateChange = (date: string) => {
    setDataSelecionada(date)
    setValue("data", date)
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
                <form onSubmit={handleSubmit(handleAgendarVisita)} className="flex flex-col items-center gap-8 mt-6 mx-8 lg:mx-10 xl:mx-16 2xl:mx-32">
                  <div className="w-full">
                    <FormularioInput
                      placeholder="Corretores:"
                      name="id_Corretor"
                      interName="Corretor"
                      register={register}
                      customizacaoClass="w-full p-2 border bg-white text-black border-gray-500 rounded"
                      required
                      options={usuarios.map(user => `${user.nome} ${user.sobrenome}`)}
                    />
                    {errors.id_Corretor && (
                      <p className="text-red-500 text-sm mt-1">{'O corretor não foi achado'}</p>
                    )}
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
                      options={["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"]
                        .filter(horario => !horariosOcupados.includes(horario))}
                    />
                    {errors.horario && (
                      <p className="text-red-500 text-sm mt-1">{'O Horário não foi achado'}</p>
                    )}
                  </div>

                  <input type="hidden" {...register("data")} />

                  <Botao
                    className="xl:w-[60%] 2xl:w-[50%] bg-vermelho"
                    texto="Agendar visita"
                    type="submit"
                    disabled={agendamentoSucesso || isLoading}
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