'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, ArrowRight } from 'lucide-react';

export const TransitionStep = ({ name }: { name: string }) => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Redirect to sales page
            router.push('/video');
        }, 3000); // Faster redirect

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                    {name}, está tudo <span className="text-green-500">PRONTO!</span>
                </h2>

                <p className="text-gray-600 text-lg mb-8">
                    Analisamos suas respostas e criamos o plano perfeito para você.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg max-w-sm mx-auto"
            >
                <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-bold mb-2">
                    <Lock className="w-4 h-4" />
                    ACESSO LIBERADO
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-green-600 font-bold animate-pulse"
            >
                Redirecionando
                <ArrowRight className="w-4 h-4" />
            </motion.div>
        </div>
    );
};
