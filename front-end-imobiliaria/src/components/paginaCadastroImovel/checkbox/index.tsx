"use client";
import { FormValorImovel } from "@/components/paginaCadastroImovel/formularioValoresImovel"
import { FormDadosImovel } from "@/components/paginaCadastroImovel/formularioDadosDoImovel"
import { Botao } from "@/components/botao";
import { useState } from "react";


export function CheckBoxComponent() {
    const [selectedVenda, setSelectedVenda] = useState(false);
    const [selectedLocacao, setSelectedLocacao] = useState(false);

    return (
        <>
            <div className="font-inter flex max-lg:justify-center ">
                <div className="flex flex-row items-center max-lg:justify-center">
                    <p className="text-2xl xl:text-3xl font-semibold my-10 max-lg:hidden">Tipo de Transação:</p>
                </div>
                <div className="flex items-center">
                    <label className="flex items-center mx-3 cursor-pointer">
                        <input
                            type="checkbox"
                            onChange={() => setSelectedVenda(!selectedVenda)}
                            className="hidden"
                        />
                        <div className={`w-8 h-8 border-2  bg-white rounded-[5px] flex items-center justify-center`}>
                            {selectedVenda && <div className="w-5 h-5 bg-black"></div>}
                        </div>
                    </label>
                    <p className="text-xl xl:text-2xl font-semibold my-10 max-lg:hidden">Venda</p>
                </div>

                <div className="flex items-center">
                    <label className="flex items-center mx-3 cursor-pointer">
                        <input
                            type="checkbox"
                            onChange={() => setSelectedLocacao(!selectedLocacao)}
                            className="hidden"
                        />
                        <div className={`w-8 h-8 border-2  bg-white rounded-[5px] flex items-center justify-center`}>
                            {selectedLocacao && <div className="w-5 h-5 bg-black"></div>}
                        </div>
                    </label>
                    <p className="text-xl xl:text-2xl font-semibold my-10 max-lg:hidden">Locação</p>
                </div>
            </div >

            {selectedVenda && !selectedLocacao && (
                <div className="font-inter flex flex-col">

                    <hr className="mb-4 w-full h-2 rounded-2xl bg-[#702632] max-lg:h-3 max-lg:mt-10"></hr>

                    <FormValorImovel placeholder="Valor da Venda (R$):" name="Valor da Venda (R$):" />

                    <div className="flex flex-row items-center max-lg:justify-center">
                        <p className="text-2xl xl:text-3xl font-semibold mt-12 mb-5 max-lg:hidden">Dados do Imóvel:</p>
                    </div>

                    <hr className="mb-4 w-full h-2 rounded-2xl bg-[#702632] max-lg:h-3 max-lg:mt-10"></hr>

                    <FormDadosImovel />

                    <hr className="mt-5 mb-4 w-full h-2 rounded-2xl bg-[#702632] max-lg:h-3 max-lg:mt-10"></hr>

                    <div className="flex items-center justify-between mt-10">
                        <Botao texto="Cancelar" />
                        <Botao texto="Cadastrar" />
                    </div>
                </div>
            )}

            {!selectedVenda && selectedLocacao && (
                <div className="font-inter flex flex-col">

                    <hr className="mb-4 w-full h-2 rounded-2xl bg-[#702632] max-lg:h-3 max-lg:mt-10"></hr>

                    <FormValorImovel placeholder="Valor do Aluguel (R$):" name="Valor da Aluguel (R$):" />

                    <div className="flex flex-row items-center max-lg:justify-center">
                        <p className="text-2xl xl:text-3xl font-semibold mt-12 mb-5 max-lg:hidden">Dados do Imóvel:</p>
                    </div>

                    <hr className="mb-4 w-full h-2 rounded-2xl bg-[#702632] max-lg:h-3 max-lg:mt-10"></hr>

                    <FormDadosImovel />

                    <hr className="mt-5 mb-4 w-full h-2 rounded-2xl bg-[#702632] max-lg:h-3 max-lg:mt-10"></hr>

                    <div className="flex items-center justify-between mt-10">
                        <Botao texto="Cancelar" />
                        <Botao texto="Cadastrar" />
                    </div>
                </div>
            )}
        </>

    );
}
