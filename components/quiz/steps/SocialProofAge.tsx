'use client';

import React from 'react';
import { NextButton } from '../NextButton';
import { useQuizStore } from '@/store/quizStore';
import { GamifiedCTAButton } from '@/components/ui/GamifiedCTAButton';

export const SocialProofAge = ({ onNext }: { onNext: () => void }) => {
    const { answers } = useQuizStore();
    const ageRange = answers['2'] || '40-49'; // Default fallback

    return (
        <div className="text-center">
            <div className="mb-6 flex flex-col items-center gap-4">
                <img src="https://i.imgur.com/nKRloAA.png" alt="Prova Social" className="rounded-xl shadow-md w-full max-w-md" />
                <div className="w-full max-w-sm overflow-hidden rounded-xl shadow-sm border border-gray-100">
                    <img src="https://i.imgur.com/rrCMf94.png" alt="Prova Social Detalhe" className="w-full object-cover" loading="eager" />
                </div>
            </div>

            <p className="text-lg text-black font-bold mb-4">
                Mais de <span className="font-bold text-green-500">108 mil mulheres</span> entre {ageRange} anos transformaram suas vidas com o segredinho das Japonesas.
            </p>

            <p className="text-xl font-bold text-black mb-8">
                Assim como elas conseguiram...<br />
                Você também consegue.
            </p>

            <GamifiedCTAButton onClick={onNext} />
        </div>
    );
};
