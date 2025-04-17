"use client"

import React from 'react';
import { Card } from '../CardImovel';
import { useLanguage } from '../context/LanguageContext';

const imoveis = [
    {
        id: "1",
        title: "Apartamento Brooklin",
        city: "São Paulo",
        bedrooms: 3,
        suites: 2,
        bathrooms: 2,
        price: 850000,
        imageUrl: "/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png"
    },
    {
        id: "2",
        title: "Casa Morumbi",
        city: "São Paulo",
        bedrooms: 4,
        suites: 3,
        bathrooms: 3,
        price: 1200000,
        imageUrl: "/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png"
    },
    {
        id: "3",
        title: "Cobertura Jardim Europa",
        city: "São Paulo",
        bedrooms: 5,
        suites: 4,
        bathrooms: 4,
        price: 2500000,
        imageUrl: "/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png"
    }
];

export function ImoveisVendidos() {
    const { translate } = useLanguage();

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    {translate('imoveisVendidos')}
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