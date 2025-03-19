import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export default function TermosUso() {
    return (
            <div className="flex flex-col font-montserrat items-center mb-12">
                <div className="flex flex-col justify-center max-w-5xl">
                    <h2 className="ml-6 w-[75%] text-[26px] md:text-[25px] mt-11 text-xl font-bold text-gray-800 mb-10 border-b-2 border-[#702632] pb-2 w-1/2">
                        Política de Privacidade e Termos de Uso
                    </h2>
                    <div className="ml-11 md:flex border-b border-gray-300 mt-7">
                        <a href='/PoliticaPrivacidade' className="text-xs md:text-sm px-4 py-2 bg-[#702632] text-white rounded-t-lg opacity-80 hover:bg-[#4B151E] transition">
                            Política de Privacidade
                        </a>
                        <button className="text-xs md:text-sm px-4 py-2 bg-[#702632] text-gray-300  rounded-t-lg  hover:bg-[#4B151E] transition ">
                            Termos de Uso
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-[-2] bg-[#DFDAD0] px-4">
                        <div className="bg-[#702632] text-white p-6 md:p-8 rounded-lg shadow-lg max-w-5xl w-full">

                            <h1 className="text-lg md:text-xl font-bold text-white mb-4">
                                Termos de uso
                            </h1>

                            <h2 className="text-md font-bold mt-6 mb-2">1. Termos</h2>
                            <p className="text-sm text-gray-200 mb-4">
                                Ao acessar ao site Imobiliária HAV, concorda em cumprir estes termos de uso, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
                            </p>

                            <h2 className="text-md font-bold mt-6 mb-2">2. Uso de Licença</h2>
                            <p className="text-sm text-gray-200 mb-4">
                                É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site da Imobiliária HAV, exclusivamente para visualização transitória pessoal e não comercial. Esta é uma concessão de licença, e não uma transferência de título. Sob esta licença, você não pode:
                            </p>
                            <ul className="text-sm text-gray-200 mb-4 pl-5">
                                <li>- Modificar ou copiar os materiais;</li>
                                <li>- Utilizar os materiais para qualquer finalidade comercial ou para exibição pública (seja comercial ou não comercial);</li>
                                <li>- Tentar descompilar ou realizar engenharia reversa de qualquer software contido no site da Imobiliária HAV;</li>
                                <li>- Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais;</li>
                                <li>- Transferir os materiais para outra pessoa ou "espelhar" os materiais em qualquer outro servidor.</li>
                            </ul>
                            <p className="text-sm text-gray-200 mb-4">
                                Esta licença será automaticamente rescindida caso você viole qualquer uma dessas restrições e poderá ser cancelada pela Imobiliária HAV a qualquer momento. Ao encerrar a visualização dos materiais ou após o término da licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.
                            </p>


                            <h2 className="text-md font-bold mt-6 mb-2">
                                3. Isenção de responsabilidade
                            </h2>
                            <ul className="text-sm text-gray-200 mb-4 pl-5">
                                <li>- Os materiais no site da Imobiliária HAV são fornecidos 'como estão'. A Imobiliária HAV não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</li>
                            </ul>
                            <ul className="text-sm text-gray-200 mb-4 pl-5">
                                <li>- Além disso, a Imobiliária HAV não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionada a esses materiais ou em sites vinculados a este site.</li>
                            </ul>


                            <h2 className="text-md font-bold mt-6 mb-2">4. Limitações</h2>
                            <p className="text-sm text-gray-200 mb-4">
                                Em nenhum caso a Imobiliária HAV ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Imobiliária HAV, mesmo que Imobiliária HAV ou um representante autorizado da Imobiliária HAV tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.
                            </p>

                            <h2 className="text-md font-bold mt-6 mb-2">5. Precisão dos materiais</h2>
                            <p className="text-sm text-gray-200 mb-4">
                                Os materiais exibidos no site da Imobiliária HAV podem incluir erros técnicos, tipográficos ou fotográficos. A Imobiliária HAV não garante que qualquer material em seu site seja preciso, completo ou atual. A Imobiliária HAV pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Imobiliária HAV não se compromete a atualizar os materiais.                            </p>

                            <p className="text-sm text-gray-200 mb-4 font-bold">
                                Modificações
                            </p>
                            <p className="text-sm text-gray-200 mb-4">
                                A Imobiliária HAV pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.                            </p>
                            <p className="text-sm text-gray-200 mb-4 font-bold">
                                Lei aplicável
                            </p>
                            <p className="text-sm text-gray-200 mb-4">
                                Estes termos e condições são regidos e interpretados de acordo com as leis da Imobiliária HAV e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    );
}
