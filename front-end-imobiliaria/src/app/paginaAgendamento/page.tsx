"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Montserrat } from "next/font/google"
import Calendario from "@/components/Calendario"
import { FormularioInput } from "@/components/Calendario/selecaoData"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import request from "@/routes/request"
import { Botao } from "@/components/botao"


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

// Remova a estrutura ResponseProps porque não existe um "content"
type ResponseProps = UserProps[]




export default function PaginaAgendamento() {
  const [usuarios, setUsuarios] = useState<ResponseProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)



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





  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

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
                    placeholder="Horários:"
                    name="Horario.dia"
                    interName="Horário"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    options={["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"]}
                  />

                  <FormularioInput
                    placeholder="Corretores:"
                    name="Corretores.disponivel"
                    interName="Corretor"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    options={usuarios?.map(({ nome, sobrenome }) => `${nome} ${sobrenome}`) || []}
                  />



                  <Botao className=" xl:w-[60%] 2xl:w-[50%]" texto="Agendar visita"/>
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

