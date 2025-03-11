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
      <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row w-4/5 max-w-5xl bg-[#EBE8DE]">
        {/* Lado Esquerdo */}
        <div className="w-full md:w-[35%] flex flex-col py-24 items-center justify-center bg-gradient-to-b from-[rgba(223,218,208,1)] to-[rgba(115,115,115,0.3)]">
          <h1 className="text-[34px] font-bold text-[#280202] tracking-[2px]">BEM VINDO</h1>
          <h2 className="text-3xl font-semibold text-[#280202] tracking-[6px]">HAV</h2>
          <img src="/logos/logoLogin.png" alt="Logo" className="w-32 my-4" />
          <button className="bg-white border border-gray-300 text-[#702632] text-[12px] font-bold py-2 px-4 rounded-lg flex items-center mt-4">
            <img src="/loginIcons/google-icon.png" alt="Google" className="w-5 h-5 mr-2 " />
            Continue com o Google
          </button>
          <p className="underline text-black text-[10px]">Não possui uma conta? Cadastre-se</p>
        </div>

        {/* Lado Direito */}
        <div className="w-full md:w-[65%] flex flex-col justify-center items-center p-6">
          <h2 className="text-4xl font-bold text-[#702632] tracking-[6px] mb-4">{title}</h2>
          <form>
            <div className="mb-4">
              <label className=" text-gray-700 ">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-black border-opacity-30"
                placeholder="Digite seu email"
              />
            </div>

            <div className="mb-4">
              <label className=" text-gray-700">Senha</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-black border-opacity-30"
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

            <button className="w-[45%] font-bold bg-[#FFFBFB] text-[#702632] py-2 rounded-lg">
              {buttonText}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
