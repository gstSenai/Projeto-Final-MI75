import { useState, useEffect } from 'react';

interface ImovelCompleto {
    id: number;
    nome_propriedade: string;
    destaque: string;
    id_endereco: {
        cidade: string;
    };
    id_caracteristicasImovel: {
        numero_quartos: number;
        numero_suites: number;
        numero_banheiros: number;
    };
    valor_venda: number;
    codigo: number;
    tipo_transacao: string;
    data_cadastro: string;
}

interface Imovel {
    id: number;
    destaque: string;
    titulo: string;
    cidade: string;
    numero_quartos: number;
    numero_suites: number;
    numero_banheiros: number;
    preco: number;
    codigo: number;
    tipo_transacao: string;
}

export function useImoveis(tipo: 'destaque' | 'promocao' | 'recente') {
    const [imoveis, setImoveis] = useState<Imovel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImoveis = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090";
                const token = localStorage.getItem("token");
                const response = await fetch(`${apiUrl}/imovel/getAll?page=0&size=10`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Erro ao buscar imóveis');
                }

                const data = await response.json();
                const imoveisArray = data.content || [];
                
                const imoveisFormatados = imoveisArray
                    .filter((imovel: ImovelCompleto) => {
                        if (tipo === 'destaque') return imovel.destaque === 'Destaque';
                        if (tipo === 'promocao') return imovel.destaque === 'Promoção';
                        if (tipo === 'recente') return imovel.destaque === 'Adicionado Rec.';
                        return false;
                    })
                    .sort((a: ImovelCompleto, b: ImovelCompleto) => {
                        // Ordena por data de cadastro (mais recente primeiro)
                        return new Date(b.data_cadastro).getTime() - new Date(a.data_cadastro).getTime();
                    })
                    .map((imovel: ImovelCompleto) => ({
                        id: imovel.id || 0,
                        destaque: imovel.destaque || "Não Destaque",
                        titulo: imovel.nome_propriedade || "Sem título",
                        cidade: imovel.id_endereco?.cidade || "Cidade não informada",
                        numero_quartos: imovel.id_caracteristicasImovel?.numero_quartos || 0,
                        numero_suites: imovel.id_caracteristicasImovel?.numero_suites || 0,
                        numero_banheiros: imovel.id_caracteristicasImovel?.numero_banheiros || 0,
                        preco: imovel.valor_venda || 0,
                        codigo: imovel.codigo || 0,
                        tipo_transacao: imovel.tipo_transacao || "Indefinido"
                    }));

                setImoveis(imoveisFormatados);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchImoveis();
    }, [tipo]);

    return { imoveis, loading, error };
} 