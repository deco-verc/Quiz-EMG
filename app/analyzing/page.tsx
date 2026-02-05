'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingStep } from '@/components/gamification/LoadingStep';
import { ProcessingStep } from '@/components/gamification/ProcessingStep';
import { RootCauseInfo } from '@/components/quiz/steps/RootCauseInfo';
import { ComparisonStep } from '@/components/gamification/ComparisonStep';
import { TimelineStep } from '@/components/gamification/TimelineStep';
import { TransitionStep } from '@/components/gamification/TransitionStep';
import { useQuizStore } from '@/store/quizStore';

export default function AnalyzingPage() {
    const [step, setStep] = useState(1);
    const { userData } = useQuizStore();

    const nextStep = () => setStep((s) => s + 1);

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                        <ProcessingStep onNext={nextStep} />
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                        <RootCauseInfo onNext={nextStep} />
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                        <ComparisonStep onNext={nextStep} name={userData.name} />
                    </motion.div>
                )}
                {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                        <TimelineStep onNext={nextStep} name={userData.name} />
                    </motion.div>
                )}
                {step === 5 && (
                    <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                        <TransitionStep name={userData.name} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
