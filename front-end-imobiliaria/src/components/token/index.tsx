import { useAuth } from "@/components/context/AuthContext"

export default async function request(method: string, url: string, body?: any) {
  const token = localStorage.getItem("token") 

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Erro ${response.status}: ${errorText}`)
  }

  return response.json()
}
