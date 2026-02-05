'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { NextButton } from '../NextButton';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';

export const ComparisonStep = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { answers, userData } = useQuizStore();

    // Get images from previous answers
    // Step 5: Body Image (Current)
    // Step 7: Dream Body (Goal)

    const currentBodyImages: Record<string, string> = {
        'levemente': 'https://i.imgur.com/Q36YrFu.png',
        'moderadamente': 'https://i.imgur.com/bXDF7GB.png',
        'muito': 'https://i.imgur.com/jbQCk9P.png',
        'obesidade': 'https://i.imgur.com/DOqDygA.png',
    };

    const dreamBodyImages: Record<string, string> = {
        'sem_barriga': 'https://i.imgur.com/57eaxqZ.png',
        'curvilineo': 'https://i.imgur.com/dmwbh8X.png',
        'definido': 'https://i.imgur.com/doSb98S.png',
        'magro': 'https://i.imgur.com/x0jwv0h.png',
    };

    // Fallback images if something goes wrong
    const currentImage = currentBodyImages[answers['5']] || 'https://i.imgur.com/bXDF7GB.png';
    const dreamImage = dreamBodyImages[answers['7']] || 'https://i.imgur.com/57eaxqZ.png';

    const benefits = [
        { from: 'Acordar cansada', to: 'Acordar leve e cheia de energia' },
        { from: 'Evitar espelho e fugir de fotos', to: 'Se olhar e gostar do que vê' },
        { from: 'Roupa apertada, sem servir', to: 'Usar suas roupas preferidas' },
        { from: 'Vergonha de usar biquini', to: 'Se sentir livre e confiante' },
        { from: 'Ansiedade que só cresce', to: 'Paz com seu corpo e mente' },
    ];

    return (
        <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-xl text-gray-600 text-center mb-6">
                É assim que a transformação do seu corpo se parece
            </h2>

            {/* Images Comparison */}
            <div className="flex items-center justify-center gap-2 md:gap-8 mb-8">
                {/* Before */}
                <div className="flex flex-col items-center">
                    <div className="relative w-40 md:w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            HOJE
                        </div>
                        <img src={currentImage} alt="Corpo Atual" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center font-bold text-gray-700 mt-2 text-lg">{userData.weight}kg</p>
                </div>

                {/* Arrow */}
                <div className="text-gray-300 pb-8">
                    <ArrowRight size={24} />
                </div>

                {/* After */}
                <div className="flex flex-col items-center">
                    <div className="relative w-40 md:w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-green-500">
                        <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            60 DIAS
                        </div>
                        <img src={dreamImage} alt="Corpo Desejado" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center font-bold text-gray-700 mt-2 text-lg">{userData.targetWeight}kg</p>
                </div>
            </div>

            {/* Benefits List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="space-y-4">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between text-xs md:text-sm gap-2"
                        >
                            <div className="flex items-center gap-2 text-gray-400 flex-1">
                                <X size={14} className="text-red-400 shrink-0" />
                                <span className="line-through decoration-red-200">{item.from}</span>
                            </div>

                            <div className="text-gray-300">→</div>

                            <div className="flex items-center gap-2 text-gray-800 font-medium flex-1 justify-end text-right">
                                <span>{item.to}</span>
                                <div className="bg-green-100 p-0.5 rounded-full shrink-0">
                                    <Check size={12} className="text-green-600" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="text-center mb-8">
                <p className="text-lg font-bold text-gray-900 leading-tight">
                    Imagine olhar no espelho daqui a 60 dias e finalmente <span className="text-green-500">sorrir de verdade</span>.
                </p>
            </div>

            <NextButton onClick={onNext}>
                VER MINHA TRANSFORMAÇÃO
            </NextButton>
        </div>
    );
};
