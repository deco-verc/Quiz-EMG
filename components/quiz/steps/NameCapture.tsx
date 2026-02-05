'use client';

import React, { useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Lock, ArrowRight, AlertCircle, Ban, TrendingDown } from 'lucide-react';

export const NameCapture = ({ onNext }: { onNext: () => void }) => {
    const { setUserData } = useQuizStore();
    const [name, setName] = useState('');
    const router = useRouter();

    const handleNext = () => {
        if (name.length < 2) return;
        setUserData({ name });
        // Navigate to analyzing page instead of standard nextStep
        router.push('/analyzing');
    };

    return (
        <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm font-bold mb-4">
                    <Sparkles className="w-4 h-4 flex-shrink-0" />
                    <span>Análise 97% completa</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                    Falta só <span className="text-green-500">1 passo</span> para você ter acesso:
                </h2>
            </motion.div>

            {/* What's Waiting Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative p-[2px] rounded-2xl mb-6 text-left bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            >
                <div className="bg-white rounded-2xl p-6 h-full">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-red-100 rounded-full">
                                <AlertCircle className="w-4 h-4 text-red-600" />
                            </div>
                            <p className="text-gray-900 font-bold text-base leading-tight">4 Coisas que estão te impedindo de emagrecer</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-orange-100 rounded-full">
                                <Ban className="w-4 h-4 text-orange-600" />
                            </div>
                            <p className="text-gray-900 font-bold text-base leading-tight">Desreguladores Hormonais que estão te impedindo de emagrecer</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-purple-100 rounded-full">
                                <Sparkles className="w-4 h-4 text-purple-600" />
                            </div>
                            <p className="text-gray-900 font-bold text-base leading-tight">Sua dose ideal adaptada para sua rotina</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-green-100 rounded-full">
                                <TrendingDown className="w-4 h-4 text-green-600" />
                            </div>
                            <p className="text-gray-900 font-bold text-base leading-tight">Sua transformação em 60 Dias</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Name Input */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
            >
                <label className="block text-left font-bold text-black mb-2 text-lg">
                    Como posso te chamar?
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu primeiro nome..."
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg transition-colors"
                    autoFocus
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <button
                    onClick={handleNext}
                    disabled={name.length < 2}
                    className={`w-full py-4 px-8 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-all ${name.length >= 2
                        ? 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 hover:-translate-y-0.5'
                        : 'bg-gray-300 cursor-not-allowed'
                        }`}
                >
                    CONTINUAR
                    <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
                    <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                    <p className="text-xs">
                        Suas informações estão 100% seguras
                    </p>
                </div>
            </motion.div>
        </div>
    );
};