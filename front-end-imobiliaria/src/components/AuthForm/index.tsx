"use client"

import type React from "react"
import { useState } from "react"
import { Montserrat } from "next/font/google"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

interface AuthFormProps {
  title: string
  buttonText: string
  loginOuCadastro: string
  isCadastro?: boolean
}

type FormData = {
  email: string
  password: string
  username?: string
  confirmarSenha?: string
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, loginOuCadastro, isCadastro = false }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const [formData, setFormData] = useState({
    nomeUsuario: "",
    email: "",
    senha: "",
    confirmarSenha: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (isCadastro) {
      if (!formData.nomeUsuario) {
        newErrors.nomeUsuario = "O nome de usuário é obrigatório."
      } else if (formData.nomeUsuario.length < 5) {
        newErrors.nomeUsuario = "O nome deve ter pelo menos 5 caracteres."
      } else if (!/^[a-zA-Z0-9_.]+$/.test(formData.nomeUsuario)) {
        newErrors.nomeUsuario = "O nome só pode conter letras, números, _ e ."
      } else if (formData.nomeUsuario.length > 15) {
        newErrors.nomeUsuario = "O nome deve ter no máximo 15 caracteres."
      }

      if (!formData.email) {
        newErrors.email = "O e-mail é obrigatório."
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "E-mail inválido."
      }

      if (!formData.senha) {
        newErrors.senha = "A senha é obrigatória."
      } else if (formData.senha.length < 8) {
        newErrors.senha = "A senha deve ter no mínimo 8 caracteres."
      }

      if (!formData.confirmarSenha) {
        newErrors.confirmarSenha = "Confirme sua senha."
      } else if (formData.senha !== formData.confirmarSenha) {
        newErrors.confirmarSenha = "As senhas não coincidem."
      }
    } else {
      if (!formData.email) {
        newErrors.email = "E-mail ou nome de usuário é obrigatório."
      }

      if (!formData.senha) {
        newErrors.senha = "A senha é obrigatória."
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRedirect = () => {
    router.push(isCadastro ? "/login" : "/cadastro")
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setApiError("")

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090"
      const endpoint = isCadastro ? "/api/auth/signup" : "/api/auth/signin"

      const payload = isCadastro
        ? {
          username: formData.nomeUsuario,
          email: formData.email,
          password: formData.senha,
        }
        : {
          usernameOrEmail: formData.email,
          password: formData.senha,
        }

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      let data
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
        console.log("Resposta da API:", data)
      } else {
        data = { message: await response.text() }
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.")
        }
        throw new Error(data.message || "Erro na autenticação")
      }

      if (!isCadastro) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", data.username)

        try {
          const userResponse = await fetch(`${apiUrl}/usuario/getAll`, {
            headers: {
              "Authorization": `Bearer ${data.token}`,
              "Content-Type": "application/json"
            }
          })

          if (!userResponse.ok) {
            throw new Error("Erro ao buscar informações do usuário")
          }

          const userData = await userResponse.json()
          
          const usuario = userData.content.find((u: FormData) => u.username === data.username)
          
          if (usuario && usuario.tipo_conta) {
            localStorage.setItem("tipo_conta", usuario.tipo_conta)
            
            if (usuario.tipo_conta === "Usuario") {
              router.push("/paginaInicial")
            } else if (usuario.tipo_conta === "Administrador") {
              router.push("/paginaAdministrador")
            } else if (usuario.tipo_conta === "Corretor") {
              router.push("/paginaCorretor")
            } else if (usuario.tipo_conta === "Editor") {
              router.push("/paginaEditor")
            } else {
              throw new Error("Tipo de conta inválido")
            }
          } else {
            throw new Error("Tipo de conta não encontrado")
          }
        } catch (error) {
          throw new Error("Erro ao buscar tipo de conta do usuário")
        }
      } else {
        localStorage.setItem("username", formData.nomeUsuario)
        router.push("/login")
      }
    } catch (error) {
      setApiError((error as Error).message || "Ocorreu um erro durante a autenticação")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`${montserrat.className} h-screen bg-[url('/fundoLogin.png')] bg-[center_left_-210px]`}>
      <div className="absolute inset-0 flex items-center justify-center bg-[url('/logos/simboloHAVLogin.png')] max-md:bg-[url('/')] bg-no-repeat bg-[right_-300px_top_-100px]">
        <div className="shadow-md rounded-lg flex flex-col md:flex-row w-4/5 max-w-5xl bg-[#EBE8DE]">
          <div className="w-full md:w-[40%] flex flex-col py-16 items-center justify-center bg-gradient-to-b from-[rgba(223,218,208,1)] to-[rgba(115,115,115,0.3)] rounded-l-lg">
            <h1 className="text-[34px] font-bold text-[#280202] tracking-[2px]">BEM VINDO</h1>
            <h2 className="text-3xl font-semibold text-[#280202] tracking-[6px]">HAV</h2>
            <Image
              src="/logos/logoLogin.png"
              alt="Logo"
              width={144}
              height={144}
              className="w-36 my-4 pr-2"
            />
            <button className="bg-white border border-gray-300 text-[#702632] text-[14px] font-bold py-2.5 px-2 w-[240px] rounded-xl flex justify-center items-center mt-4">
              <Image
                src="/loginIcons/google-icon.png"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5 mr-2"
              />
              Continue com o Google
            </button>
            <a
              href="#"
              onClick={handleRedirect}
              className="text-[12px] mt-2 text-black font-medium underline hover:text-[#702632]"
            >
              {loginOuCadastro}
            </a>
          </div>

          <div className="w-full md:w-[65%] flex flex-col justify-center items-center p-6">
            <h2 className="text-4xl font-bold text-[#702632] tracking-[6px] mb-6">{title}</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md">

              {isCadastro && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nome de Usuário</label>
                  <input
                    type="text"
                    name="nomeUsuario"
                    value={formData.nomeUsuario}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 border rounded-lg ${errors.nomeUsuario ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Digite um nome de usuário"
                    disabled={isLoading}
                  />
                  {errors.nomeUsuario && <p className="mt-1 text-sm text-red-600">{errors.nomeUsuario}</p>}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Digite seu email"
                  disabled={isLoading}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 border rounded-lg ${errors.senha ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Digite sua senha"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.senha && <p className="mt-1 text-sm text-red-600">{errors.senha}</p>}
              </div>

              {isCadastro && (
                <div className="mb-6 relative">
                  <label className="block text-gray-700 mb-2">Confirme sua senha</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      className={`block w-full px-4 py-2 border rounded-lg ${errors.confirmarSenha ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Confirme sua senha"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmarSenha && <p className="mt-1 text-sm text-red-600">{errors.confirmarSenha}</p>}
                </div>
              )}
              {apiError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{apiError}</div>}

              <div className="flex justify-center">
                <button
                  className={`w-full md:w-1/2 font-bold py-3 rounded-lg transition-colors ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#702632] text-white hover:bg-[#5a1e28]"
                    }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    buttonText
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
