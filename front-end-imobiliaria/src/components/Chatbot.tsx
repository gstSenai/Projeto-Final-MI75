'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Message = {
  text: string;
  isBot: boolean;
  timestamp: Date;
  hasAction?: boolean;
  options?: ChatOption[];
  isFAQResponse?: boolean;
};

type ChatOption = {
  text: string;
  action: string;
};

const FAQ_OPTIONS = [
  'Como faço para agendar uma visita?',
  'Quais documentos preciso para alugar?',
  'Como funciona o processo de compra?',
  'Qual o prazo de resposta para propostas?',
  'Como é feita a avaliação do imóvel?',
  'Vocês trabalham com financiamento?'
];

const Chatbot = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Olá! Bem-vindo(a) à nossa imobiliária! Como posso ajudar hoje?',
      isBot: true,
      timestamp: new Date(),
      options: [
        { text: 'Relatar um problema', action: 'REPORT' },
        { text: 'Falar com corretor', action: 'BROKER' },
        { text: 'Dúvidas Frequentes', action: 'FAQ' },
        { text: 'Falar com atendente', action: 'ATTENDANT' }
      ]
    }
  ]);

  const handleChatWithBroker = () => {
    router.push('/chatOnline');
  };

  const handleFeedback = (wasHelpful: boolean) => {
    if (wasHelpful) {
      setMessages(prev => [...prev, {
        text: 'Fico feliz em ter ajudado! Se precisar de mais alguma coisa, é só perguntar.',
        isBot: true,
        timestamp: new Date(),
        options: [
          { text: 'Voltar para Dúvidas Frequentes', action: 'FAQ' },
          { text: 'Falar com atendente', action: 'ATTENDANT' }
        ]
      }]);
    } else {
      setMessages(prev => [...prev, {
        text: 'Desculpe não ter conseguido ajudar completamente. Vou te conectar com um de nossos atendentes para um suporte mais detalhado.',
        isBot: true,
        timestamp: new Date(),
        hasAction: true
      }]);
    }
  };

  const handleOptionClick = (action: string) => {
    let newMessage: Message;

    switch (action) {
      case 'REPORT':
        newMessage = {
          text: 'Por favor, descreva o problema que você está enfrentando. Sua mensagem será enviada para nossa equipe de atendimento e corretores.',
          isBot: true,
          timestamp: new Date(),
        };
        break;

      case 'BROKER':
        newMessage = {
          text: 'Você pode falar com nossos corretores:\n\n' +
                '• João Silva: (47) 98765-4321\n' +
                '• Maria Santos: (47) 98765-4322\n' +
                '• Pedro Oliveira: (47) 98765-4323\n\n' +
                'Ou clique no botão abaixo para iniciar um chat online com um corretor disponível:',
          isBot: true,
          timestamp: new Date(),
          hasAction: true
        };
        break;

      case 'FAQ':
        newMessage = {
          text: 'Selecione sua dúvida:',
          isBot: true,
          timestamp: new Date(),
          options: FAQ_OPTIONS.map(question => ({
            text: question,
            action: `FAQ_${question}`
          }))
        };
        break;

      case 'ATTENDANT':
        newMessage = {
          text: 'Em breve você será conectado com um de nossos atendentes...',
          isBot: true,
          timestamp: new Date(),
        };
        break;

      default:
        if (action.startsWith('FAQ_')) {
          const question = action.replace('FAQ_', '');
          newMessage = {
            text: getFAQResponse(question),
            isBot: true,
            timestamp: new Date(),
            isFAQResponse: true,
            options: [
              { text: 'Isso ajudou!', action: 'HELPFUL' },
              { text: 'Ainda tenho dúvidas', action: 'NOT_HELPFUL' }
            ]
          };
        } else if (action === 'HELPFUL') {
          handleFeedback(true);
          return;
        } else if (action === 'NOT_HELPFUL') {
          handleFeedback(false);
          return;
        } else {
          newMessage = {
            text: 'Desculpe, não entendi. Como posso ajudar?',
            isBot: true,
            timestamp: new Date(),
          };
        }
    }

    setMessages(prev => [...prev, newMessage]);
  };

  const getFAQResponse = (question: string): string => {
    switch (question) {
      case 'Como faço para agendar uma visita?':
        return 'Para agendar uma visita, você pode escolher o imóvel desejado em nosso site e clicar em "Agendar Visita" ou entrar em contato com um de nossos corretores.';
      case 'Quais documentos preciso para alugar?':
        return 'Para alugar, você precisará de:\n- RG e CPF\n- Comprovante de renda (3x o valor do aluguel)\n- Comprovante de residência\n- Fiador ou seguro fiança';
      case 'Como funciona o processo de compra?':
        return 'O processo de compra envolve:\n1. Escolha do imóvel\n2. Proposta\n3. Análise de documentação\n4. Aprovação\n5. Assinatura do contrato\n6. Registro em cartório';
      case 'Qual o prazo de resposta para propostas?':
        return 'Normalmente respondemos as propostas em até 48 horas úteis.';
      case 'Como é feita a avaliação do imóvel?':
        return 'A avaliação é feita por nossos profissionais considerando localização, estado do imóvel, mercado atual e características específicas.';
      case 'Vocês trabalham com financiamento?':
        return 'Sim, trabalhamos com diversos bancos e modalidades de financiamento. Podemos te auxiliar a encontrar a melhor opção para seu caso.';
      default:
        return 'Desculpe, não encontrei uma resposta para esta pergunta. Por favor, fale com um de nossos atendentes.';
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage: Message = {
        text: message.trim(),
        isBot: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');

      // Se for um relato de problema, envia uma confirmação
      if (messages[messages.length - 1]?.text.includes('descreva o problema')) {
        const confirmationMessage: Message = {
          text: 'Obrigado por relatar o problema. Nossa equipe foi notificada e entrará em contato em breve.',
          isBot: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, confirmationMessage]);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-[#702632] rounded-2xl shadow-lg w-64">
          {/* Header */}
          <div className="flex justify-between items-center p-3 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">ChatBot</h3>
              <Image
                src="/iconChatBot/chatBot.png"
                alt="Bot"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Chat Area */}
          <div className="bg-[#F8E8E8] h-72 p-3 rounded-2xl overflow-y-auto mx-1">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={`${
                    msg.isBot
                      ? 'bg-white rounded-xl p-2 max-w-[80%] mb-3 shadow-sm'
                      : 'bg-[#702632] text-white rounded-xl p-2 max-w-[80%] mb-3 shadow-sm ml-auto'
                  }`}
                >
                  <p className="text-xs whitespace-pre-line">{msg.text}</p>
                </div>
                {msg.isBot && msg.hasAction && (
                  <button
                    onClick={handleChatWithBroker}
                    className="bg-[#8A2E3C] text-white text-xs py-2 px-4 rounded-xl hover:bg-[#702632] transition-colors mb-3"
                  >
                    Falar com Corretor
                  </button>
                )}
                {msg.options && (
                  <div className="flex flex-col gap-2 mb-3">
                    {msg.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option.action)}
                        className={`${
                          msg.isFAQResponse
                            ? 'bg-[#8A2E3C] text-white hover:bg-[#702632]'
                            : 'bg-white text-[#702632] hover:bg-gray-100'
                        } text-xs py-2 px-4 rounded-xl transition-colors text-left`}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#702632] rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digitar..."
                className="flex-1 px-3 py-1.5 rounded-xl text-xs focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-white p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Image
                  src="/iconChatBot/enviar.png"
                  alt="Enviar"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                  priority
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#702632] hover:bg-[#8A2E3C] text-white rounded-xl p-2.5 shadow-lg transition-all duration-300 flex items-center justify-center w-12 h-12"
        >
          <Image
            src="/iconChatBot/chatBot.png"
            alt="Chat"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </button>
      )}
    </div>
  );
};

export default Chatbot; 