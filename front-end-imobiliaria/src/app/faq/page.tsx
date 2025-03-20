import FAQ from "@/components/faq";

export default function FAQPage() {
  const faqData = [
    {
      question: "Como funciona o processo de financiamento?",
      answer:
        "O financiamento exige análise de crédito, aprovação e pagamento parcelado com juros.",
    },
    {
      question: "Qual é o valor de entrada necessário para comprar um imóvel?",
      answer:
        "O tempo pode variar dependendo do financiamento, análise de crédito e burocracia do cartório. Em média, pode levar de 30 a 90 dias.",
    },
    {
      question: "Posso negociar o valor do imóvel? ",
      answer:
        "Sim, a maioria dos vendedores aceita negociação, especialmente para pagamentos à vista.",
    },
    {
        question: "Quanto tempo leva para finalizar a compra de um imóvel?",
        answer:
          "Geralmente de 30 a 90 dias, dependendo do financiamento e burocracia.",
      },
      {
        question: "Quais são as despesas envolvidas na compra de um imóvel?",
        answer:
          "Além do valor do imóvel, há custos como ITBI, escritura, registro em cartório e taxas bancárias, que podem variar de acordo com o financiamento.",
      },
  ];

  return <FAQ title="Perguntas Frequentes" faqs={faqData} />;
}
