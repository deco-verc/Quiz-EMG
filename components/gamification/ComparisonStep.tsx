'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { quizSteps } from '@/data/quizSteps';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

export const ComparisonStep = ({ onNext, name }: { onNext: () => void, name: string }) => {
    const { answers, userData } = useQuizStore();

    // Helper to get image from step options based on answer value
    const getImageForStep = (stepId: number) => {
        const answerValue = answers[stepId];
        const step = quizSteps[stepId];
        if (!step || !step.options || !answerValue) return null;

        // Handle multi-select (array) or single select
        const valueToCheck = Array.isArray(answerValue) ? answerValue[0] : answerValue;
        const option = step.options.find(opt => opt.value === valueToCheck);
        return option?.image;
    };

    // Step 5: "Como você vê o seu corpo hoje?" (Current Body)
    const currentBodyImage = getImageForStep(5) || 'https://i.imgur.com/MlVxupA.jpeg';

    // Step 7: "Qual é o corpo dos seus SONHOS?" (Goal Body)
    const goalBodyImage = getImageForStep(7) || 'https://i.imgur.com/doSb98S.png';

    // Weight Data
    const currentWeight = userData.weight || 0;
    const targetWeight = userData.targetWeight || 0;

    const beforeAfterItems = [
        {
            before: "Autoestima Negativa",
            after: "Se sentir bonita novamente"
        },
        {
            before: "Evitar se olhar no espelho e em fotos",
            after: "Admirar seu reflexo e se sentir GOSTOSA"
        },
        {
            before: "Roupa G apertada, sem servir",
            after: "Usar suas roupas preferidas, tamanho P ou M"
        },
        {
            before: "Vergonha de expor seu corpo",
            after: "Se sentir confiante em qualquer situação"
        },
        {
            before: "Ser julgada pela sociedade",
            after: "Os homens vão revirar o pescoço para te ver"
        }
    ];

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-black">{name}, olha isso:</h2>
            <p className="text-gray-500 text-sm mb-6">Seu antes e depois em 60 dias</p>

            <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-6">
                {/* Before Image */}
                <div className="flex flex-col items-center w-1/2 max-w-[160px]">
                    <div className="w-full aspect-[3/4] rounded-xl mb-2 overflow-hidden shadow-md border border-gray-200 relative">
                        <img src={currentBodyImage} alt="Corpo Atual" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">HOJE</div>
                    </div>
                    <div className="bg-red-50 text-red-600 font-bold px-3 py-1 rounded-full text-sm border border-red-100">
                        {currentWeight}kg
                    </div>
                </div>

                <div className="text-2xl text-gray-400">→</div>

                {/* After Image */}
                <div className="flex flex-col items-center w-1/2 max-w-[160px]">
                    <div className="w-full aspect-[3/4] rounded-xl mb-2 overflow-hidden shadow-md border-2 border-green-500 relative">
                        <img src={goalBodyImage} alt="Corpo Meta" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">60 DIAS</div>
                    </div>
                    <div className="bg-green-50 text-green-600 font-bold px-3 py-1 rounded-full text-sm border border-green-100">
                        {targetWeight}kg
                    </div>
                </div>
            </div>

            {/* Comparison List */}
            <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-100 rounded-2xl p-4 mb-6">
                <div className="space-y-3">
                    {beforeAfterItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="flex items-center justify-between gap-2 text-xs md:text-sm"
                        >
                            {/* Before */}
                            <div className="flex items-center gap-2 flex-1 text-left">
                                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <X className="w-3 h-3 text-red-500" />
                                </div>
                                <span className="text-gray-500 line-through">{item.before}</span>
                            </div>

                            {/* Arrow */}
                            <span className="text-gray-300 mx-1">→</span>

                            {/* After */}
                            <div className="flex items-center gap-2 flex-1 text-right justify-end">
                                <span className="text-green-600 font-bold">{item.after}</span>
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 text-green-600" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Emotional Hook */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-black font-bold text-sm mb-6 px-4"
            >
                Tudo isso vai ser possível <span className="text-green-500">em MENOS de 60 dias</span>.
            </motion.p>

            <button
                onClick={onNext}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
                CONTINUAR <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
};
