"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/context/AuthContext'

export default function LoginSuccess() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams?.get('token') || null
    const { login } = useAuth()

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090"
                    const response = await fetch(`${apiUrl}/api/auth/user-info`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    
                    if (response.ok) {
                        const userData = await response.json()
                        console.log('Dados do usuário:', userData)
                        
                        // Busca a imagem do perfil do Google
                        if (userData.googleImageUrl) {
                            try {
                                const imageResponse = await fetch(userData.googleImageUrl)
                                const imageBlob = await imageResponse.blob()
                                
                                const formData = new FormData()
                                formData.append('imagem', imageBlob)
                                
                                // Salva a imagem no banco de dados
                                const saveImageResponse = await fetch(`${apiUrl}/usuario/update/${userData.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: formData
                                })
                                
                                if (!saveImageResponse.ok) {
                                    console.error('Erro ao salvar imagem do Google')
                                }
                            } catch (error) {
                                console.error('Erro ao processar imagem do Google:', error)
                            }
                        }
                        
                        // Atualiza o contexto de autenticação
                        login(token, userData.tipo_conta, userData.id)
                        
                        // Redirecionar baseado no tipo de conta
                        switch (userData.tipo_conta) {
                            case 'Usuario':
                                router.push('/paginaInicial')
                                break
                            case 'Administrador':
                                router.push('/paginaAdministrador')
                                break
                            case 'Corretor':
                                router.push('/paginaCorretor')
                                break
                            case 'Editor':
                                router.push('/paginaEditor')
                                break
                            default:
                                router.push('/login')
                        }
                    } else {
                        throw new Error('Erro ao buscar informações do usuário')
                    }
                } catch (error) {
                    console.error('Erro ao processar login:', error)
                    router.push('/login')
                }
            } else {
                router.push('/login')
            }
        }

        fetchUserData()
    }, [token, router, login])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#702632]"></div>
        </div>
    )
} 