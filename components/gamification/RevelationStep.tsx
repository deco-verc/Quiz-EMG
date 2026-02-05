'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const RevelationStep = ({ onNext, name }: { onNext: () => void, name: string }) => {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-8">
                {name}, descobri 3 coisas <span className="text-red-urgency">CRÍTICAS</span> sobre você:
            </h1>

            <div className="space-y-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-red-50 border-2 border-red-500 text-black p-4 rounded-xl text-left"
                >
                    <h3 className="font-bold text-lg text-black">1️⃣ Seu metabolismo está em modo de "sobrevivência"</h3>
                    <p className="text-black text-sm font-medium">Por isso você engorda fácil e emagrece difícil.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="bg-red-50 border-2 border-red-500 text-black p-4 rounded-xl text-left"
                >
                    <h3 className="font-bold text-lg text-black">2️⃣ Você come por emoção, não por fome</h3>
                    <p className="text-black text-sm font-medium">E isso não é falta de disciplina — é química desbalanceada.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 }}
                    className="bg-red-50 border-2 border-red-500 text-black p-4 rounded-xl text-left"
                >
                    <h3 className="font-bold text-lg text-black">3️⃣ Seu corpo está "desconfiado"</h3>
                    <p className="text-black text-sm font-medium">Depois de tantas dietas, ele aprendeu a se proteger.</p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
            >
                <p className="text-green-500 font-bold text-xl mb-8">Mas não se preocupe, vou te ajudar a reverter isso, e rapidamente</p>

                <button
                    onClick={onNext}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
                >
                    CONTINUAR
                </button>
            </motion.div>
        </div>
    );
};

