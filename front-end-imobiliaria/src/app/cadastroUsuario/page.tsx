import { Header } from "@/components/header";
import Tabela from "@/components/tabela/index";
import { InputDadosUsuario } from "@/components/paginaCadastroUsuario/inputDadosUsuario"
import { InputProcurarUsuario } from "@/components/paginaCadastroUsuario/inputProcurarUsuario"





export default function CadastroUsuario() {
    return (
        <>
            <Header />

            <div className="min-h-screen bg-[#DFDAD0] 2xl:px-20 xl:px-20 lg:px-10 px-10 pt-14">
                <div className="font-inter justify-between max-lg:justify-center ">
                    <div className="flex flex-col max-lg:justify-center">
                        <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Gerenciamento de Proprietários</p>

                        <hr className="mt-4 mb-20 w-40 h-1 rounded-2xl bg-[#702632] "></hr>

                        <InputProcurarUsuario />
                    </div>
                </div>


                <Tabela isPropertyTable={false} />
                <div className="flex flex-row items-center max-lg:justify-center">
                    <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Dados do usuário</p>
                </div>

                <InputDadosUsuario />


            </div>

        </>

    )
}