'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { OptionCard } from '../OptionCard';
import { motion } from 'framer-motion';

export const DailyRoutineStep = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { answers, setAnswer } = useQuizStore();
    const ageAnswer = answers[2]; // Step 2 is Age

    // Check if age is 50+
    // Values from AgeSelector: '18-29', '30-49', '50-59', '60+'
    const is50Plus = ageAnswer === '50-59' || ageAnswer === '60+';

    const options = [
        { label: 'Trabalho fora de casa, rotina mais corrida', value: 'trabalho_fora' },
        { label: 'Home office com horários mais flexíveis', value: 'home_office' },
        { label: 'Cuido da casa e da família em tempo integral', value: 'casa_familia' },
        { label: 'Sou estudante ou trabalho meio período', value: 'estudante_meio' },
    ];

    if (is50Plus) {
        options.push({ label: 'Sou aposentada ou trabalho por conta própria', value: 'aposentada' });
    }

    const currentAnswer = answers[config.id];

    const handleSelect = (value: string) => {
        setAnswer(config.id.toString(), value);
        setTimeout(onNext, 400); // Auto advance
    };

    return (
        <div className="flex flex-col h-full pt-4">
            <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-4 leading-tight px-4 max-w-2xl mx-auto">
                {config.title}
            </h2>
            {config.subtitle && (
                <p className="text-gray-400 text-center mb-8 text-base italic px-4 max-w-xl mx-auto">
                    {config.subtitle}
                </p>
            )}

            <div className="space-y-2.5 mb-24 max-w-lg mx-auto w-full px-4">
                {options.map((option, index) => (
                    <motion.div
                        key={option.value}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <OptionCard
                            selected={currentAnswer === option.value}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </OptionCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
