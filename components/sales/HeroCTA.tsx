'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { RealCountdown } from './RealCountdown';
import { ArrowRight, User, Activity, Scale, Target, TrendingDown, Clock, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroCTA = () => {
    const { userData, answers } = useQuizStore();

    // Data Extraction & Fallbacks
    const name = userData.name?.split(' ')[0] || 'Amiga';
    const age = userData.age || 30;
    const bmi = userData.bmi || 25;
    const currentWeight = userData.weight || 70;
    const targetWeight = userData.targetWeight || 60;
    const metaKg = (currentWeight - targetWeight).toFixed(1);

    // Routine & Attempts Logic
    // Step 22 is Routine (was 23), Step 15 is Attempts
    const routineAnswer = answers[22];
    const attemptsAnswer = answers[15] as string[] || [];

    const isRoutineBusy = routineAnswer === 'trabalho_fora' || routineAnswer === 'estudante_meio' || routineAnswer === 'casa_familia';
    const numAttempts = attemptsAnswer.length;

    return (
        <section className="py-8 md:py-12 px-4 bg-white">
            <div className="max-w-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-2 border-green-500 rounded-3xl p-6 md:p-8 shadow-xl shadow-green-100 relative overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <div className="bg-green-100 p-2 rounded-full">
                            <User className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-green-600">{name}</h1>
                        </div>
                    </div>

                    {/* Profile Stats */}
                    <div className="space-y-4 mb-8">
                        <p className="text-gray-600 font-medium mb-2">Informações Gerais:</p>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Activity className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>
                                    <span className="font-bold">{age} anos</span> | IMC: <span className="font-bold">{bmi.toFixed(1)}</span>
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-700">
                                <Scale className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>
                                    Peso atual: <span className="font-bold">{currentWeight}kg</span>
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-700">
                                <Target className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>
                                    Meta: <span className="font-bold">{targetWeight}kg</span>
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-700 bg-green-50 p-2 rounded-lg border border-green-100">
                                <TrendingDown className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <span className="text-green-800">
                                    Perder: <span className="font-bold">{metaKg}kg de gordura</span> em 60 dias
                                </span>
                            </div>

                            {/* Conditional Routine */}
                            {isRoutineBusy && (
                                <div className="flex items-start gap-3 text-gray-700 mt-2">
                                    <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold">Rotina: Corrida/Trabalho</span>
                                        <p className="text-sm text-gray-500">→ Receita adaptada para 5min</p>
                                    </div>
                                </div>
                            )}

                            {/* Conditional Attempts */}
                            {numAttempts >= 3 && (
                                <div className="flex items-start gap-3 text-gray-700 mt-2">
                                    <RotateCcw className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold">Tentou {numAttempts} métodos antes</span>
                                        <p className="text-sm text-gray-500">→ Essa bebidinha trata a CAUSA raiz</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-center text-gray-600 mb-8 italic">
                        Dosagem exata criada para o <span className="font-bold text-gray-900">SEU corpo</span> e Encaixada na <span className="font-bold text-gray-900">SUA rotina</span>.
                    </p>

                    <RealCountdown />

                    <button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold h-16 px-8 rounded-xl shadow-lg shadow-green-500/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group">
                        QUERO COMPRAR COM DESCONTO
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
