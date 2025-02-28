
interface UsuarioProps {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    tipo_conta: string;
    telefone: string;
    data_nascimento: string;
    email: string;
    senha: string;
    imovel?: Imovel;
}

interface Imovel {
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

interface ResponseProps {
    content: UsuarioProps[]
}

export default async function getTest() {

    const response = await fetch("http://localhost:9090/users/getAll")
    const data: ResponseProps = await response.json()

    return (
        <>
            <div>
                <h1>Lista de Imoveis</h1>
                {data.content?.map(post => (
                    <div key={post.id}>
                        <h2>{post.nome}</h2>
                        <h2>{post.sobrenome}</h2>
                        <h2>{post.cpf}</h2>
                        <h2>{post.tipo_conta}</h2>
                        <h2>{post.telefone}</h2>
                        <h2>{post.data_nascimento}</h2>
                        <h2>{post.email}</h2>
                        <h2>{post.senha}</h2>
                    </div>
                ))}
            </div>
        </>
    );
}