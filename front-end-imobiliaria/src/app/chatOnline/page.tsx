import AtualizarComponents from '@/components/atualizarComponents';
import { Montserrat } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '800'],
    display: 'swap',
});

import Image from 'next/image';

export default function Chat() {
    return (
      <div className="flex h-screen bg-[#E3D5C6] p-4">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Chat Online</h2>
          <input type="text" placeholder="Busque corretor" className="w-full p-2 border rounded-lg mb-4" />
          <div>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center p-3 bg-[#7A1E1E] text-white rounded-lg mb-2">
                <img src="/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-semibold">Gustavo Costa</p>
                  <p className="text-sm">Online</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Chat Area */}
        <div className="flex-1 bg-white p-4 ml-4 rounded-lg shadow-lg flex flex-col">
          <div className="flex items-center border-b pb-2 mb-4">
            <img src="/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
            <p className="font-semibold">Gustavo Costa</p>
          </div>
          <div className="flex-1 bg-[#C6A99E] p-4 rounded-lg space-y-3 overflow-y-auto">
            <div className="bg-white p-2 rounded-lg w-1/2">Olá!</div>
            <div className="bg-white p-2 rounded-lg w-1/3 self-end">Oi!</div>
            <div className="bg-white p-2 rounded-lg w-1/3 self-end">Tudo bem?</div>
          </div>
          <div className="flex mt-4">
            <input type="text" placeholder="Digite uma mensagem..." className="flex-1 p-2 border rounded-lg" />
            <button className="ml-2 p-2 bg-[#702632] opac text-white rounded-lg">➤</button>
          </div>
        </div>
      </div>
    );
  }
  