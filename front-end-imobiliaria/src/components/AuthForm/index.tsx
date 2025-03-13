"use client";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { z } from "zod";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

interface AuthFormProps {
  title: string;
  buttonText: string;
  loginOuCadastro: string;
  isCadastro?: boolean;
}

const schema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmarSenha: z.string(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não conferem",
  path: ["confirmarSenha"],
});

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, loginOuCadastro, isCadastro = false }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRedirect = () => {
    router.push(isCadastro ? "/login" : "/cadastro");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataToValidate = isCadastro ? formData : { email: formData.email, senha: formData.senha };
      schema.parse(dataToValidate);
      alert("Formulário enviado com sucesso!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="font-montserrat h-screen bg-[url('/fundoLogin.png')] bg-[center_left_-210px]">
      <div className="absolute inset-0 flex items-center justify-center bg-[url('/logos/simboloHAVLogin.png')] max-md:bg-[url('/')] bg-no-repeat bg-[right_-300px_top_-100px]">
        <div className="shadow-md rounded-lg flex flex-col md:flex-row w-4/5 max-w-5xl bg-[#EBE8DE]">
          <div className="w-full md:w-[40%] flex flex-col py-16 items-center justify-center bg-gradient-to-b from-[rgba(223,218,208,1)] to-[rgba(115,115,115,0.3)] rounded-l-lg">
            <h1 className="text-[34px] font-bold text-[#280202] tracking-[2px]">BEM VINDO</h1>
            <h2 className="text-3xl font-semibold text-[#280202] tracking-[6px]">HAV</h2>
            <img src="/logos/logoLogin.png" alt="Logo" className="w-36 my-4 pr-2" />
            <button className="bg-white border border-gray-300 text-[#702632] text-[14px] font-bold py-2.5 px-2 w-[240px] rounded-xl flex justify-center items-center mt-4">
              <img src="/loginIcons/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
              Continue com o Google
            </button>
            <a href="#" onClick={handleRedirect} className="text-[12px] mt-2 text-black font-medium underline hover:text-[#702632]">{loginOuCadastro}</a>
          </div>

          <div className="w-full md:w-[65%] flex flex-col justify-center items-center p-6">
            <h2 className="text-4xl font-bold text-[#702632] tracking-[6px] mb-6">{title}</h2>
            <form onSubmit={handleSubmit}>
              {isCadastro && (
                <div className="mb-2">
                  <label className="text-gray-700">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="block px-4 w-[320px] py-2 border rounded-lg"
                    placeholder="Digite seu nome"
                  />
                  {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
                </div>
              )}
              <div className="mb-2">
                <label className="text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block px-4 w-[320px] py-2 border rounded-lg"
                  placeholder="Digite seu email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="mb-2">
                <label className="text-gray-700">Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="block px-4 w-[320px] py-2 border rounded-lg"
                  placeholder="Digite sua senha"
                />
                {errors.senha && <p className="text-red-500 text-sm">{errors.senha}</p>}
              </div>

              {isCadastro && (
                <div className="mb-2">
                  <label className="text-gray-700">Confirme sua senha</label>
                  <input
                    type="password"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    className="block px-4 w-[320px] py-2 border rounded-lg"
                    placeholder="Confirme sua senha"
                  />
                  {errors.confirmarSenha && <p className="text-red-500 text-sm">{errors.confirmarSenha}</p>}
                </div>
              )}

              <div className="flex justify-center mt-4">
                <button className="md:w-[45%] font-bold bg-[#FFFBFB] text-[#702632] py-2 rounded-lg" type="submit">
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;