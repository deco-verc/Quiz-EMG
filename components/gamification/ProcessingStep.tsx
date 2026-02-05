'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Brain, Activity, Scale, AlertCircle } from 'lucide-react';

export const ProcessingStep = ({ onNext }: { onNext: () => void }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { icon: Brain, text: "Analisando seu perfil...", color: "text-blue-500" },
        { icon: Scale, text: "Calculando seu peso ideal...", color: "text-green-500" },
        { icon: Activity, text: "Verificando seu Metabolismo", color: "text-orange-500" },
        { icon: AlertCircle, text: "Identificando desreguladores hormonais...", color: "text-red-500" },
        { icon: CheckCircle2, text: "Gerando sua dose ideal...", color: "text-emerald-500" }
    ];

    useEffect(() => {
        if (currentStep < steps.length) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 1500); // 1.5s per step
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                onNext();
            }, 1000); // Wait 1s after completion before next
            return () => clearTimeout(timer);
        }
    }, [currentStep, onNext, steps.length]);

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="text-center mb-8">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-4"
                >
                    <Loader2 className="w-12 h-12 text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Analisando suas respostas...
                </h2>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
                    <motion.div
                        className="bg-green-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((currentStep / steps.length) * 100, 100)}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <p className="text-right text-sm text-gray-500 font-medium mb-6">
                    {Math.round(Math.min((currentStep / steps.length) * 100, 100))}%
                </p>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: index <= currentStep ? 1 : 0.3,
                                x: 0,
                                scale: isActive ? 1.02 : 1
                            }}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${isActive
                                ? 'bg-green-50 border-green-200 shadow-sm'
                                : isCompleted
                                    ? 'bg-white border-gray-100'
                                    : 'bg-gray-50 border-transparent'
                                }`}
                        >
                            <div className={`p-2 rounded-full ${isActive || isCompleted ? 'bg-white shadow-sm' : 'bg-gray-200'
                                }`}>
                                {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Icon className={`w-5 h-5 ${isActive ? step.color : 'text-gray-400'}`} />
                                )}
                            </div>
                            <span className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                {step.text}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="ml-auto"
                                >
                                    <Loader2 className="w-4 h-4 text-green-500 animate-spin" />
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
