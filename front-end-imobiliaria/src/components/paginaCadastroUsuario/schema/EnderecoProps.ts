import { z } from "zod"

const EnderecoProps = z.object({
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

export default EnderecoProps;