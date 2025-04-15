import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Montserrat } from "next/font/google"
import TabelaImovel from "@/components/paginaCadastroImovel/tabelaImovel"
import { LoadingWrapper } from "@/components/loading/loadingServer"
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
})

export default function ImoveisPage() {
  return (
    <LoadingWrapper>
      <Header />
      <div className={`${montserrat.className} max-lg:px-4 px-20 py-12 sm:py-12 md:py-10 lg:py-14 xl:py-20`}>
        <div>
          <div className="flex justify-between items-center pb-6 md:pb-10 lg:pb-14 xl:pb-16 2xl:pb-24">
            <div>
              <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">Imóveis</h1>
              <div className="border-t-2 border-[#702632] w-[220px] md:w-[220px] 2xl:w-[220px] mt-6"></div>
            </div>
          </div>

          <TabelaImovel />
        </div>
      </div>
      <Footer />
    </LoadingWrapper>
  )
} 