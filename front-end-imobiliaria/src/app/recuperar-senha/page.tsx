"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const RecuperarSenha = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmail = () => {
    const newErrors: Record<string, string> = {}
    if (!email) {
      newErrors.email = "O e-mail é obrigatório."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "E-mail inválido."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setApiError("")
    setSuccessMessage("")

    if (!validateEmail()) {
      setIsLoading(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090";
      const response = await fetch(`${apiUrl}/api/auth/esqueci-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao gerar código de recuperação");
      }

      const data = await response.json();
      setSuccessMessage(`Seu código de recuperação é: ${data.token}`);
      
      // Redireciona para a página de redefinição após 5 segundos
      setTimeout(() => {
        router.push(`/redefinir-senha?email=${encodeURIComponent(email)}`);
      }, 5000);
    } catch (error) {
      console.error("Erro na requisição:", error);
      setApiError((error as Error).message || "Ocorreu um erro ao tentar recuperar a senha");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen bg-[url('/fundoLogin.png')] bg-[center_left_-210px]">
      <div className="absolute inset-0 flex items-center justify-center bg-[url('/logos/simboloHAVLogin.png')] max-md:bg-[url('/')] bg-no-repeat bg-[right_-300px_top_-100px]">
        <div className="shadow-md rounded-lg flex flex-col w-4/5 max-w-5xl bg-[#EBE8DE]">
          <div className="w-full md:w-[65%] flex flex-col justify-center items-center p-6">
            <h2 className="text-4xl font-bold text-[#702632] tracking-[6px] mb-6">Recuperação de Senha</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Digite seu email"
                  disabled={isLoading}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {apiError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{apiError}</div>}
              {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{successMessage}</div>}

              <div className="flex justify-center">
                <button
                  className={`w-full md:w-1/2 font-bold py-3 rounded-lg transition-colors ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#702632] text-white hover:bg-[#5a1e28]"} `}
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

            <div className="mt-4 text-center">
              <a
                href="/login"
                className="text-sm text-[#702632] hover:underline"
              >
                Voltar para login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecuperarSenha