'use client';

import React, { useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { quizSteps } from '@/data/quizSteps';

export const DynamicFAQ = () => {
    const { answers, userData } = useQuizStore();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Helper to get labels from values
    const getLabels = (stepId: number, values: string[]) => {
        const step = quizSteps[stepId];
        if (!step || !step.options) return [];
        return values.map(v => step.options?.find(o => o.value === v)?.label || v);
    };

    // Data Extraction
    const routineAnswer = answers[22]; // Step 22: Daily Routine
    const attemptsAnswer = answers[15] as string[] || []; // Step 15: Past Attempts
    const symptomsAnswer = answers[17] as string[] || []; // Step 17: Symptoms
    const ageAnswer = answers[2]; // Step 2: Age
    const bmi = userData.bmi || 0;

    // Logic Conditions
    const showRoutine = routineAnswer === 'trabalho_fora';
    const showAttempts = attemptsAnswer.length >= 3;
    const showSymptoms = symptomsAnswer.length >= 4;
    const showAge = ['30-49', '50-59', '60+'].includes(ageAnswer); // Showing for 30+ to be safe/inclusive
    const showBMI = bmi >= 30;

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const questions = [];

    // 1. Routine Question
    if (showRoutine) {
        questions.push({
            question: "MAS EU TENHO ROTINA MUITO CORRIDA...",
            answer: (
                <>
                    Exatamente por isso TEMOS as receitas rápidas que levam no máximo 15 minutos.<br /><br />
                    E tem mais, incluímos meal prep de domingo para você preparar a semana inteira em 2 horas.<br /><br />
                    Você trabalha fora? Perfeito. O protocolo foi feito para isso.
                </>
            )
        });
    }

    // 2. Attempts Question
    if (showAttempts) {
        const attemptsList = getLabels(15, attemptsAnswer).slice(0, 4).join(", ");
        questions.push({
            question: `MAS EU JÁ TENTEI ${attemptsAnswer.length} VEZES E NÃO FUNCIONOU...`,
            answer: (
                <>
                    Eu sei, Você tentou: {attemptsList}.<br /><br />
                    Mas nenhum deles tratou a CAUSA raiz que fez você ganhar e perder por todos esses anos.<br /><br />
                    Eles tratavam temporariamente, fazendo você ganhar o dobro do peso depois.<br /><br />
                    Este protocolo é diferente, Trata o problema de dentro pra fora.<br /><br />
                    É POR ISSO que dessa vez você vai ter os resultados que tanto deseja.
                </>
            )
        });
    }

    // 3. Symptoms Question
    if (showSymptoms) {
        questions.push({
            question: `E OS ${symptomsAnswer.length} SINTOMAS QUE SINTO?`,
            answer: (
                <>
                    Cansaço, inchaço, intestino preso, fome constante...<br /><br />
                    Todos esses sintomas SÃO sinais de intoxicação do seu corpo.
                    Mas não se preocupe, em apenas: <br /><br />
                    1 Semana : Sintomas começam a sumir<br />
                    2 Semanas : Energia volta<br />
                    4 Semanas : Corpo fica completamente diferente<br /><br />
                    O protocolo foi feito exatamente pra isso.
                </>
            )
        });
    }

    // 4. Age Question
    if (showAge) {
        questions.push({
            question: "FUNCIONA DEPOIS DOS 40?",
            answer: (
                <>
                    SIM! E é ainda MAIS importante.<br /><br />
                    Após os 40, o metabolismo muda drasticamente. Dietas e métodos tradicionais ficam 60% menos eficazes.<br /><br />
                    Mas o Segredinho das Japonesas trata justamente a mudança hormonal dos 40+.<br /><br />
                    Tanto que maior parte das nossas alunas têm 40+ anos.<br /><br />
                    E os resultados são IDÊNTICOS (ou melhores) que mulheres mais jovens.
                </>
            )
        });
    }


    // Fixed Questions
    questions.push({
        question: "PRECISO FAZER EXERCÍCIOS PESADOS?",
        answer: (
            <>
                Não. Zero obrigação.<br /><br />
                O protocolo funciona bem só com alimentação.<br /><br />
                MAS: incluímos um treino metabólico de 15min por dia que acelera em 40% os resultados.<br /><br />
                3x por semana, em casa, sem equipamento.<br /><br />
                Você decide se quer usar ou não.
            </>
        )
    });

    questions.push({
        question: "AS RECEITAS SÃO COMPLICADAS?",
        answer: (
            <>
                Não! Máximo 7 ingredientes por receita.<br /><br />
                Tudo que você encontra em qualquer mercado.<br /><br />
                Nada de "semente de chia orgânica importada".<br /><br />
                Comida de verdade, simples, gostosa e fácil de fazer.
            </>
        )
    });

    questions.push({
        question: "PRECISO CONTAR CALORIAS?",
        answer: (
            <>
                Não. ZERO contagem de calorias.<br /><br />
                O Segredinho das Japonesas regula seu metabolismo naturalmente através da desintoxicação hormonal.<br /><br />
                Você só precisa seguir as receitas prontas e o seu protocolo personalizado, sem estresse.<br /><br />
                É SIMPLES de verdade.
            </>
        )
    });

    questions.push({
        question: "E SE NÃO FUNCIONAR PRA MIM?",
        answer: (
            <>
                Você tem 7 dias para testar TUDO.<br /><br />
                Se não perder peso, não ver roupas folgando, não sentir mais energia...<br /><br />
                Eu devolvo cada centavo. Sem perguntas.<br /><br />
                Sem formulários. Só um e-mail.<br /><br />
                O risco é TODO meu. Você só tem a ganhar.
            </>
        )
    });

    return (
        <section className="py-16 px-4 bg-white" id="faq">
            <div className="max-w-[800px] mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Suas Dúvidas Respondidas
                    </h2>
                </div>

                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                border rounded-xl transition-all duration-300 overflow-hidden cursor-pointer
                                ${openIndex === index
                                    ? 'border-[#10B981] bg-[#ECFDF5]'
                                    : 'border-gray-200 bg-[#F9FAFB] hover:border-gray-300'
                                }
                            `}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="p-5 md:p-6 flex justify-between items-center gap-4">
                                <h3 className="font-poppins font-semibold text-lg text-[#111827] flex items-center gap-3">
                                    <span className="text-2xl"></span>
                                    {item.question}
                                </h3>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                                )}
                            </div>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 pt-0 text-[#374151] font-poppins text-base leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
