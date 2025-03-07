import React from "react";
import { Montserrat } from 'next/font/google';

// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
});

interface AuthFormProps {
  title: string;
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText }) => {
  return (
    <div className="font-montserrat flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row w-4/5 max-w-4xl">
        {/* Lado Esquerdo */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-gray-200 rounded-lg">
          <h1 className="text-[34px] font-bold text-[#280202] tracking-[2px]">BEM VINDO</h1>
          <h2 className="text-3xl font-semibold text-[#280202] tracking-[6px]">HAV</h2>
          <img src="/logos/logoLogin.png" alt="Logo" className="w-20 my-4" />
          <button className="bg-white border border-gray-300 text-[#702632] text-[12px] font-bold py-2 px-4 rounded-lg flex items-center mt-4">
            <img src="/loginIcons/google-icon.png" alt="Google" className="w-5 h-5 mr-2 " />
            Continue com o Google
          </button>
        </div>

        {/* Lado Direito */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Senha</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha"
              />
            </div>

            <div className="flex justify-between text-sm mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Lembrar-me
              </label>
              <a href="#" className="text-blue-500">Esqueceu a senha?</a>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
