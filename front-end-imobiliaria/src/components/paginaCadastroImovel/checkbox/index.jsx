"use client";
import { formValorImovel } from "@/components/paginaCadastroImovel/formularioValoresImovel"
import { useState } from "react";

export function CheckBoxComponent() {
    const [selectedVenda, setSelectedVenda] = useState(false);
    const [selectedLocacao, setSelectedLocacao] = useState(false);

    return (
        <>
            <div className="font-inter flex max-lg:justify-center ">
                <div className="flex flex-row items-center max-lg:justify-center">
                    <p className="text-2xl xl:text-4xl font-semibold my-10 max-lg:hidden">Tipo de Transação:</p>
                </div>
                <div className="flex items-center">
                    <label className="flex items-center mx-5 cursor-pointer">
                        <input
                            type="checkbox"
                            setSelectedVenda={selectedVenda}
                            onChange={() => setSelectedVenda(!selectedVenda)}
                            className="hidden"
                        />
                        <div className={`w-10 h-10 border-2  bg-white rounded-[5px] flex items-center justify-center`}>
                            {selectedVenda && <div className="w-7 h-7 bg-black"></div>}
                        </div>
                    </label>
                    <p className="text-2xl xl:text-4xl font-semibold my-10 max-lg:hidden">Venda</p>
                </div>

                <div className="flex items-center">
                    <label className="flex items-center mx-5 cursor-pointer">
                        <input
                            type="checkbox"
                            setSelectedLocacao={selectedLocacao}
                            onChange={() => setSelectedLocacao(!selectedLocacao)}
                            className="hidden"
                        />
                        <div className={`w-10 h-10 border-2  bg-white rounded-[5px] flex items-center justify-center`}>
                            {selectedLocacao && <div className="w-7 h-7 bg-black"></div>}
                        </div>
                    </label>
                    <p className="text-2xl xl:text-4xl font-semibold my-10 max-lg:hidden">Locação</p>
                </div>
            </div >
            
            {selectedVenda && !selectedLocacao && (
                        <div className="flex flex-col">
                            <hr className=" mb-4 w-full h-2 rounded-2xl bg-[#702632] max-lg:h-3 max-lg:mt-10"></hr>
                            <formValorImovel />
                        </div>
                    )}
        </>

    );
}
