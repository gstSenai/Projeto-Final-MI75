import { Header } from "@/components/header"
import { ListaDeCadastros } from "@/components/paginaCadastroImovel/formularioCadastroEscrito"
import { Formulario } from "@/components/paginaCadastroImovel/formularioInputCadastroEscrever"
import { CheckBoxComponent } from "@/components/paginaCadastroImovel/checkbox"

export default function CadastroImovel() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#DFDAD0] 2xl:px-20 xl:px-20 lg:px-10 px-10 pt-14">
                <div className="font-inter flex justify-between max-lg:justify-center ">
                    <div className="flex flex-row items-center max-lg:justify-center">
                        <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Cadastrar imóvel</p>
                        <p className="text-3xl font-semibold lg:hidden">Cadastro</p>
                    </div>
                    <div className="flex flex-row items-center max-lg:hidden">
                        <p className="text-[#702632] text-lg xl:text-2xl">Voltar ao menu</p>
                    </div>
                </div>

                <ListaDeCadastros textos={["ID do Imóvel: [Gerado automaticamente]",
                    "Telefone: telefone do Proprietário/Imobiliária",
                    "Dono: Nome do Proprietário/Imobiliária",
                    "Email: Email do Proprietário/Imobiliária"]} />

                <hr className="mt-16 mb-4 w-full h-2 rounded-2xl bg-[#702632] max-lg:h-3 max-lg:mt-10"></hr>

                <div className="font-inter flex justify-between max-lg:justify-center ">
                    <div className="flex flex-row items-center max-lg:justify-center">
                        <p className="text-2xl xl:text-4xl font-semibold my-10 max-lg:hidden">Endereço:</p>
                    </div>
                </div>

                <Formulario />
                <CheckBoxComponent />

            </div>
        </>
    );
}