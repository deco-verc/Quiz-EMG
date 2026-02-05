'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import { NextButton } from '../NextButton';
import { AlertTriangle, Check, Info, ChevronRight, Activity } from 'lucide-react';

export const BMIResult = ({ onNext }: { onNext: () => void }) => {
    const { userData } = useQuizStore();
    const bmi = userData.bmi || 0;
    const formattedBMI = bmi.toFixed(1);

    // Determine status
    let classification = '';
    let colorClass = '';
    let bgClass = '';
    let message = '';
    let alertLevel = 'low'; // low, medium, high

    if (bmi < 18.5) {
        classification = 'Abaixo do Peso Saudável';
        colorClass = 'text-yellow-600';
        bgClass = 'bg-yellow-50 border-yellow-200';
        message = `
            <p class="mb-2">Seu IMC está abaixo do ideal, o que pode indicar carências nutricionais ocultas.</p>
            <p class="font-bold mb-1">Mas não se preocupe, Vamos te ajudar a:</p>
            <ul class="list-none space-y-1">
                <li>✓ Ganhar massa magra rápido (não gordura)</li>
                <li>✓ Remover as toxinas do seu organismo</li>
                <li>✓ Regular hormônios e fazer você chegar no seu peso ideal</li>
            </ul>
        `;
        alertLevel = 'medium';
    } else if (bmi < 25) {
        classification = 'Peso Normal';
        colorClass = 'text-emerald-600';
        bgClass = 'bg-emerald-50 border-emerald-200';
        message = `
            <p class="mb-2">Seu IMC está na faixa saudável, mas isso não significa que seu metabolismo está funcionando da melhor forma.</p>
            <p class="mb-2"><strong>76% das mulheres nessa faixa têm:</strong></p>
            <ul class="list-disc pl-4 mb-2 space-y-0.5 text-xs">
                <li>Gordura visceral oculta (barriga, culotes)</li>
                <li>Metabolismo travado (cansa fácil)</li>
                <li>Desequilíbrios hormonais (Pioram a TPM, insônia)</li>
            </ul>
            <p class="font-bold mb-1">Mas não se preocupe, vamos te ajudar a:</p>
            <ul class="list-none space-y-1">
                <li>✓ Eliminar gordura localizada</li>
                <li>✓ Aumentar sua energia e disposição</li>
                <li>✓ Prevenir que você ganhe peso novamente </li>
            </ul>
        `;
        alertLevel = 'low';
    } else if (bmi < 30) {
        classification = 'Sobrepeso — Zona de Oportunidade';
        colorClass = 'text-orange-600';
        bgClass = 'bg-orange-50 border-orange-200';
        message = `
            <p class="mb-2">Seu IMC indica que você está com sobrepeso — mas não se preocupe </p>
            <p class="mb-2">Esta é a <strong>MELHOR faixa de peso para ter resultados rápidos</strong>.</p>
            <p class="mb-2 text-xs">Por quê? Seu metabolismo está adormecido, mas podemos acordar ele e melhorar </strong>MUITO.</strong> </p>
            <p class="font-bold mb-1">Vou ajustar sua dose para:</p>
            <ul class="list-none space-y-1">
                <li>✓ Eliminar retenção em 7 dias</li>
                <li>✓ Acelerar seu metabolismo e regular seus hormonios e organismo</li>
                <li>✓ Fazer você emagrecer sem dificuldade e de forma definitiva</li>
            </ul>
            <p class="mt-2 text-xs italic font-medium">Mulheres assim como você veem resultados nos primeiros 3 dias.</p>
        `;
        alertLevel = 'medium';
    } else if (bmi < 35) {
        classification = 'Obesidade Grau I — Ação Necessária';
        colorClass = 'text-red-600';
        bgClass = 'bg-red-50 border-red-200';
        message = `
            <p class="mb-2">Seu IMC indica obesidade grau I — um sinal de alerta do seu corpo.</p>
            <p class="mb-2 font-medium">Mas fique tranquila, você por pouco, ainda está na janela de reverter isso rápido.</p>
            <p class="mb-1 font-bold text-xs">Riscos atuais:</p>
            <ul class="list-none mb-2 space-y-0.5 text-xs">
                <li>⚠️ Diabetes tipo 2 e Doenças cardíacas</li>
                <li>⚠️ Pressão e Gordura Visceral Altíssima</li>
                <li>⚠️ NÃO CONSEGUIR MAIS EMAGRECER</li>
            </ul>
            <p class="font-bold mb-1">Você precisa tratar isso urgente. Continue, assim vou te ajudar a:</p>
            <ul class="list-none space-y-1">
                <li>✓ Perder 10-12kg em 60 dias</li>
                <li>✓ Reverter o cenário atual da sua saúde</li>
                <li>✓ Recuperar sua autoestima e qualidade de vida</li>
            </ul>
            <p class="mt-2 text-xs italic font-medium">Seu corpo pede socorro. Hormônios desregulados, inflamação alta e metabolismo quase 100% travado.</p>
        `;
        alertLevel = 'high';
    } else {
        // Obesidade Grau II e III (combinados para simplificar ou manter separado se preferir, mas prompt deu até Grau II. Vou usar Grau II para >= 35)
        classification = 'Obesidade Grau II — Zona de Alto Risco'; // Ou Grau III se for muito alto, mas prompt parou no II. Vou usar II+
        if (bmi >= 40) classification = 'Obesidade Grau III — Zona Crítica';

        colorClass = 'text-red-800';
        bgClass = 'bg-red-50 border-red-200';
        message = `
            <p class="mb-2">Seu IMC indica obesidade grau ${bmi >= 40 ? 'III' : 'II'} — seu corpo está pedindo ajuda urgente.</p>
            <p class="mb-1 font-bold text-xs">Riscos imediatos:</p>
            <ul class="list-none mb-2 space-y-0.5 text-xs">
                <li>🔴 Diabetes e Doenças Cardíacas</li>
                <li>🔴 Pressão alta e Risco de AVC</li>
                <li>🔴 Dependência de remédios ou Cirurgia Bariátrica</li>
                <li>🔴 Problemas articulares irreversíveis</li>
            </ul>
            <p class="mb-2 font-bold">MAS aqui está o que importa:</p>
            <p class="mb-2 text-xs">Mesmo em casos avançados, vamos te ajudar a reverter a situação. Só precisamos que aja com rapidez.</p>
            <p class="font-bold mb-1">Alunas semelhantes ao seu IMC perderam:</p>
            <ul class="list-none space-y-1">
                <li>✓ 18-22kg nos primeiros 60 dias</li>
                <li>✓ Normalizaram glicemia em 30 dias e recuperaram a qualidade de vida</li>
                <li>✓ Conquistaram o corpo dos sonhos em 90 dias</li>
            </ul>
            <p class="mt-2 text-xs italic font-medium">Não desista, você também consegue.</p>
        `;
        alertLevel = 'high';
    }

    // Calculate position based on visual segments
    // Underweight (15-18.5): 0-18%
    // Normal (18.5-25): 18-40% (18+22)
    // Overweight (25-30): 40-57% (40+17)
    // Obese (30-45): 57-100% (57+43)
    const getPosition = (val: number) => {
        const v = Math.max(15, Math.min(val, 45)); // Clamp 15-45

        if (v < 18.5) {
            return ((v - 15) / 3.5) * 18;
        } else if (v < 25) {
            return 18 + ((v - 18.5) / 6.5) * 22;
        } else if (v < 30) {
            return 40 + ((v - 25) / 5) * 17;
        } else {
            return 57 + ((v - 30) / 15) * 43;
        }
    };

    const position = getPosition(bmi);

    const handleNext = () => {
        onNext();
    };

    return (
        <div className="max-w-md mx-auto px-4 pb-8">
            {/* Header with Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                        <Activity size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-500">Análise Corporal</span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    CALCULADO
                </div>
            </div>

            {/* Main BMI Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden mb-8 relative"
            >
                {/* Decorative Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-full -z-0 opacity-50" />

                <div className="p-6 relative z-10">
                    <div className="text-center mb-6">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">Seu IMC Atual</p>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className={`text-5xl font-extrabold ${colorClass} tracking-tight`}
                        >
                            {formattedBMI}
                        </motion.div>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-3 ${bgClass} ${colorClass} max-w-full`}>
                            {alertLevel === 'high' && <AlertTriangle size={12} className="shrink-0" />}
                            {alertLevel === 'low' && <Check size={12} className="shrink-0" />}
                            <span className="truncate">{classification}</span>
                        </div>
                    </div>

                    {/* Visual Scale */}
                    <div className="relative pt-6 pb-2">
                        {/* Bar */}
                        <div className="h-3 w-full rounded-full bg-gray-100 flex overflow-hidden">
                            <div className="h-full w-[18%] bg-yellow-300" /> {/* Underweight */}
                            <div className="h-full w-[22%] bg-emerald-400" /> {/* Normal */}
                            <div className="h-full w-[17%] bg-orange-400" /> {/* Overweight */}
                            <div className="h-full w-[43%] bg-red-500" /> {/* Obese */}
                        </div>

                        {/* Indicator */}
                        <motion.div
                            className="absolute top-0 transform -translate-x-1/2"
                            initial={{ left: '0%' }}
                            animate={{ left: `${position}%` }}
                            transition={{ duration: 1, delay: 0.5, type: "spring" }}
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-0.5 h-6 bg-gray-800 mb-1"></div>
                                <div className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap">
                                    VOCÊ
                                </div>
                            </div>
                        </motion.div>

                        {/* Labels */}
                        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium px-1">
                            <span>Abaixo</span>
                            <span>Normal</span>
                            <span>Sobrepeso</span>
                            <span>Obesidade</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Insight/Explanation Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm"
            >
                <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg shrink-0 ${bgClass}`}>
                        <Info size={20} className={colorClass} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">Análise Detalhada:</h3>
                        <div
                            className="text-sm text-gray-700 leading-relaxed space-y-2"
                            dangerouslySetInnerHTML={{ __html: message }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <button
                    onClick={handleNext}
                    className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 bg-green-500 hover:bg-green-600 text-white shadow-green-200 hover:shadow-green-300 transform hover:-translate-y-1"
                >
                    CONTINUAR
                    <ChevronRight size={20} />
                </button>
            </motion.div>
        </div>
    );
};
