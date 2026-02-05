'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import { quizSteps } from '@/data/quizSteps';

export const ProgressBar = () => {
    const { currentStep, totalSteps } = useQuizStore();
    const stepConfig = quizSteps[currentStep];

    // Smart Progress Logic: Fast start, slow finish
    const calculateSmartProgress = (current: number, total: number) => {
        const percentage = current / total;

        // Phase 1: Fast Start (First 15% of steps -> 50% progress)
        if (percentage <= 0.15) {
            return (percentage / 0.15) * 50;
        }
        // Phase 2: Steady Middle (Next 30% of steps -> +35% progress = 85%)
        else if (percentage <= 0.45) {
            return 50 + ((percentage - 0.15) / 0.30) * 35;
        }
        // Phase 3: Slow Finish (Last 55% of steps -> +14% progress = 99%)
        else {
            return 85 + ((percentage - 0.45) / 0.55) * 14;
        }
    };

    const progress = calculateSmartProgress(currentStep, totalSteps);

    // Don't show if showProgress is false
    if (!stepConfig?.showProgress) return null;

    return (
        <div className="w-full px-6 pt-6 pb-4">
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};
