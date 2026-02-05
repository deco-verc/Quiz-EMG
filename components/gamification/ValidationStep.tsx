'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ValidationStep = ({ onNext, name }: { onNext: () => void, name: string }) => {
    const [checks, setChecks] = useState<number>(0);

    useEffect(() => {
        const timeouts = [
            setTimeout(() => setChecks(1), 500),
            setTimeout(() => setChecks(2), 1000),
            setTimeout(() => setChecks(3), 1500),
            setTimeout(() => setChecks(4), 2000),
        ];
        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
                Depois de analisar seu perfil, posso afirmar:
            </h1>

            <div className="space-y-4 mb-8 text-left bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                <CheckItem label="Rotina adequada" checked={checks >= 1} />
                <CheckItem label="Força de Vontade" checked={checks >= 2} />
                <CheckItem label="Meta alcançável sem passar fome" checked={checks >= 3} />
                <CheckItem label="Seu metabolismo está adormecido (Fraco), mas podemos acordá-lo" checked={checks >= 4} />
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: checks >= 4 ? 1 : 0 }}
                onClick={onNext}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
            >
                CONTINUAR
            </motion.button>
        </div>
    );
};

const CheckItem = ({ label, checked }: { label: string, checked: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: checked ? 1 : 0.3, x: checked ? 0 : -10 }}
        className="flex items-center text-lg"
    >
        <span className={`mr-3 ${checked ? 'text-green-500' : 'text-gray-600'}`}>
            {checked ? '✓' : '○'}
        </span>
        <span className={checked ? 'text-black font-medium' : 'text-gray-400'}>{label}</span>
    </motion.div>
);

