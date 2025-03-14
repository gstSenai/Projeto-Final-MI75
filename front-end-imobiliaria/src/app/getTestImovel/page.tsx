import { Card } from "@/components/cardImovel";

interface ImovelProps {
    id: number;
    nome_propriedade: string;
    tipo_transacao: string;
    valor_venda: number;
    tipo_imovel: string;
    status_imovel: string;
    valor_promocional: number;
    destaque?: boolean;
    visibilidade: boolean;
    condominio: number;
    area_construida: number;
    area_terreno: number;
    descricao: string;
}

interface UsuarioProps {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    tipo_conta: string;
    telefone: string;
    data_nascimento: Date;
    email: string;
    senha: string;
    imovel: string;
}

interface ResponseProps {
    content: ImovelProps[]
}

export default async function getTest() {

    const response = await fetch("http://localhost:9090/imovel/getAll")
    const data: ResponseProps = await response.json()


    return (
        <>
            <div>
                <h1>Lista de Imoveis</h1>
                <div className="font-inter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 2xl:gap-y-20 2xl:gap-x-10 py-10 min-h-screen flex-col lg:flex-row bg-[#DFDAD0] 2xl:px-40 xl:px-32 lg:px-20 px-10">
                    {data.content?.map(post => (
                        <Card key={post.id} titulo={post.nome_propriedade}
                            cidade={post.tipo_imovel} qtdDormitorios={post.id} qtdSuite={post.id}
                            qtdBanheiros={post.id} preco={post.valor_venda} codigo={post.condominio} />
                    ))}
                </div>
            </div>
        </>
    );
}