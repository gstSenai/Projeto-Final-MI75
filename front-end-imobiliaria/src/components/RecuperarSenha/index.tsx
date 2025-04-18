"use client"

import { useState, useEffect } from "react"
import { Montserrat } from "next/font/google"
import { useRouter } from "next/navigation"
import Image from "next/image"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const RecuperarSenha = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos em segundos

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCodeInput && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowCodeInput(false);
      setTimeLeft(300); // Reseta o contador
    }
    return () => clearInterval(timer);
  }, [showCodeInput, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setApiError("")
    setSuccessMessage("")

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090"
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Erro ao enviar código de verificação")
      }

      setSuccessMessage("Código de verificação enviado com sucesso!")
      setShowCodeInput(true)
    } catch (error) {
      setApiError((error as Error).message || "Ocorreu um erro ao processar sua solicitação")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setApiError("")
    setSuccessMessage("")

    if (newPassword !== confirmPassword) {
      setApiError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090"
      const response = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          code,
          newPassword 
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Erro ao redefinir senha")
      }

      setSuccessMessage("Senha redefinida com sucesso!")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      setApiError((error as Error).message || "Ocorreu um erro ao processar sua solicitação")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`${montserrat.className} h-screen bg-[url('/fundoLogin.png')] bg-[center_left_-210px]`}>
      <div className="absolute inset-0 flex items-center justify-center bg-[url('/logos/simboloHAVLogin.png')] max-md:bg-[url('/')] bg-no-repeat bg-[right_-300px_top_-100px]">
        <div className="shadow-md rounded-lg flex flex-col md:flex-row w-4/5 max-w-5xl bg-[#EBE8DE]">
          <div className="w-full md:w-[40%] flex flex-col py-16 items-center justify-center bg-gradient-to-b from-[rgba(223,218,208,1)] to-[rgba(115,115,115,0.3)] rounded-l-lg">
            <h1 className="text-[34px] font-bold text-[#280202] tracking-[2px]">RECUPERAR SENHA</h1>
            <h2 className="text-3xl font-semibold text-[#280202] tracking-[6px]">HAV</h2>
            <Image
              src="/logos/logoLogin.png"
              alt="Logo"
              width={144}
              height={144}
              className="w-36 my-4 pr-2"
            />
            <button
              onClick={() => router.push("/login")}
              className="text-[12px] mt-2 text-black font-medium underline hover:text-[#702632]"
            >
              Voltar para o login
            </button>
          </div>

          <div className="w-full md:w-[65%] flex flex-col justify-center items-center p-6">
            <h2 className="text-4xl font-bold text-[#702632] tracking-[6px] mb-6">Recuperação de Senha</h2>
            {!showCodeInput ? (
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email Cadastrado</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Digite seu email cadastrado"
                    required
                    disabled={isLoading}
                  />
                </div>

                {apiError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{apiError}</div>}
                {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{successMessage}</div>}

                <div className="flex justify-center">
                  <button
                    className={`w-full md:w-1/2 font-bold py-3 rounded-lg transition-colors ${
                      isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#702632] text-white hover:bg-[#5a1e28]"
                    }`}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      "Enviar Código"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="w-full max-w-md">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Código de Verificação</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Digite o código recebido"
                      required
                      disabled={isLoading}
                    />
                    <div className="text-red-600 font-semibold whitespace-nowrap">
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nova Senha</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Digite sua nova senha"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Confirme sua nova senha"
                    required
                    disabled={isLoading}
                  />
                </div>

                {apiError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{apiError}</div>}
                {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{successMessage}</div>}

                <div className="flex justify-center">
                  <button
                    className={`w-full md:w-1/2 font-bold py-3 rounded-lg transition-colors ${
                      isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#702632] text-white hover:bg-[#5a1e28]"
                    }`}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      "Redefinir Senha"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecuperarSenha 