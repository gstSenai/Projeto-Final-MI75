"use client";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
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
  nomeUsuario: z.string()
    .min(1, "O nome de usuário é obrigatório.")
    .min(5, "O nome deve ter pelo menos 5 caracteres.")
    .regex(/^[a-zA-Z0-9_.]+$/, "O nome só pode conter letras, números, _ e .")
    .max(15, "O nome deve ter no máximo 15 caracteres.")
    .refine((nome) => !nome.includes(" "), {
      message: "O nome não pode conter espaços.",
    })
    .refine((nome) => /^[a-zA-Z0-9]/.test(nome), {
      message: "O nome não pode começar com um caractere especial.",
    })
    .refine((nome) => /[a-zA-Z0-9]$/.test(nome), {
      message: "O nome não pode terminar com um caractere especial.",
    }),
  email: z.string()
    .min(1, "O e-mail é obrigatório.")
    .email("E-mail inválido."),
  senha: z.string()
    .min(1, "A senha é obrigatória.")
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .refine((senha) => /[A-Z]/.test(senha), {
      message: "A senha deve conter pelo menos uma letra maiúscula.",
    })
    .refine((senha) => /[a-z]/.test(senha), {
      message: "A senha deve conter pelo menos uma letra minúscula.",
    })
    .refine((senha) => /\d/.test(senha), {
      message: "A senha deve conter pelo menos um número.",
    })
    .refine((senha) => /[!@#$%^&*(),.?":{}|<>]/.test(senha), {
      message: "A senha deve conter pelo menos um caractere especial.",
    })
    .refine((senha) => !/^(1234|senha|abcd)$/.test(senha), {
      message: "A senha não pode conter sequências óbvias.",
    }),
  confirmarSenha: z.string()
    .min(1, "Confirme sua senha."),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem.",
  path: ["confirmarSenha"],
});

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, loginOuCadastro, isCadastro = false }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [formData, setFormData] = useState({
    nomeUsuario: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRedirect = () => {
    router.push(isCadastro ? "/login" : "/cadastro");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
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
    <div className={`${montserrat.className} h-screen bg-[url('/fundoLogin.png')] bg-[center_left_-210px]`}>
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
                  <label className="text-gray-700">Nome de Usuário</label>
                  <input
                    type="text"
                    name="nomeUsuario"
                    value={formData.nomeUsuario}
                    onChange={handleChange}
                    className="block px-4 w-[320px] py-2 border rounded-lg"
                    placeholder="Digite um nome de usuário"
                  />
                  {errors.nomeUsuario && <p className="max-w-xs break-words text-[#CF2020] opacity-80 text-sm">{errors.nomeUsuario}</p>}
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
                {errors.email && <p className="max-w-xs break-words text-[#CF2020] opacity-80 text-sm">{errors.email}</p>}
              </div>

              {isCadastro && (
                <>
                  {!errors.email && (
                    <>
                      <div className="mb-2 relative">
                        <label className="text-gray-700">Senha</label>
                        <div className="flex flex-col items-center ">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            className="block px-4 py-2 w-[320px] rounded-lg focus:ring-2 focus:ring-blue-500 border-black border-opacity-30"
                            placeholder="Digite sua senha"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-11 right-4 flex items-center"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        {errors.senha && <p className="w-[300px] text-[#CF2020] opacity-80 text-sm">{errors.senha}</p>}
                      </div>
                    </>
                  )}
                </>
              )}

              {isCadastro && (
                <>
                  {errors.email && (
                    <>
                      <div className="mb-2 relative">
                        <label className="text-gray-700">Senha</label>
                        <div className="flex flex-col items-center ">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            className="block px-4 py-2 w-[320px] rounded-lg focus:ring-2 focus:ring-blue-500 border-black border-opacity-30"
                            placeholder="Digite sua senha"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-11 right-4 pb-4 flex items-center"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        {errors.senha && <p className="w-[300px] text-[#CF2020] opacity-80 text-sm">{errors.senha}</p>}
                      </div>
                    </>
                  )}
                </>
              )}

              {!isCadastro && (
                <>
                  <div className="mb-2 relative">
                    <label className="text-gray-700">Senha</label>
                    <div className="flex flex-col items-center ">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        className="block px-4 py-2 w-[320px] rounded-lg focus:ring-2 focus:ring-blue-500 border-black border-opacity-30"
                        placeholder="Digite sua senha"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-11 right-4 pb-4 flex items-center"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </>
              )}


              {isCadastro && (
                <div className="mb-2 relative">
                  <label className="text-gray-700">Confirme sua senha</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    className="block px-4 w-[320px] py-2 border rounded-lg"
                    placeholder="Confirme sua senha"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-11 right-4 flex items-center"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.confirmarSenha && <p className="max-w-xs break-words text-[#CF2020] opacity-80 text-sm">{errors.confirmarSenha}</p>}
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