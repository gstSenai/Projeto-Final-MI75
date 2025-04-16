"use client";

import { FiltroImoveis } from "@/components/paginaImoveis/botaoFiltro"
import { useState } from "react";

interface Imovel {
    // Add your imovel properties here
    id: number;
    // ... other properties
}

export default function Teste(){
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [, setImoveis] = useState<Imovel[]>([]);

    return(
        <FiltroImoveis 
            mostrarFiltros={mostrarFiltros}
            setMostrarFiltros={setMostrarFiltros}
            setImoveis={setImoveis}
        />
    )
}