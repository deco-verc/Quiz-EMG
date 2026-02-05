'use client';

import React, { useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { NextButton } from '../NextButton';

export const HonestChanceStep = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { userData, setAnswer } = useQuizStore();
    const [value, setValue] = useState(25); // Default start 25%

    const currentWeight = userData.weight || 70;
    const targetWeight = userData.targetWeight || 60;
    const metaKg = (currentWeight - targetWeight).toFixed(1);

    const handleNext = () => {
        setAnswer(config.id.toString(), value.toString());
        onNext();
    };

    // Feedback Dinâmico
    const getFeedback = (val: number) => {
        if (val <= 20) return {
            emoji: '😰',
            text: 'Impossível sozinha',
            bgColor: 'bg-red-100'
        };
        if (val <= 40) return {
            emoji: '😔',
            text: 'Muito improvável',
            bgColor: 'bg-orange-200'
        };
        if (val <= 60) return {
            emoji: '😐',
            text: 'Talvez, mas não acredito',
            bgColor: 'bg-yellow-100'
        };
        if (val <= 80) return {
            emoji: '🤔',
            text: 'Boa chance, mas difícil',
            bgColor: 'bg-emerald-100'
        };
        return {
            emoji: '😊',
            text: 'Muito confiante sozinha',
            bgColor: 'bg-green-200'
        };
    };

    const feedback = getFeedback(value);

    return (
        <div className={`flex flex-col h-full -mx-4 px-4 transition-colors duration-500 ${feedback.bgColor}`}>
            <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">

                {/* Título */}
                <h2 className="text-2xl font-bold text-center text-black mb-2 leading-tight">
                    Sendo HONESTA: qual sua chance de realmente emagrecer <span className="text-green-700">{metaKg}kg</span> sozinha nos próximos 60 dias?
                </h2>

                {/* Subtítulo */}
                <p className="text-gray-600 text-center mb-10 text-lg font-medium">
                    Sem protocolo. Sem acompanhamento. Só você.
                </p>

                {/* Emoji Gigante */}
                <div className="mb-6 transform transition-all duration-300 scale-110">
                    <span className="text-[80px] filter drop-shadow-md">
                        {feedback.emoji}
                    </span>
                </div>

                {/* Texto de Feedback */}
                <div className="mb-10 text-center h-8">
                    <span className="text-xl font-bold text-black border-b-2 border-black/10 pb-1">
                        {feedback.text}
                    </span>
                </div>

                {/* Slider Container */}
                <div className="w-full bg-white/50 p-6 rounded-3xl shadow-sm backdrop-blur-sm">
                    <div className="text-5xl font-black text-center text-black mb-6">
                        {value}%
                    </div>

                    <div className="relative w-full h-12 flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={value}
                            onChange={(e) => setValue(Number(e.target.value))}
                            className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
                        />

                        {/* Custom Track */}
                        <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden absolute z-10">
                            <div
                                className="h-full bg-green-500 transition-all duration-150 ease-out"
                                style={{ width: `${value}%` }}
                            />
                        </div>

                        {/* Custom Thumb (Visual Only) */}
                        <div
                            className="absolute z-10 w-8 h-8 bg-white border-4 border-green-500 rounded-full shadow-lg transform -translate-x-1/2 transition-all duration-150 ease-out pointer-events-none"
                            style={{ left: `${value}%` }}
                        />
                    </div>

                    {/* Labels Fixos */}
                    <div className="flex justify-between mt-4 text-xs font-bold text-gray-500 uppercase tracking-wide">
                        <span>Impossível</span>
                        <span>Talvez</span>
                        <span>Certeza</span>
                    </div>
                </div>

            </div>

            <div className="pb-8 w-full max-w-md mx-auto">
                <NextButton onClick={handleNext}>CONTINUAR</NextButton>
            </div>
        </div>
    );
};
