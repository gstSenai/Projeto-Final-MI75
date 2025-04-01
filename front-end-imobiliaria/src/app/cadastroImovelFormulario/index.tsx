import { EnderecoSection } from "../formulario/endereco-section"
import { EnderecoSection } from "@/components/"
import { DadosImovelSection } from "./dados-imovel-section"

export default function CadastroImovel() {
    return (
        <>
            <EnderecoSection register={register} errors={errors} setValue={setValue} />

            <DadosImovelSection
                register={register}
                errors={errors}
                onImagesChange={handleImagesChange}
            />

            <div className="flex items-center gap-16 mt-10 mb-20">
                <div className="flex max-sm:gap-12 max-lg:gap-36 gap-[40rem] w-full">
                    <Botao className="max-lg:text-base bg-vermelho h-10" onClick={() => console.log()} texto="Cancelar" />
                    <Botao className="max-lg:text-base bg-vermelho h-10" onClick={handleSubmit(onSubmitImovel)} texto="Salvar cadastro" />
                </div>
            </div>
        </>
    );
}