"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/cardImovel/index"
import { Montserrat } from "next/font/google"
import { FiltroImoveis } from "./botaoFiltro"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
})

interface ImovelProps {
  id: number
  titulo: string
  destaque: string
  descricao: string
  preco: number 
  tipoImovel: string
  tipoTransacao: string
  endereco: string
  caracteristicas: string
  imagens: string[]
}

interface ImovelCompleto {
  id: number
  nome_propriedade: string
  destaque: string
  id_endereco: {
    cidade: string
  }
  id_caracteristicasImovel: {
    numero_quartos: number
    numero_suites: number
    numero_banheiros: number
  }
  valor_venda: number
  valor_promocional: number
  codigo: number
  tipo_transacao: string
}

interface Imovel {
  id: number
  destaque: string
  titulo: string
  cidade: string
  numero_quartos: number
  numero_suites: number
  numero_banheiros: number
  preco: number
  valorPromocional: number
  codigo: number
  imagemNome?: string
  tipo_transacao: string
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
}

export function ListaImoveis() {
  const [imoveis, setImoveis] = useState<Imovel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ultimoId, setUltimoId] = useState<number | null>(null)
  const [tipoTransacao, setTipoTransacao] = useState<string>("Todos")
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false)
  const [imovelId, setImovelId] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    size: 10,
  })

  const fetchImoveis = async (page: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      let url = `http://localhost:9090/imovel/getAll?page=${page}&size=${paginationInfo.size}`;
      
      // Add filter parameters from URL
      const codigoParam = searchParams.get('codigo');
      const cidadeParam = searchParams.get('cidade');
      const bairroParam = searchParams.get('bairro');
      const valorMinParam = searchParams.get('valor_min');
      const valorMaxParam = searchParams.get('valor_max');
      const tipoImovelParam = searchParams.get('tipo_imovel');
      const quantidadeQuartosParam = searchParams.get('quantidade_quartos');
      const quantidadeBanheirosParam = searchParams.get('quantidade_banheiros');
      const quantidadeVagasParam = searchParams.get('quantidade_vagas');

      // If we have a code parameter, use the specific endpoint
      if (codigoParam) {
        const response = await fetch(`http://localhost:9090/imovel/filtroCodigo?codigo=${codigoParam}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar imóvel');
        }

        const data = await response.json();
        
        // Format the single imóvel response
        const imovelFormatado = {
          id: data.id || 0,
          destaque: data.destaque || "Não Destaque",
          titulo: data.nome_propriedade || "Sem título",
          cidade: data.id_endereco?.cidade || "Cidade não informada",
          numero_quartos: data.id_caracteristicasImovel?.numero_quartos || 0,
          numero_suites: data.id_caracteristicasImovel?.numero_suites || 0,
          numero_banheiros: data.id_caracteristicasImovel?.numero_banheiros || 0,
          preco: data.valor_venda || 0,
          valorPromocional: data.valor_promocional || 0,
          codigo: data.codigo || 0,
          tipo_transacao: data.tipo_transacao || "Indefinido"
        };

        setImoveis([imovelFormatado]);
        setPaginationInfo({
          currentPage: 0,
          totalPages: 1,
          totalElements: 1,
          size: 1,
        });
        return;
      }

      // If we have characteristic filters, use the caracteristicaImovel endpoint
      if (quantidadeQuartosParam || quantidadeBanheirosParam || quantidadeVagasParam) {
        const response = await fetch(`http://localhost:9090/caracteristicaImovel/filtro?${new URLSearchParams({
          ...(quantidadeQuartosParam && { quantidade_quartos: quantidadeQuartosParam }),
          ...(quantidadeBanheirosParam && { quantidade_banheiros: quantidadeBanheirosParam }),
          ...(quantidadeVagasParam && { quantidade_vagas: quantidadeVagasParam })
        })}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar imóveis');
        }

        const data = await response.json();
        console.log('Response from caracteristicaImovel/filtro:', data);
        
        const imoveisFormatados = data.map((imovel: any) => ({
          id: imovel.id,
          destaque: imovel.destaque,
          titulo: imovel.nome_propriedade,
          cidade: imovel.id_endereco?.cidade || "Cidade não informada",
          numero_quartos: imovel.id_caracteristicasImovel?.numero_quartos || 0,
          numero_suites: imovel.id_caracteristicasImovel?.numero_suites || 0,
          numero_banheiros: imovel.id_caracteristicasImovel?.numero_banheiros || 0,
          preco: imovel.valor_venda || 0,
          valorPromocional: imovel.valor_promocional || 0,
          codigo: imovel.codigo,
          tipo_transacao: imovel.tipo_transacao,
          imagemNome: imovel.imagemNome || undefined
        }));

        console.log('Imóveis formatados (características):', imoveisFormatados);
        setImoveis(imoveisFormatados);
        setPaginationInfo({
          currentPage: 0,
          totalPages: 1,
          totalElements: imoveisFormatados.length,
          size: imoveisFormatados.length,
        });
        return;
      }

      // If we have advanced filters, use the filtroImovel endpoint
      if (valorMinParam || valorMaxParam || tipoImovelParam) {
        const response = await fetch(`http://localhost:9090/imovel/filtroImovel?${new URLSearchParams({
          ...(valorMinParam && { valor_min: valorMinParam }),
          ...(valorMaxParam && { valor_max: valorMaxParam }),
          ...(tipoImovelParam && { tipo_imovel: tipoImovelParam.toLowerCase() })
        })}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar imóveis');
        }

        const data = await response.json();
        
        const imoveisFormatados = data.map((imovel: any) => ({
          id: imovel.id || 0,
          destaque: imovel.destaque || "Não Destaque",
          titulo: imovel.nome_propriedade || "Sem título",
          cidade: imovel.id_endereco?.cidade || "Cidade não informada",
          numero_quartos: imovel.id_caracteristicasImovel?.numero_quartos || 0,
          numero_suites: imovel.id_caracteristicasImovel?.numero_suites || 0,
          numero_banheiros: imovel.id_caracteristicasImovel?.numero_banheiros || 0,
          preco: imovel.valor_venda || 0,
          valorPromocional: imovel.valor_promocional || 0,
          codigo: imovel.codigo || 0,
          tipo_transacao: imovel.tipo_transacao || "Indefinido"
        }));

        setImoveis(imoveisFormatados);
        setPaginationInfo({
          currentPage: 0,
          totalPages: 1,
          totalElements: imoveisFormatados.length,
          size: imoveisFormatados.length,
        });
        return;
      }

      // Otherwise, use the regular endpoint with basic filters
      if (cidadeParam) url += `&cidade=${cidadeParam}`;
      if (bairroParam) url += `&bairro=${bairroParam}`;

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao buscar imóveis');
      }

      const data = await response.json();
      
      const imoveisFormatados = data.content.map((imovel: any) => ({
        id: imovel.id,
        destaque: imovel.destaque,
        titulo: imovel.nome_propriedade,
        cidade: imovel.id_endereco?.cidade || "Cidade não informada",
        numero_quartos: imovel.id_caracteristicasImovel?.numero_quartos || 0,
        numero_suites: imovel.id_caracteristicasImovel?.numero_suites || 0,
        numero_banheiros: imovel.id_caracteristicasImovel?.numero_banheiros || 0,
        preco: imovel.valor_venda || 0,
        valorPromocional: imovel.valor_promocional || 0,
        codigo: imovel.codigo,
        tipo_transacao: imovel.tipo_transacao,
        imagemNome: imovel.imagemNome || undefined
      }));

      console.log('Imóveis formatados:', imoveisFormatados);
      setImoveis(imoveisFormatados);
      setPaginationInfo({
        currentPage: data.number,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        size: data.size,
      });
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      setImoveis([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get filters from URL parameters
    const tipoTransacaoParam = searchParams.get('tipoTransacao');
    
    // Apply filters
    if (tipoTransacaoParam) {
      setTipoTransacao(tipoTransacaoParam);
    }

    // Fetch initial data with filters
    fetchImoveis(0);
  }, [searchParams]);

  const refreshData = async () => {
    try {
      setLoading(true);
      setImoveis([]);
      setTipoTransacao("Todos");
      setMostrarFiltros(false);
      setUltimoId(null);
      setPaginationInfo({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        size: 10,
      });
      
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:9090/imovel/getAll?page=0&size=10`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const imoveisArray = data.content || [];
      
      if (imoveisArray.length === 0) {
        setImoveis([]);
        return;
      }

      setPaginationInfo({
        totalPages: data.totalPages || 1,
        totalElements: data.totalElements || 0,
        currentPage: data.number || 0,
        size: data.size || 10,
      });


      const imoveisFormatados = imoveisArray.map((imovel: ImovelCompleto) => ({
        id: imovel.id || 0,
        titulo: imovel.nome_propriedade || "Sem título",
        cidade: imovel.id_endereco?.cidade || "Cidade não informada",
        numero_quartos: imovel.id_caracteristicasImovel?.numero_quartos || 0,
        numero_suites: imovel.id_caracteristicasImovel?.numero_suites || 0,
        numero_banheiros: imovel.id_caracteristicasImovel?.numero_banheiros || 0,
        preco: imovel.valor_venda || 0,
        valorPromocional: imovel.valor_promocional || 0,
        codigo: imovel.codigo || 0,
        tipo_transacao: imovel.tipo_transacao || "Indefinido",
      }));

      setImoveis(imoveisFormatados);
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
      setError("Erro ao carregar imóveis. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImoveis(0);
    const id = localStorage.getItem('id');
    if (!id) {
        router.push('/');
        return;
    }
    
    setImovelId(Number(id));
    setLoading(false);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < paginationInfo.totalPages) {
      fetchImoveis(newPage);
    }
  };

  useEffect(() => {
    if (imoveis.length > 0) {
      fetchImoveis(0);
      console.log(imoveis);
    }
  }, [tipoTransacao]);

  const imoveisFiltrados =
    tipoTransacao === "Todos" ? imoveis : imoveis.filter((imovel) => imovel.tipo_transacao === tipoTransacao)

  const getPageNumbers = () => {
    const { currentPage, totalPages } = paginationInfo
    const pageNumbers = []

    const maxVisiblePages = 5
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  const handleSetImoveis = (imoveis: ImovelCompleto[]) => {
    const imoveisFormatados = imoveis.map((imovel) => ({
      id: imovel.id || 0,
      destaque: imovel.destaque || "Não Destaque",
      titulo: imovel.nome_propriedade || "Sem título",
      cidade: imovel.id_endereco?.cidade || "Cidade não informada",
      numero_quartos: imovel.id_caracteristicasImovel?.numero_quartos || 0,
      numero_suites: imovel.id_caracteristicasImovel?.numero_suites || 0,
      numero_banheiros: imovel.id_caracteristicasImovel?.numero_banheiros || 0,
      preco: imovel.valor_venda || 0,
      valorPromocional: imovel.valor_promocional || 0,
      codigo: imovel.codigo || 0,
      tipo_transacao: imovel.tipo_transacao || "Indefinido"
    }));
    setImoveis(imoveisFormatados);
  };

  return (
    <>
      <div className={`${montserrat.className} mx-48`}>
        <div className="flex justify-center mt-[8rem]">
          <h1 className="font-bold text-[40px]">Propriedades</h1>
        </div>
        <div className="flex justify-center">
          <div className="w-[15.75rem] h-[3px] bg-vermelho"></div>
        </div>

        <div className="flex justify-center gap-10 mt-[29.5px]">
          <button onClick={() => setTipoTransacao("Todos")}>
            <p className={` ${tipoTransacao === "Todos" ? "text-vermelho font-bold" : ""}`}>Todos</p>
          </button>
          <button onClick={() => setTipoTransacao("Venda")}>
            <p className={`${tipoTransacao === "Venda" ? "text-vermelho font-bold" : ""}`}>Comprar</p>
          </button>
          <button onClick={() => setTipoTransacao("Locação")}>
            <p className={` ${tipoTransacao === "Locação" ? "text-vermelho font-bold" : ""}`}>Alugar</p>
          </button>
        </div>

        <div className="flex justify-center gap-x-4 mt-6">
          <button
            className="bg-vermelho text-white px-6 py-2 rounded-lg transition duration-300 hover:opacity-80"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            {mostrarFiltros ? "Fechar Filtros" : "Filtrar"}
          </button>
          <button 
            className="underline decoration-vermelho px-4 py-2 rounded-lg" 
            onClick={() => refreshData()}
          >
            <p className="text-vermelho font-bold">Restaurar Padrão</p>
          </button>
        </div>

        {mostrarFiltros && (
          <div className="flex justify-center">
            <FiltroImoveis
              mostrarFiltros={mostrarFiltros}
              setMostrarFiltros={setMostrarFiltros}
              setImoveis={handleSetImoveis}
            />
          </div>
        )}

        {error && (
          <div className="flex justify-center mt-4">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center mt-10">
            <p className="text-xl font-semibold">Carregando imóveis...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center items-start gap-6 mt-10 mb-52">
              {imoveisFiltrados.length > 0 ? (
                imoveisFiltrados.map((imovel) => (
                  <Card
                    key={imovel.id}
                    titulo={imovel.titulo}
                    cidade={imovel.cidade}
                    numero_quartos={imovel.numero_quartos}
                    numero_suites={imovel.numero_suites}
                    numero_banheiros={imovel.numero_banheiros}
                    preco={imovel.preco}
                    valorPromocional={imovel.valorPromocional}
                    codigo={imovel.codigo}
                    imovelId={imovel.id}
                    destaque={(['Destaque', 'Promoção', 'Adicionado Rec.', 'Não Destaque'].includes(imovel.destaque) ? imovel.destaque : undefined) as "Destaque" | "Promoção" | "Adicionado Rec." | "Não Destaque" | undefined}
                  />
                ))
              ) : (
                <div>
                  <p className="text-xl font-semibold text-center mt-6">Nenhum imóvel encontrado.</p>
                </div>
              )}
            </div>

            {paginationInfo.totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 mb-10">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
                    disabled={paginationInfo.currentPage === 0}
                    className={`p-2 rounded-md ${paginationInfo.currentPage === 0 ? "text-gray-400 cursor-not-allowed" : "text-vermelho hover:bg-red-50"}`}
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-md ${
                        pageNum === paginationInfo.currentPage
                          ? "bg-vermelho text-white font-bold"
                          : "hover:bg-red-50 text-gray-700"
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
                    disabled={paginationInfo.currentPage === paginationInfo.totalPages - 1}
                    className={`p-2 rounded-md ${paginationInfo.currentPage === paginationInfo.totalPages - 1 ? "text-gray-400 cursor-not-allowed" : "text-vermelho hover:bg-red-50"}`}
                    aria-label="Próxima página"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default ListaImoveis

