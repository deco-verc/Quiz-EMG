'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { OptionCard } from '../OptionCard';


export const MechanismInfo = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { setAnswer } = useQuizStore();

    const handleSelect = (value: string) => {
        setAnswer('6', value);
        setTimeout(onNext, 300);
    };

    return (
        <div className="text-center">
            <div className="mb-6 flex justify-center">
                <img
                    src="https://i.imgur.com/wpkseiG.png"
                    alt="Dra. Carolina Mendes"
                    className="w-full max-w-xs rounded-xl shadow-sm"
                />
            </div>

            <p className="text-black mb-6 text-xl font-bold leading-relaxed">
                A Dra. Carolina Mendes e um número crescente de nutricionistas reconhecem esse método como o mais eficaz.
            </p>

            <h2 className="text-xl font-bold text-black mb-4">
                Você já recebeu orientação de um nutricionista antes?
            </h2>

            <div className="space-y-3">
                <OptionCard
                    selected={false}
                    onClick={() => handleSelect('sim')}
                >
                    Sim
                </OptionCard>
                <OptionCard
                    selected={false}
                    onClick={() => handleSelect('nao')}
                >
                    Não
                </OptionCard>
            </div>
        </div>
    );
};
