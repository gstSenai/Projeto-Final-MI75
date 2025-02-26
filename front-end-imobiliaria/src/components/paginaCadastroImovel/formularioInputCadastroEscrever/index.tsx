interface FormularioInputProps {
    placeholder: string;
    name: string;
    showOptions?: boolean;
    custumizacaoClass: string;
}

function FormularioInput({ placeholder, name, showOptions = false, custumizacaoClass }: FormularioInputProps) {
    return (
        <form action="text" className={`flex items-center lg:max-h-[58px] xl:max-h-[62px] 2xl:max-h-[78px] max-lg:justify-center gap-6 xl:py-4 2xl:py-6 py-3.5 bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent max-lg:p-0 ${custumizacaoClass}`}>
            <img src="/iconsForms/canetaEditar.png" alt="Editar" className="h-8 lg:h-6 2xl:h-full ml-4" />
            <input type="text" placeholder={placeholder} name={name} className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full" />
            {showOptions && <img src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="ml-auto mr-4 lg:h-8 2xl:h-full" />}
        </form>
    );
}

export function Formulario() {
    return (
        <div className="flex flex-col lg:gap-10">
            <div className="flex lg:gap-16">
                <FormularioInput placeholder="UF:" name="uf" showOptions custumizacaoClass="lg:w-[20%]" />
                <FormularioInput placeholder="Cidade:" name="cidade" showOptions custumizacaoClass="lg:w-[45.5%]" />
                <FormularioInput placeholder="Cep:" name="cep" custumizacaoClass="lg:w-[32.5%]" />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput placeholder="Bairro:" name="bairro" custumizacaoClass="lg:w-1/3" />
                <FormularioInput placeholder="Rua:" name="rua" custumizacaoClass="lg:w-1/3" />
                <FormularioInput placeholder="Número:" name="número" custumizacaoClass="lg:w-1/3" />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput placeholder="Nome da Propriedade:" name="nome da propriedade" custumizacaoClass="lg:w-full" />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput placeholder="Complemento:" name="nome da propriedade" custumizacaoClass="lg:w-full h-40" />
            </div>
        </div>
    );
}
