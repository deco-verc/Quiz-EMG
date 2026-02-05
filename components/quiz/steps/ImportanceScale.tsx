'use client';


import React, { useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { NextButton } from '../NextButton';
import { ScrollableRuler } from '@/components/ui/ScrollableRuler';

export const ImportanceScale = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { setAnswer } = useQuizStore();
    const [value, setValue] = useState(5);

    const handleNext = () => {
        setAnswer(config.id.toString(), value.toString());
        onNext();
    };

    // Dynamic Emoji Logic
    const getEmoji = (val: number) => {
        if (val <= 3) return '😐';
        if (val <= 6) return '🤔';
        if (val <= 8) return '💪';
        return '🔥';
    };

    return (
        <div className="flex flex-col h-full pt-4 text-center">
            <h2 className="text-2xl font-bold text-black mb-4 px-4 leading-tight">
                {config.title}
            </h2>

            <div className="flex-1 flex flex-col justify-center items-center mb-12 w-full max-w-md mx-auto px-4">

                {/* Dynamic Emoji */}
                <div className="mb-4 transform transition-all duration-300">
                    <span className="text-[48px] filter drop-shadow-sm">
                        {getEmoji(value)}
                    </span>
                </div>

                <div className="mb-6">
                    <span className="text-6xl font-bold text-green-600">
                        {value}
                    </span>
                </div>

                <div className="w-full mb-8">
                    <ScrollableRuler
                        value={value}
                        min={1}
                        max={10}
                        onChange={setValue}
                        unit=""
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-4 px-2">
                        <span>Não é prioridade</span>
                        <span>Muito importante</span>
                    </div>
                </div>
            </div>

            <div className="w-full px-4 pb-8 max-w-md mx-auto">
                <NextButton onClick={handleNext}>CONTINUAR</NextButton>
            </div>
        </div>
    );
};
