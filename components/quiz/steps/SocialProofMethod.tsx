'use client';

import React, { useMemo } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { GamifiedCTAButton } from '@/components/ui/GamifiedCTAButton';
import { Users } from 'lucide-react';

export const SocialProofMethod = ({ onNext }: { onNext: () => void }) => {
    const { answers, userData } = useQuizStore();

    // Dados dinâmicos
    const { ageRange, methodsList, weightGoal } = useMemo(() => {
        // 1. IDADE SELECIONADA
        const selectedAge = answers['2'] as string || '30-49';

        // 2. MÉTODOS ANTERIORES SELECIONADOS
        const attempts = answers['15'] as string[] || [];

        // Formatar métodos
        const formatMethod = (method: string): string => {
            const methodMap: Record<string, string> = {
                'dieta_moda': 'Dietas da Moda',
                'low_carb': 'Low Carb',
                'jejum': 'Jejum Intermitente',
                'shakes': 'Shakes Substitutos',
                'academia': 'Academia Intensiva',
                'remedios': 'Remédios para Emagrecer',
                'nutricionista': 'Nutricionista Tradicional',
                'detox_caseiro': 'Detox Caseiro'
            };
            return methodMap[method] || method;
        };

        // Criar lista de métodos formatada
        let methodsText = '';
        if (attempts.length === 0) {
            methodsText = 'outros métodos';
        } else if (attempts.length === 1) {
            methodsText = formatMethod(attempts[0]);
        } else if (attempts.length === 2) {
            methodsText = `${formatMethod(attempts[0])} e ${formatMethod(attempts[1])}`;
        } else {
            // 3 ou mais métodos
            const firstTwo = attempts.slice(0, 2).map(formatMethod);
            methodsText = `${firstTwo.join(', ')} e outros ${attempts.length - 2} métodos`;
        }

        // 3. DIFERENÇA DE PESO (meta)
        const currentWeight = userData.weight || 70;
        const targetWeight = userData.targetWeight || 60;
        const weightDiff = Math.max(0, currentWeight - targetWeight).toFixed(1);

        return {
            ageRange: selectedAge,
            methodsList: methodsText,
            weightGoal: weightDiff
        };
    }, [answers, userData]);

    return (
        <div className="text-center flex flex-col items-center justify-center h-full max-w-md mx-auto">
            <div className="mb-6">
                <Users size={80} className="text-green-500 mx-auto" />
            </div>

            <h2 className="text-[22px] md:text-2xl font-bold text-black mb-8 leading-relaxed px-4">
                <span className="text-green-600 font-extrabold">Mais de 62.400 mulheres</span> entre{' '}
                <span className="text-green-600 font-extrabold">{ageRange} anos</span> que{' '}
                <span className="bg-red-100 px-1 font-extrabold">FALHARAM</span> com{' '}
                <span className="text-gray-900 font-extrabold">{methodsList}</span>{' '}
                perderam em média{' '}
                <span className="text-green-600 font-extrabold">{weightGoal}kg</span> em apenas{' '}
                <span className="text-green-600 font-extrabold">28 dias</span> com o Segredinho das Japonesas
            </h2>

            <div className="w-full px-4">
                <GamifiedCTAButton onClick={onNext} text="CONTINUAR" />
            </div>
        </div>
    );
};
