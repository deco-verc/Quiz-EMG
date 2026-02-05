'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { quizSteps } from '@/data/quizSteps';
import { OptionCard } from './OptionCard';
import { NextButton } from './NextButton';
import { motion, AnimatePresence } from 'framer-motion';
import { MotivationalToast, MOTIVATIONAL_MESSAGES } from '@/components/ui/MotivationalToast';
import { trackQuizStep } from '@/lib/analytics';

// Import custom components (we'll create these next)
import { GenderStep } from './steps/GenderStep';
import { SocialProofAge } from './steps/SocialProofAge';
import { ScientificMethod } from './steps/ScientificMethod';
import { MechanismInfo } from './steps/MechanismInfo';
import { BodyImageSelector } from './steps/BodyImageSelector';
import { DreamBodySelector } from './steps/DreamBodySelector';
import { ValidationSocial } from './steps/ValidationSocial';
import { RealStories } from './steps/RealStories';
import { RootCauseInfo } from './steps/RootCauseInfo';
import { RecognitionInfo } from './steps/RecognitionInfo';
import { BeliefBreak } from './steps/BeliefBreak';
import { WeightHeightSliders } from './steps/WeightHeightSliders';
import { BMIResult } from './steps/BMIResult';
import { TargetWeightInput } from './steps/TargetWeightInput';
import { ImportanceScale } from './steps/ImportanceScale';
import { NameCapture } from './steps/NameCapture';
import { EmpathyMessage } from './steps/EmpathyMessage';
import { AgeSelector } from './steps/AgeSelector';
import { WeightGoalSelector } from './steps/WeightGoalSelector';
import { BodyAreasSelector } from './steps/BodyAreasSelector';
import { MethodIntro } from './steps/MethodIntro';
import { TimelineVisual } from './steps/TimelineVisual';
import { ComparisonStep } from './steps/ComparisonStep';

import { TimelineStep } from '@/components/gamification/TimelineStep';
import { MethodDefinitiveIntro } from './steps/MethodDefinitiveIntro';

import { DailyRoutineStep } from './steps/DailyRoutineStep';
import { HonestChanceStep } from './steps/HonestChanceStep';
import { SocialProofMethod } from './steps/SocialProofMethod';
import { SocialProofHealth } from './steps/SocialProofHealth';

const CustomComponents: Record<string, React.FC<any>> = {
    GenderStep,
    SocialProofAge,
    ScientificMethod,
    MechanismInfo,
    BodyImageSelector,
    DreamBodySelector,
    ValidationSocial,
    RealStories,
    RootCauseInfo,
    RecognitionInfo,
    BeliefBreak,
    WeightHeightSliders,
    BMIResult,
    TargetWeightInput,
    ImportanceScale,
    NameCapture,
    EmpathyMessage,
    AgeSelector,
    WeightGoalSelector,
    BodyAreasSelector,
    MethodIntro,
    TimelineVisual,
    ComparisonStep,
    TimelineStep,
    MethodDefinitiveIntro,
    DailyRoutineStep,
    HonestChanceStep,
    SocialProofMethod,
    SocialProofHealth,
};

export const QuizStep = () => {
    const { currentStep, answers, setAnswer, nextStep } = useQuizStore();
    const stepConfig = quizSteps[currentStep];
    const [selectedValues, setSelectedValues] = useState<any[]>([]);

    // Toast state
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState<'sparkles' | 'star' | 'trophy'>('sparkles');
    const [shownToasts, setShownToasts] = useState<Set<number>>(new Set());

    // Check if we should show a toast for the current step
    useEffect(() => {
        if (MOTIVATIONAL_MESSAGES[currentStep] && !shownToasts.has(currentStep)) {
            const { message, icon } = MOTIVATIONAL_MESSAGES[currentStep];
            setToastMessage(message);
            setToastIcon(icon);
            setShowToast(true);
            setShownToasts(prev => new Set(prev).add(currentStep));
        }
    }, [currentStep, shownToasts]);

    const hideToast = useCallback(() => {
        setShowToast(false);
    }, []);

    useEffect(() => {
        const currentAnswer = answers[stepConfig?.id];
        if (currentAnswer) {
            setSelectedValues(Array.isArray(currentAnswer) ? currentAnswer : [currentAnswer]);
        } else {
            setSelectedValues([]);
        }
    }, [currentStep, answers, stepConfig]);

    // Track step view
    useEffect(() => {
        if (stepConfig) {
            const stepName = stepConfig.title || stepConfig.component || 'Unknown Step';
            const cleanName = stepName.replace(/<[^>]*>?/gm, '');
            trackQuizStep(currentStep, cleanName);
        }
    }, [currentStep, stepConfig]);

    if (!stepConfig) return <div>Step not found</div>;
    const handleOptionClick = (value: any) => {
        if (stepConfig.type === 'single') {
            setAnswer(stepConfig.id.toString(), value);

            if (stepConfig.autoAdvance) {
                setTimeout(nextStep, 400);
            }
        } else if (stepConfig.type === 'multi') {
            const newValues = selectedValues.includes(value)
                ? selectedValues.filter((v) => v !== value)
                : [...selectedValues, value];
            setSelectedValues(newValues);
            setAnswer(stepConfig.id.toString(), newValues);
        }
    };

    const handleNext = () => {
        nextStep();
    };

    // Check validation
    const isValid = () => {
        if (stepConfig.type === 'info') return true;
        if (stepConfig.validation?.required) {
            if (stepConfig.type === 'multi') {
                return selectedValues.length >= (stepConfig.validation.min || 1);
            }
            return selectedValues.length > 0;
        }
        if (stepConfig.type === 'single') {
            return answers[stepConfig.id] !== undefined;
        }
        return true;
    };

    // Render Custom Component
    if (stepConfig.component && CustomComponents[stepConfig.component]) {
        const Component = CustomComponents[stepConfig.component];
        return (
            <>
                <MotivationalToast
                    show={showToast}
                    message={toastMessage}
                    icon={toastIcon}
                    onClose={hideToast}
                />
                <Component config={stepConfig} onNext={handleNext} />
            </>
        );
    }



    return (
        <>
            <MotivationalToast
                show={showToast}
                message={toastMessage}
                icon={toastIcon}
                onClose={hideToast}
            />
            <div className="flex flex-col h-full pt-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex-1 flex flex-col"
                    >
                        {stepConfig.title && (
                            <h2
                                className="text-2xl md:text-3xl font-bold text-black text-center mb-4 leading-tight px-4 max-w-2xl mx-auto"
                                dangerouslySetInnerHTML={{ __html: stepConfig.title }}
                            />
                        )}

                        {stepConfig.subtitle && (
                            <p className="text-gray-400 text-center mb-8 text-base italic px-4 max-w-xl mx-auto">
                                {stepConfig.subtitle}
                            </p>
                        )}

                        <div className="space-y-2.5 mb-24 max-w-lg mx-auto w-full px-4">
                            {stepConfig.options?.map((option, index) => (
                                <motion.div
                                    key={option.value}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <OptionCard
                                        selected={selectedValues.includes(option.value)}
                                        onClick={() => handleOptionClick(option.value)}
                                        multiSelect={stepConfig.type === 'multi'}
                                        image={option.image}
                                    >
                                        {option.label}
                                    </OptionCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {(stepConfig.type === 'multi' || !stepConfig.autoAdvance) && (
                    <NextButton onClick={handleNext} disabled={!isValid()} />
                )}
            </div>
        </>
    );
};

