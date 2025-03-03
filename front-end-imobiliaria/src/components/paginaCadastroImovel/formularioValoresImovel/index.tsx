"use client";
interface FormularioInputProps {
    placeholder: string;
    name: string;
    showOptions?: boolean;
    nameBol?: boolean;
    custumizacaoClass: string;
    options?: string[];
}

interface FormEspecifico {
    placeholder: string;
    name: string;
}

function FormularioInput({
    placeholder,
    name,
    showOptions = false,
    custumizacaoClass,
    options = []
}: FormularioInputProps) {

    return (
        <form action="text" className={`flex items-center lg:max-h-[58px] xl:max-h-[60px] 2xl:max-h-[62px] max-lg:justify-center gap-6 xl:py-4 2xl:py-6 py-3.5 bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent max-lg:p-0 ${custumizacaoClass}`}>
            <img src="/iconsForms/canetaEditar.png" alt="Editar" className="lg:h-6 ml-4" />

            <div className="relative w-full">
                {showOptions ? (
                    <select
                        defaultValue=""
                        className="appearance-none text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full bg-transparent pr-8"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                        <option value="" disabled className="text-gray-400">{name}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option} className="text-black">{option}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        placeholder={placeholder}
                        name={name}
                        className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full"
                    />
                )}

                {showOptions && (
                    <img
                        src="/iconsForms/botaoOpcoes.png"
                        alt="Botão Opções"
                        className="absolute right-0 mr-4 top-1/2 -translate-y-1/2 pointer-events-none lg:h-8 2xl:h-full"
                    />
                )}
            </div>
        </form>
    );
}

export function FormValorImovel({ placeholder, name }: FormEspecifico) {
    return (
        <div className="flex flex-col lg:gap-10 mt-10 ">
            <div className="flex lg:gap-10">
                <FormularioInput
                    placeholder={placeholder}
                    name={name}
                    custumizacaoClass="lg:w-1/3"
                />
                <FormularioInput
                    placeholder="Tipo do imóvel:"
                    name="Tipo do imóvel"
                    showOptions
                    custumizacaoClass="lg:w-1/3"
                    options={["Casa", "Apartamento", "Terreno"]}
                />
                <FormularioInput
                    placeholder="Estado do imóvel:"
                    name="Estado do imóvel"
                    showOptions
                    custumizacaoClass="lg:w-1/3"
                    options={["Novo", "Usado", "Em construção", "Reformado"]}
                />
            </div>
            <div className="flex lg:gap-10">
                <FormularioInput
                    placeholder="Valor do Preço Promocional (R$):"
                    name="Valor do Preço Promocional (R$)"
                    custumizacaoClass="lg:w-[40%]"
                />
                <FormularioInput
                    placeholder="Permitir destaque:"
                    name="Permitir destaque"
                    showOptions
                    custumizacaoClass="lg:w-[35%]"
                    options={["Sim", "Não"]}
                />
                <FormularioInput
                    placeholder="Visibilidade:"
                    name="Visibilidade"
                    showOptions
                    custumizacaoClass="lg:w-[25%]"
                    options={["Público", "Privado", "Administrador"]}
                />
            </div>
            <div className="flex lg:gap-10">
                <FormularioInput
                    placeholder="Valor do IPTU (R$):"
                    name="Valor do IPTU (R$)"
                    custumizacaoClass="lg:w-[63%]"
                />
                <FormularioInput
                    placeholder="Taxa de Condomínio Caso tenha (R$):"
                    name="Taxa de Condomínio Caso tenha (R$):"
                    custumizacaoClass="lg:w-full"
                />
            </div>
        </div>
    );
}