"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

const RedefinirSenha = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [codigo, setCodigo] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!email) {
      router.push('/recuperar-senha')
    }
  }, [email, router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!codigo) {
      newErrors.codigo = "O código é obrigatório."
    }
    if (!novaSenha) {
      newErrors.novaSenha = "A nova senha é obrigatória."
    } else if (novaSenha.length < 6) {
      newErrors.novaSenha = "A senha deve ter no mínimo 6 caracteres."
    }
    if (novaSenha !== confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setApiError("")
    setSuccessMessage("")

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090";
      const response = await fetch(`${apiUrl}/api/auth/redefinirSenha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          token: codigo,
          novaSenha: novaSenha
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao redefinir senha");
      }

      setSuccessMessage("Senha redefinida com sucesso!");
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error("Erro na requisição:", error);
      setApiError((error as Error).message || "Ocorreu um erro ao tentar redefinir a senha");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen bg-[url('/fundoLogin.png')] bg-[center_left_-210px]">
      <div className="absolute inset-0 flex items-center justify-center bg-[url('/logos/simboloHAVLogin.png')] max-md:bg-[url('/')] bg-no-repeat bg-[right_-300px_top_-100px]">
        <div className="shadow-md rounded-lg flex flex-col w-4/5 max-w-5xl bg-[#EBE8DE]">
          <div className="w-full md:w-[65%] flex flex-col justify-center items-center p-6">
            <h2 className="text-4xl font-bold text-[#702632] tracking-[6px] mb-6">Redefinir Senha</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Código de Verificação</label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className={`block w-full px-4 py-2 border rounded-lg ${errors.codigo ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Digite o código recebido"
                  disabled={isLoading}
                />
                {errors.codigo && <p className="mt-1 text-sm text-red-600">{errors.codigo}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nova Senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className={`block w-full px-4 py-2 border rounded-lg ${errors.novaSenha ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Digite a nova senha"
                  disabled={isLoading}
                />
                {errors.novaSenha && <p className="mt-1 text-sm text-red-600">{errors.novaSenha}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className={`block w-full px-4 py-2 border rounded-lg ${errors.confirmarSenha ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Confirme a nova senha"
                  disabled={isLoading}
                />
                {errors.confirmarSenha && <p className="mt-1 text-sm text-red-600">{errors.confirmarSenha}</p>}
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
                    "Redefinir Senha"
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

export default RedefinirSenha