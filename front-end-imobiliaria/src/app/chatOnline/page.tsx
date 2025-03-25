"use client"
import { useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '800'],
  display: 'swap',
});

export default function Chat() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="font-montserrat flex h-screen bg-[#E3D5C6] p-4">
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="ml-1 text-xl font-bold mb-4 text-gray-800 text-left border-b-2 border-[#702632] w-32">
          Chat Online
        </h2>
        <input type="text" placeholder="Busque corretor" className="w-full p-2 border rounded-lg mb-4" />
        <div>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center p-3 bg-[#7A1E1E] text-white rounded-lg mb-2">
              <Image src="/fotoChat.png" alt="Avatar" width={40} height={40} className="rounded-full mr-3" />
              <div>
                <p className="font-semibold">Gustavo Costa</p>
                <p className="text-sm">Online</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-white p-4 ml-4 rounded-lg shadow-lg flex flex-col">
        <div className="flex items-center py-2 pl-6 rounded-t-lg bg-[#702632] text-white gap-2">
          <Image src="/fotoChat.png" alt="Avatar" width={40} height={40} className="rounded-full mr-3" />
          <p className="font-semibold">Gustavo Costa</p>
        </div>
        <div className="flex-1 bg-[#C6A99E] bg-opacity-50 p-4 rounded-b-lg space-y-3 overflow-y-auto">
          <div className="bg-white p-2 rounded-lg w-1/2">Olá!</div>
          <div className="bg-white p-2 rounded-lg w-1/3 self-end">Oi!</div>
          <div className="bg-white p-2 rounded-lg w-1/3 self-end">Tudo bem?</div>
        </div>
        
        <div className={`flex mt-3 flex-col ${selectedFile ? "pb-4" : ""}`}>
          {selectedFile && (
            <div className="bg-gray-200 text-gray-800 p-2 rounded-lg text-sm mb-2 flex items-center justify-between">
              <span>{selectedFile.name}</span>
              <button onClick={() => setSelectedFile(null)} className="ml-2 text-red-500">✖</button>
            </div>
          )}

          <div className="relative">
            {showEmojiPicker && (
              <div className="absolute bottom-4 left-0 z-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 bg-gray-200 rounded-lg">
              <Image src='/iconEmoji.png' alt='ícone emoji' width={24} height={24} />
            </button>
            <input
              type="text"
              placeholder="Digite uma mensagem..."
              className={`flex-1 p-2 border rounded-lg mx-3 transition-all duration-300 ${selectedFile ? "pt-2" : ""}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileSelect}
            />
            <button className="p-2 bg-gray-200 rounded-lg" onClick={handleClick}>
              <Image src='/iconDownload.png' alt='ícone download' width={24} height={24} />
            </button>
            <button className="ml-2 py-2 px-3 bg-[#702632] text-white rounded-lg">
              <Image src="/arrowChat.png" alt="Enviar mensagem" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}