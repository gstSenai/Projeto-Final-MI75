export default function PoliticaPrivacidade() {
  return (
    <div className="flex flex-col items-center">

      {/* Abas no topo */}
        <div className="flex border-b border-gray-300 mt-7 ">
          <button className="text-xs md:text-sm px-4 py-2 bg-[#4B151E] text-white rounded-t-lg">
            Política de Privacidade
          </button>
          <button className="text-xs md:text-sm px-4 py-2 bg-[#702632] text-gray-300 opacity-80 rounded-t-lg ">
            Termos de Uso
          </button>
        </div>

      <div className="flex flex-col justify-center max-w-5xl">
        <div className="flex justify-center items-center mt-[-2] bg-[#DFDAD0] px-4">
          <div className="bg-[#702632] text-white p-6 md:p-8 rounded-lg shadow-lg max-w-5xl w-full">
            {/* Título */}
            <h1 className="text-lg md:text-xl font-bold text-white mb-4">
              Política de Privacidade
            </h1>

            {/* Texto da Política */}
            <p className="text-sm text-gray-200 mb-4">
              A sua privacidade é importante para nós. É política do Imobiliária HAV respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Imobiliária HAV, e outros sites que possuímos e operamos.

              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.

              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados

              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei

              O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas deprivacidade.

              Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.

              O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
            </p>

            {/* Seção de Segurança */}
            <h2 className="text-md font-bold mt-6 mb-2">Segurança e Confiança na HAV</h2>
            <p className="text-sm text-gray-200 mb-4">
              Nosso compromisso é garantir que suas informações estejam sempre seguras e protegidas.
            </p>

            {/* Seção sobre cookies */}
            <h2 className="text-md font-bold mt-6 mb-2">O que são cookies?</h2>
            <p className="text-sm text-gray-200 mb-4">
              Cookies são pequenos arquivos de texto armazenados no seu navegador para melhorar sua experiência.
            </p>

            <h2 className="text-md font-bold mt-6 mb-2">Como usamos cookies?</h2>
            <p className="text-sm text-gray-200 mb-4">
              Utilizamos cookies para armazenar preferências do usuário e fornecer análises sobre como o site está sendo usado, para que possamos melhorá-lo continuamente.
            </p>

            {/* Botão de "Ver Mais" */}
          </div>
        </div>
        <div className="flex justify-end mr-10 pb-10">
          <button className="bg-[#5A1B23] text-white px-6 py-2 rounded-b-lg text-sm hover:bg-[#4B151E] transition ">
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
}
