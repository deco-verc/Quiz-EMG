'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { GamifiedCTAButton } from '@/components/ui/GamifiedCTAButton';
import { Sparkles } from 'lucide-react';

export const SocialProofHealth = ({ onNext }: { onNext: () => void }) => {
    const { answers } = useQuizStore();
    const problems = answers[31] as string[] || []; // Step 31 (New ID for HealthProblems)
    const problem = problems.length > 0 && problems[0] !== 'nenhum' ? problems[0] : 'excesso de peso';

    // Format problem text
    const formattedProblem = problem === 'pressao_alta' ? 'pressão alta' :
        problem === 'colesterol' ? 'colesterol alto' :
            problem === 'diabetes' ? 'diabetes' :
                problem === 'dores' ? 'dores no corpo' :
                    problem === 'insonia' ? 'insônia' :
                        problem === 'depressao' ? 'depressão' : problem;

    return (
        <div className="text-center flex flex-col items-center justify-center h-full max-w-md mx-auto">
            <div className="mb-8">
                <Sparkles size={80} className="text-yellow-400 mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-black mb-8 leading-relaxed px-4">
                89% das alunas com <span className="text-green-600">{formattedProblem}</span> viram melhora significativa em 14 dias
            </h2>

            <div className="w-full px-4">
                <GamifiedCTAButton onClick={onNext} text="CONTINUAR" />
            </div>
        </div>
    );
};
