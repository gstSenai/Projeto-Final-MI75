import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LoadingWrapper } from '@/components/loading/loadingServer';
import { FormularioInput } from "@/components/paginaCadastroUsuario/adicionandoUsuario/formulario/formularioInput"
import { useForm } from 'react-hook-form'


interface FormValues {
    "imovel.nome_propriedade": string;
    "imovel.venda_valor": number;
    "imovel.numero_quartos": number;
    "imovel.numero_banheiros": number;
}


export default function paginaHistoricoUsuario() {
    const { register, watch, reset } = useForm<FormValues>({
        defaultValues: {
            "imovel.nome_propriedade": "",
            "imovel.venda_valor": 0,
            "imovel.numero_quartos": 0,
            "imovel.numero_banheiros": 0,
        }
    });


    return (
        <>
            <LoadingWrapper>
                <header>
                    <Header />
                </header>
                <div className='pt-10 px-6 max-lg:px-6 lg:px-20 xl:px-16'>
                    <section>
                        <div>
                            <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Histórico de Agendamentos</h1>
                            <div className="border-t-2 border-[#702632] w-[130px] mt-1"></div>
                        </div>
                        <div>
                            <FormularioInput
                                placeholder="Tipo de transação:"
                                name={"imovel.tipo_transacao"}
                                interName=""
                                register={register}
                                required
                                customizacaoClass="w-full"
                                options={["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]}
                            />
                        </div>
                    </section>
                </div>
                <footer>
                    <Footer />
                </footer>
            </LoadingWrapper>
        </>
    );
}