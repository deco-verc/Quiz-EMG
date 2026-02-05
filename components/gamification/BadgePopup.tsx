'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Star, Zap } from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';

const BADGES = {
    'curioso': { title: 'CURIOSO', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-100', xp: 10 },
    'top_11': { title: 'TOP 11%', icon: Trophy, color: 'text-yellow-xp', bg: 'bg-yellow-50', xp: 50 },
    'comprometido': { title: 'COMPROMETIDO', icon: Star, color: 'text-green-500', bg: 'bg-green-50', xp: 25 },
};

export const BadgePopup = () => {
    const { badges } = useQuizStore();
    const [currentBadge, setCurrentBadge] = useState<string | null>(null);

    useEffect(() => {
        // Check if a new badge was added recently (simple logic: show last added if not shown)
        // In a real app, we'd track "seen" badges. For now, we rely on the store update triggering this.
        // To avoid re-showing old badges on refresh, we could use a local state queue.
        // For this MVP, we'll listen to the length change or just show the last one if it's "new" in this session.
        // Better approach: The store action `unlockBadge` should trigger an event or we just check the last one.

        if (badges.length > 0) {
            const lastBadge = badges[badges.length - 1];
            // Simple debounce/check to avoid spamming on load
            // We'll assume this component mounts once and stays.

            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10B981', '#FBBF24', '#ffffff']
            });

            setCurrentBadge(lastBadge);
            const timer = setTimeout(() => setCurrentBadge(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [badges.length]); // Only trigger when count changes

    if (!currentBadge || !BADGES[currentBadge as keyof typeof BADGES]) return null;

    const badgeConfig = BADGES[currentBadge as keyof typeof BADGES];
    const Icon = badgeConfig.icon;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
            >
                <div className={`bg-white p-8 rounded-2xl shadow-gamified-hover flex flex-col items-center gap-4 border-4 border-white ${badgeConfig.bg}`}>
                    <div className={`p-4 rounded-full ${badgeConfig.bg} shadow-inner`}>
                        <Icon className={`w-16 h-16 ${badgeConfig.color}`} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold font-poppins text-black-main">{badgeConfig.title}</h3>
                        <p className="text-gray-sec font-medium">+{badgeConfig.xp} XP</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

