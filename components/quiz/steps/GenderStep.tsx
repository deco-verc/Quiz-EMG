'use client';

import React from 'react';
import Image from 'next/image';
import { useQuizStore } from '@/store/quizStore';
import { OptionCard } from '../OptionCard';

export const GenderStep = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { setAnswer } = useQuizStore();

    const handleSelect = (value: string) => {
        setAnswer('1', value);
        setAnswer('gender', value);
        setTimeout(onNext, 300);
    };

    return (
        <div className="text-center max-w-xl mx-auto font-[family-name:var(--font-poppins)]">
            <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8 leading-tight px-4">
                Descubra o <span className="text-green-500">Segredinho das Japonesas</span> com a Dra Carolina M. <span className="text-blue-500">Nutróloga dos Famosos</span>
            </h2>

            <div className="mb-4 flex flex-col items-center justify-center">
                <Image
                    src="https://i.imgur.com/c4VYg4c.png"
                    alt="Começar Quiz"
                    width={448}
                    height={448}
                    priority
                    className="w-full max-w-md rounded-xl shadow-sm mb-4"
                />
                <p className="text-gray-600 font-bold text-sm uppercase tracking-widest">Teste gratuito de 1 minuto</p>
            </div>

            <div className="space-y-3 mb-8">
                <OptionCard
                    selected={false}
                    onClick={() => handleSelect('female')}
                >
                    Mulher
                </OptionCard>
                <OptionCard
                    selected={false}
                    onClick={() => handleSelect('male')}
                >
                    Homem
                </OptionCard>
            </div>

            <div className="text-center text-sm space-y-2 text-black">
                <p className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Suas respostas são 100% seguras</span>
                </p>
            </div>
        </div>
    );
};
