"use client";

import React from "react";

export interface Compromisso {
  hora: string;
  codigo: string;
  nomeImovel: string;
  endereco: string;
  cidadeUF: string;
  pessoa: string;
}

interface CompromissoCardProps {
  compromisso: Compromisso;
  className?: string;
}

export const CompromissoCard: React.FC<CompromissoCardProps> = ({ 
  compromisso, 
  className = "" 
}) => {
  return (
    <div
      className={`bg-[#702632] text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="text-2xl font-bold">{compromisso.hora}</div>
        <div className="text-right">
          <div className="text-sm opacity-90">{compromisso.codigo}</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-sm opacity-75">{compromisso.cidadeUF}</div>
        <div className="font-semibold text-lg">{compromisso.nomeImovel}</div>
        <div className="text-sm mt-1 opacity-90">{compromisso.endereco}</div>
        <div className="mt-2 text-sm">
          {compromisso.pessoa}
        </div>
      </div>
    </div>
  );
};

interface ListaCompromissosProps {
  compromissos: Compromisso[];
  mensagemSemCompromissos?: string;
  className?: string;
}

export const ListaCompromissos: React.FC<ListaCompromissosProps> = ({
  compromissos,
  mensagemSemCompromissos = "Nenhum compromisso agendado.",
  className = ""
}) => {
  if (compromissos.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        {mensagemSemCompromissos}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {compromissos.map((compromisso, index) => (
        <CompromissoCard 
          key={index} 
          compromisso={compromisso} 
        />
      ))}
    </div>
  );
};