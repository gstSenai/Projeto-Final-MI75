"use client";

interface FormularioInputProps {
    placeholder: string;
    name: string;
    showOptions?: boolean;
    iconAreaCT?: boolean;
    iconSala?: boolean;
    imagemBanheiro?: boolean;
    imagemDormitorio?: boolean;
    imagemSuite?: boolean;
    iconGaragem?: boolean;
    imagemPraia?: boolean;
    custumizacaoClass: string;
    options?: string[];
}

function FormularioInput({
    placeholder,
    name,
    showOptions = false,
    iconAreaCT = false,
    iconSala = false,
    imagemBanheiro = false,
    imagemDormitorio = false,
    imagemSuite = false,
    iconGaragem = false,
    imagemPraia = false,
    custumizacaoClass,
    options = []
}: FormularioInputProps) {

    return (
        <form action="text" className={`flex items-center lg:max-h-[58px] xl:max-h-[60px] 2xl:max-h-[62px] max-lg:justify-center gap-6 xl:py-4 2xl:py-6 py-3.5 bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent max-lg:p-0 ${custumizacaoClass}`}>
            {iconAreaCT && <img src="/iconsImoveis/iconAreaCT.png" alt="Botão Opções" className="h-6 lg:h-6 ml-4" />}
            {iconSala && <img src="/iconsImoveis/iconSala.png" alt="Botão Opções" className="h-6 lg:h-7 ml-4" />}
            {imagemBanheiro && <img src="/imagensImovel/imagemBanheiro.png" alt="Botão Opções" className="h-6 lg:h-9 ml-4" />}
            {imagemDormitorio && <img src="/imagensImovel/imagemDormitorio.png" alt="Botão Opções" className="h-6 lg:h-9 ml-4" />}
            {imagemSuite && <img src="/imagensImovel/imagemSuite.png" alt="Botão Opções" className="h-6 lg:h-9 ml-4" />}
            {iconGaragem && <img src="/iconsImoveis/iconGaragem.png" alt="Botão Opções" className="h-6 lg:h-9 ml-4" />}
            {imagemPraia && <img src="/iconsImoveis/iconPraia.png" alt="Botão Opções" className="h-6 lg:h-9 ml-4" />}

            {showOptions ? (
                <select
                    defaultValue=""
                    className="appearance-none text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full bg-transparent"
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

            {showOptions && <img src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="ml-auto mr-4 lg:h-6" />}
        </form>
    );
}


export function FormDadosImovel() {
    return (
        <>
            <div className="flex lg:gap-10 mt-10">
                <div className="flex flex-col lg:gap-10">
                    <FormularioInput
                        placeholder="Área Construída (m²):"
                        name="Área Construída (m²):"
                        iconAreaCT
                        custumizacaoClass="lg:w-full"
                    />
                    <FormularioInput
                        placeholder="Número de Quartos:"
                        name="Número de Quartos"
                        showOptions
                        imagemDormitorio
                        custumizacaoClass="lg:w-full"
                        options={["Nenhum Quarto", "1 Quarto", "2 Quartos", "3 Quartos", "4+ Quartos"]}
                    />
                    <FormularioInput
                        placeholder="Número de Suítes:"
                        name="Número de Suítes"
                        showOptions
                        imagemSuite
                        custumizacaoClass="lg:w-full"
                        options={["Nenhuma Suíte", "1 Suíte", "2 Suítes", "3 Suítes", "4+ Suítes"]}
                    />
                    <FormularioInput
                        placeholder="Número de piscina:"
                        name="Número de piscina"
                        showOptions
                        imagemPraia
                        custumizacaoClass="lg:w-full"
                        options={["Nenhuma Piscina", "1 Piscina", "2 Piscinas", "3 Piscinas", "4+ Piscinas"]}
                    />
                </div>

                <div className="flex flex-col lg:gap-10">
                    <FormularioInput
                        placeholder="Área do Terreno (m²):"
                        name="Área do Terreno (m²):"
                        iconAreaCT
                        custumizacaoClass="lg:w-full"
                    />
                    <FormularioInput
                        placeholder="Número de Banheiros:"
                        name="Número de Banheiros"
                        showOptions
                        imagemBanheiro
                        custumizacaoClass="lg:w-full"
                        options={["Nenhum Banheiro", "1 Banheiro", "2 Banheiros", "3 Banheiros", "4+ Banheiros"]}
                    />
                    <FormularioInput
                        placeholder="Vagas de Garagem:"
                        name="Vagas de Garagem"
                        showOptions
                        iconGaragem
                        custumizacaoClass="lg:w-full"
                        options={["Nenhuma Garagem", "1 Garagem", "2 Garagens", "3 Garagens", "4+ Garagens"]}
                    />
                    <FormularioInput
                        placeholder="Número de Salas:"
                        name="Número de salas"
                        showOptions
                        iconSala
                        custumizacaoClass="lg:w-[full]"
                        options={["Nenhuma Sala", "1 Sala", "2 Salas", "3 Salas", "4+ Salas"]}
                    />
                </div>

                <div className="flex flex-col justify-end lg:gap-10 lg:w-[40%] 2xl:w-full">
                    <div className="flex flex-col bg-white h-full rounded-[20px] border border-black px-5 py-8">
                        <div className="flex items-center gap-5">
                            <img src="/iconsImoveis/imagemImovel.png" alt="" className="h-5 lg:h-8" />
                            <p className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black">Fotos do Imóvel</p>
                        </div>
                        <div className="bg-[#5C5C5C]/40 w-[30%] h-20 lg:h-32 xl:h-40 mt-6 rounded-2xl"></div>
                    </div>
                </div>
            </div>

            <div className="flex items-center lg:gap-10 w-full mt-10">
                <div className="bg-white w-full h-80 rounded-[20px] border border-black px-5 py-8">
                    <form action="text" className="flex gap-5">
                        <img src="/iconsForms/canetaEditar.png" alt="Editar" className="h-8 lg:h-6 ml-4" />
                        <textarea
                            placeholder="Descrição"
                            name="descrição"
                            className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl h-60 max-lg:text-black outline-none w-full resize-none  overflow-auto"
                        />
                    </form>
                </div>


                <div className="flex flex-col bg-white w-[55%] h-80 rounded-[20px] border border-black px-5 py-8">
                    <div className="flex items-center gap-5">
                        <img src="/iconsImoveis/imagemImovel.png" alt="" className="h-5 lg:h-8" />
                        <p className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black">Fotos do Imóvel</p>
                    </div>
                    <div className="bg-[#5C5C5C]/40 w-[30%] h-20 lg:h-32 xl:h-40 mt-6 rounded-2xl"></div>
                </div>
            </div>
        </>
    );
}