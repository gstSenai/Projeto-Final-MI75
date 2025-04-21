import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LoadingWrapper } from "@/components/loading/loadingServer";
import TabelaRelatoriosAnalises from "@/components/tabelaRelatoriosAnalises/index"


export default function PaginaRelatoriosAnalises() {
  return (
    <>
      <LoadingWrapper>
        <header>
          <Header />
        </header>
        <div className="pt-10 px-6 max-lg:px-6 lg:px-20 xl:px-16">
          <h1 className="text-xl">Relatórios e Análises</h1>
          <div className="border-t-2 border-[#702632] w-[130px] mt-1 mb-4"></div>
          <section>
            <TabelaRelatoriosAnalises tipo="RelatorioAnalise"/>
          </section>
          <section>
            <h1 className="text-xl">Serviços de corretores</h1>
            <div className="border-t-2 border-[#702632] w-[130px] mt-1 mb-4"></div>
            <TabelaRelatoriosAnalises tipo="EstatisticaUsuarios" />
          </section>
          <section>
            <h1 className="text-xl">Relatórios e Análises</h1>
            <div className="border-t-2 border-[#702632] w-[130px] mt-1 mb-4"></div>
            <TabelaRelatoriosAnalises tipo="ServicosCorretores" />
          </section>
        </div>
        <footer>
          <Footer />
        </footer>
      </LoadingWrapper>
    </>
  );
}