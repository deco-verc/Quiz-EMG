'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { Check, ClipboardList } from 'lucide-react';
import { quizSteps } from '@/data/quizSteps';

export const QuizRecap = () => {
    const { userData, answers } = useQuizStore();

    // Helper to get labels from values
    const getLabels = (stepId: number, values: string[]) => {
        const step = quizSteps[stepId];
        if (!step || !step.options) return [];
        return values.map(v => step.options?.find(o => o.value === v)?.label || v);
    };

    // Data Extraction
    const symptoms = answers[17] as string[] || [];
    const numSymptoms = symptoms.length;

    const attemptsList = answers[15] as string[] || [];
    const numAttempts = attemptsList.length;

    const eventGain = answers[14] as string[] || []; // Step 14: Eventos que levaram a ganhar peso
    const firstEvent = eventGain[0];

    const bmi = userData.bmi || 0;
    let classification = '';
    if (bmi < 25) classification = 'Peso Normal';
    else if (bmi < 30) classification = 'Sobrepeso';
    else if (bmi < 35) classification = 'Obesidade Grau I';
    else if (bmi < 40) classification = 'Obesidade Grau II';
    else classification = 'Obesidade Grau III';

    // Importance Scale (Step 32)
    // We don't have easy access to step 32 value unless we stored it in answers['32'].
    // Assuming it is stored there.
    // Actually, ImportanceScale component uses local state `value` and doesn't seem to setAnswer in the snippet I saw earlier.
    // It just has `onNext`. If it doesn't save to store, we can't use it.
    // Let's check if we can use motivation from Step 33 "O que MAIS importa...".
    // Or just skip importance if not available.
    // Let's assume for now we might not have importance score saved. I will skip it to be safe, or use a default high urgency if symptoms > 3.

    return (
        <section className="py-8 px-4 bg-white">
            <div className="max-w-xl mx-auto">
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                        <ClipboardList className="w-5 h-5 text-green-600" />
                        <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm">Resumo do Seu Perfil</h3>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">Você nos contou que:</p>

                    <div className="space-y-3">
                        {numSymptoms >= 3 && (
                            <div className="flex items-start gap-3">
                                <div className="bg-green-200 rounded-full p-0.5 mt-0.5">
                                    <Check className="w-3 h-3 text-green-700" strokeWidth={3} />
                                </div>
                                <p className="text-gray-700 text-sm">
                                    Sente <span className="font-bold">{numSymptoms} sintomas</span> frequentes
                                </p>
                            </div>
                        )}

                        {numAttempts >= 2 && (
                            <div className="flex items-start gap-3">
                                <div className="bg-green-200 rounded-full p-0.5 mt-0.5">
                                    <Check className="w-3 h-3 text-green-700" strokeWidth={3} />
                                </div>
                                <p className="text-gray-700 text-sm">
                                    Já tentou <span className="font-bold">{numAttempts} métodos</span> sem sucesso duradouro
                                </p>
                            </div>
                        )}

                        {firstEvent && (
                            <div className="flex items-start gap-3">
                                <div className="bg-green-200 rounded-full p-0.5 mt-0.5">
                                    <Check className="w-3 h-3 text-green-700" strokeWidth={3} />
                                </div>
                                <p className="text-gray-700 text-sm">
                                    Ganhou peso após <span className="font-bold">{getLabels(14, [firstEvent])[0] || firstEvent}</span>
                                </p>
                            </div>
                        )}

                        <div className="flex items-start gap-3">
                            <div className="bg-green-200 rounded-full p-0.5 mt-0.5">
                                <Check className="w-3 h-3 text-green-700" strokeWidth={3} />
                            </div>
                            <p className="text-gray-700 text-sm">
                                Seu IMC está em <span className="font-bold">{classification}</span> ({bmi.toFixed(1)})
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
