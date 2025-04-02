"use client"

import { Formulario } from "@/components/paginaCadastroUsuario/adicionandoUsuario/formulario"
import { motion, AnimatePresence } from "framer-motion"
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400','500', '600', '800'],
    display: 'swap',
});

interface FormularioUsuarioModalProps {
    isOpen: boolean
    onClose: () => void
    onComplete?: () => void
}

export function FormularioUsuarioModal({ isOpen, onClose, onComplete }: FormularioUsuarioModalProps) {
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${montserrat.className}`}>
            <div className="bg-white rounded-[20px] p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-vermelho">Cadastro de Usuário</h2>
                    <button
                        className="bg-[#DFDAD0] px-3 py-1 rounded-full text-vermelho hover:bg-vermelho hover:text-[#DFDAD0] transition-colors"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>

                <Formulario onComplete={() => {
                    if (onComplete) onComplete()
                    onClose()
                }} />
            </div>
        </div>
    )
} 