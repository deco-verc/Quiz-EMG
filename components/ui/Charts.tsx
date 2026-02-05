'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Target } from 'lucide-react';

// --- Step 4: Method Comparison Bar Chart ---
export const MethodComparisonChart = () => {
    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-center font-bold text-black mb-6 flex items-center justify-center gap-2">
                <Activity className="w-5 h-5 text-gray-500" />
                Comparativo de Eficiência
            </h3>

            <div className="h-64 flex items-end justify-center gap-4 md:gap-12 px-2 md:px-4">
                {/* Traditional Diet */}
                <div className="flex flex-col items-center gap-2 w-1/2 md:w-1/3 group h-full justify-end">
                    <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-12 bg-gray-900 text-white text-[10px] py-1 px-2 rounded z-10 whitespace-nowrap">
                        Efeito Sanfona
                    </div>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: '40%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-full bg-red-100 border-2 border-red-500 rounded-t-xl relative group-hover:bg-red-200 transition-colors"
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-600 font-bold text-sm md:text-lg">40%</div>
                    </motion.div>
                    <span className="text-[10px] md:text-sm text-gray-600 font-bold text-center leading-tight h-8 flex items-center">Métodos<br />Tradicionais</span>
                </div>

                {/* Protocol Detox */}
                <div className="flex flex-col items-center gap-2 w-1/2 md:w-1/3 group h-full justify-end">
                    <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-12 bg-gray-900 text-white text-[10px] py-1 px-2 rounded z-10 whitespace-nowrap">
                        Resultado Duradouro
                    </div>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: '95%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-full bg-green-100 border-2 border-green-500 rounded-t-xl relative group-hover:bg-green-200 transition-colors"
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-green-600 font-bold text-sm md:text-lg">95%</div>
                        <div className="absolute top-2 left-1/2 -translate-x-1/2">
                            <Target className="w-3 h-3 md:w-4 md:h-4 text-green-600 opacity-50" />
                        </div>
                    </motion.div>
                    <span className="text-[10px] md:text-sm text-gray-600 font-bold text-center leading-tight h-8 flex items-center">Segredinho das<br />Japonesas</span>
                </div>
            </div>
        </div>
    );
};

// --- Scientific Combined Chart (Line + Bar) ---
export const ScientificCombinedChart = () => {
    return (
        <div className="space-y-6">
            <MethodComparisonChart />
        </div>
    );
};

// --- Step 28.5: BMI Bar Chart ---
export const BMIBarChart = ({ bmi }: { bmi: number }) => {
    // Normalize BMI to percentage (15 to 45 range approx)
    const minBMI = 15;
    const maxBMI = 45;
    const percentage = Math.min(Math.max(((bmi - minBMI) / (maxBMI - minBMI)) * 100, 0), 100);

    return (
        <div className="w-full mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-center font-bold text-black mb-6">Seu Índice de Massa Corporal</h3>

            <div className="relative h-10 w-full rounded-full overflow-hidden flex shadow-inner">
                <div className="h-full bg-blue-200 w-[18.5%]" title="Baixo Peso" />
                <div className="h-full bg-green-400 w-[25%]" title="Normal" />
                <div className="h-full bg-yellow-400 w-[15%]" title="Sobrepeso" />
                <div className="h-full bg-orange-400 w-[15%]" title="Obesidade I" />
                <div className="h-full bg-red-500 w-[15%]" title="Obesidade II" />
                <div className="h-full bg-red-700 w-[11.5%]" title="Obesidade III" />
            </div>

            {/* Indicator */}
            <div className="relative w-full h-12 mt-2">
                <motion.div
                    className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                    initial={{ left: '0%' }}
                    animate={{ left: `${percentage}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                >
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-black mb-1" />
                    <div className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                        VOCÊ: {bmi.toFixed(1)}
                    </div>
                </motion.div>
            </div>

            <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wider">
                <span>Abaixo</span>
                <span>Normal</span>
                <span>Sobrepeso</span>
                <span>Obesidade</span>
                <span>Extrema</span>
            </div>
        </div>
    );
};
