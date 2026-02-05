'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const LoadingStep = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Analisando suas respostas...');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 50); // 5 seconds total (50ms * 100)

        const timeouts = [
            setTimeout(() => setStatus('Calculando metabolismo...'), 500),
            setTimeout(() => setStatus('Identificando toxinas...'), 1500),
            setTimeout(() => setStatus('Criando protocolo...'), 2500),
            setTimeout(() => setStatus('Carregando aula da Dra Carolina...'), 3500),
            setTimeout(onComplete, 5000),
        ];

        return () => {
            clearInterval(interval);
            timeouts.forEach(clearTimeout);
        };
    }, [onComplete]);

    return (
        <div className="text-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="text-4xl mb-6 inline-block"
            >
                ...
            </motion.div>

            <h2 className="text-xl font-medium mb-4">{status}</h2>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
                <motion.div
                    className="bg-green-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <p className="text-right text-sm text-gray-600 font-bold">{progress}%</p>

            <div className="mt-8 space-y-2 text-left text-sm text-gray-600 font-medium">
                <p className={progress > 20 ? "text-green-500" : ""}>✓ Calculando metabolismo</p>
                <p className={progress > 50 ? "text-green-500" : ""}>✓ Identificando toxinas</p>
                <p className={progress > 75 ? "text-green-500" : ""}>✓ Personalizando protocolo</p>
                <p className={progress > 90 ? "text-green-500" : ""}>✓ Verificando compatibilidade</p>
            </div>
        </div>
    );
};

