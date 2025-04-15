"use client";
import { useState, useEffect, useRef } from "react";
import { conectarWebSocket, enviarMensagem } from "@/utils/websocket";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import EmojiPicker from 'emoji-picker-react';
import { EmojiClickData } from 'emoji-picker-react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface Corretor {
  id: number;
  nome: string;
  foto: string;
}

interface Mensagem {
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

const corretores: Corretor[] = [
  { id: 1, nome: "João Silva", foto: "/imagensChat/corretorImage.png" },
  { id: 2, nome: "Maria Souza", foto: "/imagensChat/corretorImage.png" },
  { id: 3, nome: "Carlos Pereira", foto: "/imagensChat/corretorImage.png" },
];

const cliente = { id: 5, nome: "Cliente", foto: "/imagensChat/clienteImage.jfif" };

export default function Chat({ params }: { params: { id?: string } }) {
  const router = useRouter();
  const { id } = useParams();
  const [messages, setMessages] = useState<Mensagem[]>([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCorretor, setSelectedCorretor] = useState<Corretor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUserId = id ? parseInt(id as string, 10) : null;
  const isCorretor = currentUserId ? currentUserId <= 3 : false;
  const currentUser = isCorretor 
    ? corretores.find(c => c.id === currentUserId) || cliente
    : cliente;

  // Carregar mensagens do localStorage apenas no cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        } catch (error) {
          console.error('Erro ao carregar mensagens do localStorage:', error);
        }
      }
    }
  }, []);

  // Salvar mensagens no localStorage sempre que mudarem
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Conectar WebSocket apenas no cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      conectarWebSocket((novaMensagem: Mensagem) => {
        setMessages((prevMessages) => [...prevMessages, {
          ...novaMensagem,
          timestamp: new Date(novaMensagem.timestamp)
        }]);
      });
    }
  }, []);

  // Marcar mensagens como lidas quando seleciona um chat
  useEffect(() => {
    if (selectedCorretor && currentUserId) {
      setMessages(prevMessages => 
        prevMessages.map(msg => {
          // Se for corretor, marca mensagens do cliente como lidas
          if (isCorretor && msg.sender === "Cliente" && msg.receiver === currentUser?.nome && !msg.read) {
            return { ...msg, read: true };
          }
          // Se for cliente, marca mensagens do corretor selecionado como lidas
          if (!isCorretor && msg.sender === selectedCorretor.nome && msg.receiver === "Cliente" && !msg.read) {
            return { ...msg, read: true };
          }
          return msg;
        })
      );
    }
  }, [selectedCorretor, isCorretor, currentUser?.nome, currentUserId]);

  const formatarData = (data: Date | string) => {
    // Garante que temos um objeto Date
    const dataMensagem = typeof data === 'string' ? new Date(data) : data;
    
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);

    const dataFormatada = dataMensagem.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    if (dataMensagem.toDateString() === hoje.toDateString()) {
      return 'Hoje';
    } else if (dataMensagem.toDateString() === ontem.toDateString()) {
      return 'Ontem';
    } else {
      return dataFormatada;
    }
  };

  const formatarHora = (data: Date | string) => {
    const dataObj = typeof data === 'string' ? new Date(data) : data;
    const horaBrasil = new Date(dataObj.getTime() - (3 * 60 * 60 * 1000));
    return horaBrasil.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && (isCorretor || selectedCorretor) && currentUser && currentUserId) {
      const novaMensagem: Mensagem = {
        sender: currentUser.nome,
        receiver: isCorretor ? "Cliente" : selectedCorretor?.nome || "Cliente",
        content: message,
        timestamp: new Date(),
        read: false
      };
      enviarMensagem(novaMensagem);
      setMessage("");
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Aqui você pode implementar o upload da imagem
      // Por enquanto, vamos apenas mostrar uma mensagem no console
      console.log("Arquivo selecionado:", file);
    }
  };

  return (
    <>
      <Header />
      <div className="flex h-screen gap-3 px-5 pb-2 pt-10">
        {/* Sidebar: Lista de Usuários */}
        <div className="w-1/4 bg-white bg-opacity-50 p-4 rounded-lg flex flex-col">
          <div className="w-1/2 border-b-2 border-[#702632] mb-3">
            <p className="font-semibold text-xl pb-2">Chat Online</p>
          </div>
          <input
            type="text"
            placeholder={isCorretor ? "Buscar cliente..." : "Buscar corretor..."}
            className="w-full p-2 rounded-lg border border-gray-400 mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="mt-4 flex-1 overflow-y-auto">
            {isCorretor ? (
              // Se for corretor, mostra apenas o cliente filtrado por nome
              search.toLowerCase() === "" || cliente.nome.toLowerCase().includes(search.toLowerCase()) ? (
                <div
                  className="flex items-center text-white bg-[#702632] p-2 mb-3 hover:bg-gray-300 cursor-pointer rounded-lg"
                  onClick={() => setSelectedCorretor(cliente)}
                >
                  <img src={cliente.foto} alt={cliente.nome} className="w-10 h-10 rounded-full mr-2" />
                  <div className="flex flex-col">
                    <span className="font-medium">{cliente.nome}</span>
                    {messages
                      .filter(msg => 
                        (msg.sender === "Cliente" && msg.receiver === currentUser?.nome) || 
                        (msg.sender === currentUser?.nome && msg.receiver === "Cliente")
                      )
                      .slice(-1)[0] && (
                      <span className="text-sm text-gray-200 truncate max-w-[150px]">
                        {messages
                          .filter(msg => 
                            (msg.sender === "Cliente" && msg.receiver === currentUser?.nome) || 
                            (msg.sender === currentUser?.nome && msg.receiver === "Cliente")
                          )
                          .slice(-1)[0].sender === currentUser?.nome 
                            ? "Você: " 
                            : ""}
                        {messages
                          .filter(msg => 
                            (msg.sender === "Cliente" && msg.receiver === currentUser?.nome) || 
                            (msg.sender === currentUser?.nome && msg.receiver === "Cliente")
                          )
                          .slice(-1)[0].content}
                      </span>
                    )}
                  </div>
                </div>
              ) : null
            ) : (
              // Se for cliente, mostra lista de corretores
              corretores
                .filter(c => c.nome.toLowerCase().includes(search.toLowerCase()))
                .map(corretor => {
                  const mensagensCorretor = messages.filter(msg =>
                    (msg.sender === corretor.nome && msg.receiver === "Cliente") ||
                    (msg.sender === "Cliente" && msg.receiver === corretor.nome)
                  );
                  const ultimaMensagem = mensagensCorretor[mensagensCorretor.length - 1];

                  return (
                    <div
                      key={corretor.id}
                      className="flex items-center text-white bg-[#702632] p-2 mb-3 hover:bg-gray-300 cursor-pointer rounded-lg"
                      onClick={() => setSelectedCorretor(corretor)}
                    >
                      <img src={corretor.foto} alt={corretor.nome} className="w-10 h-10 rounded-full mr-2" />
                      <div className="flex flex-col">
                        <span className="font-medium">{corretor.nome}</span>
                        {ultimaMensagem && (
                          <span className="text-sm text-gray-200 truncate max-w-[150px]">
                            {ultimaMensagem.sender === "Cliente" ? "Você: " : ""}{ultimaMensagem.content}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Chat */}
        <div className="w-3/4 flex flex-col bg-[#E3D5C6] rounded-lg">
          {/* Header do Chat */}
          {selectedCorretor && (
            <div className="flex items-center bg-[#702632] text-white p-4 rounded-t-lg shadow-lg">
              <img src={selectedCorretor.foto} alt={selectedCorretor.nome} className="w-10 h-10 rounded-full mr-2" />
              <span className="font-bold">{selectedCorretor.nome}</span>
            </div>
          )}

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto bg-white p-4 rounded-b-lg shadow-lg">
            {selectedCorretor ? (
              <div>
                {Object.entries(
                  messages
                    .filter(msg => {
                      if (isCorretor) {
                        return (msg.sender === currentUser?.nome && msg.receiver === "Cliente") ||
                               (msg.sender === "Cliente" && msg.receiver === currentUser?.nome);
                      } else {
                        return (msg.sender === "Cliente" && msg.receiver === selectedCorretor.nome) ||
                               (msg.sender === selectedCorretor.nome && msg.receiver === "Cliente");
                      }
                    })
                    .reduce((grupos: { [key: string]: Mensagem[] }, msg) => {
                      const data = formatarData(msg.timestamp);
                      if (!grupos[data]) {
                        grupos[data] = [];
                      }
                      grupos[data].push(msg);
                      return grupos;
                    }, {})
                ).map(([data, grupo]) => (
                  <div key={data}>
                    <div className="text-center text-gray-500 text-sm my-2">{data}</div>
                    {grupo.map((msg: Mensagem, index: number) => (
                      <div key={index} className={`flex ${msg.sender === currentUser?.nome ? "justify-end" : "justify-start"}`}>
                        <div className={`p-2 my-1 rounded-lg max-w-[50%] ${msg.sender === currentUser?.nome ? "bg-blue-200" : "bg-gray-200"}`}>
                          <div className="flex flex-col">
                            <div className="text-sm font-semibold mb-1">
                              {msg.sender}
                            </div>
                            <div className="flex items-end">
                              <div>
                                {msg.content}
                              </div>
                              {msg.sender === currentUser?.nome && (
                                <div className="ml-2 text-xs text-gray-500 flex items-center">
                                  <span>{formatarHora(msg.timestamp)}</span>
                                  <span className="ml-1">
                                    {msg.read ? (
                                      <span className="text-blue-500">✓✓</span>
                                    ) : (
                                      <span>✓</span>
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Selecione um corretor para iniciar uma conversa</p>
              </div>
            )}
          </div>

          {/* Input de Mensagem */}
          {selectedCorretor && currentUserId && (
            <div className="flex p-2 bg-white rounded-lg shadow-lg mt-4 flex-col">
              <div className="relative">
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 mb-2 z-10">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 bg-gray-200 rounded-lg"
                >
                  <Image src="/imagensChat/iconEmoji.png" alt="ícone emoji" width={24} height={24} />
                </button>
                <input
                  type="text"
                  placeholder="Digite uma mensagem..."
                  className="flex-1 p-2 border rounded-lg mx-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 bg-gray-200 rounded-lg"
                  title="Enviar imagem"
                >
                  <Image src="/imagensChat/iconDownload.png" alt="ícone download" width={24} height={24} />
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="ml-2 py-2 px-3 bg-[#702632] text-white rounded-lg"
                >
                  <Image src="/arrowChat.png" alt="Enviar mensagem" width={24} height={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}