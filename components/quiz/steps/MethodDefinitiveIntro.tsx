'use client';

import React from 'react';
import { NextButton } from '../NextButton';

export const MethodDefinitiveIntro = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8 flex justify-center">
                <img
                    src="https://i.imgur.com/wpkseiG.png"
                    alt="Dra. Carolina Mendes a Nutróloga dos Famosos"
                    className="w-full max-w-md rounded-xl shadow-sm"
                />
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-black mb-6 px-4 leading-relaxed">
                Atuando na area de emagrecimento desde 2008, Vou te mostrar o método definitivo que vai acelerar seu metabolismo, regular sua microbiota intestinal e seu hormonios receptores.
            </h2>

            <p className="text-lg text-gray-600 mb-8 px-4">
                Criado pensando em imitar os efeitos das famosas canetinhas emagrecedoras, mas sem efeitos colaterais e com ingredientes bem baratinhos
            </p>

            <NextButton onClick={onNext}>CONTINUAR</NextButton>
        </div>
    );
};
