'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { Scale } from 'lucide-react';

export const ComparisonTable = () => {
    const { userData } = useQuizStore();
    const currentWeight = userData.weight || 70;
    const targetWeight = userData.targetWeight || 60;
    const weightDiff = currentWeight - targetWeight;

    // Limitar promessa a valores realistas (máximo 15kg em 60 dias)
    const metaKg = Math.min(weightDiff, 15).toFixed(1);

    return (
        <section className="py-12 px-4 bg-white">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                        <Scale className="w-6 h-6 text-gray-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        SOZINHA vs Segredinho das Japonesas
                    </h2>
                </div>

                <div className="grid grid-cols-2 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                    {/* Left Column: Without Protocol */}
                    <div className="bg-red-50 p-4 md:p-6 border-r border-gray-200">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xl"></span>
                            <h3 className="font-bold text-red-800 text-sm md:text-base leading-tight">SOZINHA</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-red-400 uppercase mb-1">Resultado</p>
                                <p className="text-sm text-gray-700 font-medium">1-2kg em 60 dias <br /><span className="text-gray-500 font-normal text-xs">(se tiver sorte)</span></p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-red-400 uppercase mb-1">Sustenta?</p>
                                <p className="text-sm text-gray-700 font-medium">Efeito sanfona <br /><span className="text-gray-500 font-normal text-xs">volta tudo em 3 meses</span></p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-red-400 uppercase mb-1">Tempo</p>
                                <p className="text-sm text-gray-700 font-medium">6-12 meses <br /><span className="text-gray-500 font-normal text-xs">tentando</span></p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-red-400 uppercase mb-1">Custo</p>
                                <p className="text-sm text-gray-700 font-medium">R$ 2.000+ <br /><span className="text-gray-500 font-normal text-xs">tentativa e erro</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: With Protocol */}
                    <div className="bg-green-50 p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xl"></span>
                            <h3 className="font-bold text-green-800 text-sm md:text-base leading-tight">COM O SEGREDINHO</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-green-500 uppercase mb-1">Resultado</p>
                                <p className="text-sm text-gray-900 font-bold">{metaKg}kg em 60 dias <br /><span className="text-green-600 font-normal text-xs">(comprovado)</span></p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-500 uppercase mb-1">Sustenta?</p>
                                <p className="text-sm text-gray-900 font-bold">Manutenção inclusa <br /><span className="text-green-600 font-normal text-xs">Guia anti-sanfona</span></p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-500 uppercase mb-1">Tempo</p>
                                <p className="text-sm text-gray-900 font-bold">60 dias <br /><span className="text-green-600 font-normal text-xs">resultado visível</span></p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-500 uppercase mb-1">Investimento</p>
                                <p className="text-sm text-gray-900 font-bold">R$ 47,90 <br /><span className="text-green-600 font-normal text-xs">tudo incluído</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 font-medium">
                        A diferença? Um trata o <span className="text-red-500 font-bold">SINTOMA</span>. <br />
                        Nós tratamos a <span className="text-green-600 font-bold">CAUSA-RAIZ</span>.
                    </p>
                </div>
            </div>
        </section>
    );
};
