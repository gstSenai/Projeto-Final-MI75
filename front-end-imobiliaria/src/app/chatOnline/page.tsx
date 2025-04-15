"use client";
import { useState, useRef } from "react";
import { Header } from "@/components/header";
import EmojiPicker from 'emoji-picker-react';
import { EmojiClickData } from 'emoji-picker-react';
import Image from 'next/image';

export default function Chat() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
          <div className="mt-4 flex-1 overflow-y-auto flex items-center justify-center">
            <p className="text-gray-500 text-center">Faça login para ver os corretores disponíveis</p>
          </div>
        </div>

        {/* Chat */}
        <div className="w-3/4 flex flex-col bg-[#E3D5C6] rounded-lg">
          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto bg-white p-4 rounded-b-lg shadow-lg">
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Faça login para iniciar uma conversa</p>
            </div>
          </div>

          {/* Input de Mensagem */}
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
                disabled
              >
                <Image src="/imagensChat/iconEmoji.png" alt="ícone emoji" width={24} height={24} />
              </button>
              <input
                type="text"
                placeholder="Faça login para enviar mensagens"
                className="flex-1 p-2 border rounded-lg mx-3"
                disabled
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
                disabled
              >
                <Image src="/imagensChat/iconDownload.png" alt="ícone download" width={24} height={24} />
              </button>
              <button 
                className="ml-2 py-2 px-3 bg-[#702632] text-white rounded-lg"
                disabled
              >
                <Image src="/arrowChat.png" alt="Enviar mensagem" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
