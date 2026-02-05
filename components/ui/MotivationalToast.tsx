'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Trophy } from 'lucide-react';

interface MotivationalToastProps {
    show: boolean;
    message: string;
    icon?: 'sparkles' | 'star' | 'trophy';
    onClose: () => void;
}

export const MotivationalToast = ({ show, message, icon = 'sparkles', onClose }: MotivationalToastProps) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    const IconComponent = {
        sparkles: Sparkles,
        star: Star,
        trophy: Trophy,
    }[icon];

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed top-4 right-4 z-50 w-auto max-w-md"
                >
                    <div className="bg-white text-gray-900 px-4 py-3 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-3 max-w-[340px] pointer-events-auto cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-100">
                                <img
                                    src="https://i.imgur.com/R9hIJjk.png"
                                    alt="Carolina Mendes"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                                <IconComponent className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="font-bold text-sm text-green-700 leading-none">Dra. Carolina</p>
                                <span className="text-[10px] text-gray-400">agora</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-snug">
                                {message}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Helper hook to manage toast state
export const useMotivationalToast = () => {
    const [toastState, setToastState] = useState({
        show: false,
        message: '',
        icon: 'sparkles' as 'sparkles' | 'star' | 'trophy',
    });

    const showToast = (message: string, icon: 'sparkles' | 'star' | 'trophy' = 'sparkles') => {
        setToastState({ show: true, message, icon });
    };

    const hideToast = () => {
        setToastState(prev => ({ ...prev, show: false }));
    };

    return { toastState, showToast, hideToast };
};

// Predefined motivational messages for specific steps
export const MOTIVATIONAL_MESSAGES: Record<number, { message: string; icon: 'sparkles' | 'star' | 'trophy' }> = {
    10: {
        message: "🌟 Você está no caminho certo! ",
        icon: 'sparkles',
    },
    20: {
        message: "⭐ Respostas incríveis! Sua transformação está mais próxima do que imagina!",
        icon: 'star',
    },
    30: {
        message: "🏆 Incrível! Você é mais determinada que 90% das mulheres",
        icon: 'trophy',
    },
};
