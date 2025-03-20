import { z } from "zod"
import endereco from "./EnderecoProps";
import EnderecoProps from "./EnderecoProps";

const UsuarioPropsEdit = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
    cpf: z.string().min(11, { message: "CPF inválido (formato: 123.456.789-00)" }).max(11),
    tipo_conta: z.enum(["Usuario", "Corretor", "Administrador", "Editor"], {
        message: "Selecione um tipo de conta válido",
    }),
    telefone: z.string().min(10, { message: "Telefone inválido" }),
    data_nascimento: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    imagem_usuario: z.string() || null,
    endereco: z.object({
        id: z.number().optional(),
        cep: z.string().min(1, { message: "CEP é obrigatório" }),
        rua: z.string().min(1, { message: "Rua é obrigatória" }),
        tipo_residencia: z.string().min(1, { message: "Tipo de residência é obrigatório" }),
        numero_imovel: z.coerce.number().min(1, { message: "Número do imóvel é obrigatório" }),
        numero_apartamento: z.coerce.number().optional(),
        bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
        cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
        uf: z.string().min(1, { message: "UF é obrigatório" }),
    })
})

export default UsuarioPropsEdit;