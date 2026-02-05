'use client';

import React from 'react';
import { NextButton } from '../NextButton';
import { GamifiedCTAButton } from '@/components/ui/GamifiedCTAButton';

export const BeliefBreak = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="text-center">
            <h3 className="text-black font-bold mb-4">A maioria das soluções NÃO trata a causa raiz</h3>

            {/* Comparative Chart */}
            <div className="mb-8 relative">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="h-40 w-full relative">
                        <svg viewBox="0 0 300 150" className="w-full h-full overflow-visible">
                            {/* Grid Lines (Optional, kept minimal) */}
                            <line x1="0" y1="150" x2="300" y2="150" stroke="#e5e7eb" strokeWidth="2" />
                            <line x1="0" y1="0" x2="0" y2="150" stroke="#e5e7eb" strokeWidth="2" />

                            {/* Traditional Journey (Instable) */}
                            <path
                                d="M 10,140 C 40,100 60,140 90,110 S 140,130 160,100 S 200,140 220,120 S 260,130 290,110"
                                fill="none"
                                stroke="#9ca3af"
                                strokeWidth="3"
                                strokeDasharray="6,4"
                                strokeLinecap="round"
                            />

                            {/* Method Journey (Progressive) */}
                            <path
                                d="M 10,140 C 100,140 150,80 290,10"
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />

                            {/* End Points */}
                            <circle cx="290" cy="110" r="4" fill="#9ca3af" />
                            <circle cx="290" cy="10" r="4" fill="#22c55e" />
                        </svg>

                        {/* Labels */}
                        <div className="absolute top-2 right-0 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                            Com o Método
                        </div>
                        <div className="absolute bottom-10 right-0 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200">
                            Tradicional
                        </div>
                    </div>

                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                        <span>Início</span>
                        <span>Tempo</span>
                    </div>
                </div>
            </div>

            <div className="text-left bg-white p-4 rounded-xl border border-gray-100 mb-6 space-y-4">
                <p className="text-black mb-2">
                    A diferença? <br />
                    Este método remove a <span className="font-bold">CAUSA</span> do problema, não só o sintoma.
                </p>
            </div>

            <GamifiedCTAButton onClick={onNext} />
        </div>
    );
};
