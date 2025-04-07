'use client';

import { useState } from 'react';
import Image from 'next/image';

type Message = {
  text: string;
  isBot: boolean;
  timestamp: Date;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Olá! Bem-vindo(a) à nossa imobiliária! Como posso ajudar hoje?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('preço') || lowerMessage.includes('valor')) {
      return 'Para informações sobre preços, por favor, especifique o tipo de imóvel e a região de seu interesse.';
    }
    
    if (lowerMessage.includes('aluguel') || lowerMessage.includes('alugar')) {
      return 'Temos várias opções para aluguel! Você pode conferir nosso catálogo completo na seção "Imóveis" ou me dizer qual tipo de imóvel você procura.';
    }
    
    if (lowerMessage.includes('comprar') || lowerMessage.includes('compra')) {
      return 'Ótimo! Para ajudar na sua busca, poderia me dizer qual tipo de imóvel você procura e em qual região?';
    }
    
    if (lowerMessage.includes('contato') || lowerMessage.includes('falar') || lowerMessage.includes('corretor')) {
      return 'Você pode falar com um de nossos corretores pelo telefone (XX) XXXX-XXXX ou agendar uma visita pelo nosso site.';
    }
    
    if (lowerMessage.includes('localização') || lowerMessage.includes('endereço')) {
      return 'Nossa imobiliária está localizada no centro da cidade. Você pode nos visitar ou agendar um atendimento online!';
    }

    return 'Desculpe, não entendi completamente. Poderia reformular sua pergunta? Ou, se preferir, pode falar diretamente com um de nossos corretores.';
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Adiciona a mensagem do usuário
      const userMessage: Message = {
        text: message.trim(),
        isBot: false,
        timestamp: new Date(),
      };
      
      // Simula a resposta do bot
      const botMessage: Message = {
        text: getBotResponse(message),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage, botMessage]);
      setMessage('');
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
              <div
                key={index}
                className={`${
                  msg.isBot
                    ? 'bg-white rounded-xl p-2 max-w-[80%] mb-3 shadow-sm'
                    : 'bg-[#702632] text-white rounded-xl p-2 max-w-[80%] mb-3 shadow-sm ml-auto'
                }`}
              >
                <p className="text-xs">{msg.text}</p>
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