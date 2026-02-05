'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { OptionCard } from '../OptionCard';

export const WeightGoalSelector = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { setAnswer, answers } = useQuizStore();
    const bodyImage = answers['5']; // Get answer from step 5 (BodyImageSelector)

    const handleSelect = (value: string) => {
        setAnswer(config.id.toString(), value);
        setTimeout(onNext, 300);
    };

    // Define options based on body image selection
    const getOptionsForBodyImage = () => {
        switch (bodyImage) {
            case 'levemente': // Sobrepeso (IMC 25-29,9) - Meta: 5-10kg
                return [
                    { label: 'Só 2kg (só desinchar)', value: '2kg' },
                    { label: '3 a 5kg', value: '3-5kg' },
                    { label: '6 a 8kg', value: '6-8kg' },
                    { label: '9 a 12kg', value: '9-12kg' },
                ];
            case 'acima': // Obesidade Grau I (IMC 30-34,9) - Meta: 10-20kg
                return [
                    { label: '8 a 10kg', value: '8-10kg' },
                    { label: '11 a 15kg', value: '11-15kg' },
                    { label: '16 a 20kg', value: '16-20kg' },
                    { label: '21 a 25kg', value: '21-25kg' },
                ];
            case 'muito': // Obesidade Grau II (IMC 35-39,9) - Meta: 20-35kg
                return [
                    { label: '15 a 20kg', value: '15-20kg' },
                    { label: '21 a 28kg', value: '21-28kg' },
                    { label: '29 a 35kg', value: '29-35kg' },
                    { label: 'Mais de 35kg', value: '>35kg' },
                ];
            case 'obesidade': // Obesidade Grau III (IMC 40+) - Meta: 35kg+
                return [
                    { label: '30 a 40kg', value: '30-40kg' },
                    { label: '41 a 50kg', value: '41-50kg' },
                    { label: '51 a 60kg', value: '51-60kg' },
                    { label: 'Mais de 60kg', value: '>60kg' },
                ];
        }
    };

    const options = getOptionsForBodyImage();

    return (
        <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-2 leading-tight px-4">
                {config.title}
            </h2>
            {config.subtitle && (
                <p className="text-gray-500 text-center mb-8 px-4">
                    {config.subtitle}
                </p>
            )}

            <div className="space-y-3 mb-8">
                {options?.map((option: any) => (
                    <OptionCard
                        key={option.value}
                        selected={false}
                        onClick={() => handleSelect(option.value)}
                    >
                        {option.label}
                    </OptionCard>
                ))}
            </div>
        </div>
    );
};
