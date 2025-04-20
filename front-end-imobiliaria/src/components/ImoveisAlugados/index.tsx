"use client"

import React from 'react';
import { Card } from '../cardImovel';
import { useLanguage } from '../context/LanguageContext';

const imoveis = [
    {
        id: "1",
        title: "Apartamento Pinheiros",
        city: "São Paulo",
        bedrooms: 2,
        suites: 1,
        bathrooms: 1,
        price: 3000,
        imageUrl: "/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png"
    },
    {
        id: "2",
        title: "Casa Vila Mariana",
        city: "São Paulo",
        bedrooms: 3,
        suites: 2,
        bathrooms: 2,
        price: 4000,
        imageUrl: "/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png"
    },
    {
        id: "3",
        title: "Studio Itaim",
        city: "São Paulo",
        bedrooms: 1,
        suites: 1,
        bathrooms: 1,
        price: 2200,
        imageUrl: "/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png"
    }
];

export function ImoveisAlugados() {
    const { translate } = useLanguage();

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    {translate('imoveisAlugados')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {imoveis.map((imovel) => (
                        <Card
                            key={imovel.id}
                            {...imovel}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
} 