'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp?: Date;
  hasAction?: boolean;
  options?: ChatOption[];
  isFAQResponse?: boolean;
}

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
  const [inputMessage, setInputMessage] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isAskingEmail, setIsAskingEmail] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Olá! Bem-vindo(a) à nossa imobiliária! Como posso ajudar hoje?',
      timestamp: new Date(),
      options: [
        { text: 'Relatar um problema', action: 'REPORT' },
        { text: 'Falar com corretor', action: 'BROKER' },
        { text: 'Dúvidas Frequentes', action: 'FAQ' },
        { text: 'Falar com atendente', action: 'ATTENDANT' }
      ]
    }
  ]);

  const sendEmail = async (subject: string, message: string, customerEmail: string) => {
    try {
      console.log('Iniciando envio de email...', { subject, message, customerEmail });
      const response = await fetch('/api/sendEmailSendGrid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          message,
          customerEmail,
        }),
      });

      console.log('Resposta recebida:', response.status);
      const data = await response.json();
      console.log('Dados da resposta:', data);

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Erro ao enviar email');
      }

      return data;
    } catch (error: any) {
      console.error('Erro ao enviar email:', error);
      throw new Error(error.message || 'Erro ao enviar email');
    }
  };

  const handleChatWithBroker = () => {
    router.push('/chatOnline');
  };

  const handleFeedback = (wasHelpful: boolean) => {
    if (wasHelpful) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Fico feliz em ter ajudado! Se precisar de mais alguma coisa, é só perguntar.',
        timestamp: new Date(),
        options: [
          { text: 'Voltar para Dúvidas Frequentes', action: 'FAQ' },
          { text: 'Falar com atendente', action: 'ATTENDANT' }
        ]
      }]);
    } else {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Desculpe não ter conseguido ajudar completamente. Vou te conectar com um de nossos atendentes para um suporte mais detalhado.',
        timestamp: new Date(),
        hasAction: true
      }]);
    }
  };

  const handleOptionClick = (action: string) => {
    let newMessage: Message;

    switch (action) {
      case 'REPORT':
        setIsAskingEmail(true);
        newMessage = {
          type: 'bot',
          content: 'Por favor, insira seu email para contato:',
          timestamp: new Date(),
        };
        break;

      case 'BROKER':
        newMessage = {
          type: 'bot',
          content: 'Você pode falar com nossos corretores:\n\n' +
                    '• João Silva: (47) 98765-4321\n' +
                    '• Maria Santos: (47) 98765-4322\n' +
                    '• Pedro Oliveira: (47) 98765-4323\n\n' +
                    'Ou clique no botão abaixo para iniciar um chat online com um corretor disponível:',
          timestamp: new Date(),
          hasAction: true
        };
        break;

      case 'FAQ':
        newMessage = {
          type: 'bot',
          content: 'Selecione sua dúvida:',
          timestamp: new Date(),
          options: FAQ_OPTIONS.map(question => ({
            text: question,
            action: `FAQ_${question}`
          }))
        };
        break;

      case 'ATTENDANT':
        newMessage = {
          type: 'bot',
          content: 'Em breve você será conectado com um de nossos atendentes...',
          timestamp: new Date(),
        };
        break;

      default:
        if (action.startsWith('FAQ_')) {
          const question = action.replace('FAQ_', '');
          newMessage = {
            type: 'bot',
            content: getFAQResponse(question),
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
            type: 'bot',
            content: 'Desculpe, não entendi. Como posso ajudar?',
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    if (isAskingEmail) {
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userMessage)) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: 'Por favor, insira um email válido.',
          timestamp: new Date()
        }]);
        return;
      }
      setCustomerEmail(userMessage);
      setIsAskingEmail(false);
      setMessages(prev => [...prev, { 
        type: 'user', 
        content: userMessage,
        timestamp: new Date()
      }]);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Obrigado por fornecer seu email. Agora, por favor, descreva detalhadamente o problema que você está enfrentando para que nossa equipe possa ajudá-lo da melhor forma possível.',
        timestamp: new Date()
      }]);
      return;
    }

    setMessages(prev => [...prev, { 
      type: 'user', 
      content: userMessage,
      timestamp: new Date()
    }]);

    try {
      if (userMessage.toLowerCase().includes('problema')) {
        setIsAskingEmail(true);
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: 'Para que possamos prestar um atendimento adequado, por favor, forneça seu email para contato:',
          timestamp: new Date()
        }]);
        return;
      }

      // Se já temos o email do cliente e a mensagem não é sobre reportar um problema
      if (customerEmail && !isAskingEmail) {
        try {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'Estamos processando sua solicitação e enviando para nossa equipe de atendimento...',
            timestamp: new Date()
          }]);

          await sendEmail(
            'Nova solicitação de atendimento via chatbot',
            `Prezado(a) atendente,\n\nRecebemos uma nova solicitação de atendimento:\n\nCliente: ${customerEmail}\n\nMensagem:\n${userMessage}\n\nPor favor, entre em contato com o cliente o mais breve possível pelo chatBot!\n\nAtenciosamente,\nSistema de Chatbot`,
            customerEmail
          );

          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'Sua solicitação foi registrada com sucesso em nosso sistema. Um de nossos atendentes entrará em contato com você aqui mesmo pelo chat em breve. Por favor, mantenha esta janela aberta. Agradecemos sua paciência e compreensão.',
            timestamp: new Date()
          }]);
        } catch (emailError: any) {
          console.error('Erro ao enviar email:', emailError);
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: `Infelizmente, ocorreu um erro ao processar sua solicitação: ${emailError.message}. Por favor, tente novamente mais tarde ou entre em contato diretamente com nosso atendimento através do telefone (47) 9999-9999.`,
            timestamp: new Date()
          }]);
        }
      }

      // ... existing code ...
    } catch (error: any) {
      console.error('Erro ao processar mensagem:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: `Desculpe, ocorreu um erro: ${error.message}`,
        timestamp: new Date()
      }]);
    }
  };

  const addMessage = (type: 'user' | 'bot', text: string) => {
    const newMessage: Message = {
      type,
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="fixed bottom-32 right-0 z-50">
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
          <div className="bg-[#F8E8E8] h-72 p-3 rounded-2xl mx-1 overflow-y-auto overflow-x-hidden">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={`${
                    msg.type === 'bot'
                      ? 'bg-white rounded-xl p-2 max-w-[80%] mb-3 shadow-sm'
                      : 'bg-[#702632] text-white rounded-xl p-2 max-w-[80%] mb-3 shadow-sm ml-auto'
                  }`}
                >
                  <p className="text-xs whitespace-pre-line break-words">{msg.content}</p>
                </div>
                {msg.type === 'bot' && msg.hasAction && (
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
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
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