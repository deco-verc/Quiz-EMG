'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';

export const XPCounter = () => {
    const { xp } = useQuizStore();
    const [displayXp, setDisplayXp] = useState(0);
    const [showGain, setShowGain] = useState(false);
    const [gainAmount, setGainAmount] = useState(0);

    useEffect(() => {
        const diff = xp - displayXp;
        if (diff > 0) {
            setGainAmount(diff);
            setShowGain(true);
            const timer = setTimeout(() => setShowGain(false), 2000);

            // Animate number counting up
            const step = Math.ceil(diff / 20);
            let current = displayXp;
            const interval = setInterval(() => {
                current += step;
                if (current >= xp) {
                    current = xp;
                    clearInterval(interval);
                }
                setDisplayXp(current);
            }, 50);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
    }, [xp]);

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <motion.div
                className="bg-white/90 backdrop-blur-sm border-2 border-yellow-xp rounded-full px-4 py-2 flex items-center gap-2 shadow-gamified-gold"
                whileHover={{ scale: 1.05 }}
            >
                <Zap className="w-5 h-5 text-yellow-xp fill-yellow-xp" />
                <span className="font-bold text-black-main font-poppins">{displayXp} XP</span>
            </motion.div>

            <AnimatePresence>
                {showGain && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -20 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 top-full mt-1 font-bold text-green-500 font-poppins"
                    >
                        +{gainAmount} XP
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

