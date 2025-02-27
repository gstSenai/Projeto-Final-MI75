"use client";

import { FaSearch, FaEdit, FaEnvelope } from "react-icons/fa";

export function Formulario() {
    return (
        <div>
            <div className="flex p-4 gap-5">
                <div className="flex flex-wrap items-center gap-3 bg-[#E2DCD2] rounded-lg">
                    <div className="flex items-center border border-gray-400 bg-white rounded-full px-3 py-2">
                        <FaEdit className="text-gray-500 mr-2" />
                        <input type="text" placeholder="Nome" className="bg-transparent outline-none" />
                    </div>
                </div>

                <select className="border border-gray-400 bg-white rounded-full px-4 py-2 outline-none h-[40px]">
                    <option>Tipo da conta</option>
                    <option>Cliente</option>
                    <option>Administrador</option>
                    <option>Corretor</option>
                </select>

                <select className="border border-gray-400 bg-white rounded-full px-4 py-2 outline-none h-[40px]">
                    <option>Status da conta</option>
                    <option>Ativa</option>
                    <option>Inativa</option>
                    <option>Bloqueada</option>
                </select>
            </div>

            <div className="flex gap-5">
                <div className="flex flex-wrap items-center ml-4 gap-3 bg-[#E2DCD2] rounded-lg">
                    <div className="flex items-center border-gray-400 bg-white rounded-full px-3 py-2">
                        <FaEnvelope className="text-gray-500 mr-2" />
                        <input type="email" placeholder="Email" className="bg-transparent outine-none" />
                    </div>
                </div>

                <button className="flex items-center gap-2 bg-[#652A2A] text-white px-4 py-2 roundede-full rounded-lg">
                    <FaSearch />
                    Pesquisar
                </button>
            </div>
        </div>

    )
}