'use client';
import { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});

export default function PoliticaPrivacidade() {
  const [showMore, setShowMore] = useState(false);
  const [showContent, setShowContent] = useState<'privacy' | 'terms'>('privacy');

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Header />
      <div className={`flex flex-col items-center ${montserrat.className}`}>
        <div className="flex flex-col justify-center max-w-5xl">
          <h2 className="ml-6 w-[75%] text-[26px] md:text-[25px] mt-11 text-xl  font-bold text-gray-800 mb-10 border-b-2 border-[#702632] pb-2 ">
            Política de Privacidade e Termos de Uso
          </h2>

          <div className="ml-11 md:flex border-b border-gray-300 mt-7">

            <button
              className={`text-xs md:text-sm px-4 py-2 bg-[#702632] text-white rounded-t-lg  transition ${showContent === "privacy" ? "opacity-100" : "opacity-80"}`}
              onClick={() => setShowContent('privacy')}>
              Política de Privacidade
            </button>


            <button
              className={`text-xs md:text-sm px-4 py-2 bg-[#702632] text-white  rounded-t-lg  transition ${showContent === "terms" ? "opacity-100" : "opacity-80"}`}
              onClick={() => setShowContent('terms')}
            >
              Termos de Uso
            </button>
          </div>



          <div className="flex justify-center items-center mt-[-2] bg-[#DFDAD0] px-4">
            <div className="bg-[#702632] text-white p-6 md:p-8 rounded-lg shadow-lg max-w-5xl w-full">

              {showContent === 'privacy' ? (
                <>

                  <h1 className="text-lg md:text-xl font-bold text-white mb-4">
                    Política de Privacidade
                  </h1>

                  {/* Conteúdo inicial da Política */}
                  <p className={`text-sm text-gray-200 mb-4 ${showMore ? '' : 'line-clamp-4'}`}>
                    A sua privacidade é importante para nós. É política da Imobiliária HAV respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Imobiliária HAV, e outros sites que possuímos e operamos.
                  </p>
                  <p className={`text-sm text-gray-200 mb-4 ${showMore ? '' : 'line-clamp-4'}`}>
                    Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazendo-o por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                  </p>
                  <p className={`text-sm text-gray-200 mb-4 ${showMore ? '' : 'line-clamp-4'}`}>
                    Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                  </p>
                  <p className={`text-sm text-gray-200 mb-4 ${showMore ? '' : 'line-clamp-4'}`}>
                    Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                  </p>
                  <p className={`text-sm text-gray-200 mb-4 ${showMore ? '' : 'line-clamp-4'}`}>
                    O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
                  </p>
                  <p className={`text-sm text-gray-200 mb-4 ${showMore ? '' : 'line-clamp-4'}`}>
                    Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
                  </p>
                  <p className={`text-sm text-gray-200 mb-4 ${showMore ? '' : 'line-clamp-4'}`}>
                    O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
                  </p>

                  <h2 className="text-md font-bold mt-6 mb-2">Segurança e Confiança no site Imobiliária HAV</h2>
                  <p className="text-sm text-gray-200 mb-4">
                    O site é confiável e seguro para navegação do usuário conforme informado pela Verificação. A página verifica informações do site para identificar possíveis problemas de segurança. A navegação verificada pela ferramenta segurança do Google mostra que o site é seguro.                  </p>

                  <h2 className="text-md font-bold mt-6 mb-2">Política de Cookies Imobiliária HAV</h2>
                  <h3 className="text-sm font-semibold mb-2">O que são cookies?</h3>
                  <p className="text-sm text-gray-200 mb-4">
                    Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou &apos;quebrar&apos; certos elementos da funcionalidade do site.                  </p>

                  <h3 className="text-sm font-semibold mb-2">Como usamos os cookies?</h3>
                  <p className="text-sm text-gray-200 mb-4">
                    Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados ​​para fornecer um serviço que você usa.                  </p>

                  <h3 className="text-sm font-semibold mb-2">Desativar cookies</h3>
                  <p className="text-sm text-gray-200 mb-4">
                    Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.                  </p>

                  <h3 className="text-sm font-semibold mb-2">Cookies que definimos</h3>

                  <h3 className="text-sm text-gray-200 mb-4 mt-4">- Cookies relacionados à conta</h3>
                  <p className="text-sm text-gray-200 mb-4">
                    Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
                  </p>
                  {/* Exibição do conteúdo adicional quando 'showMore' for true */}

                  {showMore && (
                    <>

                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- Cookies relacionados ao login</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        Utilizamos cookies quando você está logado, para que possamos lembrar dessa ação. Isso evita que você precise fazer login sempre que visitar uma nova página. Esses cookies são normalmente removidos ou limpos quando você efetua logout para garantir que você possa acessar apenas a recursos e áreas restritas ao efetuar login.
                      </p>
                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- Cookies relacionados a boletins por e-mail</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        Este site oferece serviços de assinatura de boletim informativo ou e-mail e os cookies podem ser usados ​​para lembrar se você já está registrado e se deve mostrar determinadas notificações válidas apenas para usuários inscritos / não inscritos.
                      </p>
                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- Pedidos processando cookies relacionados</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        Este site oferece facilidades de comércio eletrônico ou pagamento e alguns cookies são essenciais para garantir que seu pedido seja lembrado entre as páginas, para que possamos processá-lo adequadamente.
                      </p>

                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- Cookies relacionados a pesquisas</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        Este site oferece facilidades de comércio eletrônico ou pagamento e alguns cookies são essenciais para garantir que seu pedido seja lembrado entre as páginas, para que possamos processá-lo adequadamente.
                      </p>

                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- Cookies relacionados a formulários</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        Quando você envia dados por meio de um formulário como os encontrados nas páginas de imóveis ou nos formulários de agendamentos, os cookies podem ser configurados para lembrar os detalhes do usuário para correspondência futura.
                      </p>

                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- Cookies de preferências do site</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        Para proporcionar uma ótima experiência neste site, fornecemos a funcionalidade para definir suas preferências de como esse site é executado quando você o usa. Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página for afetada por suas preferências.</p>

                      <h3 className="text-sm font-semibold mb-2">Cookies de Terceiros</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.
                      </p>
                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- Este site usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis ​​da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas, para que possamos continuar produzindo conteúdo atraente.</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        Para mais informações sobre cookies do Google Analytics, consulte a página oficial do Google Analytics.
                      </p>
                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- As análises de terceiros são usadas para rastrear e medir o uso deste site, para que possamos continuar produzindo conteúdo atrativo. Esses cookies podem rastrear itens como o tempo que você passa no site ou as páginas visitadas, o que nos ajuda a entender como podemos melhorar o site para você.</h3>
                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- Periodicamente, testamos novos recursos e fazemos alterações subtis na maneira como o site se apresenta. Quando ainda estamos testando novos recursos, esses cookies podem ser usados ​​para garantir que você receba uma experiência consistente enquanto estiver no site, enquanto entendemos quais otimizações os nossos usuários mais apreciam.</h3>
                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- À medida que vendemos produtos, é importante entendermos as estatísticas sobre quantos visitantes de nosso site realmente compram e, portanto, esse é o tipo de dados que esses cookies rastrearão. Isso é importante para você, pois significa que podemos fazer previsões de negócios com precisão que nos permitem analizar nossos custos de publicidade e produtos para garantir o melhor preço possível.</h3>
                      -
                      <h3 className="text-sm font-semibold mb-2">Compromisso do Usuário</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        O usuário se compromete a fazer uso adequado dos conteúdos e da informação que a Imobiliária HAV oferece no site e com caráter enunciativo, mas não limitativo
                      </p>

                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</h3>
                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou casas de apostas, jogos de sorte e azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</h3>
                      <h3 className="text-sm text-gray-200 mb-4 mt-4">- C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) da Imobiliária HAV, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</h3>

                      <h3 className="text-sm font-semibold mb-2">Bloquear cookies</h3>
                      <p className="text-sm text-gray-200 mb-4">
                        O usuário pode bloquear e/ou desativar os cookies de qualquer site, inclusive o nosso a qualquer momento. Para realizar esse procedimento, acesse as configurações do seu browser. Consulte abaixo guias de ajuda dos principais navegadores:
                      </p>

                      <h3 className="text-sm text-gray-200 mt-4">- Google Chrome</h3>
                      <h3 className="text-sm text-gray-200 ">- Firefox</h3>
                      <h3 className="text-sm text-gray-200 ">- Microsoft Edge</h3>
                      <h3 className="text-sm text-gray-200 ">- Opera</h3>
                      <h3 className="text-sm text-gray-200 mb-4 ">- Safari </h3>


                      <h2 className="text-md font-bold mt-6 mb-2">Mais informações</h2>
                      <p className="text-sm text-gray-200 mb-4">
                        Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
                      </p>
                      <p className="text-sm text-gray-200 mb-4">
                        Esta política é efetiva a partir de Nov/2024.
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h1 className="text-lg md:text-xl font-bold text-white mb-4">
                    Termos de uso
                  </h1>

                  <h2 className="text-md font-bold mt-6 mb-2">1. Termos</h2>
                  <p className="text-sm text-gray-200 mb-4">
                    Ao acessar ao site Imobiliária HAV, concorda em cumprir estes termos de uso, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
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
                    <li>- Transferir os materiais para outra pessoa ou &quot;espelhar&quot; os materiais em qualquer outro servidor.</li>
                  </ul>
                  <p className="text-sm text-gray-200 mb-4">
                    Esta licença será automaticamente rescindida caso você viole qualquer uma dessas restrições e poderá ser cancelada pela Imobiliária HAV a qualquer momento. Ao encerrar a visualização dos materiais ou após o término da licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.
                  </p>


                  <h2 className="text-md font-bold mt-6 mb-2">
                    3. Isenção de responsabilidade
                  </h2>
                  <ul className="text-sm text-gray-200 mb-4 pl-5">
                    <li>- Os materiais no site da Imobiliária HAV são fornecidos &apos;como estão&apos;. A Imobiliária HAV não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</li>
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
                </>
              )}
            </div>
          </div>

          {showContent == 'privacy' ? (
            <>
              {/* Botão para alternar entre mostrar mais ou menos */}
              <div className="flex justify-end mr-12 md:flex items-end pb-10">
                <button
                  className="bg-[#702632] text-white px-6 py-2 rounded-b-lg text-sm hover:bg-[#4B151E] transition"
                  onClick={toggleShowMore}
                >
                  {showMore ? 'Ver menos' : 'Ver mais'}
                </button>
              </div>
            </>
          ) :
            (<><div className='pb-10'>
            </div></>)}
        </div>

      </div>
      <Footer />
    </>
  );
}
