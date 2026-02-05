'use client';

import React, { useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { NextButton } from '../NextButton';

import { ScrollableRuler } from '@/components/ui/ScrollableRuler';

export const TargetWeightInput = ({ onNext }: { onNext: () => void }) => {
    const { userData, setUserData } = useQuizStore();
    const [target, setTarget] = useState(userData.targetWeight || 60);

    const targetBMI = target / ((userData.height / 100) ** 2);

    const handleNext = () => {
        setUserData({ targetWeight: target });
        onNext();
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-8">
                Qual é o seu peso ideal?
            </h2>

            <div className="mb-8">
                <div className="text-6xl font-bold text-green-500 mb-8">{target}<span className="text-2xl text-gray-500 ml-2">kg</span></div>

                <ScrollableRuler
                    value={target}
                    min={45}
                    max={120}
                    onChange={setTarget}
                    unit="kg"
                />

                <p className="text-center text-gray-300 text-sm mt-4">
                    Arraste para ajustar
                </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl mb-8">
                <p className="text-black text-sm mb-1">Com esse peso, seu IMC seria:</p>
                <p className="text-green-500 font-bold text-xl">
                    {targetBMI.toFixed(1)} (Peso Normal/Saudável)
                </p>
            </div>

            <p className="text-black font-bold mb-8">
                Ter uma meta realista ajuda seu corpo a responder melhor, reduzindo riscos e aumentando a chance de resultados duradouros.
            </p>

            <NextButton onClick={handleNext} />
        </div>
    );
};
